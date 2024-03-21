import { action, computed, override } from "mobx";
import Cartesian3 from "terriajs-cesium/Source/Core/Cartesian3";
import Cartographic from "terriajs-cesium/Source/Core/Cartographic";
import HeadingPitchRoll from "terriajs-cesium/Source/Core/HeadingPitchRoll";
import Matrix3 from "terriajs-cesium/Source/Core/Matrix3";
import Matrix4 from "terriajs-cesium/Source/Core/Matrix4";
import Quaternion from "terriajs-cesium/Source/Core/Quaternion";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import Transforms from "terriajs-cesium/Source/Core/Transforms";
import TranslationRotationScale from "terriajs-cesium/Source/Core/TranslationRotationScale";
import createGuid from "terriajs-cesium/Source/Core/createGuid";
import {
  BoxDrawing,
  CatalogMemberMixin,
  CommonStrata,
  CreateModel,
  HeadingPitchRollTraits,
  Icon,
  LatLonHeightTraits,
  MapItem,
  MapToolbar,
  MappableMixin,
  Terria,
  ViewState,
  ViewingControl
} from "terriajs-plugin-api";
import { toolId } from "..";
import Box3dCatalogItemTraits, {
  DimensionsTraits
} from "./Traits/Box3dCatalogItemTraits";

/**
 * A custom Terria catalog item that shows a 3D box on the map.
 */
export default class Box3dCatalogItem extends CatalogMemberMixin(
  MappableMixin(CreateModel(Box3dCatalogItemTraits))
) {
  static readonly type = "box-3d";
  readonly type = Box3dCatalogItem.type;

  private boxDrawing: BoxDrawing | undefined;

  constructor(id: string | undefined, terria: Terria) {
    super(id, terria);
  }

  static fromRectangle(rectangle: Rectangle, terria: Terria) {
    // Create an instance of our `BoxDrawingCatalogItem`.
    const boxDrawingItem = new Box3dCatalogItem(createGuid(), terria);

    // There are a bunch of concepts to understand here.
    // 1. What does `setTrait` do?
    // Traits are the serializable properties of a model. They are set using the
    // `setTrait` method.  Here we set the `name` trait for the model. The first
    // parameter `CommonStrata.user` is the "stratum" on which to set the trait
    // value. In terria the value of a trait can originate from different sources,
    // the server, the catalog configuration file, or user changes. Values from each
    // of these origins are recorded separately in what is called a "stratum".  Each
    // stratum has a priority and the visible value of a trait is its value in the
    // highest priority stratum. The "user" stratum has the highest priority. If a
    // value is not defined in the user stratum, then it is checked in the lower
    // strata until we find a value or otherwise return `undefined`.  Here we set
    // the property on the `user` stratum as the change was made by a user action.
    boxDrawingItem.setTrait(CommonStrata.user, "name", `3D box`);

    // Later, to access the trait value use `boxDrawingItem.name`
    boxDrawingItem.positionBoxFromRectangle(rectangle);

    // 2. What does `addModel` do?
    // `addModel` registers the model we just created with Terria. This is
    // important for the model to become part of various lifecycle methods.
    // eg: When a user creates a share link, the model will be part of the share
    // link only if it is added to the Terria instance.
    terria.addModel(boxDrawingItem);

    return boxDrawingItem;
  }

  /**
   * A catalog item lifecycle method which will be called to load any data that is required to display the item on the map.
   * This method will be called just before the call to `mapItems`.
   * In this case though, we do not require any additional data for displaying this catalog item, so it is a no-op.
   */
  forceLoadMapItems(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Returns array of mappable items to be shown on the map when user loads this catalog item to the workbench.
   */
  @computed
  get mapItems(): MapItem[] {
    const cesium = this.terria.cesium;
    if (cesium) {
      // In 3d mode. Create a box drawing if not already created.
      if (!this.boxDrawing) {
        this.boxDrawing = BoxDrawing.fromTranslationRotationScale(
          cesium,
          this.trs,
          {
            keepBoxAboveGround: true,
            onChange: ({ translationRotationScale }) => {
              this.updateTraits(translationRotationScale);
            }
          }
        );
      }
    } else {
      // In 2d mode. Destroy the box drawing.
      this.boxDrawing = undefined;
    }

    if (this.boxDrawing) {
      // Copy any TRS updates on item to the boxDrawing
      this.boxDrawing.setTranslationRotationScale(this.trs);

      // Show the cesium datasource only if the catalog item is shown.
      this.boxDrawing.dataSource.show = this.show;
      return [this.boxDrawing.dataSource];
    } else {
      return [];
    }
  }

  /**
   * By defining `viewingControls` a catalog item can extend its viewing control menu.
   * This is the 3-dot menu of an item in the workbench.
   *
   */
  @override
  get viewingControls(): ViewingControl[] {
    return [
      {
        id: "view-box-measurements",
        name: "Measure",
        icon: {
          glyph: Icon.GLYPHS.cube
        },
        onClick: (viewState: ViewState) => {
          MapToolbar.openTool(viewState, toolId, { boxItem: this });
        }
      }
    ];
  }

  /**
   * Positions the box from a rectangle on the globe surface. The position,
   * scale and rotation of the box will match the rectangle.
   */
  @action
  positionBoxFromRectangle(rectangle: Rectangle) {
    const center = Cartographic.toCartesian(Rectangle.center(rectangle));

    // Compute scale matrix from length, width, height
    const topLeft = Cartesian3.fromRadians(rectangle.west, rectangle.north);
    const bottomLeft = Cartesian3.fromRadians(rectangle.west, rectangle.south);
    const topRight = Cartesian3.fromRadians(rectangle.east, rectangle.north);
    const length = Cartesian3.distance(topLeft, bottomLeft);
    const width = Cartesian3.distance(topLeft, topRight);
    const height = Math.min(length, width);

    // Get rotation at the center point
    const rotation = Quaternion.fromRotationMatrix(
      Matrix4.getMatrix3(
        Transforms.eastNorthUpToFixedFrame(center),
        new Matrix3()
      )
    );

    const scale = new Cartesian3(width, length, height);
    const trs = new TranslationRotationScale(center, rotation, scale);
    this.updateTraits(trs);
  }

  /**
   * Update translation, rotation and scale traits for the item
   */
  @action
  private updateTraits(trs: TranslationRotationScale) {
    LatLonHeightTraits.setFromCartesian(
      this.position,
      CommonStrata.user,
      trs.translation
    );

    HeadingPitchRollTraits.setFromQuaternion(
      this.rotation,
      CommonStrata.user,
      trs.rotation
    );

    DimensionsTraits.setFromCartesianScale(
      this.dimensions,
      CommonStrata.user,
      trs.scale
    );
  }

  /**
   * Returns the current translation, rotation and scale of the box
   */
  @computed
  get trs(): TranslationRotationScale {
    const position = Cartographic.toCartesian(
      Cartographic.fromDegrees(
        this.position.longitude ?? 0,
        this.position.latitude ?? 0,
        this.position.height ?? 0
      )
    );

    const rotation = Quaternion.fromHeadingPitchRoll(
      HeadingPitchRoll.fromDegrees(
        this.rotation.heading ?? 0,
        this.rotation.pitch ?? 0,
        this.rotation.roll ?? 0
      )
    );

    const scale = new Cartesian3(
      this.dimensions.width ?? 1,
      this.dimensions.length ?? 1,
      this.dimensions.height ?? 1
    );

    const trs = new TranslationRotationScale(position, rotation, scale);
    return trs;
  }

  /**
   * Returns the height of the bottom face from the ground
   */
  @computed
  get bottomHeight(): number {
    return this.position.height !== undefined
      ? this.position.height - this.trs.scale.z / 2
      : 0;
  }
}

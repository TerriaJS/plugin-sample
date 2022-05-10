import { action, computed } from "mobx";
import Cartesian3 from "terriajs-cesium/Source/Core/Cartesian3";
import Cartographic from "terriajs-cesium/Source/Core/Cartographic";
import HeadingPitchRoll from "terriajs-cesium/Source/Core/HeadingPitchRoll";
import Matrix3 from "terriajs-cesium/Source/Core/Matrix3";
import Matrix4 from "terriajs-cesium/Source/Core/Matrix4";
import Quaternion from "terriajs-cesium/Source/Core/Quaternion";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import Transforms from "terriajs-cesium/Source/Core/Transforms";
import TranslationRotationScale from "terriajs-cesium/Source/Core/TranslationRotationScale";
import {
  BoxDrawing,
  CatalogMemberFactory,
  CatalogMemberMixin,
  CommonStrata,
  CreateModel,
  HeadingPitchRollTraits,
  Icon,
  LatLonHeightTraits,
  MapItem,
  MappableMixin,
  runWorkflow,
  Terria,
  ViewingControl,
  ViewState
} from "terriajs-plugin-api";
import EditBoxTransformWorkflow from "./EditBoxTransformWorkflow";
import BoxDrawingCatalogItemTraits, {
  DimensionsTraits
} from "./Traits/BoxDrawingCatalogItemTraits";

export default class BoxDrawingCatalogItem extends CatalogMemberMixin(
  MappableMixin(CreateModel(BoxDrawingCatalogItemTraits))
) {
  static readonly type = "box-drawing";
  readonly type = BoxDrawingCatalogItem.type;

  private boxDrawing: BoxDrawing | undefined;

  constructor(id: string | undefined, terria: Terria) {
    super(id, terria);
  }

  /**
   * A catalog item lifecycle method which will be called
   * when the item is added to the workbench and just before the call to `mapItems`.
   * If the catalog item requires loading data over the network to generate its `mapItems`
   * then this is the right place to do it. For this catalog item it is a noop.
   */
  forceLoadMapItems(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Returns array of map items that will be shown on the map when this catalog item is
   * added to the workbench.
   */
  @computed
  get mapItems(): MapItem[] {
    const cesium = this.terria.cesium;
    if (cesium) {
      // In 3d mode. Create a box drawing if not already created.
      if (!this.boxDrawing) {
        this.boxDrawing = BoxDrawing.fromTranslationRotationScale(
          cesium,
          this.translationRotationScale,
          {
            keepBoxAboveGround: true,
            onChange: ({ translationRotationScale }) => {
              this.setTraitsFromTranslationRotationScale(
                translationRotationScale
              );
            }
          }
        );
      }
    } else {
      // In 2d mode. Destroy the box drawing.
      this.boxDrawing = undefined;
    }

    if (this.boxDrawing) {
      // Copy any trs updates on item to the boxDrawing
      this.boxDrawing.setTranslationRotationScale(
        this.translationRotationScale
      );

      // Show the cesium datasource only if the catalog item is shown.
      this.boxDrawing.dataSource.show = this.show;
      return [this.boxDrawing.dataSource];
    } else {
      return [];
    }
  }

  /**
   * By definiing `viewingControls` a catalog item can extend its viewing control menu.
   * This is 3-dot menu of a catalog item in the workbench.
   *
   * Another way to extend the viewing controls menu is using
   * the `{@link ViewingControlsMenu.addMenuOption} function.
   */
  @computed
  get viewingControls(): ViewingControl[] {
    return [
      {
        id: "edit-box-transform",
        name: "Edit box",
        icon: {
          glyph: Icon.GLYPHS.cube
        },
        onClick: (viewState: ViewState) => {
          runWorkflow(viewState, new EditBoxTransformWorkflow(this));
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
    this.setTraitsFromTranslationRotationScale(trs);
  }

  @action
  private setTraitsFromTranslationRotationScale(trs: TranslationRotationScale) {
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

  @computed
  get translationRotationScale(): TranslationRotationScale {
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
}

/**
 * Register this catalog item so that Terria can correctly initialize it from
 * a catalog json configuration file.
 */
CatalogMemberFactory.register(
  BoxDrawingCatalogItem.type,
  BoxDrawingCatalogItem
);

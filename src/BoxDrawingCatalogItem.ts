import { computed } from "mobx";
import {
  Cartesian3,
  Cartographic,
  Matrix4,
  Rectangle,
  Transforms
} from "terriajs-cesium";
import {
  BoxDrawing,
  CatalogMemberMixin,
  CommonStrata,
  CreateModel,
  MapItem,
  MappableMixin,
  CatalogMemberFactory
} from "terriajs-plugin-api";
import BoxDrawingCatalogItemTraits from "./Traits/BoxDrawingCatalogItemTraits";

/**
 * A simple catalog item that shows a transformable 3D box on the map.
 *
 * The box is configured by setting its transformatioMatrix trait value.
 * When adding this catlog item to the workbench, terria will
 * first call `forceLoadMapItems` which is a noop in this case.
 * Then terria queries `mapItems` to get an array of all items to show on the map.
 *
 * Notice how we use the mobx reactive pattern by "computing" values for `mapItems`
 * and other bits of data. This ensures that if any trait value or other observable
 * objects the catalog item depends on change (eg terria.cesium), then the change is propogated
 * throughout the system which re-computes the value of `mapItem`.
 */
export default class BoxDrawingCatalogItem extends CatalogMemberMixin(
  MappableMixin(CreateModel(BoxDrawingCatalogItemTraits))
) {
  /**
   * Type must be a unique identifier. It is used when loading catalog json to map the
   * configuration for an item to its class.
   */
  static readonly type = "box-drawing";
  readonly type = BoxDrawingCatalogItem.type;

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
    const boxDrawingDataSource = this.boxDrawing?.dataSource;
    if (boxDrawingDataSource) {
      boxDrawingDataSource.show = this.show;
      return [boxDrawingDataSource];
    } else {
      return [];
    }
  }

  /**
   * Returns a BoxDrawing object or undefined if the trait value for transformMatrix is not set.
   */
  @computed
  get boxDrawing(): BoxDrawing | undefined {
    const cesium = this.terria.cesium;
    const transformationMatrix = this.cesiumTransformationMatrix;
    if (cesium !== undefined && transformationMatrix !== undefined) {
      const boxDrawing = new BoxDrawing(cesium, transformationMatrix, {
        keepBoxAboveGround: true
      });
      return boxDrawing;
    }
  }

  /**
   * Returns a Matrix4 object for the transformationMatrix trait value.
   */
  @computed
  get cesiumTransformationMatrix(): Matrix4 | undefined {
    const transformationMatrix = this.transformationMatrix;
    if (transformationMatrix === undefined) {
      return;
    }

    return Matrix4.fromArray([...transformationMatrix]);
  }

  /**
   * Sets the transformationMatrix from a rectangle on the globe surface.
   */
  setBoxTransformationFromRectangle(rectangle: Rectangle) {
    const center = Cartographic.toCartesian(Rectangle.center(rectangle));

    // Compute scale matrix from length, width, height
    const topLeft = Cartesian3.fromRadians(rectangle.west, rectangle.north);
    const bottomLeft = Cartesian3.fromRadians(rectangle.west, rectangle.south);
    const topRight = Cartesian3.fromRadians(rectangle.east, rectangle.north);
    const length = Cartesian3.distance(topLeft, bottomLeft);
    const width = Cartesian3.distance(topLeft, topRight);
    const scale = new Cartesian3(width, length, Math.min(width, length));
    const scaleMatrix = Matrix4.fromScale(scale);

    // Create a transform to position the 3d box on the globe with scale
    // matching the user drawn rectangle.
    const transform = Transforms.eastNorthUpToFixedFrame(center);
    Matrix4.multiply(transform, scaleMatrix, transform);

    this.setTrait(
      CommonStrata.user,
      "transformationMatrix",
      Matrix4.toArray(transform)
    );
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

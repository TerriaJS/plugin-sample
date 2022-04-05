import Cartesian3 from "terriajs-cesium/Source/Core/Cartesian3";
import {
  CatalogMemberTraits,
  HeadingPitchRollTraits,
  LatLonHeightTraits,
  MappableTraits,
  mixTraits,
  Model,
  ModelTraits,
  objectTrait,
  primitiveTrait,
  updateModelFromJson
} from "terriajs-plugin-api";

export class DimensionsTraits extends ModelTraits {
  @primitiveTrait({
    type: "number",
    name: "Length",
    description: "Length in meters"
  })
  length?: number;

  @primitiveTrait({
    type: "number",
    name: "Width",
    description: "Width in meters"
  })
  width?: number;

  @primitiveTrait({
    type: "number",
    name: "Height",
    description: "Height in metres"
  })
  height?: number;

  static setFromCartesianScale(
    model: Model<DimensionsTraits>,
    stratumId: string,
    scale: Cartesian3
  ) {
    updateModelFromJson(model, stratumId, {
      width: scale.x,
      length: scale.y,
      height: scale.z
    });
  }
}

export default class BoxDrawingCatalogItemTraits extends mixTraits(
  MappableTraits,
  CatalogMemberTraits
) {
  @objectTrait({
    type: LatLonHeightTraits,
    name: "Origin",
    description:
      "The position of the box expressed as a longitude and latitude in degrees and a height above terrain in meters."
  })
  position?: LatLonHeightTraits;

  @objectTrait({
    type: HeadingPitchRollTraits,
    name: "Rotation",
    description:
      "The rotation of the model expressed as heading, pitch and roll in the local frame of reference."
  })
  rotation?: HeadingPitchRollTraits;

  @objectTrait({
    type: DimensionsTraits,
    name: "Dimensions",
    description:
      "The dimensions of the box expressed as lengt, width and height in meters."
  })
  dimensions?: DimensionsTraits;
}

import { ModelTraits, primitiveTrait } from "terriajs-plugin-api";

export default class BoxDimensionsTraits extends ModelTraits {
  @primitiveTrait({
    type: "number",
    name: "Length",
    description: "Length of the box"
  })
  length?: number;

  @primitiveTrait({
    type: "number",
    name: "Width",
    description: "Width of the box"
  })
  width?: number;

  @primitiveTrait({
    type: "number",
    name: "Height",
    description: "Height of the box"
  })
  height?: number;
}

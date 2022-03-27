import {
  CatalogMemberTraits,
  MappableTraits,
  mixTraits,
  primitiveArrayTrait
} from "terriajs-plugin-api";

export default class BoxDrawingCatalogItemTraits extends mixTraits(
  MappableTraits,
  CatalogMemberTraits
) {
  @primitiveArrayTrait({
    name: "Transformation matrix",
    description: "Transformation matrix that positions the box on the globe.",
    type: "number"
  })
  transformationMatrix?: number[];
}

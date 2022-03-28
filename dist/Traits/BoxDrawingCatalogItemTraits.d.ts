import { CatalogMemberTraits, MappableTraits } from "terriajs-plugin-api";
declare const BoxDrawingCatalogItemTraits_base: import("terriajs/lib/Traits/TraitsConstructor").default<MappableTraits & CatalogMemberTraits & import("terriajs/lib/Traits/ModelTraits").default>;
export default class BoxDrawingCatalogItemTraits extends BoxDrawingCatalogItemTraits_base {
    transformationMatrix?: number[];
}
export {};

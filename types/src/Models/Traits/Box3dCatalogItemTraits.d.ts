import Cartesian3 from "terriajs-cesium/Source/Core/Cartesian3";
import { CatalogMemberTraits, HeadingPitchRollTraits, LatLonHeightTraits, MappableTraits, Model, ModelTraits } from "terriajs-plugin-api";
export declare class DimensionsTraits extends ModelTraits {
    length?: number;
    width?: number;
    height?: number;
    static setFromCartesianScale(model: Model<DimensionsTraits>, stratumId: string, scale: Cartesian3): void;
}
declare const Box3dCatalogItemTraits_base: import("terriajs/lib/Traits/TraitsConstructor").default<MappableTraits & CatalogMemberTraits & ModelTraits>;
export default class Box3dCatalogItemTraits extends Box3dCatalogItemTraits_base {
    position?: LatLonHeightTraits;
    rotation?: HeadingPitchRollTraits;
    dimensions?: DimensionsTraits;
}
export {};

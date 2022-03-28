/// <reference types="react" />
import { Matrix4, Rectangle } from "terriajs-cesium";
import { BoxDrawing, MapItem } from "terriajs-plugin-api";
import BoxDrawingCatalogItemTraits from "./Traits/BoxDrawingCatalogItemTraits";
declare const BoxDrawingCatalogItem_base: {
    new (...args: any[]): {
        readonly type: string;
        _sourceInfoItemNames: string[] | undefined;
        readonly typeName: string | undefined;
        _metadataLoader: import("terriajs/lib/Core/AsyncLoader").default;
        readonly loadMetadataResult: import("terriajs/lib/Core/Result").default<void> | undefined;
        readonly isLoadingMetadata: boolean;
        readonly isLoading: boolean;
        loadMetadata(): Promise<import("terriajs/lib/Core/Result").default<void>>;
        forceLoadMetadata(): Promise<void>;
        readonly hasCatalogMemberMixin: boolean;
        readonly inWorkbench: boolean;
        readonly name: string | undefined;
        readonly nameInCatalog: string | undefined;
        readonly nameSortKey: import("react").ReactText[];
        readonly hasDescription: boolean;
        readonly infoAsObject: any;
        readonly infoWithoutSources: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/CatalogMemberTraits").InfoSectionTraits>[];
        readonly selectableDimensions: import("terriajs/lib/Models/SelectableDimensions").SelectableDimension[];
        dispose(): void;
        _accessType: string | undefined;
        readonly hasAccessControlMixin: boolean;
        readonly accessType: string;
        setAccessType(accessType: string): void;
        readonly isPublic: boolean;
        readonly isPrivate: boolean;
        readonly traits: {
            [id: string]: import("terriajs/lib/Traits/Trait").default;
        };
        readonly TraitsClass: import("terriajs/lib/Traits/TraitsConstructor").default<import("terriajs/lib/Traits/ModelTraits").default> & import("terriajs/lib/Traits/TraitsConstructor").default<import("terriajs-plugin-api").CatalogMemberTraits>;
        readonly strata: Map<string, import("terriajs/lib/Core/TypeModifiers").Complete<{}>> & Map<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            name?: string | undefined;
            description?: string | undefined;
            nameInCatalog?: string | undefined;
            info: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | null | undefined;
                contentAsObject?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                show?: boolean | undefined;
            }>[] | undefined;
            infoSectionOrder?: string[] | undefined;
            isOpenInWorkbench: boolean | undefined;
            shortReport?: string | undefined;
            shortReportSections?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | undefined;
                show: boolean | undefined;
            }>[] | undefined;
            isExperiencingIssues: boolean | undefined;
            hideSource: boolean | undefined;
            metadataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                type?: "none" | "wfs" | "wcs" | "wfs-complete" | "wcs-complete" | "direct" | undefined;
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataCustodian?: string | undefined;
            modelDimensions?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                id?: string | undefined;
                name?: string | undefined;
                options?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    id?: string | undefined;
                    name?: string | undefined;
                    value?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                }>[] | undefined;
                selectedId?: string | undefined;
                allowUndefined?: boolean | undefined;
                disable?: boolean | undefined;
            }>[] | undefined;
            disableAboutData: boolean | undefined;
        }>>;
        readonly terria: import("terriajs-plugin-api").Terria;
        readonly uniqueId: string | undefined;
        readonly knownContainerUniqueIds: string[];
        readonly sourceReference: import("terriajs/lib/Models/Definition/Model").BaseModel | undefined;
        readonly strataTopToBottom: ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{}>> & ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            name?: string | undefined;
            description?: string | undefined;
            nameInCatalog?: string | undefined;
            info: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | null | undefined;
                contentAsObject?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                show?: boolean | undefined;
            }>[] | undefined;
            infoSectionOrder?: string[] | undefined;
            isOpenInWorkbench: boolean | undefined;
            shortReport?: string | undefined;
            shortReportSections?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | undefined;
                show: boolean | undefined;
            }>[] | undefined;
            isExperiencingIssues: boolean | undefined;
            hideSource: boolean | undefined;
            metadataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                type?: "none" | "wfs" | "wcs" | "wfs-complete" | "wcs-complete" | "direct" | undefined;
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataCustodian?: string | undefined;
            modelDimensions?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                id?: string | undefined;
                name?: string | undefined;
                options?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    id?: string | undefined;
                    name?: string | undefined;
                    value?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                }>[] | undefined;
                selectedId?: string | undefined;
                allowUndefined?: boolean | undefined;
                disable?: boolean | undefined;
            }>[] | undefined;
            disableAboutData: boolean | undefined;
        }>>;
        readonly strataBottomToTop: ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{}>> & ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            name?: string | undefined;
            description?: string | undefined;
            nameInCatalog?: string | undefined;
            info: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | null | undefined;
                contentAsObject?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                show?: boolean | undefined;
            }>[] | undefined;
            infoSectionOrder?: string[] | undefined;
            isOpenInWorkbench: boolean | undefined;
            shortReport?: string | undefined;
            shortReportSections?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | undefined;
                show: boolean | undefined;
            }>[] | undefined;
            isExperiencingIssues: boolean | undefined;
            hideSource: boolean | undefined;
            metadataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                type?: "none" | "wfs" | "wcs" | "wfs-complete" | "wcs-complete" | "direct" | undefined;
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataCustodian?: string | undefined;
            modelDimensions?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                id?: string | undefined;
                name?: string | undefined;
                options?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    id?: string | undefined;
                    name?: string | undefined;
                    value?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                }>[] | undefined;
                selectedId?: string | undefined;
                allowUndefined?: boolean | undefined;
                disable?: boolean | undefined;
            }>[] | undefined;
            disableAboutData: boolean | undefined;
        }>>;
        duplicateModel: ((newId: string, sourceReference?: import("terriajs/lib/Models/Definition/Model").BaseModel | undefined) => any) & ((newId: string, sourceReference?: import("terriajs/lib/Models/Definition/Model").BaseModel | undefined) => any);
        setTrait: (<Key extends never>(stratumId: string, trait: Key, value: import("terriajs/lib/Core/TypeModifiers").Complete<{}>[Key]) => void) & (<Key_1 extends "description" | "name" | "isOpenInWorkbench" | "dataCustodian" | "nameInCatalog" | "info" | "infoSectionOrder" | "shortReport" | "shortReportSections" | "isExperiencingIssues" | "hideSource" | "metadataUrls" | "dataUrls" | "modelDimensions" | "disableAboutData">(stratumId: string, trait: Key_1, value: import("terriajs/lib/Core/TypeModifiers").Complete<{
            name?: string | undefined;
            description?: string | undefined;
            nameInCatalog?: string | undefined;
            info: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | null | undefined;
                contentAsObject?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                show?: boolean | undefined;
            }>[] | undefined;
            infoSectionOrder?: string[] | undefined;
            isOpenInWorkbench: boolean | undefined;
            shortReport?: string | undefined;
            shortReportSections?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | undefined;
                show: boolean | undefined;
            }>[] | undefined;
            isExperiencingIssues: boolean | undefined;
            hideSource: boolean | undefined;
            metadataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                type?: "none" | "wfs" | "wcs" | "wfs-complete" | "wcs-complete" | "direct" | undefined;
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataCustodian?: string | undefined;
            modelDimensions?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                id?: string | undefined;
                name?: string | undefined;
                options?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    id?: string | undefined;
                    name?: string | undefined;
                    value?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                }>[] | undefined;
                selectedId?: string | undefined;
                allowUndefined?: boolean | undefined;
                disable?: boolean | undefined;
            }>[] | undefined;
            disableAboutData: boolean | undefined;
        }>[Key_1]) => void);
        getTrait: (<Key_2 extends never>(stratumId: string, trait: Key_2) => import("terriajs/lib/Core/TypeModifiers").Complete<{}>[Key_2]) & (<Key_3 extends "description" | "name" | "isOpenInWorkbench" | "dataCustodian" | "nameInCatalog" | "info" | "infoSectionOrder" | "shortReport" | "shortReportSections" | "isExperiencingIssues" | "hideSource" | "metadataUrls" | "dataUrls" | "modelDimensions" | "disableAboutData">(stratumId: string, trait: Key_3) => import("terriajs/lib/Core/TypeModifiers").Complete<{
            name?: string | undefined;
            description?: string | undefined;
            nameInCatalog?: string | undefined;
            info: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | null | undefined;
                contentAsObject?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                show?: boolean | undefined;
            }>[] | undefined;
            infoSectionOrder?: string[] | undefined;
            isOpenInWorkbench: boolean | undefined;
            shortReport?: string | undefined;
            shortReportSections?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                name?: string | undefined;
                content?: string | undefined;
                show: boolean | undefined;
            }>[] | undefined;
            isExperiencingIssues: boolean | undefined;
            hideSource: boolean | undefined;
            metadataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataUrls?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                type?: "none" | "wfs" | "wcs" | "wfs-complete" | "wcs-complete" | "direct" | undefined;
                url?: string | undefined;
                title?: string | undefined;
            }>[] | undefined;
            dataCustodian?: string | undefined;
            modelDimensions?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                id?: string | undefined;
                name?: string | undefined;
                options?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    id?: string | undefined;
                    name?: string | undefined;
                    value?: import("terriajs/lib/Core/Json").JsonObject | undefined;
                }>[] | undefined;
                selectedId?: string | undefined;
                allowUndefined?: boolean | undefined;
                disable?: boolean | undefined;
            }>[] | undefined;
            disableAboutData: boolean | undefined;
        }>[Key_3]);
        addObject: (<Key_4 extends never>(stratumId: string, trait: Key_4, objectId: string) => import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Models/Definition/Model").ArrayElementTypes<import("terriajs/lib/Traits/ModelTraits").default>[Key_4]> | undefined) & (<Key_5 extends "description" | "name" | "isOpenInWorkbench" | "dataCustodian" | "nameInCatalog" | "info" | "infoSectionOrder" | "shortReport" | "shortReportSections" | "isExperiencingIssues" | "hideSource" | "metadataUrls" | "dataUrls" | "modelDimensions" | "disableAboutData">(stratumId: string, trait: Key_5, objectId: string) => import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Models/Definition/Model").ArrayElementTypes<import("terriajs-plugin-api").CatalogMemberTraits>[Key_5]> | undefined);
        readonly description: string | undefined;
        readonly info: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/CatalogMemberTraits").InfoSectionTraits>[];
        readonly infoSectionOrder: readonly string[];
        readonly isOpenInWorkbench: boolean;
        readonly shortReport: string | undefined;
        readonly shortReportSections: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/CatalogMemberTraits").ShortReportTraits>[];
        readonly isExperiencingIssues: boolean;
        readonly hideSource: boolean;
        readonly metadataUrls: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/CatalogMemberTraits").MetadataUrlTraits>[];
        readonly dataUrls: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/CatalogMemberTraits").DataUrlTraits>[];
        readonly dataCustodian: string | undefined;
        readonly modelDimensions: readonly import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/DimensionTraits").default>[];
        readonly disableAboutData: boolean;
    };
} & {
    new (...args: any[]): {
        initialMessageShown: boolean;
        readonly isMappable: boolean;
        readonly cesiumRectangle: Rectangle | undefined;
        readonly shouldShowInitialMessage: boolean;
        _mapItemsLoader: import("terriajs/lib/Core/AsyncLoader").default;
        readonly loadMapItemsResult: import("terriajs/lib/Core/Result").default<void> | undefined;
        readonly isLoadingMapItems: boolean;
        loadMapItems(force?: boolean | undefined): Promise<import("terriajs/lib/Core/Result").default<void>>;
        forceLoadMapItems(): Promise<void>;
        readonly mapItems: MapItem[];
        showInitialMessage(): Promise<void>;
        dispose(): void;
        readonly type: string;
        readonly traits: {
            [id: string]: import("terriajs/lib/Traits/Trait").default;
        };
        readonly TraitsClass: import("terriajs/lib/Traits/TraitsConstructor").default<import("terriajs-plugin-api").MappableTraits>;
        readonly strata: Map<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            rectangle?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                west?: number | undefined;
                south?: number | undefined;
                east?: number | undefined;
                north?: number | undefined;
            }> | undefined;
            idealZoom?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                lookAt?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    targetLongitude?: number | undefined;
                    targetLatitude?: number | undefined;
                    targetHeight?: number | undefined;
                    heading?: number | undefined;
                    pitch?: number | undefined;
                    range?: number | undefined;
                }> | undefined;
                camera?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    position?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    direction?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    up?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    west?: number | undefined;
                    south?: number | undefined;
                    east?: number | undefined;
                    north?: number | undefined;
                }> | undefined;
            }> | undefined;
            disablePreview: boolean | undefined;
            disableZoomTo: boolean | undefined;
            zoomOnAddToWorkbench: boolean | undefined;
            show: boolean | undefined;
            initialMessage?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                title?: string | undefined;
                content?: string | undefined;
                key?: string | undefined;
                confirmation?: boolean | undefined;
                confirmText?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }> | undefined;
            attribution?: string | undefined;
        }>>;
        readonly terria: import("terriajs-plugin-api").Terria;
        readonly uniqueId: string | undefined;
        readonly knownContainerUniqueIds: string[];
        readonly sourceReference: import("terriajs/lib/Models/Definition/Model").BaseModel | undefined;
        readonly strataTopToBottom: ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            rectangle?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                west?: number | undefined;
                south?: number | undefined;
                east?: number | undefined;
                north?: number | undefined;
            }> | undefined;
            idealZoom?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                lookAt?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    targetLongitude?: number | undefined;
                    targetLatitude?: number | undefined;
                    targetHeight?: number | undefined;
                    heading?: number | undefined;
                    pitch?: number | undefined;
                    range?: number | undefined;
                }> | undefined;
                camera?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    position?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    direction?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    up?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    west?: number | undefined;
                    south?: number | undefined;
                    east?: number | undefined;
                    north?: number | undefined;
                }> | undefined;
            }> | undefined;
            disablePreview: boolean | undefined;
            disableZoomTo: boolean | undefined;
            zoomOnAddToWorkbench: boolean | undefined;
            show: boolean | undefined;
            initialMessage?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                title?: string | undefined;
                content?: string | undefined;
                key?: string | undefined;
                confirmation?: boolean | undefined;
                confirmText?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }> | undefined;
            attribution?: string | undefined;
        }>>;
        readonly strataBottomToTop: ReadonlyMap<string, import("terriajs/lib/Core/TypeModifiers").Complete<{
            rectangle?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                west?: number | undefined;
                south?: number | undefined;
                east?: number | undefined;
                north?: number | undefined;
            }> | undefined;
            idealZoom?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                lookAt?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    targetLongitude?: number | undefined;
                    targetLatitude?: number | undefined;
                    targetHeight?: number | undefined;
                    heading?: number | undefined;
                    pitch?: number | undefined;
                    range?: number | undefined;
                }> | undefined;
                camera?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    position?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    direction?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    up?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    west?: number | undefined;
                    south?: number | undefined;
                    east?: number | undefined;
                    north?: number | undefined;
                }> | undefined;
            }> | undefined;
            disablePreview: boolean | undefined;
            disableZoomTo: boolean | undefined;
            zoomOnAddToWorkbench: boolean | undefined;
            show: boolean | undefined;
            initialMessage?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                title?: string | undefined;
                content?: string | undefined;
                key?: string | undefined;
                confirmation?: boolean | undefined;
                confirmText?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }> | undefined;
            attribution?: string | undefined;
        }>>;
        duplicateModel(newId: string, sourceReference?: import("terriajs/lib/Models/Definition/Model").BaseModel | undefined): any;
        setTrait<Key_6 extends "show" | "rectangle" | "attribution" | "idealZoom" | "disablePreview" | "disableZoomTo" | "zoomOnAddToWorkbench" | "initialMessage">(stratumId: string, trait: Key_6, value: import("terriajs/lib/Core/TypeModifiers").Complete<{
            rectangle?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                west?: number | undefined;
                south?: number | undefined;
                east?: number | undefined;
                north?: number | undefined;
            }> | undefined;
            idealZoom?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                lookAt?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    targetLongitude?: number | undefined;
                    targetLatitude?: number | undefined;
                    targetHeight?: number | undefined;
                    heading?: number | undefined;
                    pitch?: number | undefined;
                    range?: number | undefined;
                }> | undefined;
                camera?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    position?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    direction?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    up?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    west?: number | undefined;
                    south?: number | undefined;
                    east?: number | undefined;
                    north?: number | undefined;
                }> | undefined;
            }> | undefined;
            disablePreview: boolean | undefined;
            disableZoomTo: boolean | undefined;
            zoomOnAddToWorkbench: boolean | undefined;
            show: boolean | undefined;
            initialMessage?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                title?: string | undefined;
                content?: string | undefined;
                key?: string | undefined;
                confirmation?: boolean | undefined;
                confirmText?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }> | undefined;
            attribution?: string | undefined;
        }>[Key_6]): void;
        getTrait<Key_7 extends "show" | "rectangle" | "attribution" | "idealZoom" | "disablePreview" | "disableZoomTo" | "zoomOnAddToWorkbench" | "initialMessage">(stratumId: string, trait: Key_7): import("terriajs/lib/Core/TypeModifiers").Complete<{
            rectangle?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                west?: number | undefined;
                south?: number | undefined;
                east?: number | undefined;
                north?: number | undefined;
            }> | undefined;
            idealZoom?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                lookAt?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    targetLongitude?: number | undefined;
                    targetLatitude?: number | undefined;
                    targetHeight?: number | undefined;
                    heading?: number | undefined;
                    pitch?: number | undefined;
                    range?: number | undefined;
                }> | undefined;
                camera?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                    position?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    direction?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    up?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                        x?: number | undefined;
                        y?: number | undefined;
                        z?: number | undefined;
                    }> | undefined;
                    west?: number | undefined;
                    south?: number | undefined;
                    east?: number | undefined;
                    north?: number | undefined;
                }> | undefined;
            }> | undefined;
            disablePreview: boolean | undefined;
            disableZoomTo: boolean | undefined;
            zoomOnAddToWorkbench: boolean | undefined;
            show: boolean | undefined;
            initialMessage?: import("terriajs/lib/Core/TypeModifiers").Complete<{
                title?: string | undefined;
                content?: string | undefined;
                key?: string | undefined;
                confirmation?: boolean | undefined;
                confirmText?: string | undefined;
                width?: number | undefined;
                height?: number | undefined;
            }> | undefined;
            attribution?: string | undefined;
        }>[Key_7];
        addObject<Key_8 extends "show" | "rectangle" | "attribution" | "idealZoom" | "disablePreview" | "disableZoomTo" | "zoomOnAddToWorkbench" | "initialMessage">(stratumId: string, trait: Key_8, objectId: string): import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Models/Definition/Model").ArrayElementTypes<import("terriajs-plugin-api").MappableTraits>[Key_8]> | undefined;
        readonly rectangle: import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/MappableTraits").RectangleTraits>;
        readonly idealZoom: import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/MappableTraits").IdealZoomTraits>;
        readonly disablePreview: boolean;
        readonly disableZoomTo: boolean;
        readonly zoomOnAddToWorkbench: boolean;
        readonly show: boolean;
        readonly initialMessage: import("terriajs/lib/Models/Definition/Model").default<import("terriajs/lib/Traits/TraitsClasses/MappableTraits").InitialMessageTraits>;
        readonly attribution: string | undefined;
    };
} & import("terriajs/lib/Models/Definition/Model").ModelConstructor<import("terriajs/lib/Models/Definition/Model").default<BoxDrawingCatalogItemTraits>>;
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
export default class BoxDrawingCatalogItem extends BoxDrawingCatalogItem_base {
    /**
     * Type must be a unique identifier. It is used when loading catalog json to map the
     * configuration for an item to its class.
     */
    static readonly type = "box-drawing";
    readonly type = "box-drawing";
    /**
     * A catalog item lifecycle method which will be called
     * when the item is added to the workbench and just before the call to `mapItems`.
     * If the catalog item requires loading data over the network to generate its `mapItems`
     * then this is the right place to do it. For this catalog item it is a noop.
     */
    forceLoadMapItems(): Promise<void>;
    /**
     * Returns array of map items that will be shown on the map when this catalog item is
     * added to the workbench.
     */
    get mapItems(): MapItem[];
    /**
     * Returns a BoxDrawing object or undefined if the trait value for transformMatrix is not set.
     */
    get boxDrawing(): BoxDrawing | undefined;
    /**
     * Returns a Matrix4 object for the transformationMatrix trait value.
     */
    get cesiumTransformationMatrix(): Matrix4 | undefined;
    /**
     * Sets the transformationMatrix from a rectangle on the globe surface.
     */
    setBoxTransformationFromRectangle(rectangle: Rectangle): void;
}
export {};

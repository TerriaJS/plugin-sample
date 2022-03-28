import { Rectangle } from "terriajs-cesium";
import { MapNavigationItemController, Terria, UserDrawing, ViewerMode } from "terriajs-plugin-api";
import BoxDrawingCatalogItem from "./BoxDrawingCatalogItem";
/**
 * A map navigation item that triggers a workflow for creating a 3d box by
 * letting the user draw a rectangle on the map.
 */
export default class DrawBoxController extends MapNavigationItemController {
    readonly terria: Terria;
    /**
     * The icon to use for this map nav button
     */
    glyph: any;
    /**
     * Show the button only in 3d mode.
     */
    viewerMode: ViewerMode;
    /**
     * A map interaction mode that allows the user to draw shapes on the map.
     */
    readonly userDrawing: UserDrawing;
    constructor(terria: Terria);
    /**
     * Start draw mode when the map nav button is clicked.
     */
    activate(): void;
    /**
     * End draw mode when the map nav button is clicked.
     */
    deactivate(): void;
    /**
     * Create a transformable 3d box catalog item.
     */
    create3dBox(rectangle: Rectangle): BoxDrawingCatalogItem;
}

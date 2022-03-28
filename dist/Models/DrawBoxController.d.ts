import { MapNavigationItemController, ViewerMode, UserDrawing, Terria } from "terriajs-plugin-api";
import { Rectangle } from "terriajs-cesium";
export default class DrawBoxController extends MapNavigationItemController {
    readonly terria: Terria;
    glyph: any;
    viewerMode: ViewerMode;
    readonly userDrawing: UserDrawing;
    constructor(terria: Terria);
    create3dBox(rectangle: Rectangle): void;
    activate(): void;
    deactivate(): void;
}

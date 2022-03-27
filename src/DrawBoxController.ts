import { createGuid, Rectangle } from "terriajs-cesium";
import {
  CommonStrata,
  Icon,
  MapNavigationItemController,
  Terria,
  UserDrawing,
  ViewerMode
} from "terriajs-plugin-api";
import BoxDrawingCatalogItem from "./BoxDrawingCatalogItem";

/**
 * A map navigation item that triggers a workflow for creating a 3d box by
 * letting the user draw a rectangle on the map.
 */
export default class DrawBoxController extends MapNavigationItemController {
  /**
   * The icon to use for this map nav button
   */
  glyph = Icon.GLYPHS.cube;

  /**
   * Show the button only in 3d mode.
   */
  viewerMode = ViewerMode.Cesium;

  /**
   * A map interaction mode that allows the user to draw shapes on the map.
   */
  readonly userDrawing: UserDrawing;

  constructor(readonly terria: Terria) {
    super();
    this.userDrawing = new UserDrawing({
      terria,
      messageHeader: "Click two points to draw a 3D box",
      drawRectangle: true,
      onDrawingComplete: ({ rectangle }) => {
        if (rectangle) {
          const boxDrawing = this.create3dBox(rectangle);
          // Add the model to terria. This is required for the model to be
          // shareable i.e for the model to be serialized as part of the share
          // URL.
          this.terria.addModel(boxDrawing);
          // Add the model to workbench
          this.terria.workbench.add(boxDrawing);
        }
        // Deactivate map nav item once we have added the boxDrawing to the workbench.
        this.deactivate();
      }
    });
  }

  /**
   * Start draw mode when the map nav button is clicked.
   */
  activate() {
    this.userDrawing.enterDrawMode();
    super.activate();
  }

  /**
   * End draw mode when the map nav button is clicked.
   */
  deactivate() {
    this.userDrawing.endDrawing();
    super.deactivate();
  }

  /**
   * Create a transformable 3d box catalog item.
   */
  create3dBox(rectangle: Rectangle): BoxDrawingCatalogItem {
    const boxDrawing = new BoxDrawingCatalogItem(createGuid(), this.terria);
    boxDrawing.setBoxTransformationFromRectangle(rectangle);
    boxDrawing.setTrait(CommonStrata.user, "name", "Box");
    return boxDrawing;
  }
}

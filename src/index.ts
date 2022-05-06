import createGuid from "terriajs-cesium/Source/Core/createGuid";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import {
  CommonStrata,
  Icon,
  MapToolbar,
  Terria,
  TerriaPlugin,
  TerriaPluginContext,
  UserDrawing,
  Workbench
} from "terriajs-plugin-api";
import BoxDrawingCatalogItem from "./BoxDrawingCatalogItem";
import TestTool from "./TestTool";

const plugin: TerriaPlugin = {
  name: "Sample plugin",
  description: "A sample terria plugin that adds a tool for drawing a 3d box.",
  version: "0.0.1",
  register({ viewState, terria, workbench }: TerriaPluginContext) {
    let userDrawing: UserDrawing | undefined;
    const drawModeButton = MapToolbar.addModeButton(viewState, {
      icon: Icon.GLYPHS.cube,
      text: "Draw a 3D box",
      onUserEnterMode: () => {
        // userDrawing = createUserRectangleDrawing(terria, rectangle => {
        //   create3dBoxItemFromRectangle(terria, workbench, rectangle);
        //   drawModeButton.closeMode();
        // });
        // userDrawing.enterDrawMode();
        viewState.openTool({
          toolName: "My Tool",
          getToolComponent: () => TestTool,
          showCloseButton: false
        });
      },
      onUserCloseMode: () => {
        userDrawing?.endDrawing();
      }
    });
  }
};

function createUserRectangleDrawing(
  terria: Terria,
  onRectangleComplete: (rectangle: Rectangle) => void
): UserDrawing {
  // UserDrawing is a map interaction mode that allows the user
  // to draw lines, polygons or a rectangle on the map.
  // Here we restrict the drawing to a rectangle.
  // Once the drawing is complete, we receive a callback with the rectangle.
  const userDrawing = new UserDrawing({
    terria,
    messageHeader: "Click two points to draw a 3D box",
    drawRectangle: true,
    onDrawingComplete: ({ rectangle }) => {
      if (rectangle) onRectangleComplete(rectangle);
    }
  });

  return userDrawing;
}

function create3dBoxItemFromRectangle(
  terria: Terria,
  workbench: Workbench,
  rectangle: Rectangle
) {
  // Create an instance of our `BoxDrawingCatalogItem`.
  const boxDrawingItem = new BoxDrawingCatalogItem(createGuid(), terria);
  // There are a bunch of concepts to understand here.
  // 1. What does `setTrait` do?
  //   Traits are serializable properties of a model. They are set using the `setTrait` method.
  //   Here we set the `name` trait for the model.
  //   The first parameter `CommonStrata.user` is the "stratum" on which to set the trait value.
  //   In terria the value of a trait can originate from different sources, the server, the catalog configuration file,
  //   or user changes. Values from each of these origins are recorded separately in what is called a "stratum".
  //   Each stratum has a priority and the visible value of a trait is its value in the highest priority stratum.
  //   The "user" stratum has the highest priority. If a value is not defined in the user stratum, then it is checked in the lower strata until
  //   we hit a value or otherwise return `undefined`.
  //   Here we set the property on the `user` stratum as the change was made by a user action.
  boxDrawingItem.setTrait(CommonStrata.user, "name", `3D box`);

  // Later, if we want to access the trait value we just use `boxDrawingItem.name`

  boxDrawingItem.positionBoxFromRectangle(rectangle);

  // 2. What does `addModel` do?
  //   `addModel` registers the model with Terria. This is important for the model to become part of various lifecycle methods.
  //   eg: When a user creates a share link, the model will be part of the share link only if it is added to Terria.
  terria.addModel(boxDrawingItem);

  // 3. Adding to workbench
  //    Workbench is the side panel from which the user can further configure the model.
  workbench.add(boxDrawingItem);
}

export default plugin;

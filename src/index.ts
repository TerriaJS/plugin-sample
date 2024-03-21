import cubeIcon from "assets/icons/cube.svg";
import {
  CatalogMemberFactory,
  MapToolbar,
  TerriaPlugin,
  TerriaPluginContext
} from "terriajs-plugin-api";
import Box3dCatalogItem from "./Models/Box3dCatalogItem";

export const toolId = "3d-box-tool";

const plugin: TerriaPlugin = {
  name: "Sample plugin",
  description:
    "A sample plugin that provides a tool for drawing a 3D Box and viewing its measurements.",
  version: "0.0.1",
  register({ viewState }: TerriaPluginContext) {
    // Register our custom catalog item with Terria
    CatalogMemberFactory.register(Box3dCatalogItem.type, Box3dCatalogItem);

    // Add a new tool to the map toolbar (on the right) for drawing a 3D box on the map.
    MapToolbar.addTool(viewState, {
      id: toolId,
      name: "Sample plugin",
      // The main react component for the tool
      toolComponentLoader: () => import("./Views/Main"),
      toolButton: {
        text: "Draw a 3D box",
        icon: cubeIcon
      },
      // Show this button only when the map is in 3D mode
      viewerMode: MapToolbar.ViewerMode.Cesium
    });
  }
};

export default plugin;

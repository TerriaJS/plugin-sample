import { TerriaPlugin, TerriaPluginContext } from "terriajs-plugin-api";
import { addMapButton } from "./addMapButton";

const plugin: TerriaPlugin = {
  name: "Sample plugin",
  description: "A sample terria plugin that adds a tool for drawing a 3d box.",
  version: "0.0.1",
  register({ viewState }: TerriaPluginContext) {
    addMapButton(viewState.terria);
  }
};

export default plugin;

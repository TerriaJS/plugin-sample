import { Terria } from "terriajs-plugin-api";
import DrawBoxController from "./DrawBoxController";

/**
 * Add a map nav button for activating/deactivating the plugin workflow.
 */
export function addMapButton(terria: Terria) {
  terria.mapNavigationModel.addItem({
    id: "draw-box-button",
    name: "Draw a 3D box",
    location: "TOP",
    screenSize: undefined,
    order: 10,
    controller: new DrawBoxController(terria)
  });
}

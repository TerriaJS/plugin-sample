import { TerriaPlugin } from "terriajs-plugin-api";
/**
 * Load SVG sprite when the plugin is intialized.
 *
 * SVG icons can be imported in plugin code as: `import someIcon from "assets/icons/someIcon.svg"`.
 * During build, these SVG assets are merged into a single sprite. This
 * function ensures the sprite is added to the DOM when the plugin is initialized.
 */
export default function withSvgSprite(plugin: TerriaPlugin): TerriaPlugin;

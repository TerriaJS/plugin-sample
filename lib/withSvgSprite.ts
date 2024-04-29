import { TerriaPlugin } from "terriajs-plugin-api";

/**
 * Load SVG sprite when the plugin is intialized.
 *
 * SVG icons can be imported in plugin code as: `import someIcon from "assets/icons/someIcon.svg"`.
 * During build, these SVG assets are merged into a single sprite. This
 * function ensures the sprite is added to the DOM when the plugin is initialized.
 */
export default function withSvgSprite(plugin: TerriaPlugin): TerriaPlugin {
  return {
    ...plugin,
    register(...args) {
      document.readyState === "complete"
        ? loadSvgSprite()
        : window.addEventListener("load", () => loadSvgSprite());
      plugin.register(...args);
    }
  };
}

function loadSvgSprite() {
  import("sprite.svg").then(({ default: sprite }) => {
    const div = document.createElement("div");
    div.innerHTML = sprite;
    document.body.appendChild(div);
  });
}

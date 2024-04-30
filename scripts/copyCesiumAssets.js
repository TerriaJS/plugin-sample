import fs from "fs/promises";
import { createRequire } from "node:module";
import path from "path";
import { BUILD_DIR } from "./bundle.js";
import isMain from "./isMain.js";

export function copyCesiumAssets() {
  const outDir = path.join(BUILD_DIR, "specs", "Cesium");
  const require = createRequire(import.meta.url);
  const cesiumDir = path.dirname(
    require.resolve("terriajs-cesium/package.json")
  );

  const copy = (src, dest) =>
    fs.cp(src, dest, { recursive: true, force: true, errorOnExist: false });

  return Promise.all([
    copy(
      path.join(cesiumDir, "Build", "Workers"),
      path.join(outDir, "Workers")
    ),
    copy(path.join(cesiumDir, "Source", "Assets"), path.join(outDir, "Assets")),
    copy(
      path.join(cesiumDir, "Source", "ThirdParty"),
      path.join(outDir, "ThirdParty")
    )
  ]).catch(() => {
    /* can error if there are parallel copy attempts */
  });
}

if (isMain(import.meta.url)) {
  copyCesiumAssets();
}

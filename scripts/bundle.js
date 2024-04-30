import esbuild from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import globby from "globby";
import path from "path";
import yargs from "yargs";
import { copyCesiumAssets } from "./copyCesiumAssets.js";
import preferEsmModule from "./esbuild/preferEsmModule.js";
import replaceModule from "./esbuild/replaceModule.js";
import selectLoader from "./esbuild/selectLoader.js";
import skipExternalModules from "./esbuild/skipExternalModules.js";
import svgSprite from "./esbuild/svgSprite.js";
import isMain from "./isMain.js";

/**
 * Output build directory
 */
export const BUILD_DIR = "build";

/**
 * Shared esbuild config for bundling both src and specs
 */
export const config = {
  bundle: true,
  color: true,

  define: {
    global: "globalThis"
  },

  tsconfig: "./tsconfig.json",

  plugins: [
    // The official @cesium/widgets package imports from `@cesium/engine`.
    // Replace it with the `terriajs-cesium` fork instead.
    replaceModule("@cesium/engine", "terriajs-cesium"),

    // There are places in the TerriaJS code base where some modules are imported using CJS style `require("x").default`.
    // This causes, esbuild to include their NodeJS exports instead of the browser specific ESM modules.
    // This plugin forces the use of ESM browser modules instead.
    preferEsmModule(["proj4", "i18next"]),

    // Generates sprite.svg.js for icons
    svgSprite,

    // Handle the webpackish import paths in TerriaJS code base
    selectLoader({
      loaders: [
        {
          filter: /^[!]*raw-loader!(.*)$/,
          loader: "text"
        },
        {
          filter: /^file-loader!(.*)$/,
          loader: "file"
        },
        {
          filter: /^worker-loader!(.*)$/,
          loader: "empty"
        },
        {
          filter: /^[!]*style-loader!.*?([^!]*\.css)$/,
          loader: "css"
        },
        {
          filter: /^[!]*style-loader!.*?([^!]*\.scss)$/,
          loader: "empty"
        }
      ]
    })
  ],

  loader: {
    ".jsx": "tsx",
    ".gif": "file",
    ".png": "file",
    ".jpg": "file",
    ".svg": "file",
    ".html": "text",
    ".glb": "file",
    ".xml": "text",
    ".DAC": "file",
    ".wasm": "file",
    ".scss": "empty"
  }
};

/**
 * Invoke the esbuild bundler.
 */
async function runBuilder(config, opts) {
  return esbuild
    .context(config)
    .then((builder) =>
      opts.watch
        ? builder.watch()
        : builder.rebuild().then(() => builder.dispose())
    );
}

/**
 * Create a bundle for spec files.
 *
 * This will package all the dependencies as a single standalone script that
 * Karma can then load and run.
 */
async function bundleSpecs(opts) {
  const specsDir = "specs";
  const glob = "**/*Spec.ts";
  const specs = ["SpecMain.ts", ...(await globby(glob, { cwd: specsDir }))];
  const specsBuildDir = path.join(BUILD_DIR, "specs");
  const mergedSpecs = specs.map((s) => `import "./${s}"`).join(";");

  return Promise.all([
    copyCesiumAssets(),
    runBuilder(
      {
        ...config,
        outdir: specsBuildDir,
        stdin: {
          contents: mergedSpecs,
          resolveDir: "./specs",
          sourcefile: "specs.js"
        },

        // Options for browser build which will be loaded by Karma
        platform: "browser",
        target: "esNext",
        format: "iife",
        minify: false,
        sourcemap: true,

        plugins: (config.plugins ?? []).concat([
          // Polyfill NodeJS functions for the browser
          polyfillNode()
        ])
      },
      opts
    )
  ]);
}

/**
 * Create a bundle for src files.
 *
 * This will only bundle the local code leaving every other dependency to be
 * bundled by terriamap's build system.
 */
async function bundleSrc(opts) {
  return runBuilder(
    {
      ...config,
      entryPoints: ["src/index.ts"],
      outdir: path.join(BUILD_DIR, "src"),

      // The src bundle is further bundled by Terriamap webpack build system
      // which expects the package to use es2019
      target: "es2019",
      format: "esm",

      // Enable splitting so that dynamic imports result in a separate bundle
      splitting: true,

      // eslint-disable-next-line no-unneeded-ternary
      minify: opts.dev ? false : true,
      // eslint-disable-next-line no-unneeded-ternary
      sourcemap: opts.dev ? true : false,

      plugins: (config.plugins ?? []).concat(
        // Skip non-local modules from the bundle, these will be included later
        // when terriamap builds the plugin
        skipExternalModules
      )
    },
    opts
  );
}

/**
 * Bundle src and spec files.
 */
export function bundle(opts) {
  return Promise.all([bundleSrc(opts), bundleSpecs(opts)]);
}

if (isMain(import.meta.url)) {
  await bundle(yargs(process.argv).argv);
}

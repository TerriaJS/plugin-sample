<i>🚧 Warning: This project is work-in-progress and things can break or be entirely scrapped without notice.</i>

# What?

This repo implements a sample TerriaJS plugin. It uses the experimental [terriajs-plugin-api](https://github.com/terriajs/plugin-api) to interface with the TerriaJS library.

Terria plugins simply provide a means of building functionality for Terria outside of the main TerriaJS library. The additional functionality can be support for a new data source by implementing a new [catalog item type](https://docs.terria.io/guide/connecting-to-data/catalog-items/). Or it can add a new feature to Terria by implementing a new UI [workflow](#workflow-tbd)(TBD).

# Current status

* The repo builds without errors inside a yarn workspace within the terriamap repo ([details on how to setup the workspace](#suggested-plugin-development-workflow)).

* Outside a yarn workspace, the project builds and emits types but with errors. The errors are because the current TerriaJS bundle does not emit and export its types. (issue tracking this problem).

# TODOs

- [x] Packaging icon asset files.
- [ ] Adding translation support

# Adding this plugin to your terriamap

### Clone terriamap
```bash
git clone https://github.com/terriajs/terriamap
cd terriamap
```

### Add this plugin as dependency to package.json
```bash
yarn add -W 'terriajs-plugin-sample'
```

### Add plugin to `plugins.ts`
```typescript
const plugins: any[] = [
  import("terriajs-plugin-sample")
];

export default plugins;
```

Note: The file `plugins.ts` is in the terriamap project root directory.

### Now build terriamap and start the server

```
# From the terriamap directory run
yarn run gulp build
# Start terriamap web server
yarn run start
```

Once the server is running visit http://localhost:3001 to load the app. You should see a new plugin button to draw a 3D box on the right hand side of the app.

# Suggested plugin development workflow

We currently suggest using yarn workspaces to develop plugins for terriamap. Follow these steps to to setup a yarn workspace for this plugin:

### Checkout the plugin into packages folder

```bash
cd terriamap/
mkdir -p packages
git clone https://github.com/terriajs/plugin-sample packages/plugin-sample
```

### Add the plugin package to the [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) settings of your terriamap `package.json` file.

Edit `package.json` for terriamap:

```json
  {
  "private": true,
  "workspaces": {
    "packages": [
      "packages/terriajs",
      "packages/cesium",
      "packages/terriajs-server"
      "packages/plugin-sample" // <-- plugin-sample added here
    ],

   ...
   
   "dependencies": {
    "pm2": "^3.2.2",
    "terriajs-plugin-api": "0.0.1-alpha.5",
    "terriajs-plugin-sample": "0.0.1-alpha.6", // <-- plugin-sample version changed to match the version in packages/plugin-sample/package.json
```

### Build terriamap 

From your terriamap folder run:

```bash
yarn install
# Starts a terriamap build process that watches for file changes
yarn run gulp watch 
```

### Build plugin-sample

```bash
cd terriamap/packages/plugin-sample
# Start a plugin build process that watches for file changes
rollup -c rollup.config.ts -w
```

Now when you make changes to the plugin code, terriamap will automatically rebuild the changes.

# 🔌 TerriaJS sample plugin

This repository implements a sample TerriaJS plugin which adds a custom tool to
Terria map for drawing an interactive 3D box.

It serves as an example for setting up and loading an external plugin library
that adds new functionality to Terria without forking it.

Plugins allow extending Terria in two ways:

  - By adding support for new data formats or APIs through implementing new [catalog item ](https://docs.terria.io/guide/connecting-to-data/catalog-items/) types. 
  - and extending the UI in limited ways to create custom workflows.

This plugin code utilizes these additional peer dependencies from the TerriaJS
library and are pre-requisites for understanding the code:

- [terriajs-plugin-api](https://github.com/terriajs/plugin-api) - for interfacing with the TerriaJS library.
- [CesiumJS](https://github.com/cesiumgs/cesium/) - The 3D mapping library
- [mobx](https://mobx.js.org/) - Reactive state management library
- [ReactJS](https://react.dev/)
- [styled-components](https://styled-components.com/)
- [yarn](yarnpkg.com) - Package manager


Additional documentation for developing with Terria is available at
[https://docs.terria.io](https://docs.terria.io/). 

👷 This plugin repository is a work in progress and will be updated as the different APIs evolve. Meanwhile expect breaking changes

💬 Reach us through our [discussion forum](https://github.com/TerriaJS/terriajs/discussions) if you require additional help.

## Guides

- [Installing the plugin](#-installing-the-plugin)
- [Developing your own plugin](#-developing-your-own-plugin)

## 🚀 Installing the plugin

If you just want to try out the plugin to see how it works, add the plugin as a dependency to your terriamap and register it in `plugins.ts` file. The steps below show how to do that.

1. **Clone terriamap**

   ```bash
   git clone https://github.com/terriajs/terriamap
   cd terriamap
   ```

2. **Add the plugin package as dependency**

   ```bash
   yarn add -W terriajs-plugin-sample
   ```

3. **Add the plugin to `terriamap/plugins.ts`**

   ```typescript
   const plugins: any[] = [
      import("terriajs-plugin-sample")
   ];
   ...
   export default plugins;
   ```

4. **Build terriamap and run a dev server**

   ```bash
   # From the terriamap directory run
   yarn run gulp dev
   ```

#### Testing the plugin

Once the server is running visit http://localhost:3001 to load the app. You should see a new plugin button added to the map toolbar on the right hand side. Opening the tool will prompt the user to draw a rectangle on the map, this will place a 3d box of the same dimension on the map. Screenshot of the plugin in action:

![Sample plugin](sample-plugin.png "Sample plugin")

## 👩‍🔬 Developing your own plugin

### Setting up development enviroment

Developing the plugin requires correctly setting up the yarn workspace. Your local directory structure should look something like:

```
terriamap/
  packages/
  └── plugin-sample
```

This `plugin-sample` repository must be checked out and setup correctly under `terriamap/packages` directory. The steps below shows how to do that.


1. Checkout `plugin-sample` into the packages folder

   ```bash
   cd terriamap/
   mkdir -p packages
   git clone https://github.com/terriajs/plugin-sample packages/plugin-sample
   ```

2. Add the plugin package to the [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/) settings of your terriamap's `package.json` file.

   Edit `terriamap/package.json`:

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
       "terriajs-plugin-api": "0.0.1-alpha.16",
       "terriajs-plugin-sample": "0.0.1-alpha.8", // <-- plugin-sample version should match the version in packages/plugin-sample/package.json
   ```

3. Install the new dependencies

   Make sure you are in the `terriamap` directory and run:
   
   ```bash
   yarn install
   ```

4. Build the plugin-sample

   ```bash
   cd terriamap/packages/plugin-sample
   # Start a plugin build process that watches for file changes
   yarn run watch
   ```

5. Build terriamap 

   Now, from your `terriamap` folder run:
   
   ```bash
   yarn install
   # Starts a terriamap dev server that watches for code changes and rebuilds the map
   yarn run gulp dev
   ```

👉 You need to keep both the yarn commands running, then start making make changes to the plugin code, terriamap will automatically
rebuild your changes. 

👉 Watch for errors from the plugin build process. Note that the app page doesn't reload automatically when the code rebuilds, you
have to refresh the page to see your changes.

### Troubleshooting

The plugin provides a script to check if the dev environment has been set up correctly.

```bash
$ cd packages/plugin-sample
$ yarn check-dev-env 
```

If it generates an output like below with all checks passing, then your dev enviroment setup is probably correct.

```bash
$ node scripts/checkDevEnv.js
✅ Find map workspace - Yes (/home/user/terriamap)
✅ Plugin added to workspaces setting - Yes
✅ Plugin added to dependencies - Yes
✅ Package versions match - Yes (1.0.0 matches ^1.0.0)
✅ Plugin import resolves correctly - Yes
✅ Plugin added to plugins registry - Yes
✅ terriajs-plugin-api versions match - Yes (0.0.1-alpha.16 matches ^0.0.1-alpha.15)
Done in 0.10s.
```

### Plugin scripts

The following scripts are available to help with development

`yarn build` - Bundle `src` and `specs` folders, typecheck and lint.

`yarn watch` - Watch files and rebuild plugin.

`yarn test`  - Runs the tests

`yarn typecheck` - Typechecks the files using typescript compiler

`yarn check-dev-env` - Verifies that the plugin development enviroment is setup correctly

### Plugin API

Documentation for the plugin API is still in works, meanwhile please inspect the [terriajs-plugin-api](https://github.com/terriajs/plugin-api) repository for available APIs.




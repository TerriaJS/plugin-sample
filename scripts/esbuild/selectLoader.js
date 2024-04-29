import fs from "fs/promises";

const selectLoader = (options = {}) => ({
  name: "selectLoaderPlugin",
  setup(build, { transform } = {}) {
    for (const { filter, loader } of options.loaders) {
      build.onResolve(
        {
          filter: filter
        },
        async (args) => {
          const pathOnly = args.path.match(filter)[1];
          const result = await build.resolve(pathOnly, {
            kind: args.kind,
            importer: args.importer,
            namespace: "file",
            resolveDir: args.resolveDir,
            pluginData: args.resolveData
          });
          return {
            ...result,
            namespace: "selectLoaderPlugin",
            pluginData: {
              ...result.pluginData,
              loader
            }
          };
        }
      );

      build.onLoad(
        {
          filter: /.*/,
          namespace: "selectLoaderPlugin"
        },
        async (args) => {
          return {
            contents: await fs.readFile(args.path),
            loader: args.pluginData.loader
          };
        }
      );
    }
  }
});

export default selectLoader;

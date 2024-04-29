export default function preferEsmModule(moduleNames) {
  return {
    name: "prefer-esm-module",
    setup(build) {
      moduleNames.forEach((moduleName) => {
        build.onResolve({ filter: new RegExp(`^${moduleName}$`) }, (args) => {
          return args.kind === "require-call"
            ? build.resolve(args.path, {
                kind: "import-statement",
                resolveDir: args.resolveDir
              })
            : undefined;
        });
      });
    }
  };
}

export default function replaceModule(module, replacementModule) {
  return {
    name: "replace-module",
    setup(build) {
      build.onResolve(
        { filter: new RegExp(`^${module.replace("/", "\\/")}$`) },
        async (args) => {
          return build.resolve(replacementModule, {
            kind: args.kind,
            resolveDir: args.resolveDir
          });
        }
      );
    }
  };
}

export default {
  name: "skipExternalNodeModules",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === "entry-point" || args.path.startsWith(".")) {
        return;
      } else {
        // Mark all non local imports as external. These will be bundled
        // by the terriamap build process
        return { path: args.path, external: true };
      }
    });
  }
};

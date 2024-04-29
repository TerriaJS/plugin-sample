import fs from "fs/promises";
import path from "path";
import SvgSprite from "svg-sprite";

/**
 * esbuild plugin for generating SVG sprite
 */
export default {
  name: "svg-sprite-builder",
  async setup(build) {
    const symbolPrefix = JSON.parse(
      await fs.readFile("package.json", "utf-8")
    ).name.replace(/[^0-9a-z]/i, "-");
    const sprite = new SvgSprite({
      mode: {
        symbol: { inline: true }
      },
      shape: {
        id: { generator: `${symbolPrefix}-%s` }
      }
    });

    build.onResolve({ filter: /^sprite.svg$/ }, (args) => {
      // sprite.svg.js will be generated when build ends (see below).
      return { path: "./sprite.svg.js", external: true };
    });

    build.onResolve({ filter: /assets\/icons\/.*\.svg$/ }, (args) => {
      const pluginDir = process.cwd();
      return {
        path: path.join(pluginDir, args.path),
        namespace: "svg-sprite-builder"
      };
    });

    build.onLoad(
      { filter: /.*\.svg$/, namespace: "svg-sprite-builder" },
      async (args) => {
        const baseName = path.basename(args.path, path.extname(args.path));
        const symbol = `${symbolPrefix}-${baseName}`;
        const svg = await fs.readFile(args.path, "utf-8");
        sprite.add(args.path, path.basename(args.path), svg);
        return {
          contents: `export default { id: "${symbol}" }`,
          loader: "js"
        };
      }
    );

    build.onEnd(async (args) => {
      const { result } = await sprite.compileAsync();
      const outdir =
        build.initialOptions.outdir ||
        path.dirname(build.initialOptions.outfile);
      const spriteFile = path.join(outdir, "sprite.svg.js");
      return fs.writeFile(
        spriteFile,
        `export default '${result.symbol.sprite.contents}';`
      );
    });
  }
};

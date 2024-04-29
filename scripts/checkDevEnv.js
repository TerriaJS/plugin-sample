import fs from "fs/promises";
import micromatch from "micromatch";
import { createRequire } from "node:module";
import path from "path";
import { intersect as semverIntersect } from "semver-intersect";
import findYarnWorkspaceRoot from "./findYarnWorkspaceRoot.js";
import isMain from "./isMain.js";

async function checkDevEnv() {
  const checks = {
    mapWorkspace: { name: "Find map workspace", fn: checkMapWorkspace },
    pluginAddedToWorkspace: {
      name: "Plugin added to workspaces setting",
      fn: checkPluginAddedToWorkspace
    },
    pluginAddedToDeps: {
      name: "Plugin added to dependencies",
      fn: checkPluginAddedToDeps
    },
    pluginVersionsMatch: {
      name: "Package versions match",
      fn: checkPluginVersions
    },
    pluginImportResolvesCorrectly: {
      name: "Plugin import resolves correctly",
      fn: checkPluginImportResolvesCorrectly
    },
    pluginAddedToPluginsRegistry: {
      name: "Plugin added to plugins registry",
      fn: checkPluginAddedToRegistry
    },
    apiVersionsMatch: {
      name: "terriajs-plugin-api versions match",
      fn: checkApiVersions
    }
  };

  const context = {
    pluginDir: process.cwd(),
    packageJson: await readJsonFile(path.join(process.cwd(), "package.json"))
  };

  for (const check of Object.values(checks)) {
    const checkNext = await check.fn(check, context);
    if (!check.result?.ok && !checkNext) {
      break;
    }
  }

  return checks;
}

async function checkMapWorkspace(out, context) {
  const workspace = await findYarnWorkspaceRoot();
  const workspaceDeps = Object.assign(
    {},
    workspace?.packageJson?.dependencies,
    workspace?.packageJson?.devDependencies
  );
  const requiredWorkspaceDeps = ["terriajs", "terriajs-plugin-api"];
  const hasRequiredWorkspaceDeps = requiredWorkspaceDeps.every(
    (d) => !!workspaceDeps[d]
  );

  context.workspace = workspace;
  out.result =
    !workspace || !hasRequiredWorkspaceDeps
      ? {
          error: [
            "You need to place this plugin directory in a terria map workspace directory.",
            workspace.dir
              ? `Current workspace root '${workspace.dir}' does not look like a terria map project.`
              : "Usually this is the `terriamap/packages` directory."
          ].join("\n   ")
        }
      : { ok: `Yes (${workspace.dir})`, workspace };
}

async function checkPluginAddedToWorkspace(out, { workspace, pluginDir }) {
  const relativePluginDir = path.relative(workspace.dir, pluginDir);
  const addedToWorkspace = workspace.packages.some((pattern) =>
    micromatch.isMatch(relativePluginDir, pattern)
  );
  out.result = addedToWorkspace
    ? { ok: "Yes" }
    : {
        error: `"${relativePluginDir}" should be added to the "workspaces.packages" settings in '${workspace.packageJsonFile}'`
      };
}

async function checkPluginAddedToDeps(out, { workspace, packageJson }) {
  const packageName = packageJson.name;
  const packageDep = workspace.packageJson?.["dependencies"]?.[packageName];
  out.result = packageDep
    ? { ok: "Yes" }
    : {
        error: `Plugin should be added to "dependencies" settings in '${workspace.packageJsonFile}'`
      };
}

async function checkPluginVersions(out, { workspace, pluginDir, packageJson }) {
  const packageName = packageJson?.name;
  const localVersion = packageJson?.version;
  const workspaceVersion = Object.assign(
    {},
    packageJson.peerDependencies,
    workspace.packageJson.dependencies,
    workspace.packageJson.devDependencies
  )[packageName];

  let ok = false;
  try {
    ok = !!semverIntersect(localVersion, workspaceVersion);
  } catch (err) {
    /*nothing to do*/
  }

  const pluginPackageJsonFile = path.join(
    path.relative(workspace.dir, pluginDir),
    "package.json"
  );
  out.result = ok
    ? {
        ok: `Yes (${localVersion} matches ${workspaceVersion})`
      }
    : {
        error: [
          `Version in ${pluginPackageJsonFile}: ${localVersion}`,
          `Version in ${workspace.packageJsonFile}: ${workspaceVersion}`
        ].join("\n   ")
      };
  return true;
}

async function checkApiVersions(out, { workspace, pluginDir, packageJson }) {
  const localVersion = Object.assign(
    {},
    packageJson.peerDependencies,
    packageJson.dependencies,
    packageJson.devDependencies
  )["terriajs-plugin-api"];
  const workspaceVersion = Object.assign(
    {},
    packageJson.peerDependencies,
    workspace.packageJson.dependencies,
    workspace.packageJson.devDependencies
  )["terriajs-plugin-api"];

  let ok = false;
  try {
    ok = !!semverIntersect(localVersion, workspaceVersion);
  } catch (err) {
    /*nothing to do*/
  }

  const pluginPackageJsonFile = path.join(
    path.relative(workspace.dir, pluginDir),
    "package.json"
  );
  out.result = ok
    ? {
        ok: `Yes (${localVersion} matches ${workspaceVersion})`
      }
    : {
        error: [
          `Version in ${pluginPackageJsonFile}: ${localVersion}`,
          `Version in ${workspace.packageJsonFile}: ${workspaceVersion}`
        ].join("\n   ")
      };
  return true;
}

async function checkPluginImportResolvesCorrectly(
  out,
  { workspace, pluginDir, packageJson }
) {
  const pluginName = packageJson.name;
  const resolvedDir = await nodeResolveDirectory(`${pluginName}/package.json`);
  out.result =
    resolvedDir === pluginDir
      ? { ok: "Yes" }
      : {
          error: `Importing "${pluginName}" does not correctly resolve to '${pluginDir}'.\n   Make sure you have run "yarn install" from the workspace root '${workspace.dir}'`
        };
}

async function checkPluginAddedToRegistry(out, { workspace, packageJson }) {
  const name = packageJson.name;
  const pluginRegistryFile = path.join(workspace.dir, "plugins.ts");
  const pluginRegistry = await fs
    .readFile(pluginRegistryFile, "utf-8")
    .catch(() => "");
  const addedToRegistry = !!pluginRegistry.match(
    new RegExp(`import.*?"${name}"`)
  );
  out.result = addedToRegistry
    ? { ok: "Yes" }
    : {
        error: `"${name}" missing in plugin registry file '${pluginRegistryFile}'`
      };
}

function matchVersion(packageName, packageJson, workspacePackageJson) {
  const localVersion = Object.assign(
    {},
    packageJson.peerDependencies,
    packageJson.dependencies,
    packageJson.devDependencies
  )[packageName];

  const workspaceVersion = Object.assign(
    {},
    packageJson.peerDependencies,
    workspacePackageJson.dependencies,
    workspacePackageJson.devDependencies
  )[packageName];

  let ok = false;
  try {
    ok = !!semverIntersect(localVersion, workspaceVersion);
  } catch (err) {
    /*nothing to do*/
  }
  return { ok, packageName, localVersion, workspaceVersion };
}

async function nodeResolveDirectory(file) {
  const require = createRequire(import.meta.url);
  try {
    return path.dirname(await fs.realpath(require.resolve(file)));
  } catch (err) {
    return undefined;
  }
}

async function readJsonFile(file) {
  return JSON.parse(await fs.readFile(file));
}

if (isMain(import.meta.url)) {
  checkDevEnv().then((checks) => {
    Object.values(checks).forEach((check) => {
      if (check?.result?.error) {
        console.log("❌", check.name, "-", "No");
        console.log("  ", check.result.error);
      } else if (check?.result?.ok) {
        console.log("✅", check.name, "-", check.result.ok);
      } else {
        console.log("❓", check.name, "-", "not checked");
      }
    });
  });
}

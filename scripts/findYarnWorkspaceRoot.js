import fs from "fs/promises";
import path from "path";

export default async function findYarnWorkspaceRoot() {
  const initial = process.cwd();
  let previous = null;
  let current = path.normalize(initial);

  do {
    const packageJsonFile = path.join(current, "package.json");
    const manifest = await readPackageJson(packageJsonFile);
    const ws = extractWorkspaces(manifest);
    if (ws && ws.packages) {
      return {
        dir: current,
        packages: ws.packages,
        packageJsonFile,
        packageJson: manifest
      };
    }

    previous = current;
    current = path.dirname(current);
  } while (current !== previous);

  return null;
}

async function readPackageJson(file) {
  return fs
    .readFile(file, "utf-8")
    .then((str) => JSON.parse(str))
    .catch((err) => undefined);
}

function extractWorkspaces(manifest) {
  if (!manifest || !manifest.workspaces) {
    return undefined;
  }

  if (Array.isArray(manifest.workspaces)) {
    return { packages: manifest.workspaces };
  }

  if (
    (manifest.workspaces.packages &&
      Array.isArray(manifest.workspaces.packages)) ||
    (manifest.workspaces.nohoist && Array.isArray(manifest.workspaces.nohoist))
  ) {
    return manifest.workspaces;
  }

  return undefined;
}

import { fileURLToPath } from "url";

export default function isMain(importMetaUrl) {
  return fileURLToPath(importMetaUrl) === process.argv[1];
}

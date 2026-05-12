const fs = require("node:fs");
const path = require("node:path");

const nextDir = path.join(__dirname, "..", ".next");
const source = path.join(nextDir, "routes-manifest.json");
const target = path.join(nextDir, "routes-manifest-deterministic.json");

if (fs.existsSync(source) && !fs.existsSync(target)) {
  fs.copyFileSync(source, target);
}

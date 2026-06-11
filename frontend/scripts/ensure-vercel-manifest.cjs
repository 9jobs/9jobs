const fs = require("node:fs");
const path = require("node:path");

const nextDir = path.join(__dirname, "..", ".next");
const source = path.join(nextDir, "routes-manifest.json");
const targetFile = "routes-manifest-deterministic.json";

function copyManifest(targetDir) {
  const target = path.join(targetDir, targetFile);
  fs.mkdirSync(targetDir, { recursive: true });
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
  }
}

function linkOrCopy(sourcePath, targetPath) {
  try {
    fs.symlinkSync(sourcePath, targetPath, process.platform === "win32" ? "junction" : "dir");
    return;
  } catch {
    fs.cpSync(sourcePath, targetPath, { recursive: true });
  }
}

function mirrorProjectPathsForVercel() {
  const nestedProjectDir = path.join(process.cwd(), path.basename(process.cwd()));
  const nodeModulesDir = path.join(process.cwd(), "node_modules");

  if (path.resolve(nestedProjectDir) === path.resolve(process.cwd())) {
    return;
  }

  fs.rmSync(nestedProjectDir, { recursive: true, force: true });
  fs.mkdirSync(nestedProjectDir, { recursive: true });
  linkOrCopy(nextDir, path.join(nestedProjectDir, ".next"));

  if (fs.existsSync(nodeModulesDir)) {
    linkOrCopy(nodeModulesDir, path.join(nestedProjectDir, "node_modules"));
  }
}

if (fs.existsSync(source)) {
  copyManifest(nextDir);

  if (process.env.VERCEL) {
    mirrorProjectPathsForVercel();
  }
}

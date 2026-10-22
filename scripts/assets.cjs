// Inventory runtime files and preserved sources. No external services or image processing.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const output = "assets/manifest.json";
function walk(directory) {
  return fs
    .readdirSync(path.join(root, directory), { withFileTypes: true })
    .flatMap((entry) => {
      const file = `${directory}/${entry.name}`;
      return entry.isDirectory() ? walk(file) : [file];
    });
}
const files = [
  "public/favicon.svg",
  ...walk("assets"),
  ...walk("public/images"),
  ...walk("public/fonts"),
  ...walk("public/documents"),
  ...walk("docs").filter((file) => /\.(pdf|html)$/i.test(file)),
].filter((file) => file !== output && !file.endsWith(".md"));
const inventory = files.sort().map((file) => {
  const bytes = fs.readFileSync(path.join(root, file));
  const record = {
    file,
    role: file.startsWith("public/")
      ? "runtime"
      : file.startsWith("assets/archive/")
        ? "archive"
        : "source-reference",
    bytes: bytes.length,
    sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
  };
  const stem = path.basename(file, path.extname(file));
  const source = file.startsWith("public/images/work/")
    ? `assets/artwork/${stem}.png`
    : file.startsWith("public/images/portraits/")
      ? `assets/portraits/originals/${stem}.jpg`
      : null;
  if (source && fs.existsSync(path.join(root, source))) record.source = source;
  if (file === "public/images/work/green-crisp-poster.webp")
    record.source = "public/documents/Green-CRISP-ML-Q-Poster.pdf";
  return record;
});
const serialized = `${JSON.stringify(inventory, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (
    !fs.existsSync(path.join(root, output)) ||
    fs.readFileSync(path.join(root, output), "utf8") !== serialized
  ) {
    console.error(
      "Asset inventory changed. Run npm run assets:inventory and review assets/manifest.json.",
    );
    process.exitCode = 1;
  } else
    console.log(`Verified ${inventory.length} runtime and reference assets.`);
} else {
  fs.writeFileSync(path.join(root, output), serialized);
  console.log(
    `Inventoried ${inventory.length} runtime and reference assets in ${output}.`,
  );
}

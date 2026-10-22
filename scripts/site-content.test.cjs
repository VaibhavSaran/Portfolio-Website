const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} };
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  vm.runInNewContext(
    outputText,
    {
      module,
      exports: module.exports,
      URL,
      require: (id) => {
        if (!id.startsWith("."))
          throw Error(`Unexpected runtime import: ${id}`);
        return load(
          path.relative(root, path.resolve(path.dirname(file), `${id}.ts`)),
        );
      },
    },
    { filename: file },
  );
  cache.set(file, module.exports);
  return module.exports;
}

test("canonical domain is consistent across crawl directives and identity metadata", () => {
  const { site } = load("app/data/site.ts");
  const { seoMetadata, profileSchema } = load("app/data/seo.ts");
  const robots = load("app/robots.ts").default();
  const sitemap = load("app/sitemap.ts").default();
  assert.equal(new URL(site.url).protocol, "https:");
  assert.equal(seoMetadata.metadataBase.href, `${site.url}/`);
  assert.equal(seoMetadata.alternates.canonical, site.url);
  assert.equal(seoMetadata.openGraph.url, site.url);
  assert.equal(seoMetadata.robots.index, true);
  assert.equal(seoMetadata.robots.googleBot.index, true);
  assert.equal(robots.rules.allow, "/");
  assert.equal(robots.sitemap, `${site.url}/sitemap.xml`);
  assert.equal(sitemap.length, 1);
  assert.equal(sitemap[0].url, site.url);
  assert.equal(profileSchema.url, site.url);
  assert.equal(profileSchema.mainEntity.url, site.url);
  assert.ok(seoMetadata.keywords.includes(profileSchema.mainEntity.name));
});

test("all selected media and public document destinations exist", () => {
  const { portraits, projectArtwork } = load("app/data/media.ts");
  const { site } = load("app/data/site.ts");
  const { profileSchema } = load("app/data/seo.ts");
  const publicPaths = [
    ...Object.values(portraits),
    ...Object.values(projectArtwork),
    site.poster,
  ];
  for (const url of publicPaths) {
    assert.ok(url.startsWith("/") && !url.includes(".."), url);
    assert.ok(fs.statSync(path.join(root, "public", url)).isFile(), url);
  }
  assert.notEqual(portraits.hero, portraits.about);
  assert.equal(
    new URL(profileSchema.mainEntity.image).pathname,
    portraits.hero,
  );
  assert.equal(new URL(site.resume).protocol, "https:");
});

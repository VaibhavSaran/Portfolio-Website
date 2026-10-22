const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const source = ts.transpileModule(
  fs.readFileSync("app/lib/scene-motion.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const mod = { exports: {} };
vm.runInNewContext(source, { exports: mod.exports, module: mod });
const { journeyFrame, backgroundFrame, facetFrame } = mod.exports;

test("hero approach is bounded and reversible in both layouts", () => {
  for (const mobile of [false, true]) {
    let previous = Infinity;
    for (let i = 0; i <= 100; i++) {
      const frame = journeyFrame(i / 100, mobile);
      assert.ok(Number.isFinite(frame.cameraZ));
      assert.ok(frame.cameraZ <= previous);
      previous = frame.cameraZ;
      for (const key of [
        "copyOpacity",
        "sceneOpacity",
        "coreOpacity",
        "captionOpacity",
        "center",
      ])
        assert.ok(frame[key] >= 0 && frame[key] <= 1);
    }
    assert.ok(journeyFrame(0, mobile).cameraZ > 2.7);
    assert.ok(Math.abs(journeyFrame(0.9, mobile).cameraZ) < 2.7);
    assert.ok(journeyFrame(1, mobile).cameraZ < 0.9);
  }
});
test("reverse scroll returns to the same visual state without history", () => {
  const before = JSON.stringify(journeyFrame(0.38));
  journeyFrame(1);
  journeyFrame(0.8);
  assert.equal(JSON.stringify(journeyFrame(0.38)), before);
  assert.equal(journeyFrame(-10).progress, 0);
  assert.equal(journeyFrame(10).progress, 1);
});
test("reduced motion keeps the introduction readable and the camera still", () => {
  for (const mobile of [false, true]) {
    assert.equal(
      JSON.stringify(journeyFrame(0, mobile, true)),
      JSON.stringify(journeyFrame(1, mobile, true)),
    );
    assert.equal(journeyFrame(0.8, mobile, true).copyOpacity, 1);
    assert.equal(journeyFrame(0.8, mobile, true).captionOpacity, 0);
  }
});

test("the persistent camera has continuous section transitions and different facet views", () => {
  const stops = [0, 700, 1400, 3000, 6000, 8000, 10000, 12000, 14000];
  const opening = backgroundFrame(0, stops),
    projects = backgroundFrame(3000, stops),
    research = backgroundFrame(6000, stops);
  assert.notEqual(opening.ry, projects.ry);
  assert.notEqual(projects.x, research.x);
  for (const stop of stops.slice(1, -1)) {
    const before = backgroundFrame(stop - 0.001, stops),
      after = backgroundFrame(stop + 0.001, stops);
    for (const key of ["cameraZ", "x", "y", "rx", "ry", "rz"])
      assert.ok(Math.abs(before[key] - after[key]) < 0.001);
  }
  assert.equal(
    JSON.stringify(backgroundFrame(9000, stops, false, true)),
    JSON.stringify(backgroundFrame(0, stops, false, true)),
  );
});

test("the scene closes at the same pose as the opening for the forward loop seam", () => {
  const stops = [0, 700, 1400, 3000, 6000, 8000, 10000, 12000, 14000];
  for (const mobile of [false, true]) {
    const opening = backgroundFrame(0, stops, mobile),
      closing = backgroundFrame(14000, stops, mobile);
    for (const key of ["cameraZ", "x", "y"])
      assert.ok(Math.abs(opening[key] - closing[key]) < 1e-9);
    for (const key of ["rx", "ry", "rz"]) {
      assert.ok(
        Math.abs(Math.cos(opening[key]) - Math.cos(closing[key])) < 1e-9,
      );
      assert.ok(
        Math.abs(Math.sin(opening[key]) - Math.sin(closing[key])) < 1e-9,
      );
    }
  }
});

test("the camera approaches a band polygon rather than the empty centre", () => {
  const entry = backgroundFrame(
    700,
    [0, 700, 1400, 3000, 6000, 8000, 10000, 12000, 14000],
  );
  assert.ok(entry.cameraZ < 0.6);
  assert.ok(Math.abs(entry.x + 2.35) < 0.2);
});

test("intro copy remains readable longer before the shorter handoff", () => {
  assert.ok(journeyFrame(0.35).copyOpacity > 0.8);
  assert.ok(journeyFrame(0.85).copyOpacity < 0.05);
});
test("the internal flight samples different panel regions and returns to the seam", () => {
  const stops = [0, 700, 1400, 3000, 6000, 8000, 10000, 12000, 14000];
  assert.equal(facetFrame(0, stops).mix, 0);
  assert.equal(facetFrame(14000, stops).mix, 0);
  for (const y of [1400, 3000, 6000, 8000, 10000])
    assert.equal(facetFrame(y, stops).mix, 1);
  assert.ok(facetFrame(10000, stops).u > Math.PI * 1.5);
  assert.equal(facetFrame(6000, stops, true).mix, 0);
  for (const y of stops.slice(1, -1)) {
    const a = facetFrame(y - 0.001, stops),
      b = facetFrame(y + 0.001, stops);
    for (const key of ["u", "v", "distance", "mix"])
      assert.ok(Math.abs(a[key] - b[key]) < 0.001);
  }
});

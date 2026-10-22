const test = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  ts = require("typescript");
const mod = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("app/lib/mobius-geometry.ts", "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText,
  { exports: mod.exports, module: mod },
);
const { mobiusPoint, mobiusTriangles, mobiusMesh, writeMobiusPositions } =
  mod.exports;
test("Möbius seam closes with reversed width after one half-twist", () => {
  for (const v of [-0.82, -0.3, 0, 0.3, 0.82]) {
    const start = mobiusPoint(0, v),
      end = mobiusPoint(Math.PI * 2, -v);
    start.forEach((n, i) => assert.ok(Math.abs(n - end[i]) < 1e-10));
  }
});

test("the traveling twist stays closed and returns to its initial shape", () => {
  for (const phase of [0, 0.3, 1.5, Math.PI, Math.PI * 2, Math.PI * 4]) {
    for (const v of [-0.82, -0.3, 0, 0.3, 0.82]) {
      const a = mobiusPoint(0, v, 2.35, phase),
        b = mobiusPoint(Math.PI * 2, -v, 2.35, phase);
      a.forEach((n, i) => assert.ok(Math.abs(n - b[i]) < 1e-10));
    }
  }
  for (const u of [0, 0.8, 2, 4, Math.PI * 2]) {
    const a = mobiusPoint(u, 0.5, 2.35, 0),
      b = mobiusPoint(u, 0.5, 2.35, Math.PI * 4);
    a.forEach((n, i) => assert.ok(Math.abs(n - b[i]) < 1e-10));
  }
});

test("animated facets and seams follow the same surface used by the scroll camera", () => {
  const mesh = mobiusMesh();
  for (const [parameters, initial] of [
    [mesh.parameters, mesh.positions],
    [mesh.seamParameters, mesh.seams],
  ]) {
    const buffer = new Float32Array(initial.length);
    for (const phase of [0, 1.2, 5]) {
      writeMobiusPositions(parameters, buffer, phase);
      assert.ok(buffer.every(Number.isFinite));
      for (let i = 0, j = 0; i < parameters.length; i += 2, j += 3) {
        const expected = mobiusPoint(
          parameters[i],
          parameters[i + 1],
          2.35,
          phase,
        );
        expected.forEach((v, k) =>
          assert.ok(Math.abs(v - buffer[j + k]) < 1e-6),
        );
      }
    }
  }
  assert.notDeepEqual(
    mobiusPoint(1, 0.5, 2.35, 0),
    mobiusPoint(1, 0.5, 2.35, 1.2),
  );
});
test("the faceted strip has finite non-degenerate triangles", () => {
  const positions = mobiusTriangles();
  assert.equal(positions.length, 112 * 8 * 2 * 9);
  for (let i = 0; i < positions.length; i += 9) {
    const a = positions.slice(i, i + 3),
      b = positions.slice(i + 3, i + 6),
      c = positions.slice(i + 6, i + 9);
    const u = b.map((n, j) => n - a[j]),
      v = c.map((n, j) => n - a[j]);
    const cross = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];
    assert.ok(cross.every(Number.isFinite));
    assert.ok(Math.hypot(...cross) > 1e-6);
  }
});

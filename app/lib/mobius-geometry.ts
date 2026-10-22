/** A half-twist with a periodic torsion accent: the seam still closes at P(0,v)=P(2π,-v). */
export function mobiusPoint(
  u: number,
  v: number,
  radius = 2.35,
  phase = 0,
): [number, number, number] {
  const twist = (u - phase) / 2 + 0.3 * Math.sin(u - phase);
  return [
    (radius + v * Math.cos(twist)) * Math.cos(u),
    (radius + v * Math.cos(twist)) * Math.sin(u),
    v * Math.sin(twist) + 0.14 * Math.sin(2 * u),
  ];
}

/** Deform existing buffers so the half-twist travels along the band without rebuilding its topology. */
export function writeMobiusPositions(
  parameters: ArrayLike<number>,
  target: Float32Array,
  phase: number,
) {
  for (let i = 0, j = 0; i < parameters.length; i += 2, j += 3) {
    const u = parameters[i],
      v = parameters[i + 1];
    const twist = (u - phase) / 2 + 0.3 * Math.sin(u - phase);
    const radial = 2.35 + v * Math.cos(twist);
    target[j] = radial * Math.cos(u);
    target[j + 1] = radial * Math.sin(u);
    target[j + 2] = v * Math.sin(twist) + 0.14 * Math.sin(2 * u);
  }
}

/** Irregular glass panels: triangulated for rendering, with triangle/quad/hexagon seam regions. */
export function mobiusMesh(segments = 112, across = 8, halfWidth = 0.82) {
  const positions: number[] = [],
    seams: number[] = [],
    tints: number[] = [],
    parameters: number[] = [],
    seamParameters: number[] = [];
  const grid: Array<[number, number, number]> = [];
  const gridParameters: Array<[number, number]> = [];
  const rand = (i: number, j: number) => {
    const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  for (let i = 0; i <= segments; i++)
    for (let j = 0; j <= across; j++) {
      const interior = i > 0 && i < segments && j > 0 && j < across;
      const u =
        ((i + (interior ? (rand(i, j) - 0.5) * 0.46 : 0)) / segments) *
        Math.PI *
        2;
      const v =
        (((j + (interior ? (rand(j + 31, i) - 0.5) * 0.5 : 0)) / across) * 2 -
          1) *
        halfWidth;
      grid.push(mobiusPoint(u, v));
      gridParameters.push([u, v]);
    }
  const id = (i: number, j: number) => i * (across + 1) + j;
  const edges = new Set<string>();
  const edge = (a: number, b: number) => {
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (!edges.has(key)) {
      edges.add(key);
      seams.push(...grid[a], ...grid[b]);
      seamParameters.push(...gridParameters[a], ...gridParameters[b]);
    }
  };
  for (let i = 0; i < segments; i++)
    for (let j = 0; j < across; j++) {
      const a = id(i, j),
        b = id(i + 1, j),
        c = id(i + 1, j + 1),
        d = id(i, j + 1);
      const region = Math.min(3, Math.floor((i / segments) * 4));
      const triangles =
        (i + j) % 2 === 0 ? [a, b, c, a, c, d] : [a, b, d, b, c, d];
      triangles.forEach((index) => {
        positions.push(...grid[index]);
        parameters.push(...gridParameters[index]);
      });
      const shade = 0.78 + rand(region === 3 ? Math.floor(i / 2) : i, j) * 0.22;
      for (let k = 0; k < 6; k++)
        tints.push(shade, Math.min(1, shade + 0.04), Math.min(1, shade + 0.06));
      edge(a, b);
      edge(d, c);
      if (region !== 3 || i % 2 === 0) edge(a, d);
      if (i === segments - 1) edge(b, c);
      if (region === 0 || region === 2)
        edge(...(((i + j) % 2 === 0 ? [a, c] : [b, d]) as [number, number]));
    }
  return { positions, seams, tints, parameters, seamParameters };
}
export function mobiusTriangles(segments = 112, across = 8, halfWidth = 0.82) {
  return mobiusMesh(segments, across, halfWidth).positions;
}

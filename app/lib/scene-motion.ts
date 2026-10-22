const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

export function journeyFrame(
  progress: number,
  mobile = false,
  reducedMotion = false,
) {
  const p = reducedMotion ? 0 : clamp(progress);
  const enter = smooth((p - 0.15) / 0.85);
  return {
    cameraZ: (mobile ? 15 : 12) * (1 - enter) + 0.65 * enter,
    center: smooth(p / 0.45),
    copyOpacity: 1 - smooth((p - 0.23) / 0.56),
    copyY: -28 * smooth((p - 0.18) / 0.65),
    sceneOpacity: 1,
    coreOpacity: 0,
    captionOpacity: 0,
    progress: p,
  };
}

/** Section-keyed camera poses: an aperture entry, then different faces of the same object. */
export function backgroundFrame(
  scroll: number,
  stops: number[],
  mobile = false,
  reducedMotion = false,
) {
  const poses = [
    [mobile ? 15 : 12, 0.35, mobile ? -2.8 : 0, 0.75, 0.7, -0.45],
    [0.45, -2.25, 0, 0.04, 0, 0],
    [1.7, -1.7, -0.1, -0.25, 0.35, 0.22],
    [7.8, 2.3, 0.2, -0.6, 1.9, 0.3],
    [6.5, -2.4, -0.5, 0.7, 3.2, -0.4],
    [8.6, 2.8, 0.3, 0.15, 4.3, -0.25],
    [6.9, -2.5, 0.3, -0.5, 5.25, 0.35],
    [10.2, 2.6, 0, 0.4, 5.9, 0.16],
    [mobile ? 15 : 12, 0.35, mobile ? -2.8 : 0, 0.75, Math.PI * 2 + 0.7, -0.45],
  ];
  let section = 0;
  if (!reducedMotion)
    while (section < stops.length - 2 && scroll >= stops[section + 1])
      section++;
  const a = poses[Math.min(section, poses.length - 1)];
  const b = poses[Math.min(section + 1, poses.length - 1)];
  const t = reducedMotion
    ? 0
    : smooth(
        (scroll - stops[section]) /
          Math.max(1, stops[section + 1] - stops[section]),
      );
  const pose = a.map((n, i) => n + (b[i] - n) * t);
  return {
    cameraZ: pose[0],
    x: pose[1],
    y: pose[2],
    rx: pose[3],
    ry: pose[4],
    rz: pose[5],
    section,
  };
}

/** A close-up flight along the band: triangles → diamonds → quads → hexagonal panels. */
export function facetFrame(
  scroll: number,
  stops: number[],
  reducedMotion = false,
) {
  if (reducedMotion) return { u: 0, v: 0, distance: 1, mix: 0 };
  const travel = [0, 0.38, 1.35, 2.5, 3.6, 4.9, 5.65];
  const widths = [-0.12, 0.28, -0.35, 0.32, -0.2, 0.25, -0.1];
  const distances = [0.62, 1.1, 0.9, 1.25, 0.75, 1, 1.4];
  let segment = 0;
  while (segment < 5 && scroll >= stops[segment + 2]) segment++;
  const t = smooth(
    (scroll - stops[segment + 1]) /
      Math.max(1, stops[segment + 2] - stops[segment + 1]),
  );
  const u = travel[segment] + (travel[segment + 1] - travel[segment]) * t;
  const v = widths[segment] + (widths[segment + 1] - widths[segment]) * t;
  const distance =
    distances[segment] + (distances[segment + 1] - distances[segment]) * t;
  const enter = smooth((scroll - stops[1]) / Math.max(1, stops[2] - stops[1]));
  const exit =
    1 - smooth((scroll - stops[7]) / Math.max(1, stops[8] - stops[7]));
  return { u, v, distance, mix: enter * exit };
}

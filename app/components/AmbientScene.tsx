"use client";

import { useEffect, useRef, useState } from "react";
import { backgroundFrame, journeyFrame, facetFrame } from "../lib/scene-motion";
import {
  mobiusPoint,
  mobiusMesh,
  writeMobiusPositions,
} from "../lib/mobius-geometry";

/** One faceted glass Möbius strip, one fixed canvas, and a camera path spanning the portfolio. */
export default function AmbientScene() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    const stage = document.querySelector<HTMLElement>(".hero");
    const journey = document.querySelector<HTMLElement>(".hero-journey");
    if (!element || !stage || !journey) return;
    let disposed = false,
      cleanupScene = () => {},
      redraw = () => {};
    let stops = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      introDistance = 1;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const progress = () => {
      const p = reduced.matches
        ? 0
        : Math.max(0, Math.min(1, scrollY / introDistance));
      const state = journeyFrame(p, innerWidth <= 760, reduced.matches);
      stage.style.setProperty("--copy-opacity", String(state.copyOpacity));
      stage.style.setProperty("--copy-y", `${state.copyY}px`);
      stage.style.setProperty("--journey-progress", String(p));
      stage.dataset.phase =
        p < 0.3 ? "overview" : p < 0.8 ? "approach" : "inside";
      const copy = stage.querySelector<HTMLElement>(".hero-copy");
      if (copy) copy.inert = state.copyOpacity < 0.05;
      const view = backgroundFrame(
        scrollY,
        stops,
        innerWidth <= 760,
        reduced.matches,
      );
      element.dataset.view =
        [
          "opening",
          "aperture",
          "experience",
          "projects",
          "research",
          "about",
          "recommendations",
          "contact",
        ][view.section] ?? "closing";
      element.style.setProperty(
        "--sculpture-visibility",
        String(
          scrollY < introDistance
            ? 0.85
            : document.documentElement.dataset.theme === "dark"
              ? 0.34
              : 0.42,
        ),
      );
      redraw();
    };
    const measure = () => {
      introDistance = Math.max(1, journey.offsetHeight - stage.offsetHeight);
      const top = (id: string) => {
        const el = document.getElementById(id);
        return el
          ? el.getBoundingClientRect().top + scrollY - innerHeight * 0.2
          : 0;
      };
      stops = [
        0,
        introDistance,
        top("experience"),
        top("projects"),
        top("research"),
        top("about"),
        top("recommendations"),
        top("contact"),
        Math.max(
          1,
          (document
            .querySelector<HTMLElement>(".loop-bridge")
            ?.getBoundingClientRect().top ?? 0) +
            scrollY -
            (parseFloat(getComputedStyle(stage).top) || 82),
        ),
      ];
      for (let i = 1; i < stops.length; i++)
        stops[i] = Math.max(stops[i], stops[i - 1] + 1);
      progress();
    };
    const sizes = new ResizeObserver(measure);
    sizes.observe(document.body);
    window.addEventListener("scroll", progress, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    reduced.addEventListener("change", measure);
    measure();
    void Promise.all([
      import("three"),
      import("three/addons/environments/RoomEnvironment.js"),
    ])
      .then(([T, { RoomEnvironment }]) => {
        if (disposed) return;
        let renderer: InstanceType<typeof T.WebGLRenderer>;
        try {
          renderer = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
        renderer.setClearColor(0, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        element.appendChild(renderer.domElement);
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(36, 1, 0.05, 60);
        const pmrem = new T.PMREMGenerator(renderer),
          room = new RoomEnvironment(),
          environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        room.dispose();
        pmrem.dispose();
        scene.add(new T.HemisphereLight(0xffffff, 0x24382d, 2.2));
        const key = new T.DirectionalLight(0xf1ffe5, 4);
        key.position.set(-4, 5, 5);
        scene.add(key);
        const rim = new T.DirectionalLight(0xa4c56b, 5);
        rim.position.set(4, -2, 2);
        scene.add(rim);
        // Non-indexed triangles keep the glass facets crisp rather than smoothing
        // the half-twisted surface into a generic glossy tube.
        const panelMesh = mobiusMesh();
        const geometry = new T.BufferGeometry();
        const surfacePositions = new T.Float32BufferAttribute(
          panelMesh.positions,
          3,
        );
        geometry.setAttribute("position", surfacePositions);
        surfacePositions.setUsage(T.DynamicDrawUsage);
        geometry.computeVertexNormals();
        geometry.boundingSphere = new T.Sphere(new T.Vector3(), 3.6);
        geometry.setAttribute(
          "color",
          new T.Float32BufferAttribute(panelMesh.tints, 3),
        );
        const material = new T.MeshPhysicalMaterial({
          color: 0xd6e8e9,
          vertexColors: true,
          flatShading: true,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
          metalness: 0.12,
          roughness: 0.07,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          transmission: 0.68,
          thickness: 0.15,
          ior: 1.45,
          envMapIntensity: 2,
          side: T.DoubleSide,
        });
        const sculpture = new T.Group();
        sculpture.add(new T.Mesh(geometry, material));
        const seamPositions = new T.Float32BufferAttribute(panelMesh.seams, 3);
        const seams = new T.BufferGeometry().setAttribute(
          "position",
          seamPositions,
        );
        seamPositions.setUsage(T.DynamicDrawUsage);
        seams.boundingSphere = new T.Sphere(new T.Vector3(), 3.6);
        const seamMaterial = new T.LineBasicMaterial({
          transparent: true,
          opacity: 0.36,
          depthWrite: false,
        });
        sculpture.add(new T.LineSegments(seams, seamMaterial));
        scene.add(sculpture);
        let frame = 0,
          lost = false,
          lastTime = 0,
          twistPhase = 0;
        const theme = () => {
          const dark = document.documentElement.dataset.theme === "dark";
          material.color.set(dark ? "#b2d6df" : "#c9e0e1");
          seamMaterial.color.set(dark ? "#a5e2ed" : "#416f79");
          seamMaterial.opacity = dark ? 0.46 : 0.35;
          material.metalness = dark ? 0.16 : 0.12;
          material.transmission = dark ? 0.65 : 0.55;
          material.envMapIntensity = dark ? 2.1 : 1.6;
          renderer.toneMappingExposure = dark ? 1.05 : 1.1;
          progress();
          resume();
        };
        const draw = (time: number) => {
          frame = 0;
          if (disposed || lost || document.hidden) return;
          // Limit rendering to 30 fps without slowing motion on lower frame rates.
          if (!reduced.matches && lastTime && time - lastTime < 1000 / 30) {
            frame = requestAnimationFrame(draw);
            return;
          }
          const elapsed = lastTime ? (time - lastTime) / 1000 : 0;
          twistPhase = reduced.matches
            ? 0
            : (twistPhase + elapsed * 0.3) % (Math.PI * 4);
          writeMobiusPositions(
            panelMesh.parameters,
            surfacePositions.array as Float32Array,
            twistPhase,
          );
          writeMobiusPositions(
            panelMesh.seamParameters,
            seamPositions.array as Float32Array,
            twistPhase,
          );
          surfacePositions.needsUpdate = true;
          seamPositions.needsUpdate = true;
          geometry.computeVertexNormals();
          element.dataset.twistPhase = twistPhase.toFixed(4);
          element.dataset.motion = reduced.matches
            ? "still"
            : "traveling-twist";
          const state = backgroundFrame(
            scrollY,
            stops,
            innerWidth <= 760,
            reduced.matches,
          );
          sculpture.rotation.set(state.rx, state.ry, state.rz);
          const mobile = innerWidth <= 760;
          sculpture.position.set(
            mobile
              ? state.x * 0.35
              : state.x *
                  Math.min(1, element.clientWidth / element.clientHeight / 1.6),
            state.y,
            0,
          );
          sculpture.scale.setScalar(
            mobile ? 0.7 : element.clientWidth < 1000 ? 0.85 : 1,
          );
          camera.position.set(0, 0, state.cameraZ);
          camera.lookAt(0, 0, state.cameraZ - 10);
          const detail = facetFrame(scrollY, stops, reduced.matches);
          // Keep the scroll path attached to the moving surface, with the same
          // local coordinates, viewing distance, and entry/exit blend as before.
          const fixed = new T.Quaternion();
          sculpture.quaternion.slerp(fixed, detail.mix);
          sculpture.position.multiplyScalar(1 - detail.mix);
          sculpture.scale.lerp(new T.Vector3(1, 1, 1), detail.mix);
          sculpture.updateMatrixWorld(true);
          const point = new T.Vector3(
            ...mobiusPoint(detail.u, detail.v, 2.35, twistPhase),
          );
          const du = new T.Vector3(
            ...mobiusPoint(detail.u + 0.001, detail.v, 2.35, twistPhase),
          )
            .sub(point)
            .normalize();
          const dv = new T.Vector3(
            ...mobiusPoint(detail.u, detail.v + 0.001, 2.35, twistPhase),
          )
            .sub(point)
            .normalize();
          const normal = dv
            .clone()
            .cross(du)
            .normalize()
            .transformDirection(sculpture.matrixWorld);
          const surface = point.applyMatrix4(sculpture.matrixWorld);
          const closeEye = surface
            .clone()
            .addScaledVector(normal, detail.distance);
          camera.position.lerp(closeEye, detail.mix);
          camera.up
            .set(0, 1, 0)
            .lerp(du.transformDirection(sculpture.matrixWorld), detail.mix)
            .normalize();
          const forwardTarget = camera.position
            .clone()
            .add(new T.Vector3(0, 0, -10));
          camera.lookAt(forwardTarget.lerp(surface, detail.mix));
          element.dataset.detail =
            detail.mix > 0.95
              ? ["triangles", "quadrilaterals", "diamonds", "hexagons"][
                  Math.min(3, Math.floor((detail.u / (Math.PI * 2)) * 4))
                ]
              : "overview";
          renderer.render(scene, camera);
          lastTime = time;
          if (!reduced.matches) frame = requestAnimationFrame(draw);
        };
        function resume() {
          if (disposed || lost || document.hidden) return;
          if (!frame) frame = requestAnimationFrame(draw);
        }
        const visibilityChanged = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          lastTime = 0;
          resume();
        };
        redraw = resume;
        const resize = () => {
          renderer.setSize(element.clientWidth, element.clientHeight);
          camera.aspect =
            element.clientWidth / Math.max(1, element.clientHeight);
          camera.updateProjectionMatrix();
          resume();
        };
        const resizeScene = new ResizeObserver(resize);
        resizeScene.observe(element);
        const themes = new MutationObserver(theme);
        themes.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });
        const contextLost = (event: Event) => {
          event.preventDefault();
          lost = true;
          cancelAnimationFrame(frame);
          setReady(false);
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        document.addEventListener("visibilitychange", visibilityChanged);
        theme();
        resize();
        setReady(true);
        cleanupScene = () => {
          cancelAnimationFrame(frame);
          resizeScene.disconnect();
          themes.disconnect();
          document.removeEventListener("visibilitychange", visibilityChanged);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          geometry.dispose();
          material.dispose();
          seams.dispose();
          seamMaterial.dispose();
          environment.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* A static twisted band keeps the composition usable without WebGL. */
      });
    return () => {
      disposed = true;
      cleanupScene();
      sizes.disconnect();
      window.removeEventListener("scroll", progress);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", measure);
      const copy = stage.querySelector<HTMLElement>(".hero-copy");
      if (copy) copy.inert = false;
    };
  }, []);
  return (
    <div
      className={`persistent-scene ${ready ? "scene-ready" : ""}`}
      aria-hidden="true"
    >
      <div className="solid-fallback" />
      <div ref={host} className="sculpture-canvas" />
    </div>
  );
}

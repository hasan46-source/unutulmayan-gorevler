import { useEffect, useRef, type PointerEvent } from "react";
import * as THREE from "three";
import { SpeakButton } from "@/components/SpeakButton";

const MOONS = [
  { name: "Phobos", orbit: 2.15, size: 0.62, speed: 0.9, map: "/maps/phobos.png", phase: 0.4 },
  { name: "Deimos", orbit: 3.35, size: 0.36, speed: 0.38, map: "/maps/deimos.png", phase: 2.1 },
];

const ORBITERS = [
  { name: "Odyssey", orbit: 2.55, speed: 0.62, phase: 1.2, color: 0x7ee0ff },
  { name: "MRO", orbit: 2.75, speed: 0.74, phase: 3.4, color: 0xffb15a },
  { name: "MAVEN", orbit: 3.7, speed: 0.28, phase: 0.8, color: 0xc8ff7a },
];

export function SolarFlight() {
  const hostRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x071018, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.touchAction = "none";
    canvas.className = "cursor-grab";
    if (!renderer.getContext()) {
      host.textContent = "3D bu pencerede açılmadı. Önizlemeyi bir kez kapatıp yeniden aç.";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);

    const stars = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      stars[i * 3] = (Math.random() - 0.5) * 50;
      stars[i * 3 + 1] = (Math.random() - 0.5) * 30;
      stars[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 })));

    scene.add(new THREE.AmbientLight(0xffd8c4, 0.55));
    const sun = new THREE.DirectionalLight(0xfff2e0, 2.1);
    sun.position.set(6, 3, 4);
    scene.add(sun);

    const marsMap = new THREE.TextureLoader().load("/maps/mars.jpg");
    marsMap.colorSpace = THREE.SRGBColorSpace;
    marsMap.anisotropy = 8;
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshStandardMaterial({ map: marsMap, roughness: 0.92, metalness: 0.02 }),
    );
    scene.add(mars);
    const haze = new THREE.Mesh(
      new THREE.SphereGeometry(1.06, 40, 28),
      new THREE.MeshBasicMaterial({ color: 0xd36a45, transparent: true, opacity: 0.16, side: THREE.BackSide }),
    );
    scene.add(haze);

    const groups: { mesh: THREE.Object3D; orbit: number; speed: number; phase: number }[] = [];

    const ring = (radius: number, color: number, tilt: number) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 140; i++) {
        const a = (i / 140) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * tilt, Math.sin(a) * radius));
      }
      scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 }),
        ),
      );
    };

    MOONS.forEach((moon) => {
      ring(moon.orbit, 0xf0d2b0, 0.04);
      const pivot = new THREE.Object3D();
      const map = new THREE.TextureLoader().load(moon.map);
      map.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false }),
      );
      sprite.scale.set(moon.size, moon.size, 1);
      sprite.position.x = moon.orbit;
      pivot.add(sprite);
      scene.add(pivot);
      groups.push({ mesh: pivot, orbit: moon.orbit, speed: moon.speed, phase: moon.phase });
    });

    const makeProbe = (color: number) => {
      const group = new THREE.Group();
      const hull = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.05, 0.14, 8),
        new THREE.MeshStandardMaterial({ color: 0xe7edf6, metalness: 0.65, roughness: 0.3 }),
      );
      hull.rotation.z = Math.PI / 2;
      const wing = new THREE.BoxGeometry(0.55, 0.01, 0.16);
      const wingMat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.35,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: 0.25,
      });
      const up = new THREE.Mesh(wing, wingMat);
      const down = new THREE.Mesh(wing, wingMat);
      up.position.y = 0.12;
      down.position.y = -0.12;
      group.add(hull, up, down);
      return group;
    };

    ORBITERS.forEach((craft) => {
      ring(craft.orbit, craft.color, 0.18);
      const pivot = new THREE.Object3D();
      pivot.rotation.x = 0.35;
      const probe = makeProbe(craft.color);
      probe.position.x = craft.orbit;
      probe.scale.setScalar(0.85);
      pivot.add(probe);
      scene.add(pivot);
      groups.push({ mesh: pivot, orbit: craft.orbit, speed: craft.speed, phase: craft.phase });
    });

    const labels = document.createElement("div");
    labels.className = "pointer-events-none absolute inset-0 overflow-hidden";
    host.appendChild(labels);
    const tags = [...MOONS, ...ORBITERS].map((item) => {
      const el = document.createElement("div");
      el.className = "absolute whitespace-nowrap font-medium text-white";
      el.innerHTML = `<span style="letter-spacing:.12em;text-transform:uppercase;font-size:12px;background:rgba(0,0,0,.45);border-radius:999px;padding:2px 8px">${item.name}</span>`;
      labels.appendChild(el);
      return el;
    });

    let radius = 6.2;
    let theta = 0.7;
    let phi = 1.1;
    let dragging = false;
    let px = 0;
    let py = 0;
    let frame = 0;
    let onScreen = true;
    let pointerOver = false;
    const started = performance.now();

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(host);

    canvas.addEventListener("pointerdown", (e) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      theta -= (e.clientX - px) * 0.005;
      phi = Math.max(0.35, Math.min(1.5, phi - (e.clientY - py) * 0.004));
      px = e.clientX;
      py = e.clientY;
    });
    const stopDrag = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointercancel", stopDrag);
    canvas.addEventListener("pointerenter", () => {
      pointerOver = true;
    });
    canvas.addEventListener("pointerleave", () => {
      pointerOver = false;
    });

    const onKeyDown = (_e: KeyboardEvent) => {};
    const onKeyUp = (_e: KeyboardEvent) => {};
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const loop = () => {
      frame = requestAnimationFrame(loop);
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h || !onScreen) return;
      const t = (performance.now() - started) / 1000;
      radius = Math.max(2.3, Math.min(14, radius + zoomRef.current * 0.08));
      camera.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
      camera.lookAt(0, 0, 0);
      mars.rotation.y = t * 0.05;
      groups.forEach((item) => {
        item.mesh.rotation.y = t * item.speed + item.phase;
        item.mesh.updateMatrixWorld();
      });
      groups.forEach((item, index) => {
        const world = new THREE.Vector3(item.orbit, 0.2, 0).applyMatrix4(item.mesh.matrixWorld);
        const p = world.clone().project(camera);
        const el = tags[index];
        if (!el) return;
        el.style.display = p.z < 1 ? "block" : "none";
        el.style.left = `${(p.x * 0.5 + 0.5) * w}px`;
        el.style.top = `${(-p.y * 0.5 + 0.5) * h}px`;
        el.style.transform = "translate(-50%, -140%)";
      });
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.dispose();
      host.replaceChildren();
    };
  }, []);

  const hold = (dir: number) => (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    zoomRef.current = dir;
  };
  const release = () => {
    zoomRef.current = 0;
  };

  return (
    <section className="mt-10 rounded-2xl border border-line bg-surface p-4">
      <h2 className="font-display text-2xl">Mars’ın uyduları</h2>
      <div className="mt-1 flex items-start gap-2">
        <p className="text-base text-muted">
          Phobos yakın ve hızlıdır. Deimos uzak ve küçüktür. Renkli araçlar Mars’ın çevresinde döner.
          W yaklaştırır, S geri götürür. Telefonda düğmeye bas.
        </p>
        <SpeakButton text="Phobos yakın ve hızlıdır. Deimos uzak ve küçüktür. Renkli araçlar Mars’ın çevresinde döner. W yaklaştırır, S geri götürür. Telefonda düğmeye bas." />
      </div>
      <div ref={hostRef} className="relative mt-3 h-80 overflow-hidden rounded-xl bg-black md:h-[28rem]" />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onPointerDown={hold(-1)}
          onPointerUp={release}
          onPointerCancel={release}
          className="rounded-2xl bg-accent px-4 py-4 text-lg font-medium text-black"
        >
          Yaklaş
          <span className="mt-1 block text-sm font-normal">W tuşu</span>
        </button>
        <button
          type="button"
          onPointerDown={hold(1)}
          onPointerUp={release}
          onPointerCancel={release}
          className="rounded-2xl border border-line bg-bg px-4 py-4 text-lg font-medium"
        >
          Geri git
          <span className="mt-1 block text-sm font-normal text-muted">S tuşu</span>
        </button>
      </div>
    </section>
  );
}

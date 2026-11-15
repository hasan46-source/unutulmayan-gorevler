import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MARKERS, type Marker } from "@/data/archive";
import { GLOBE_MAPS } from "@/data/photos";

const COLORS: Record<Marker["kind"], number> = {
  c: 0x7db4ff,
  l: 0xe07a45,
  p: 0x5be08a,
};

function latLonToVec(lat: number, lon: number, radius: number) {
  const f = ((lon + 180) * Math.PI) / 180;
  const t = ((90 - lat) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.cos(f) * Math.sin(t),
    radius * Math.cos(t),
    radius * Math.sin(f) * Math.sin(t),
  );
}

function makeTexture(body: "moon" | "mars") {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  if (!g) return new THREE.CanvasTexture(canvas);

  const moon = body === "moon";
  const base = moon ? "#8d8d90" : "#a8582f";
  const dk = moon ? "40,40,46" : "70,30,20";
  const lt = moon ? "220,220,225" : "230,170,130";
  let seed = moon ? 7 : 3;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  const blob = (x: number, y: number, rad: number, col: string, a: number) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, `rgba(${col},${a})`);
    gr.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = gr;
    g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  };

  for (let i = 0; i < 220; i++) {
    blob(rnd() * w, rnd() * h, 18 + rnd() * 70, rnd() < 0.5 ? dk : lt, 0.05 + rnd() * 0.08);
  }

  const crater = (x: number, y: number, rad: number) => {
    const gr = g.createRadialGradient(x - rad * 0.25, y - rad * 0.25, rad * 0.1, x, y, rad);
    gr.addColorStop(0, `rgba(${dk},.45)`);
    gr.addColorStop(0.82, `rgba(${dk},.25)`);
    gr.addColorStop(0.93, `rgba(${lt},.65)`);
    gr.addColorStop(1, `rgba(${lt},0)`);
    g.fillStyle = gr;
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  };

  for (let i = 0; i < (moon ? 700 : 420); i++) {
    crater(rnd() * w, rnd() * h, 2 + rnd() ** 3 * 18);
  }

  if (!moon) {
    g.fillStyle = "rgba(240,240,248,.8)";
    g.fillRect(0, 0, w, 12);
    g.fillRect(0, h - 12, w, 12);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function GlobeView({
  body,
  focusId,
  onPick,
}: {
  body: "moon" | "mars";
  focusId: string | null;
  onPick: (marker: Marker) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x03050c, 1);
    host.appendChild(renderer.domElement);
    renderer.domElement.className = "block h-full w-full cursor-grab touch-none";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.z = 3.15;

    const starPositions = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const radius = 7 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(
      new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, sizeAttenuation: true }),
      ),
    );

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.05);
    sun.position.set(-3, 2, 4);
    scene.add(sun);

    const pivot = new THREE.Object3D();
    const group = new THREE.Object3D();
    pivot.add(group);
    scene.add(pivot);

    const texture = makeTexture(body);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), material);
    group.add(sphere);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      GLOBE_MAPS[body],
      (real) => {
        real.colorSpace = THREE.SRGBColorSpace;
        real.anisotropy = 8;
        material.map = real;
        material.needsUpdate = true;
        texture.dispose();
      },
      undefined,
      () => {},
    );

    const markers = MARKERS.filter((m) => m.body === body);
    const dots: THREE.Mesh[] = [];
    for (const marker of markers) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 12, 10),
        new THREE.MeshBasicMaterial({ color: COLORS[marker.kind] }),
      );
      dot.position.copy(latLonToVec(marker.lat, marker.lon, 1.02));
      dot.userData.marker = marker;
      group.add(dot);
      dots.push(dot);
    }

    group.rotation.y = -Math.PI / 2;
    pivot.rotation.x = 0.25;

    let dragging = false;
    let moved = 0;
    let sx = 0;
    let sy = 0;
    let auto = true;
    let yawTarget = group.rotation.y;
    let pitchTarget = pivot.rotation.x;
    let focusing = false;
    let frame = 0;
    let zoom = 5.6;
    let zoomTarget = 3.15;
    let pending: Marker | null = null;
    let pendingAt = 0;
    const started = performance.now();
    const stars = scene.children.find((child) => child instanceof THREE.Points);

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

    const canvas = renderer.domElement;
    const down = (e: PointerEvent) => {
      dragging = true;
      auto = false;
      focusing = false;
      pending = null;
      zoomTarget = 3.15;
      moved = 0;
      sx = e.clientX;
      sy = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      sx = e.clientX;
      sy = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      group.rotation.y += dx * 0.007;
      pivot.rotation.x = Math.max(-1.2, Math.min(1.2, pivot.rotation.x + dy * 0.007));
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (moved > 6) return;
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(dots)[0];
      const marker = hit?.object.userData.marker as Marker | undefined;
      if (!marker) return;
      const target = Math.PI / 2 - ((marker.lon + 180) * Math.PI) / 180;
      yawTarget = target + 2 * Math.PI * Math.round((group.rotation.y - target) / (2 * Math.PI));
      pitchTarget = Math.max(-1, Math.min(1, (marker.lat * Math.PI) / 180 * 0.7));
      auto = false;
      focusing = true;
      zoomTarget = 2.15;
      pending = marker;
      pendingAt = performance.now();
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", () => {
      dragging = false;
    });

    const api = {
      focus(id: string) {
        const marker = markers.find((m) => m.id === id);
        if (!marker) return;
        const target = Math.PI / 2 - ((marker.lon + 180) * Math.PI) / 180;
        yawTarget = target + 2 * Math.PI * Math.round((group.rotation.y - target) / (2 * Math.PI));
        pitchTarget = Math.max(-1, Math.min(1, (marker.lat * Math.PI) / 180 * 0.7));
        auto = false;
        focusing = true;
      },
    };
    host.dataset.ready = "1";
    (host as HTMLDivElement & { __focus?: (id: string) => void }).__focus = api.focus;

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
    });
    io.observe(host);

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!onScreen) return;
      const elapsed = (performance.now() - started) / 1000;
      const intro = Math.min(1, elapsed / 1.25);
      const ease = 1 - (1 - intro) ** 3;
      if (intro < 1) {
        zoom = 5.6 + (3.15 - 5.6) * ease;
        zoomTarget = 3.15;
      } else {
        zoom += (zoomTarget - zoom) * 0.07;
      }
      camera.position.z = zoom;
      if (stars) stars.rotation.y += 0.00035;
      dots.forEach((dot, index) => {
        const pulse = 1 + Math.sin(elapsed * 2.6 + index * 0.7) * 0.16;
        dot.scale.setScalar(pulse);
      });
      if (focusing) {
        group.rotation.y += (yawTarget - group.rotation.y) * 0.08;
        pivot.rotation.x += (pitchTarget - pivot.rotation.x) * 0.08;
        if (
          Math.abs(yawTarget - group.rotation.y) < 0.004 &&
          Math.abs(pitchTarget - pivot.rotation.x) < 0.004
        ) {
          focusing = false;
        }
      } else if (auto) {
        group.rotation.y += 0.0016;
      }
      if (pending && performance.now() - pendingAt > 720) {
        const picked = pending;
        pending = null;
        zoomTarget = 3.15;
        onPickRef.current(picked);
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      const mat = sphere.material as THREE.MeshLambertMaterial;
      mat.map?.dispose();
      mat.dispose();
      sphere.geometry.dispose();
      for (const dot of dots) {
        dot.geometry.dispose();
        (dot.material as THREE.Material).dispose();
      }
      starGeometry.dispose();
      (scene.children.find((child) => child instanceof THREE.Points)?.material as THREE.Material | undefined)?.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [body]);

  useEffect(() => {
    if (!focusId || !hostRef.current) return;
    const host = hostRef.current as HTMLDivElement & { __focus?: (id: string) => void };
    host.__focus?.(focusId);
  }, [focusId, body]);

  return <div ref={hostRef} className="h-full w-full" />;
}

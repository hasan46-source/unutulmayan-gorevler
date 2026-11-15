import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TIMELINE, type TimelineEvent } from "@/data/timeline";

const PLACE_COLOR: Record<TimelineEvent["place"], number> = {
  moon: 0xe07a45,
  mars: 0xc4553a,
  far: 0x7db4ff,
};

function labelSprite(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const g = canvas.getContext("2d");
  if (!g) return new THREE.Sprite();
  g.fillStyle = "rgba(7,11,22,0.72)";
  g.fillRect(0, 8, 256, 48);
  g.fillStyle = "#e8ecf6";
  g.font = "600 28px sans-serif";
  g.textAlign = "center";
  g.fillText(text, 128, 42);
  const material = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.35, 0.34, 1);
  return sprite;
}

export function TimelineView({
  focusId,
  onPick,
}: {
  focusId: string | null;
  onPick: (event: TimelineEvent) => void;
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
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 2.4, 8);

    const stars = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      stars[i * 3] = (Math.random() - 0.5) * 40;
      stars[i * 3 + 1] = (Math.random() - 0.5) * 16;
      stars[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04 })));
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const span = TIMELINE.length - 1;
    const points: THREE.Vector3[] = TIMELINE.map((event, index) => {
      const x = (index / span) * 14 - 7;
      const y = Math.sin(index * 0.55) * 0.55;
      const z = Math.cos(index * 0.45) * 0.8;
      return new THREE.Vector3(x, y, z);
    });
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 120, 0.025, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x7db4ff }),
    );
    scene.add(tube);

    const dots: THREE.Mesh[] = [];
    TIMELINE.forEach((event, index) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 12),
        new THREE.MeshBasicMaterial({ color: PLACE_COLOR[event.place] }),
      );
      dot.position.copy(points[index]);
      dot.userData.event = event;
      scene.add(dot);
      dots.push(dot);
      const sprite = labelSprite(String(event.year));
      sprite.position.copy(points[index]);
      sprite.position.y += 0.42;
      scene.add(sprite);
    });

    let dragging = false;
    let moved = 0;
    let sx = 0;
    let yaw = 0.15;
    let target = 0.35;
    let frame = 0;
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

    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", (e) => {
      dragging = true;
      moved = 0;
      sx = e.clientX;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx;
      sx = e.clientX;
      moved += Math.abs(dx);
      yaw += dx * 0.005;
    });
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
      const event = hit?.object.userData.event as TimelineEvent | undefined;
      if (!event) return;
      const index = TIMELINE.findIndex((item) => item.id === event.id);
      target = index / span;
      onPickRef.current(event);
    };
    canvas.addEventListener("pointerup", up);

    const api = {
      focus(id: string) {
        const index = TIMELINE.findIndex((item) => item.id === id);
        if (index >= 0) target = index / span;
      },
    };
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
      if (!dragging) target = (target + 0.00035) % 1;
      const along = curve.getPointAt(Math.min(0.98, Math.max(0.02, target)));
      const intro = Math.min(1, elapsed / 1.1);
      const ease = 1 - (1 - intro) ** 3;
      camera.position.x += (along.x + Math.sin(yaw) * 2.2 - camera.position.x) * 0.06;
      camera.position.y += (2.1 * ease + along.y - camera.position.y) * 0.06;
      camera.position.z += (6.2 - camera.position.z) * 0.04;
      camera.lookAt(along.x, along.y, along.z);
      dots.forEach((dot, index) => {
        const pulse = 1 + Math.sin(elapsed * 2.4 + index) * 0.12;
        dot.scale.setScalar(pulse);
      });
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((item) => item.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (!focusId || !hostRef.current) return;
    const host = hostRef.current as HTMLDivElement & { __focus?: (id: string) => void };
    host.__focus?.(focusId);
  }, [focusId]);

  return <div ref={hostRef} className="h-full w-full" />;
}

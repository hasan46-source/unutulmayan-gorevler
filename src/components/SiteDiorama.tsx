import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Marker } from "@/data/archive";
import { SITE_PHOTOS } from "@/data/photos";

function addBox(
  scene: THREE.Scene,
  w: number,
  h: number,
  d: number,
  color: number,
  x: number,
  y: number,
  z: number,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color }),
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

export function SiteDiorama({ marker }: { marker: Marker }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(marker.body === "moon" ? 0x070910 : 0x140804);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const sun = new THREE.DirectionalLight(0xfff4e0, 1.15);
    sun.position.set(6, 10, 4);
    scene.add(sun);

    const groundColor = marker.body === "moon" ? 0x6e6e74 : 0x8a4630;
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(7, 48),
      new THREE.MeshLambertMaterial({ color: groundColor }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const photoUrl = SITE_PHOTOS[marker.id];
    if (photoUrl) {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(photoUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const image = tex.image as { width?: number; height?: number };
        const aspect = image.width && image.height ? image.width / image.height : 1.5;
        const height = 1.7;
        const board = new THREE.Mesh(
          new THREE.PlaneGeometry(height * aspect, height),
          new THREE.MeshBasicMaterial({ map: tex }),
        );
        board.position.set(0, 1.05, -0.4);
        scene.add(board);
      });
    }

    const apollo15 = marker.id === "a15";
    if (apollo15) {
      addBox(scene, 0.7, 0.42, 0.7, 0xd7d7dc, 0, 0.55, 0);
      addBox(scene, 0.9, 0.16, 0.9, 0xc4a15a, 0, 0.28, 0);
      for (const [x, z] of [
        [0.38, 0.38],
        [-0.38, 0.38],
        [0.38, -0.38],
        [-0.38, -0.38],
      ] as const) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.05, 0.46, 8),
          new THREE.MeshLambertMaterial({ color: 0x9a9aa2 }),
        );
        leg.position.set(x, 0.23, z);
        scene.add(leg);
        const pad = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.03, 10),
          new THREE.MeshLambertMaterial({ color: 0x77777e }),
        );
        pad.position.set(x, 0.02, z);
        scene.add(pad);
      }
      addBox(scene, 0.55, 0.18, 0.85, 0xe8e8ee, 1.45, 0.16, 0.35);
      for (const [x, z] of [
        [1.22, 0.05],
        [1.68, 0.05],
        [1.22, 0.65],
        [1.68, 0.65],
      ] as const) {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.08, 12),
          new THREE.MeshLambertMaterial({ color: 0x222228 }),
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.1, z);
        scene.add(wheel);
      }
      const rille = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.18, 4.2),
        new THREE.MeshLambertMaterial({ color: 0x3a3a42 }),
      );
      rille.position.set(-1.7, 0.02, 0.2);
      scene.add(rille);
    } else if (marker.kind === "c") {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.18, 12, 40),
        new THREE.MeshLambertMaterial({ color: marker.body === "moon" ? 0x55555c : 0x6a3324 }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.05;
      scene.add(ring);
      const bowl = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshLambertMaterial({
          color: marker.body === "moon" ? 0x4a4a50 : 0x5c2c1c,
          side: THREE.BackSide,
        }),
      );
      bowl.rotation.x = Math.PI;
      bowl.position.y = 0.02;
      scene.add(bowl);
    } else {
      addBox(scene, 0.55, 0.7, 0.55, 0xd0d0d6, 0, 0.45, 0);
      addBox(scene, 0.85, 0.12, 0.85, 0xb8944e, 0, 0.08, 0);
      if (marker.kind === "l") {
        addBox(scene, 0.7, 0.16, 1.05, 0xe4e4ea, 1.3, 0.14, 0.2);
      } else {
        const beacon = new THREE.Mesh(
          new THREE.ConeGeometry(0.18, 0.55, 8),
          new THREE.MeshLambertMaterial({ color: 0x5be08a }),
        );
        beacon.position.set(1.1, 0.28, 0);
        scene.add(beacon);
      }
    }

    let frame = 0;
    let drag = false;
    let yaw = 0.6;
    let pitch = 0.55;
    let px = 0;
    let py = 0;

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
    canvas.className = "block h-full w-full cursor-grab touch-none";
    canvas.addEventListener("pointerdown", (e) => {
      drag = true;
      px = e.clientX;
      py = e.clientY;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!drag) return;
      yaw += (e.clientX - px) * 0.008;
      pitch = Math.max(0.25, Math.min(1.15, pitch + (e.clientY - py) * 0.006));
      px = e.clientX;
      py = e.clientY;
    });
    const end = () => {
      drag = false;
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointerleave", end);

    const born = performance.now();
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!drag) yaw += 0.003;
      const t = Math.min(1, (performance.now() - born) / 900);
      const ease = 1 - (1 - t) ** 3;
      const near = apollo15 ? 5.2 : 4.4;
      const r = near + (1 - ease) * 3.4;
      camera.position.set(Math.sin(yaw) * r, 1.1 + pitch * 1.6, Math.cos(yaw) * r);
      camera.lookAt(0, 0.25, 0);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      canvas.remove();
    };
  }, [marker]);

  return <div ref={hostRef} className="h-72 w-full overflow-hidden rounded-xl bg-bg md:h-80" />;
}

import { useEffect, useRef } from "react";

export function BackdropCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = "/moon-space.png";
    let frame = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      if (!img.complete || !img.naturalWidth) return;
      const ratio = img.naturalWidth / img.naturalHeight;
      const view = w / h;
      let dw = w;
      let dh = h;
      let dx = 0;
      let dy = 0;
      if (ratio > view) {
        dh = h;
        dw = h * ratio;
        dx = (w - dw) / 2;
      } else {
        dw = w;
        dh = w / ratio;
        dy = (h - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    img.onload = draw;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}

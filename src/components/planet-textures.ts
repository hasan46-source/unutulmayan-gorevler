/** Eşlekli gezegen dokuları. Küçük ekranda da okunur, küreye sarılır. */

function noise(x: number, y: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) throw new Error("canvas");
  return { c, g };
}

export function sunTexture() {
  const { c, g } = canvas(512, 256);
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, "#fff4c4");
  grd.addColorStop(0.45, "#ffb03a");
  grd.addColorStop(1, "#ff7a18");
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 80; i++) {
    g.fillStyle = `rgba(255,255,255,${0.04 + (i % 5) * 0.02})`;
    g.fillRect(0, (i * 7) % 256, 512, 2 + (i % 3));
  }
  return c;
}

export function earthTexture() {
  const { c, g } = canvas(1024, 512);
  const ocean = g.createLinearGradient(0, 0, 0, 512);
  ocean.addColorStop(0, "#d8f2ff");
  ocean.addColorStop(0.18, "#1d6dff");
  ocean.addColorStop(0.5, "#0b3f9a");
  ocean.addColorStop(0.82, "#1d6dff");
  ocean.addColorStop(1, "#f4fbff");
  g.fillStyle = ocean;
  g.fillRect(0, 0, 1024, 512);
  g.fillStyle = "#f7fbff";
  g.fillRect(0, 0, 1024, 36);
  g.fillRect(0, 476, 1024, 36);
  const land = "#3d9a45";
  const dry = "#c4a15a";
  const blot = (x: number, y: number, rx: number, ry: number, color: string) => {
    g.fillStyle = color;
    g.beginPath();
    g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    g.fill();
  };
  blot(180, 150, 70, 40, land);
  blot(250, 190, 90, 55, land);
  blot(300, 250, 40, 70, land);
  blot(520, 170, 120, 70, land);
  blot(560, 230, 80, 40, dry);
  blot(700, 200, 90, 50, land);
  blot(760, 160, 50, 30, land);
  blot(430, 340, 40, 55, land);
  blot(860, 360, 70, 40, dry);
  blot(140, 360, 50, 30, land);
  g.globalAlpha = 0.35;
  g.fillStyle = "#ffffff";
  for (let i = 0; i < 18; i++) {
    blot(80 + ((i * 97) % 900), 80 + ((i * 53) % 340), 30 + (i % 4) * 8, 10, "#fff");
  }
  g.globalAlpha = 1;
  return c;
}

export function marsTexture() {
  const { c, g } = canvas(1024, 512);
  g.fillStyle = "#c4553a";
  g.fillRect(0, 0, 1024, 512);
  for (let y = 0; y < 512; y += 4) {
    for (let x = 0; x < 1024; x += 4) {
      const n = noise(x, y);
      g.fillStyle = n > 0.72 ? "#8d2e22" : n < 0.18 ? "#e7a07a" : "transparent";
      if (g.fillStyle !== "transparent") g.fillRect(x, y, 4, 4);
    }
  }
  g.fillStyle = "#f2efe8";
  g.fillRect(0, 0, 1024, 28);
  g.fillRect(0, 488, 1024, 24);
  g.fillStyle = "#6e241c";
  g.fillRect(360, 250, 220, 8);
  return c;
}

export function jupiterTexture() {
  const { c, g } = canvas(1024, 512);
  const colors = ["#f4e7cf", "#d7a56a", "#f7f3ea", "#c4844e", "#efe0c4", "#a86a3d", "#f3e6cf", "#8d5a32"];
  colors.forEach((color, i) => {
    g.fillStyle = color;
    g.fillRect(0, i * 64, 1024, 64);
  });
  g.fillStyle = "#b94a32";
  g.beginPath();
  g.ellipse(640, 300, 46, 28, 0, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 0.25;
  g.fillStyle = "#fff";
  for (let i = 0; i < 40; i++) g.fillRect((i * 80) % 1024, 40 + (i % 6) * 70, 50, 6);
  g.globalAlpha = 1;
  return c;
}

export function saturnTexture() {
  const { c, g } = canvas(1024, 512);
  ["#f6edd4", "#e4d2a4", "#fbf6ea", "#d9c28a", "#f3e6c4", "#cbb98a"].forEach((color, i) => {
    g.fillStyle = color;
    g.fillRect(0, i * 86, 1024, 86);
  });
  return c;
}

export function cloudTexture() {
  const { c, g } = canvas(1024, 512);
  g.clearRect(0, 0, 1024, 512);
  g.fillStyle = "rgba(255,255,255,0.55)";
  for (let i = 0; i < 26; i++) {
    g.beginPath();
    g.ellipse((i * 137) % 1024, (i * 90) % 512, 40 + (i % 5) * 10, 12, 0, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

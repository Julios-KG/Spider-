import { useEffect, useRef } from "react";

// ---------- Ciudad (arte original, procedural) ----------
function rng(seed: number) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

export function Skyline({ seed, fill, lit, minH, maxH }: { seed: number; fill: string; lit: boolean; minH: number; maxH: number }) {
  const r = rng(seed);
  const items: JSX.Element[] = [];
  let x = 0, k = 0;
  while (x < 1600) {
    const w = 60 + r() * 90, h = minH + r() * (maxH - minH);
    items.push(<rect key={k++} x={x} y={600 - h} width={w} height={h} fill={fill} />);
    if (lit) for (let wy = 600 - h + 14; wy < 580; wy += 24) for (let wx = x + 8; wx < x + w - 10; wx += 18)
      if (r() > 0.78) items.push(<rect key={k++} x={wx} y={wy} width={7} height={10} fill="#d4a95a" opacity={0.75} />);
    x += w + 2;
  }
  return <svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">{items}</svg>;
}

export function Rain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0, w = 0, h = 0;
    const drops = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), l: 10 + Math.random() * 18, s: 0.012 + Math.random() * 0.02 }));
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    size(); addEventListener("resize", size);
    const loop = () => {
      ctx.clearRect(0, 0, w, h); ctx.strokeStyle = "rgba(190,210,255,.35)"; ctx.lineWidth = 1; ctx.beginPath();
      for (const d of drops) {
        const px = d.x * w, py = d.y * h; ctx.moveTo(px, py); ctx.lineTo(px - 3, py + d.l);
        d.y += d.s; d.x -= 0.0008; if (d.y > 1) { d.y = -0.05; d.x = Math.random(); }
      }
      ctx.stroke(); id = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(id); removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}

// ---------- Héroe arácnido original (homenaje, no es arte oficial) ----------
const RED = "#d9232b", BLUE = "#17338f";
export function Hero() {
  return (
    <svg viewBox="0 0 300 340" className="w-[min(70vw,300px)]" role="img" aria-label="Silueta de un héroe arácnido agachado sobre una azotea">
      <rect x="0" y="300" width="300" height="40" fill="#05070f" />
      <rect x="0" y="296" width="300" height="6" fill="#1b2147" />
      <path d="M95 300 L120 230 L170 235 L205 300 Z" fill={BLUE} />
      <path d="M110 232 C100 170 135 130 160 130 C190 130 205 170 190 235 Z" fill={RED} />
      <path d="M150 140 L150 232 M125 160 L180 160 M122 190 L185 190 M132 215 L178 215" stroke="#0007" strokeWidth="2" fill="none" />
      <path d="M150 168 l-14 -10 l14 6 l14 -6 z M150 168 l0 24" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M185 160 L240 200 L222 215 L176 185 Z" fill={RED} />
      <path d="M120 165 L70 215 L90 230 L128 190 Z" fill={BLUE} />
      <circle cx="158" cy="108" r="30" fill={RED} />
      <path d="M140 102 q10 -10 14 4 q-6 10 -16 2 z M176 102 q-10 -10 -14 4 q6 10 16 2 z" fill="#fff" stroke="#111" strokeWidth="3" />
      <path d="M158 80 v56 M132 96 q26 10 52 0 M130 114 q28 8 56 0" stroke="#0006" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function Swinger() {
  return (
    <svg viewBox="0 0 90 140" className="swinger" aria-hidden="true" overflow="visible">
      <path d="M62 36 L230 -260" stroke="#fff" strokeWidth="1.5" opacity=".7" />
      <circle cx="45" cy="26" r="14" fill={RED} />
      <path d="M32 40 L58 40 L66 88 L24 88 Z" fill={RED} />
      <path d="M26 88 L22 124 M62 88 L70 120" stroke={BLUE} strokeWidth="9" strokeLinecap="round" />
      <path d="M58 44 L66 30" stroke={RED} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

// ---------- Ramo ----------
const roses = [
  [200, 130, 1.25, 0], [130, 175, 1.05, -18], [270, 175, 1.05, 18], [90, 245, 0.9, -28],
  [310, 245, 0.9, 28], [165, 235, 1, -8], [235, 235, 1, 8],
];
function Rose({ x, y, s, r }: { x: number; y: number; s: number; r: number }) {
  return (
    <g className="rose">
      <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} rx="26" ry="36" cy="-14" transform={`rotate(${a})`} fill="#8e0f1c" stroke="#4d0710" strokeWidth="1.5" />)}
        {[36, 108, 180, 252, 324].map((a) => <ellipse key={a} rx="19" ry="27" cy="-8" transform={`rotate(${a})`} fill="#c8102e" stroke="#6e0a15" strokeWidth="1.2" />)}
        <circle r="12" fill="#e23a4e" />
        <path d="M-9 0a9 9 0 1 1 9 9a15 15 0 1 1 -15 -15" fill="none" stroke="#6e0a15" strokeWidth="2.5" />
      </g>
    </g>
  );
}
export function Bouquet() {
  return (
    <svg viewBox="0 0 400 480" className="bouquet pulse" role="img" aria-label="Ramo de rosas rojas">
      {roses.map(([x, y], i) => <path key={i} d={`M${x} ${y} Q${(x + 200) / 2} 330 200 410`} stroke="#1f5a2e" strokeWidth="6" fill="none" />)}
      {[[110, 300, -30], [290, 300, 30], [150, 330, -50], [250, 330, 50]].map(([x, y, a], i) => <ellipse key={i} cx={x} cy={y} rx="14" ry="38" transform={`rotate(${a} ${x} ${y})`} fill="#1f6b36" />)}
      {roses.map(([x, y, s, r], i) => <Rose key={i} x={x} y={y} s={s} r={r} />)}
      <path d="M95 300 L305 300 L225 460 L175 460 Z" fill="#f3e3c3" stroke="#d4a95a" strokeWidth="2" />
      <path d="M180 345 L220 345 L225 365 L175 365 Z" fill="#c8102e" />
    </svg>
  );
}

export function Petals() {
  const n = 26;
  return (
    <div className="petals" id="petals" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, ["--d" as string]: `${9 + (i % 6)}s`, ["--l" as string]: `${-(i * 0.7)}s`, ["--x" as string]: `${(i % 2 ? 1 : -1) * (30 + (i % 5) * 18)}px`, opacity: 0.6 + (i % 4) * 0.1 }} />
      ))}
    </div>
  );
}

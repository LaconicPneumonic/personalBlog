import { useEffect, useRef } from "react";

type Props = {
  height?: number;
  rows?: number;
  peaks?: number;
  dotRadius?: number;
};

const TAU = Math.PI * 2;

// Same color scale the OG cover generator uses (d3.interpolateSinebow).
function sinebow(t: number): string {
  const T = (0.5 - t) * Math.PI;
  const r = 255 * Math.sin(T) ** 2;
  const g = 255 * Math.sin(T + Math.PI / 3) ** 2;
  const b = 255 * Math.sin(T + (2 * Math.PI) / 3) ** 2;
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

// The site's OG-cover art, drawn live: rows of cosine waves inside a
// circular envelope, one sinebow color per row.
export default function SinebowBand({
  height = 132,
  rows = 13,
  peaks = 3,
  dotRadius = 2.1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phase = 0;
    let frame = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = Math.max(40, Math.floor(w / 8));
      for (let j = 0; j < rows; j++) {
        const t = j / (rows - 1);
        ctx.fillStyle = sinebow(t);
        const baseY = h * 0.5 + (t - 0.5) * h * 0.62;
        for (let i = 0; i <= n; i++) {
          const x = i / n;
          const env = Math.sqrt(Math.max(0, 1 - (2 * x - 1) ** 2));
          const y =
            baseY + env * h * 0.3 * Math.cos(peaks * TAU * x + phase + j * 0.35);
          ctx.beginPath();
          ctx.arc(x * w, y, dotRadius, 0, TAU);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      phase += 0.006;
      draw();
      frame = requestAnimationFrame(tick);
    };

    draw();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion) frame = requestAnimationFrame(tick);

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [rows, peaks, dotRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block w-full"
      style={{ height }}
    />
  );
}

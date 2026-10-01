import { useRef, useState } from "react";
// Pad ambiental generado con WebAudio (sin archivos). Sustituye por una pista con licencia si lo prefieres.
export function useAmbient() {
  const [on, setOn] = useState(false);
  const ref = useRef<{ ctx: AudioContext; g: GainNode } | null>(null);
  const toggle = () => {
    if (!ref.current) {
      const ctx = new AudioContext();
      const g = ctx.createGain();
      g.gain.value = 0;
      g.connect(ctx.destination);
      [110, 220, 277.18, 329.63, 440].forEach((f, i) => {
        const o = ctx.createOscillator();
        const og = ctx.createGain();
        o.type = "sine"; o.frequency.value = f; o.detune.value = i * 4; og.gain.value = 0.045;
        o.connect(og).connect(g); o.start();
      });
      ref.current = { ctx, g };
    }
    const { ctx, g } = ref.current;
    g.gain.cancelScheduledValues(ctx.currentTime);
    if (!on) { ctx.resume(); g.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 2); }
    else g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    setOn(!on);
  };
  return { on, toggle };
}

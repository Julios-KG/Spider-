import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Bouquet, Hero, Petals, Rain, Skyline, Swinger } from "./art";
import { useAmbient } from "./audio";

gsap.registerPlugin(ScrollTrigger);

const Words = ({ t }: { t: string }) => (
  <>{t.split(" ").map((w, i) => <span key={i} className="w inline-block">{w}</span>)}</>
);
const journey = [
  "Hay ciudades que nunca duermen.",
  "Y entre tantas luces, tu nombre sigue siendo mi favorito.",
  "He cruzado azoteas, lluvia y silencio…",
  "…solo para llegar hasta donde estás tú.",
];
const poem = [
  "Isabel, no necesitas poderes",
  "para saber que ctodo lo puedes hacer.",
  "Si el mundo gira, que gire:",
  "Por que eres una super Spider-Gwen.",
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { on, toggle } = useAmbient();

  useEffect(() => {
    document.documentElement.classList.toggle("locked", !started);
  }, [started]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ ok: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      if ((ctx.conditions as { reduce: boolean }).reduce) {
        root.current?.classList.add("calm");
        gsap.set(".warm", { opacity: 0.85 });
        return;
      }
      gsap.from(".intro-in", { opacity: 0, y: 30, duration: 1.4, stagger: 0.35, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el.querySelectorAll(".w"), {
          opacity: 0, y: 24, filter: "blur(8px)", stagger: 0.07, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        }));
      const whole = { trigger: "main", start: "top top", end: "bottom bottom", scrub: true };
      gsap.to(".far", { yPercent: -8, ease: "none", scrollTrigger: whole });
      gsap.to(".near", { yPercent: -22, ease: "none", scrollTrigger: whole });
      gsap.to(".cam", { scale: 1.18, ease: "none", transformOrigin: "50% 100%", scrollTrigger: whole });
      const toRomance = { trigger: "#romance", start: "top 85%", end: "top 25%", scrub: true };
      gsap.to(".warm", { opacity: 1, ease: "none", scrollTrigger: toRomance });
      gsap.to([".rain", ".city"], { opacity: 0.1, ease: "none", scrollTrigger: toRomance });
      gsap.to(".glow", { opacity: 1, ease: "none", scrollTrigger: { trigger: "#reveal", start: "top 70%", end: "top 20%", scrub: true } });
      ScrollTrigger.create({ trigger: "#reveal", start: "top 60%", end: "bottom top",
        onToggle: (s) => document.getElementById("petals")?.classList.toggle("on", s.isActive) });

      const tl = gsap.timeline({ scrollTrigger: { trigger: "#journey", start: "top top", end: "+=400%", pin: true, scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>(".msg").forEach((m) =>
        tl.fromTo(m, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }).to(m, { opacity: 0, y: -40, duration: 1 }, ">+0.8"));
      const total = tl.duration();
      tl.fromTo(".swinger", { x: "-15vw" }, { x: "105vw", ease: "none", duration: total }, 0);
      tl.to(".swinger", { keyframes: { y: ["55vh", "18vh", "52vh", "15vh", "50vh"], rotation: [-25, 20, -25, 20, -25], easeEach: "sine.inOut" }, duration: total, ease: "none" }, 0);
      tl.to(".web path", { strokeDashoffset: 0, stagger: total / 8, duration: 1.2 }, 0);

      gsap.from(".rose", { scale: 0, opacity: 0, svgOrigin: "200 400", stagger: 0.15, duration: 1.1, ease: "back.out(1.6)",
        scrollTrigger: { trigger: "#reveal", start: "top 55%" } });
    });
    return () => mm.revert();
  }, []);

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => document.getElementById("hero")?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };
  const replay = () => {
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div ref={root}>
      <div className="sky" aria-hidden="true" />
      <div className="warm" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="layer cam city"><div className="far h-full"><Skyline seed={7} fill="#0b1436" lit={false} minH={200} maxH={420} /></div></div>
      <div className="layer cam city"><div className="near h-full"><Skyline seed={21} fill="#04060d" lit minH={140} maxH={340} /></div></div>
      <Rain />
      <Petals />
      <button className="audio" onClick={toggle} aria-pressed={on} aria-label={on ? "Silenciar música ambiental" : "Activar música ambiental"}>
        {on ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

      <main>
        <section id="intro">
          <h1 className="title intro-in text-[clamp(4rem,16vw,10rem)]">Spider<span className="text-web">-</span>Love</h1>
          <p className="lead intro-in my-8">Hay una sorpresa esperándote.</p>
          <button className="btn intro-in" onClick={start}>Descubrir mi sorpresa</button>
        </section>

        <section id="hero">
          <div className="fade reveal"><Hero /></div>
          <p className="lead reveal mt-8"><Words t="Dicen que los héroes siempre llegan a tiempo, pero hay alguien por quien valdría la pena cruzar toda la ciudad." /></p>
        </section>

        <section id="journey" aria-label="Recorrido por la ciudad">
          <svg className="web" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {["M0 10 L50 55", "M100 8 L52 55", "M0 90 L48 58", "M100 92 L50 58", "M50 0 L50 55", "M10 50 Q50 70 90 50"].map((d, i) => (
              <path key={i} d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <Swinger />
          {journey.map((t) => <div className="msg" key={t}><p className="lead">{t}</p></div>)}
        </section>

        <section id="romance">
          <p className="lead reveal"><Words t="Hay personas que llegan a nuestra vida y, sin darse cuenta, se convierten en nuestra parte favorita de la historia." /></p>
        </section>

        <section id="reveal" aria-label="Ramo de rosas">
          <Bouquet />
        </section>

        <section id="dedication">
          <h2 className="title reveal text-[clamp(3rem,12vw,6rem)]"><Words t="Para Isabel," /></h2>
          <div className="poem reveal my-8 space-y-2 text-[clamp(1.25rem,3.6vw,1.7rem)] italic">
            {poem.map((l) => <p key={l}><Words t={l} /></p>)}
          </div>
          <p className="signature reveal"><Words t="Julio" /></p>
          <button className="btn gold mt-12 inline-flex items-center gap-3" onClick={replay}>
            <RotateCcw size={20} aria-hidden="true" /> Volver a vivir la historia
          </button>
        </section>
      </main>
    </div>
  );
}

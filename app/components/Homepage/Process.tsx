"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Discovery",
    body: "We partner with you to understand your vision, goals, and audience — mapping the creative foundation before anything else.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Research, moodboards, and direction. We chart the path forward with clarity and purpose.",
  },
  {
    n: "03",
    title: "Design",
    body: "From sketches to polished visuals — every detail shaped with intention, proportion, and care.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "Final files, guidelines, and assets — everything packaged and ready for launch. On your terms.",
  },
];

const Process = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const line = wrap.querySelector<HTMLElement>(".progress-line");
    const nodes = wrap.querySelectorAll<HTMLElement>(".node-circle");
    const rings = wrap.querySelectorAll<HTMLElement>(".node-ring");
    const panels = wrap.querySelectorAll<HTMLElement>(".step-panel");

    let prev = -1;

    // Refresh after layout settles (fonts, images, hydration)
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
        onUpdate: (self) => {
          const p = self.progress;

          // Progress line — direct DOM, no transition
          if (line) line.style.width = `${p * 100}%`;

          // Active step
          const step = Math.min(steps.length - 1, Math.floor(p * steps.length));

          if (step === prev) return;
          prev = step;

          // Nodes — GSAP tween for smooth fill
          nodes.forEach((node, i) => {
            const filled = i <= step;
            gsap.to(node, {
              backgroundColor: filled ? "#ffffff" : "transparent",
              color: filled ? "#000000" : "rgba(255,255,255,0.3)",
              borderColor: filled ? "#ffffff" : "rgba(255,255,255,0.15)",
              duration: 0.35,
              overwrite: true,
            });
          });

          // Rings
          rings.forEach((ring, i) => {
            gsap.to(ring, {
              borderColor:
                i === step ? "rgba(255,255,255,0.12)" : "transparent",
              scale: i === step ? 1 : 0.6,
              duration: 0.35,
              overwrite: true,
            });
          });

          // Panels — crossfade
          panels.forEach((panel, i) => {
            if (i === step) {
              gsap.to(panel, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                overwrite: true,
              });
              panel.style.pointerEvents = "auto";
            } else {
              gsap.to(panel, {
                opacity: 0,
                y: 10,
                duration: 0.25,
                overwrite: true,
              });
              panel.style.pointerEvents = "none";
            }
          });
        },
      });
    }, wrap);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[300vh] bg-ink">
      <section className="sticky top-0 h-screen text-ecru flex flex-col items-center justify-center px-[5vw] overflow-hidden">
        {/* Tag */}
        <span className="tag-pill text-ecru/30 border-ecru/15 mb-8">
          Process
        </span>

        {/* Heading */}
        <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-light tracking-[-0.04em] leading-[0.95] text-center mb-28">
          From idea to launch
          <br />
          <span className="text-ecru/20">we got you covered</span>
        </h2>

        {/* Timeline */}
        <div className="w-full max-w-5xl">
          {/* Nodes + connecting line */}
          <div className="relative flex items-center justify-between mb-20">
            {/* Background line */}
            <div className="absolute top-1/2 left-[5%] right-[5%] h-px bg-ecru/10 -translate-y-1/2" />

            {/* Progress line */}
            <div
              className="progress-line absolute top-1/2 left-[5%] h-px -translate-y-1/2 w-0 max-w-[90%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,248,238,0.5), rgba(255,248,238,0.25))",
              }}
            />

            {/* Step nodes */}
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative z-10 flex flex-col items-center">
                {/* Outer ring */}
                <div
                  className="node-ring absolute rounded-full w-14 h-14 border border-transparent top-1/2 left-1/2"
                  style={{ transform: "translate(-50%, -50%) scale(0.6)" }}
                />

                {/* Node circle */}
                <div className="node-circle w-10 h-10 rounded-full flex items-center justify-center text-[11px] tracking-[0.15em] font-medium bg-transparent text-[rgba(255,248,238,0.3)] border border-[rgba(255,248,238,0.15)]">
                  {s.n}
                </div>
              </div>
            ))}
          </div>

          {/* Step content — crossfade */}
          <div className="relative h-35 flex justify-center">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`step-panel absolute inset-0 flex flex-col items-center text-center ${
                  i === 0
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2.5 pointer-events-none"
                }`}>
                <h3 className="text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-[-0.03em] leading-none mb-5">
                  {s.title}
                </h3>
                <p className="text-sm leading-[1.8] text-ecru/45 max-w-[44ch]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;

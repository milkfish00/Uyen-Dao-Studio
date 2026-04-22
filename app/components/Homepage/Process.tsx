"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const steps = [
  {
    n: "01",
    title: "Ideation",
    body: "You have an idea — rough, unformed, maybe just a feeling. That's where we start. No pitch decks, no big-agency pressure. Just you, your vision, and room to think out loud.",
  },
  {
    n: "02",
    title: "Sketching",
    body: "Ideas need to be drawn before they can be built. I translate your concept into early sketches — exploring form, proportion, and function without committing to anything permanent yet.",
  },
  {
    n: "03",
    title: "Prototyping",
    body: "Cardboard, foam, paper — the first physical version of your idea doesn't need to be perfect. It just needs to exist. I help you build your first tangible object on a real-world budget.",
  },
  {
    n: "04",
    title: "Concept",
    body: "A refined concept ready to take the next step — whether that's a manufacturer, an investor, or simply proof that your idea is real. You started with nothing. Now you have something.",
  },
];

const StarSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -622 754 754"
    width="100%"
    height="100%">
    <g transform="translate(-51,-341)">
      <path
        d="m 396,473 h 64 V 174 L 672,385 717,340 506,128 H 805 V 64 H 506 L 717,-147 672,-193 460,18 V -281 H 396 V 18 L 184,-193 138,-147 350,64 H 51 v 64 h 299 l -212,212 46,45 212,-211 c 0,0 0,299 0,299 z"
        fill="white"
      />
    </g>
  </svg>
);

const Process = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const nodesContainerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Heading slide-up animation
  useEffect(() => {
    const el = headingRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: wrap,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const mover = moverRef.current;
    const nodesContainer = nodesContainerRef.current;
    if (!wrap || !mover || !nodesContainer) return;

    const nodes = nodesContainer.querySelectorAll<HTMLElement>(".node-circle");
    const rings = wrap.querySelectorAll<HTMLElement>(".node-ring");
    const panels = wrap.querySelectorAll<HTMLElement>(".step-panel");

    let prevStep = -1;
    let ctx = gsap.context(() => {});

    const calculateAndAnimate = () => {
      ctx.revert();
      prevStep = -1;

      const firstNode = nodes[0];
      if (!firstNode) return;

      const firstRect = firstNode.getBoundingClientRect();
      const containerRect = nodesContainer.getBoundingClientRect();

      // Position mover at center of first node
      mover.style.left = `${firstRect.left - containerRect.left + firstRect.width / 2}px`;
      mover.style.top = `${firstRect.top - containerRect.top + firstRect.height / 2}px`;
      mover.style.transform = "translate(-50%, -50%)";

      const startX = firstRect.left + firstRect.width / 2;
      const startY = firstRect.top + firstRect.height / 2;
      const points: { x: number; y: number }[] = [];

      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i];
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        points.push({
          x: centerX - startX,
          y: centerY - startY,
        });
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => "+=" + window.innerHeight * 3,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1.2,
            onUpdate: (self) => {
              const p = self.progress;
              const step = Math.min(
                steps.length - 1,
                Math.floor(p * steps.length),
              );

              if (step !== prevStep) {
                prevStep = step;

                nodes.forEach((node, i) => {
                  const filled = i <= step;
                  gsap.to(node, {
                    backgroundColor: filled ? "#ffffff" : "transparent",
                    color: filled
                      ? "var(--color-red)"
                      : "rgba(255,255,255,0.4)",
                    borderColor: filled ? "#ffffff" : "rgba(255,255,255,0.25)",
                    duration: 0.3,
                    overwrite: true,
                  });
                });

                rings.forEach((ring, i) => {
                  gsap.to(ring, {
                    borderColor:
                      i === step ? "rgba(255,255,255,0.2)" : "transparent",
                    scale: i === step ? 1 : 0.6,
                    duration: 0.3,
                    overwrite: true,
                  });
                });

                panels.forEach((panel, i) => {
                  if (i === step) {
                    gsap.to(panel, {
                      opacity: 1,
                      y: 0,
                      duration: 0.3,
                      overwrite: true,
                    });
                    (panel as HTMLElement).style.pointerEvents = "auto";
                  } else {
                    gsap.to(panel, {
                      opacity: 0,
                      y: 10,
                      duration: 0.25,
                      overwrite: true,
                    });
                    (panel as HTMLElement).style.pointerEvents = "none";
                  }
                });
              }
            },
          },
        });

        tl.to(
          mover,
          {
            duration: 1,
            ease: "none",
            motionPath: {
              path: points,
              curviness: isDesktop ? 0 : 1.8, // straight line for horizontal
            },
          },
          0,
        );
      }, wrap);
    };

    // Double rAF: wait for React to flush the isDesktop layout change to DOM
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        calculateAndAnimate();
        ScrollTrigger.refresh();
      });
    });

    const handleResize = () => {
      calculateAndAnimate();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      ctx.revert();
    };
  }, [isDesktop]);

  return (
    <div id="process" ref={wrapRef} className="relative bg-red">
      <section className="h-screen text-white flex flex-col items-center justify-center px-[5vw] pt-16 md:pt-0 overflow-hidden">
        <div ref={headingRef} className="relative inline-block mb-2 md:mb-16">
          <h2
            className="flex flex-col items-center text-center justify-center uppercase text-[clamp(1rem,5.5vw,7rem)] tracking-[-0.05em] font-bold leading-none"
            aria-label="Big ideas, small budget, real results">
            <div className="flex flex-nowrap md:flex-wrap justify-center gap-x-[0.25em]">
              {["Big", "ideas,"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="block heading-word text-white">{word}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-nowrap md:flex-wrap justify-center gap-x-[0.25em]">
              {["small", "budget."].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="block heading-word text-white/40">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </h2>
        </div>

        {/* extra spacing between heading and steps */}
        <div className="mt-6 md:mt-24 w-full max-w-5xl">
          {/* Steps row: vertical on mobile, horizontal on desktop */}
          <div
            ref={nodesContainerRef}
            className={`relative flex ${
              isDesktop
                ? "flex-row justify-between"
                : "flex-col items-center gap-16"
            } py-4`}>
            {/* Connecting line: vertical on mobile, horizontal on desktop */}
            <div
              className={`absolute bg-white/20 ${
                isDesktop
                  ? "top-1/2 left-0 right-0 h-px -translate-y-1/2"
                  : "left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              }`}
            />

            {steps.map((s) => (
              <div
                key={s.n}
                className="relative z-10 flex flex-col items-center">
                <div
                  className="node-ring absolute rounded-full w-8 h-8 md:w-14 md:h-14 border border-transparent top-1/2 left-1/2"
                  style={{ transform: "translate(-50%, -50%) scale(0.6)" }}
                />
                <div className="node-circle w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[9px] md:text-[11px] tracking-[0.15em] font-medium bg-transparent text-white/40 border border-white/25"></div>
              </div>
            ))}

            {/* Moving star */}
            <div
              ref={moverRef}
              className="absolute w-10 h-10 pointer-events-none z-20">
              <StarSVG />
            </div>
          </div>

          {/* Content panels - centered text */}
          <div className="relative h-52 mt-4 md:h-64 md:mt-16 text-center ">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`step-panel absolute inset-0 flex flex-col items-center  ${
                  i === 0
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2.5 pointer-events-none"
                }`}>
                <h3 className="text-[clamp(1.7rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-none mb-5">
                  {s.title}
                </h3>
                <p className="text-sm md:text-lg leading-relaxed text-white/70 max-w-[44ch] mx-auto md:mx-0">
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

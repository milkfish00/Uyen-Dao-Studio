"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PICSUM = "https://picsum.photos/seed/";
const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

interface Work {
  title: string;
  skills: string[];
  imgs: [string, string, string];
}

const works: Work[] = [
  {
    title: "Lorem Ipsum",
    skills: ["strategy", "identity", "branding"],
    imgs: [mk("c1a", 400, 560), mk("c1b", 500, 680), mk("c1c", 320, 420)],
  },
  {
    title: "Dolor Sit",
    skills: ["concept", "packaging", "storytelling"],
    imgs: [mk("c2a", 400, 520), mk("c2b", 500, 700), mk("c2c", 320, 380)],
  },
  {
    title: "Amet Consec",
    skills: ["innovation", "strategy", "prototype"],
    imgs: [mk("c3a", 400, 540), mk("c3b", 500, 660), mk("c3c", 320, 400)],
  },
  {
    title: "Adipiscing Elit",
    skills: ["branding", "art direction", "packaging"],
    imgs: [mk("c4a", 400, 580), mk("c4b", 500, 720), mk("c4c", 320, 460)],
  },
];

// Full-bleed images inserted between work items
const fullBleedImgs = [
  mk("fb1", 1600, 700),
  mk("fb2", 1600, 700),
  mk("fb3", 1600, 700),
];

const titleWords = ["Selected", "Work"];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingWrapRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on every image wrapper
      sectionRef.current
        ?.querySelectorAll<HTMLElement>(".img-wrap")
        .forEach((el) => {
          const yFrom = parseFloat(el.dataset.yFrom ?? "12");
          const yTo = parseFloat(el.dataset.yTo ?? "-12");
          gsap.fromTo(
            el,
            { yPercent: yFrom },
            {
              yPercent: yTo,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-clip">
      {/* Sticky heading — sits behind the gallery, clipped to this container */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-cream">
        <div ref={headingWrapRef} className="relative">
          <h2
            className="flex flex-wrap justify-center text-red gap-x-[0.25em] uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-[-0.05em] font-bold leading-none"
            aria-label="Selected Work">
            {titleWords.map((word) => (
              <div key={word} className="overflow-hidden">
                <span className="block heading-word">{word}</span>
              </div>
            ))}
          </h2>
          <span className="absolute text-red -top-[0.3em] -right-[0.8em] text-[3em] font-bold leading-none">
            ✳
          </span>
        </div>
      </div>

      {/* Works — scrolls over the sticky heading */}
      <div className="relative z-10 pb-16 md:pb-56">
        <div className="flex flex-col gap-16 md:gap-36 lg:gap-48 px-[5vw]">
          {works.map((w, i) => (
            <div key={w.title}>
              {/* Three-column collage — mobile: single column, desktop: staggered grid */}
              <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8 md:items-start">
                {/* Left image */}
                <div
                  className="img-wrap w-full overflow-hidden aspect-3/4 md:aspect-auto md:col-span-4"
                  data-y-from="12"
                  data-y-to="-12">
                  <img
                    src={w.imgs[0]}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-full object-cover block md:h-auto"
                  />
                </div>

                {/* Right image — small, offset on desktop */}
                <div
                  className="img-wrap w-full overflow-hidden aspect-3/4 md:aspect-auto md:col-start-10 md:col-span-3 md:mt-[4%]"
                  data-y-from="16"
                  data-y-to="-8">
                  <img
                    src={w.imgs[2]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover block md:h-auto"
                  />
                </div>
              </div>

              {/* Full-bleed image between work items */}
              {i < works.length - 1 && fullBleedImgs[i] && (
                <div
                  className="img-wrap mt-24 -mx-[5vw] overflow-hidden h-screen"
                  data-y-from="6"
                  data-y-to="-6">
                  <img
                    src={fullBleedImgs[i]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

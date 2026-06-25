"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PICSUM = "https://picsum.photos/seed/";
const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

interface Work {
  title: string;
  slug: string;
  skills: string[];
  year: number;
  // boards: full 11×17 tabloid presentation boards — no cropping
  boards: [string, string];
  // hero: portrait shot to accent the layout
  hero: string;
}

const works: Work[] = [
  {
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    skills: ["Strategy", "Identity", "Branding"],
    year: 2024,
    boards: [mk("c1a", 880, 1360), mk("c1b", 880, 1360)],
    hero: mk("c1c", 600, 900),
  },
  {
    title: "Dolor Sit",
    slug: "dolor-sit",
    skills: ["Concept", "Packaging", "Storytelling"],
    year: 2024,
    boards: [mk("c2a", 880, 1360), mk("c2b", 880, 1360)],
    hero: mk("c2c", 600, 900),
  },
  {
    title: "Amet Consec",
    slug: "amet-consec",
    skills: ["Innovation", "Strategy", "Prototype"],
    year: 2023,
    boards: [mk("c3a", 880, 1360), mk("c3b", 880, 1360)],
    hero: mk("c3c", 600, 900),
  },
  {
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    skills: ["Branding", "Art Direction", "Packaging"],
    year: 2023,
    boards: [mk("c4a", 880, 1360), mk("c4b", 880, 1360)],
    hero: mk("c4c", 600, 900),
  },
];

const WorkOverlay = ({
  title,
  skills,
  year,
}: {
  title: string;
  skills: string[];
  year: number;
}) => (
  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-red px-6 py-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    <p className="text-center text-3xl font-bold leading-tight tracking-tight text-cream md:text-4xl">
      {title}
    </p>
    <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-cream/60">
      {skills.join(" · ")}
    </p>
    <p className="text-center text-sm text-cream/60">{year}</p>
    <span className="mt-2 border border-cream px-6 py-2.5 text-sm font-medium text-cream">
      View Project
    </span>
  </div>
);

const titleWords = ["Projects"];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);

  // Heading slide-up animation
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

  // Parallax on every .img-wrap
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>(".img-wrap")
        .forEach((el) => {
          const yFrom = parseFloat(el.dataset.yFrom ?? "8");
          const yTo = parseFloat(el.dataset.yTo ?? "-8");
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
      {/* Sticky heading — sits behind, clipped to this container */}
      <div className="sticky top-0 flex  items-start justify-center pt-16 sm:pt-20 md:pt-24">
        <div ref={headingWrapRef} className="relative">
          <h2
            className="flex flex-wrap justify-center text-red gap-x-[0.25em] uppercase text-[clamp(2rem,8vw,7rem)] tracking-[-0.05em] font-bold leading-none"
            aria-label="Selected Work">
            {titleWords.map((word) => (
              <div key={word} className="overflow-hidden">
                <span className="block heading-word">{word}</span>
              </div>
            ))}
          </h2>
          <span className="absolute text-red -top-[0.3em] -right-[0.8em] md:text-[3em] font-bold leading-none">
            ✳
          </span>
        </div>
      </div>

      {/* Exhibition grid — scrolls over the sticky heading */}
      <div className="relative z-10 bg-cream">
        {works.map((w, i) => (
          <div
            key={w.title}
            className={`px-[5vw] ${i === 0 ? "pt-6 pb-16" : "py-16"} md:py-24`}>
            {/* ── Layout A (even): primary board left, hero + secondary board right stacked */}
            {i % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-4 md:gap-6 items-start">
                {/* Primary board — full 11:17, no cropping */}
                <Link
                  href={`/work/${w.slug}`}
                  className="img-wrap group relative block overflow-hidden"
                  data-y-from="6"
                  data-y-to="-6">
                  <img
                    src={w.boards[0]}
                    alt={w.title}
                    loading="lazy"
                    className="w-full aspect-11/17 object-contain bg-red/3"
                  />
                  <WorkOverlay
                    title={w.title}
                    skills={w.skills}
                    year={w.year}
                  />
                </Link>

                {/* Right column: hero photo + secondary board, offset down */}
                <div className="flex flex-col gap-4 md:gap-6 md:pt-[12%]">
                  <Link
                    href={`/work/${w.slug}`}
                    className="img-wrap group relative block overflow-hidden"
                    data-y-from="10"
                    data-y-to="-5">
                    <img
                      src={w.hero}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-2/3 object-cover"
                    />
                    <WorkOverlay
                      title={w.title}
                      skills={w.skills}
                      year={w.year}
                    />
                  </Link>
                  <Link
                    href={`/work/${w.slug}`}
                    className="img-wrap group relative block overflow-hidden"
                    data-y-from="8"
                    data-y-to="-8">
                    <img
                      src={w.boards[1]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-11/17 object-contain bg-red/3"
                    />
                    <WorkOverlay
                      title={w.title}
                      skills={w.skills}
                      year={w.year}
                    />
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Layout B (odd): secondary board + hero left stacked, primary board right */
              <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-4 md:gap-6 items-start">
                {/* Left column: secondary board + hero, offset down on right side */}
                <div className="flex flex-col gap-4 md:gap-6 md:pb-[12%]">
                  <Link
                    href={`/work/${w.slug}`}
                    className="img-wrap group relative block overflow-hidden"
                    data-y-from="8"
                    data-y-to="-6">
                    <img
                      src={w.boards[1]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-11/17 object-contain bg-red/3"
                    />
                    <WorkOverlay
                      title={w.title}
                      skills={w.skills}
                      year={w.year}
                    />
                  </Link>
                  <Link
                    href={`/work/${w.slug}`}
                    className="img-wrap group relative block overflow-hidden"
                    data-y-from="10"
                    data-y-to="-5">
                    <img
                      src={w.hero}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-2/3 object-cover"
                    />
                    <WorkOverlay
                      title={w.title}
                      skills={w.skills}
                      year={w.year}
                    />
                  </Link>
                </div>

                {/* Primary board — large, anchored to top */}
                <Link
                  href={`/work/${w.slug}`}
                  className="img-wrap group relative block overflow-hidden"
                  data-y-from="6"
                  data-y-to="-4">
                  <img
                    src={w.boards[0]}
                    alt={w.title}
                    loading="lazy"
                    className="w-full aspect-11/17 object-contain bg-red/3"
                  />
                  <WorkOverlay
                    title={w.title}
                    skills={w.skills}
                    year={w.year}
                  />
                </Link>
              </div>
            )}
          </div>
        ))}

        <div className="h-24 md:h-48" />
      </div>
    </div>
  );
};

export default Gallery;

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
    boards: [mk("c1a", 880, 1360), mk("c1b", 880, 1360)],
    hero: mk("c1c", 600, 900),
  },
  {
    title: "Dolor Sit",
    slug: "dolor-sit",
    skills: ["Concept", "Packaging", "Storytelling"],
    boards: [mk("c2a", 880, 1360), mk("c2b", 880, 1360)],
    hero: mk("c2c", 600, 900),
  },
  {
    title: "Amet Consec",
    slug: "amet-consec",
    skills: ["Innovation", "Strategy", "Prototype"],
    boards: [mk("c3a", 880, 1360), mk("c3b", 880, 1360)],
    hero: mk("c3c", 600, 900),
  },
  {
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    skills: ["Branding", "Art Direction", "Packaging"],
    boards: [mk("c4a", 880, 1360), mk("c4b", 880, 1360)],
    hero: mk("c4c", 600, 900),
  },
];

const titleWords = ["Selected", "Work"];

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
      <div className="sticky top-0 h-screen flex items-center justify-center ">
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
      <div className="relative z-10 ">
        {works.map((w, i) => (
          <div key={w.title} className="px-[5vw] py-16 md:py-24">
            {/* ── Layout A (even): primary board left, hero + secondary board right stacked */}
            {i % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-4 md:gap-6 items-start">
                {/* Primary board — full 11:17, no cropping */}
                <Link
                  href={`/work/${w.slug}`}
                  className="img-wrap block overflow-hidden"
                  data-y-from="6"
                  data-y-to="-6">
                  <img
                    src={w.boards[0]}
                    alt={w.title}
                    loading="lazy"
                    className="w-full aspect-11/17 object-contain bg-red/3"
                  />
                </Link>

                {/* Right column: hero photo + secondary board, offset down */}
                <div className="flex flex-col gap-4 md:gap-6 md:pt-[12%]">
                  <div
                    className="img-wrap overflow-hidden"
                    data-y-from="10"
                    data-y-to="-5">
                    <img
                      src={w.hero}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-2/3 object-cover"
                    />
                  </div>
                  <Link
                    href={`/work/${w.slug}`}
                    className="img-wrap block overflow-hidden"
                    data-y-from="8"
                    data-y-to="-8">
                    <img
                      src={w.boards[1]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-11/17 object-contain bg-red/3"
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
                    className="img-wrap block overflow-hidden"
                    data-y-from="8"
                    data-y-to="-6">
                    <img
                      src={w.boards[1]}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-11/17 object-contain bg-red/3"
                    />
                  </Link>
                  <div
                    className="img-wrap overflow-hidden"
                    data-y-from="10"
                    data-y-to="-5">
                    <img
                      src={w.hero}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full aspect-2/3 object-cover"
                    />
                  </div>
                </div>

                {/* Primary board — large, anchored to top */}
                <Link
                  href={`/work/${w.slug}`}
                  className="img-wrap block overflow-hidden"
                  data-y-from="6"
                  data-y-to="-4">
                  <img
                    src={w.boards[0]}
                    alt={w.title}
                    loading="lazy"
                    className="w-full aspect-11/17 object-contain bg-red/3"
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

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

gsap.registerPlugin(ScrollTrigger);

const PICSUM = "https://picsum.photos/seed/";
const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

interface Work {
  title: string;
  slug: string;
  skills: string[];
  year: number;
  image: string;
}

type SanityWork = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (string | null)[];
  hero?: string | null;
};

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const FALLBACK_WORKS: Work[] = [
  {
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    skills: ["Strategy", "Identity", "Branding"],
    year: 2024,
    image: mk("c1a", 880, 1360),
  },
  {
    title: "Dolor Sit",
    slug: "dolor-sit",
    skills: ["Concept", "Packaging", "Storytelling"],
    year: 2024,
    image: mk("c2a", 880, 1360),
  },
  {
    title: "Amet Consec",
    slug: "amet-consec",
    skills: ["Innovation", "Strategy", "Prototype"],
    year: 2023,
    image: mk("c3a", 880, 1360),
  },
  {
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    skills: ["Branding", "Art Direction", "Packaging"],
    year: 2023,
    image: mk("c4a", 880, 1360),
  },
];

function toWork(w: SanityWork): Work {
  const fallback = `https://picsum.photos/seed/${w._id}/880/1360`;
  const primaryBoard = hasImageSrc(w.boards?.[0]) ? w.boards[0] : null;
  return {
    title: w.title,
    slug: w.slug,
    skills: w.skills ?? [],
    year: w.year ?? new Date().getFullYear(),
    image: primaryBoard ?? (hasImageSrc(w.hero) ? w.hero : fallback),
  };
}

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

const Gallery = ({ projects }: { projects?: SanityWork[] | null }) => {
  const works: Work[] =
    projects && projects.length > 0 ? projects.map(toWork) : FALLBACK_WORKS;
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
            key={w.slug || `${w.title}-${i}`}
            className={`px-[5vw] ${i === 0 ? "pt-6 pb-16" : "py-16"} md:py-24`}>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)] justify-items-center">
              <Link
                href={`/work/${w.slug}`}
                className="img-wrap group relative block w-full max-w-[72rem] overflow-hidden"
                data-y-from={i % 2 === 0 ? "6" : "8"}
                data-y-to={i % 2 === 0 ? "-6" : "-4"}>
                <img
                  src={w.image}
                  alt={SITE_IMAGE_ALT}
                  loading="lazy"
                  className="w-full h-full object-contain bg-red/3"
                />
                <WorkOverlay title={w.title} skills={w.skills} year={w.year} />
              </Link>
            </div>
          </div>
        ))}

        <div className="h-24 md:h-48" />
      </div>
    </div>
  );
};

export default Gallery;

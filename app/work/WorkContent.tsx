"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

const SITE_IMAGE_ALT = "Uyen Dao Studio";
const PICSUM = "https://picsum.photos/seed/";
const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

type Work = {
  idx: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  skills: string[];
  year: number;
};

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
    idx: 1,
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    category: "Branding",
    skills: ["Strategy", "Identity", "Branding"],
    year: 2024,
    image: mk("p1", 480, 720),
  },
  {
    idx: 2,
    title: "Dolor Sit",
    slug: "dolor-sit",
    category: "Web",
    skills: ["Concept", "Packaging", "Storytelling"],
    year: 2024,
    image: mk("p2", 480, 720),
  },
  {
    idx: 3,
    title: "Amet Consec",
    slug: "amet-consec",
    category: "Identity",
    skills: ["Innovation", "Strategy", "Prototype"],
    year: 2023,
    image: mk("p3", 480, 720),
  },
  {
    idx: 4,
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    category: "Motion",
    skills: ["Branding", "Art Direction", "Packaging"],
    year: 2023,
    image: mk("p4", 480, 720),
  },
];

function toWork(work: SanityWork): Work {
  const fallback = `https://picsum.photos/seed/${work._id}h/480/720`;
  return {
    idx: 0,
    title: work.title,
    slug: work.slug,
    category: work.skills?.find(Boolean) || "Project",
    skills: work.skills ?? [],
    year: work.year ?? new Date().getFullYear(),
    image: hasImageSrc(work.hero) ? work.hero : fallback,
  };
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-red text-red hover:bg-red hover:text-cream transition"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d={
            direction === "prev"
              ? "M18 12L6 12M6 12L11 17M6 12L11 7"
              : "M6 12H18M18 12L13 7M18 12L13 17"
          }
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
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
    <p className="text-center text-xl sm:text-2xl font-bold leading-tight tracking-tight text-cream">
      {title}
    </p>
    {skills.length > 0 && (
      <p className="text-center text-[0.6rem] font-medium uppercase tracking-[0.15em] text-cream/60">
        {skills.join(" · ")}
      </p>
    )}
    <p className="text-center text-xs text-cream/60">{year}</p>
    <span className="mt-2 border border-cream px-4 py-1.5 text-xs font-medium text-cream">
      View Project
    </span>
  </div>
);

export default function WorkContent({
  initialProjects,
}: {
  initialProjects?: SanityWork[] | null;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sliderRefs = useRef<{ [key: string]: Slider | null }>({});

  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const works = useMemo(
    () =>
      (initialProjects && initialProjects.length > 0
        ? initialProjects.map(toWork)
        : FALLBACK_WORKS
      ).map((work, index) => ({
        ...work,
        idx: index + 1,
      })),
    [initialProjects],
  );

  // 1. Extract ALL unique skills from your projects, not just skills[0]
  const categories = useMemo(() => {
    const values = new Set<string>();
    works.forEach((work) => {
      if (work.skills && Array.isArray(work.skills)) {
        work.skills.forEach((skill) => {
          if (skill) values.add(skill);
        });
      }
    });
    return ["All", ...Array.from(values)];
  }, [works]);

  // 2. Filter sections by checking if the skill exists anywhere in the project's skills array
  const sectionsData = useMemo(() => {
    const uniqueCategories = categories.filter((c) => c !== "All");
    return uniqueCategories.map((category) => ({
      category,
      // Check if the current category exists anywhere inside the skills array
      items: works.filter((work) => work.skills?.includes(category)),
    }));
  }, [categories, works]);

  const visibleSections = useMemo(() => {
    if (filter === "All") return sectionsData;
    return sectionsData.filter((sec) => sec.category === filter);
  }, [filter, sectionsData]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const words = heading.querySelectorAll<HTMLElement>(`.heading-word`);
    gsap.set(words, { y: "110%" });

    const context = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, heading);

    return () => context.revert();
  }, [filter]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  const sliderSettings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "5%" },
      },
    ],
  };

  return (
    <main className="min-h-screen w-screen bg-cream text-red selection:bg-red selection:text-cream pb-32">
      {/* Header Area */}
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-0 px-6 sm:px-10 lg:px-16 pt-40 pb-12 border-b border-red/10">
        <h1
          ref={headingRef}
          className="text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em] text-red">
          <div className="overflow-hidden">
            <span className="heading-word block">projects</span>
          </div>
        </h1>

        {/* Filter Button */}
        <div className="relative z-30" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-red bg-cream px-6 py-3 text-xs sm:px-4 sm:py-2 sm:text-[0.6rem] uppercase tracking-[0.2em] text-red transition-colors hover:bg-red hover:text-cream">
            <span>Filter: {filter}</span>
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
              <path
                d="M1 1l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 min-w-40 border border-red/20 bg-cream shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setFilter(category);
                    setDropdownOpen(false);
                  }}
                  className={`block w-full px-5 py-3.5 sm:px-4 sm:py-3 text-left text-xs sm:text-[0.6rem] uppercase tracking-[0.2em] transition-colors border-b border-red/5 last:border-none ${
                    filter === category
                      ? "bg-red text-cream"
                      : "text-red/70 hover:bg-red/5 hover:text-red"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills Category Sections */}
      <div className="flex flex-col mt-4">
        {visibleSections.map((section) => (
          <section
            key={section.category}
            className="py-12 border-b border-red/10 last:border-b-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-red">
                  {section.category}
                </h3>
              </div>
              {section.items.length > 1 && (
                <div className="flex items-center gap-2">
                  <ArrowButton
                    direction="prev"
                    onClick={() =>
                      sliderRefs.current[section.category]?.slickPrev()
                    }
                  />
                  <ArrowButton
                    direction="next"
                    onClick={() =>
                      sliderRefs.current[section.category]?.slickNext()
                    }
                  />
                </div>
              )}
            </div>

            <div className="px-6 sm:px-10 lg:px-16">
              <Slider
                ref={(el) => {
                  if (el) sliderRefs.current[section.category] = el;
                }}
                {...sliderSettings}>
                {section.items.map((work) => (
                  <div key={work.slug} className="pr-4 sm:pr-6 outline-none">
                    <Link
                      href={`/work/${work.slug}`}
                      className="group block project-card">
                      <div className="relative aspect-3/4 w-full overflow-hidden bg-red/5 rounded-sm">
                        <img
                          src={work.image}
                          alt={work.title || SITE_IMAGE_ALT}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-750 ease-out group-hover:scale-102"
                          draggable={false}
                        />
                        <WorkOverlay
                          title={work.title}
                          skills={work.skills}
                          year={work.year}
                        />
                      </div>

                      <div className="pt-4 flex justify-between items-start gap-4">
                        <h4 className="text-md font-bold uppercase tracking-[-0.02em] leading-tight text-red transition-colors group-hover:text-red/70">
                          {work.title}
                        </h4>
                        <span className="text-[0.55rem] uppercase tracking-[0.2em] text-red/40 pt-0.5">
                          {String(work.idx).padStart(2, "0")}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

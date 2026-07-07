// components/WorkSection.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

gsap.registerPlugin(ScrollTrigger);

type Work = {
  title: string;
  category: string;
  img: string;
  slug?: string;
};

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const PLACEHOLDER_WORKS: Work[] = [
  {
    title: "Industrial Design",
    category: "Industrial Design",
    img: "https://picsum.photos/seed/ws1/480/640",
  },
  {
    title: "Brand Direction",
    category: "Brand Direction",
    img: "https://picsum.photos/seed/ws2/480/640",
  },
  {
    title: "Fashion Styling",
    category: "Fashion Styling",
    img: "https://picsum.photos/seed/ws3/480/640",
  },
  {
    title: "Illustration",
    category: "Illustration",
    img: "https://picsum.photos/seed/ws4/480/640",
  },
];

export default function WorkSection({ works }: { works?: Work[] }) {
  const items =
    works && works.length > 0
      ? works.map((work, index) => ({
          ...work,
          img: hasImageSrc(work.img)
            ? work.img
            : PLACEHOLDER_WORKS[index % PLACEHOLDER_WORKS.length].img,
        }))
      : PLACEHOLDER_WORKS;
  const sliderRef = useRef<Slider>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3.5, // Bumped slightly up from 2.8 since portrait slides are narrower
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2.8 } },
      { breakpoint: 768, settings: { slidesToShow: 1.8 } },
      {
        breakpoint: 640,
        settings: { centerMode: true, centerPadding: "8%", slidesToShow: 1 },
      },
    ],
  };

  return (
    <section
      id="work"
      className="bg-cream overflow-hidden pt-16 pb-12 sm:py-0 hidden lg:block">
      {/* scale effect for center-mode on mobile only */}
      <style>{`
        @media (max-width: 639px) {
          #work .slick-slide > div { transition: transform 0.4s ease, opacity 0.4s ease; transform: scale(0.9); opacity: 0.55; }
          #work .slick-center > div { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Header — desktop only */}
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8 gap-6">
        {/* Title */}
        <div ref={headingRef} className="flex flex-wrap gap-x-[0.15em]">
          {["Types", "of", "work"].map((word) => (
            <div key={word} className="overflow-hidden">
              <span className="block heading-word text-xl sm:text-2xl md:text-[3.15rem] tracking-[-0.03em] uppercase font-bold text-red">
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3 sm:gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-red text-red hover:bg-red hover:text-cream transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 12L6 12M6 12L11 17M6 12L11 7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-red text-red hover:bg-red hover:text-cream transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="pb-16 sm:pb-24">
        <Slider ref={sliderRef} {...settings}>
          {items.map((w, index) => (
            <div
              key={w.slug || `${w.title}-${index}`}
              className="px-2 sm:px-0 sm:pr-6">
              <Link
                href={w.slug ? `/work/${w.slug}` : "/work"}
                className="group flex flex-col">
                {/* Image — Aspect ratio changed to aspect-3/4 for dynamic Portrait styling */}
                <div className="relative w-full overflow-hidden aspect-3/4 bg-red/5 rounded-sm">
                  {/* Mobile: top gradient so white title is readable */}
                  <div className="sm:hidden absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/65 to-transparent z-10 pointer-events-none" />
                  <img
                    src={w.img}
                    alt={SITE_IMAGE_ALT}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-103"
                  />
                  {/* Mobile: title overlaid on image */}
                  <div className="sm:hidden absolute top-0 left-0 right-0 p-4 z-20">
                    <h3
                      className="font-bold text-white leading-[0.88] tracking-[-0.03em] uppercase"
                      style={{ fontSize: "clamp(1.5rem, 7.5vw, 2.4rem)" }}>
                      {w.title}
                    </h3>
                  </div>
                </div>

                {/* Mobile: category + view */}
                <div className="sm:hidden flex items-center justify-between pt-2.5">
                  <span className="text-[0.55rem] uppercase tracking-[0.15em] text-red/40">
                    {w.category}
                  </span>
                  <span className="text-[0.55rem] uppercase tracking-[0.12em] text-red/60">
                    View →
                  </span>
                </div>

                {/* Desktop: title below */}
                <div className="hidden sm:block pt-4">
                  <h3 className="font-semibold text-red text-lg sm:text-xl tracking-tight transition-colors group-hover:text-red/70">
                    {w.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

gsap.registerPlugin(ScrollTrigger);

export type IndustrialDesignProject = {
  _id: string;
  title: string;
  slug?: string | null;
  skills?: string[] | null;
  summary?: string | null;
  category?: string | null;
  image?: string | null;
};

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
      className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-red text-red hover:bg-red hover:text-cream transition"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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

export default function IndustrialDesignContent({
  projects,
}: {
  projects: IndustrialDesignProject[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".hero-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.12,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3.5,
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
    <main className="min-h-screen bg-cream text-red">
      {/* Hero */}
      <section className="border-b border-red/10 px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-16">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center">
          <h1 className="flex flex-wrap justify-center gap-x-[0.18em] text-[clamp(3rem,7vw,6.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em]">
            {["Industrial", "Design"].map((word) => (
              <div key={word} className="overflow-hidden">
                <span className="hero-word block">{word}</span>
              </div>
            ))}
          </h1>
        </div>
      </section>

      {/* Project carousel */}
      {projects.length > 0 && (
        <section
          id="industrial-design-projects"
          className="overflow-hidden border-b bg-cream text-red border-red/10">
          <style>{`
            @media (max-width: 639px) {
              #industrial-design-projects .slick-slide > div { transition: transform 0.4s ease, opacity 0.4s ease; transform: scale(0.9); opacity: 0.55; }
              #industrial-design-projects .slick-center > div { transform: scale(1); opacity: 1; }
            }
          `}</style>

          <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 sm:px-10 lg:px-16 pb-8 gap-6">
            <div className="max-w-3xl"></div>
            <div className="flex items-center gap-3 sm:gap-2">
              <ArrowButton
                direction="prev"
                onClick={() => sliderRef.current?.slickPrev()}
              />
              <ArrowButton
                direction="next"
                onClick={() => sliderRef.current?.slickNext()}
              />
            </div>
          </div>

          <div className="pb-16 sm:pb-24">
            <Slider ref={sliderRef} {...settings}>
              {projects.map((item) => (
                <div key={item._id} className="px-2 sm:px-0 sm:pr-6">
                  <article className="group flex flex-col cursor-pointer">
                    <div className="relative w-full overflow-hidden aspect-3/4 bg-[#eaded4] rounded-sm">
                      <div className="sm:hidden absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/55 to-transparent z-10 pointer-events-none" />
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title ?? SITE_IMAGE_ALT}
                          fill
                          className="absolute inset-0 object-cover object-center transition-transform duration-750 ease-out group-hover:scale-103"
                          sizes="(min-width: 1024px) 32vw, 88vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-red/5" />
                      )}
                      <div className="sm:hidden absolute top-0 left-0 right-0 p-4 z-20">
                        <h3
                          className="font-bold text-white leading-[0.88] tracking-[-0.03em] uppercase"
                          style={{ fontSize: "clamp(1.5rem, 7.5vw, 2.4rem)" }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="sm:hidden flex items-center justify-between pt-2.5">
                      <span className="text-[0.55rem] uppercase tracking-[0.15em] text-red/40">
                        {item.category}
                      </span>
                    </div>

                    <div className="hidden sm:block pt-4">
                      <h3 className="font-semibold text-red text-lg sm:text-xl tracking-tight transition-colors group-hover:text-red/70">
                        {item.title}
                      </h3>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
    </main>
  );
}

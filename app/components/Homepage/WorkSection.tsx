"use client";
import { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Work = {
  title: string;
  subtitle: string;
  category: string;
  img: string;
};

export default function WorkSection({ works }: { works: Work[] }) {
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2.8,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2.2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.3 } },
      { breakpoint: 480, settings: { slidesToShow: 1.1 } },
    ],
  };

  return (
    <section
      id="work"
      className="relative bg-[#EDEDDD] py-24 lg:py-36 border-t border-[rgba(119,22,5,0.10)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 mb-10">
        <span
          style={{
            fontFamily: "var(--font-castoro), serif",
            fontWeight: 500,
          }}
          className="text-[1.5rem] text-[#771605]">
          Types of work
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(119,22,5,0.15)] text-[#771605] hover:bg-[#771605] hover:text-white hover:border-[#771605] transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(119,22,5,0.15)] text-[#771605] hover:bg-[#771605] hover:text-white hover:border-[#771605] transition-colors duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="">
        <Slider ref={sliderRef} {...settings}>
          {works.map((w) => (
            <div key={w.title} className="pr-4">
              <Link href="/work" className="group block">
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded-xl aspect-3/4">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                  />
                </div>
                {/* Caption */}
                <div className="pt-5">
                  <h3
                    className="font-semibold tracking-tight text-[#771605] mb-1"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}>
                    {w.title}
                  </h3>
                  {w.subtitle && (
                    <p className="text-[0.82rem] text-[rgba(119,22,5,0.5)] leading-snug max-w-xs">
                      {w.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

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

const PLACEHOLDER_WORKS: Work[] = [
  {
    title: "Brand Identity",
    subtitle: "Visual identity & strategy",
    category: "Branding",
    img: "https://picsum.photos/seed/ws1/480/640",
  },
  {
    title: "Packaging Design",
    subtitle: "Structural & graphic design",
    category: "Packaging",
    img: "https://picsum.photos/seed/ws2/480/640",
  },
  {
    title: "Art Direction",
    subtitle: "Campaign & editorial",
    category: "Art Direction",
    img: "https://picsum.photos/seed/ws3/480/640",
  },
  {
    title: "Digital Experience",
    subtitle: "Web design & motion",
    category: "Digital",
    img: "https://picsum.photos/seed/ws4/480/640",
  },
];

export default function WorkSection({ works }: { works?: Work[] }) {
  const items = works && works.length > 0 ? works : PLACEHOLDER_WORKS;
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
    <section id="work" className="relative bg-[#ffffff] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 mb-10">
        <span className="text-[3.15rem] tracking-[-0.03em] uppercase font-bold text-[#c2090a]  ">
          Types of work
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous"
            className="flex items-center justify-center w-9 h-9 rounded-full  text-[#c2090a] hover:bg-[#c2090a] hover:text-cream  transition-colors duration-200">
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
            className="flex items-center justify-center w-9 h-9 rounded-full  text-[#c2090a] hover:bg-[#c2090a] hover:text-cream transition-colors duration-200">
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
          {items.map((w) => (
            <div key={w.title} className="pr-4">
              <Link href="/work" className="group block">
                {/* Image */}
                <div className="relative w-full overflow-hidden  aspect-3/4">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                  />
                </div>
                {/* Caption */}
                <div className="pt-5">
                  <h3 className="font-semibold tracking-tight text-[#c2090a] mb-1 text-[clamp(1.2rem,2vw,1.8rem)]">
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

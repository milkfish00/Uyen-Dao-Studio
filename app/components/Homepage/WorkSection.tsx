"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

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
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

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
      { breakpoint: 768, settings: { slidesToShow: 2.1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="work" className="relative bg-cream overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-5">
        <div ref={headingRef} className="flex flex-wrap gap-x-[0.15em]">
          {["Types", "of", "work"].map((word) => (
            <div key={word} className="overflow-hidden">
              <span className="block heading-word text-2xl md:text-[3.15rem] tracking-[-0.03em] uppercase font-bold text-red">
                {word}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous"
            className="flex items-center justify-center w-14 h-14 rounded-full border border-red text-red hover:bg-red hover:text-cream transition-colors duration-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 12L6 12M6 12L11 17M6 12L11 7"
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
            className="flex items-center justify-center w-14 h-14 rounded-full border border-red text-red hover:bg-red hover:text-cream transition-colors duration-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 12H18M18 12L13 7M18 12L13 17"
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
      <div className=" pb-16 sm:pb-24">
        <Slider ref={sliderRef} {...settings}>
          {items.map((w) => (
            <div key={w.title} className="pr-4 sm:pr-6">
              <Link href="/work" className="group block">
                {/* Image */}
                <div className="relative w-full overflow-hidden aspect-9/16 md:aspect-3/4">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                  />
                </div>
                {/* Caption */}
                <div className="pt-5">
                  <h3 className="font-semibold tracking-tight text-red mb-1 text-[clamp(1.2rem,2vw,1.8rem)]">
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

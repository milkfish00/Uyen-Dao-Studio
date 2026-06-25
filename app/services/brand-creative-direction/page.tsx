"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

type CaseStudy = {
  title: string;
  category: string;
  summary: string;
  image: "/images/title.svg" | "/images/stretch.svg" | "/ui/star.svg";
  accent: string;
};

const BRAND_CASES: CaseStudy[] = [
  {
    title: "Lorem Ipsum",
    category: "Lorem Ipsum",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/title.svg",
    accent: "bg-[#eaded4]",
  },
  {
    title: "Dolor Sit",
    category: "Lorem Ipsum",
    summary:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/stretch.svg",
    accent: "bg-[#e7d8db]",
  },
  {
    title: "Amet Consec",
    category: "Lorem Ipsum",
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "/ui/star.svg",
    accent: "bg-[#efe5e1]",
  },
];

const STYLING_CASES: CaseStudy[] = [
  {
    title: "Adipiscing Elit",
    category: "Lorem Ipsum",
    summary:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "/images/stretch.svg",
    accent: "bg-[#e7d9cf]",
  },
  {
    title: "Magna Aliqua",
    category: "Lorem Ipsum",
    summary:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    image: "/images/title.svg",
    accent: "bg-[#e8ddd8]",
  },
  {
    title: "Tempor Incididunt",
    category: "Lorem Ipsum",
    summary:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    image: "/ui/star.svg",
    accent: "bg-[#efe2db]",
  },
];

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

function CaseCarousel({
  id,
  title,
  description,
  items,
  sliderRef,
}: {
  id: string;
  title: string;
  description: string;
  items: CaseStudy[];
  sliderRef: React.RefObject<Slider | null>;
}) {
  const settings: Settings = {
    infinite: true,
    speed: 650,
    slidesToShow: 2.8,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2.2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.6 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "9%" },
      },
    ],
  };

  const sectionTone = "bg-cream text-red border-red/10";

  return (
    <section id={id} className={`overflow-hidden border-b ${sectionTone}`}>
      <style>{`
        @media (max-width: 639px) {
          #${id} .slick-slide > div { transition: transform 0.4s ease, opacity 0.4s ease; transform: scale(0.9); opacity: 0.55; }
          #${id} .slick-center > div { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8 gap-6">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-[3.15rem] tracking-[-0.03em] uppercase font-bold text-red">
            {title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[0.95rem] leading-[1.75] text-red/65">
            {description}
          </p>
        </div>

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
          {items.map((item) => (
            <div key={item.title} className="px-2 sm:px-0 sm:pr-6">
              <article className="group flex flex-col">
                <div
                  className={`relative w-full overflow-hidden aspect-3/4 ${item.accent}`}>
                  <div className="sm:hidden absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-black/55 to-transparent z-10 pointer-events-none" />
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="placeholder-media absolute inset-0 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 32vw, 88vw"
                  />
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
                  <h3 className="font-semibold text-red text-lg sm:text-xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-[1.7] text-red/65 max-w-[34ch]">
                    {item.summary}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default function BrandCreativeDirectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const brandSliderRef = useRef<Slider>(null);
  const stylingSliderRef = useRef<Slider>(null);

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

  return (
    <main className="min-h-screen bg-cream text-red">
      <section className="border-b border-red/10 px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-16">
        <div ref={heroRef} className="mx-auto max-w-5xl text-center">
          <h1 className="flex flex-wrap justify-center gap-x-[0.18em] text-[clamp(3rem,7vw,6.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-center">
            {["Brand", "&", "Creative", "Direction"].map((word) => (
              <div key={word} className="overflow-hidden">
                <span className="hero-word block">{word}</span>
              </div>
            ))}
          </h1>
        </div>
      </section>

      <CaseCarousel
        id="brand-direction"
        title="Lorem Ipsum"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        items={BRAND_CASES}
        sliderRef={brandSliderRef}
      />

      <CaseCarousel
        id="styling-portfolio"
        title="Dolor Sit"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        items={STYLING_CASES}
        sliderRef={stylingSliderRef}
      />
    </main>
  );
}

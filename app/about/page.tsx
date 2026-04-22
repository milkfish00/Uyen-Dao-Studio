"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GalleryAbout = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-cream text-red overflow-hidden">
      {/* ── Two-column editorial layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-28 lg:pt-32 px-6 sm:px-10 lg:px-16 pb-16 gap-12 lg:gap-16 items-start">
        {/* Left — Polaroid */}
        <div className="flex justify-start">
          <div className="p-3 sm:p-4 pb-16 sm:pb-20 "></div>
        </div>

        {/* Right — bio + contact info */}
        <div className="flex flex-col gap-12 lg:pt-8">
          <p className="text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-red max-w-[36ch]">
            Uyen Dao Design is a multidisciplinary creative studio specialising
            in brand identity, art direction, and visual storytelling for
            fashion, lifestyle, and culture brands.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Info
              </p>
              <p className="text-red/60">hello@uyendaodesign.com</p>
              <p className="text-red/60">+1 234 45670</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Follow
              </p>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Instagram
              </a>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Behance
              </a>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Tiktok
              </a>{" "}
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Linkedin
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Services
              </p>
              <p className="text-red/60">Brand Identity</p>
              <p className="text-red/60">Art Direction</p>
              <p className="text-red/60">Fashion & Editorial</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Work with us
              </p>
              <a
                href="/contact"
                className="text-red/60 hover:text-red transition-colors duration-200 underline underline-offset-2">
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width giant heading ── */}
      <div
        ref={headingRef}
        className="px-4 sm:px-6 overflow-hidden hidden lg:block mt-4 pb-2">
        <div className="flex flex-nowrap gap-[0.06em]">
          {["UYEN", "DAO"].map((word, i) => (
            <div key={i} className="overflow-hidden pb-[0.04em]">
              <span
                className="block heading-word font-bold leading-none tracking-[-0.04em] text-red"
                style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}>
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GalleryAbout;

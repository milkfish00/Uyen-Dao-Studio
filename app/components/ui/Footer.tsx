"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const isHidden =
    pathname === "/about" ||
    pathname === "/work" ||
    /^\/work\/.+/.test(pathname);

  useEffect(() => {
    if (isHidden) return;
    const el = headingRef.current;
    if (!el) return;
    const letters = el.querySelectorAll<HTMLElement>(".footer-letter");
    gsap.set(letters, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(letters, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    // Refresh after DOM settles so ScrollTrigger measures correct positions
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <footer className={isContact ? "bg-red" : "bg-cream"}>
      {/* Full‑width heading, capped at 9xl */}
      <div
        ref={headingRef}
        className="w-screen max-w-9xl mx-auto flex items-center justify-center px-0">
        <div className="flex items-end leading-none whitespace-nowrap">
          {["U", "Y", "E", "N", "\u00A0", "D", "✳", "O"].map((ch, i) => (
            <div key={i} className="overflow-hidden pb-[0.06em]">
              <span
                className={`footer-letter block font-bold tracking-[-0.04em] ${
                  isContact ? "text-white" : "text-red"
                } text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[19rem]`}>
                {ch}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar (unchanged) */}
      <div
        className={`px-6 sm:px-10 lg:px-16 py-5 flex flex-col items-center  sm:flex-row  sm:items-center justify-between gap-2 border-t ${
          isContact ? "border-white/20" : "border-red/10"
        } mt-2`}>
        <span
          className={`text-[0.6rem] uppercase tracking-[0.16em] ${
            isContact ? "text-white/70" : "text-red/40"
          }`}>
          © {new Date().getFullYear()} Uyen Dao Design
        </span>
        <div className="flex items-center gap-6 text-[0.6rem] uppercase tracking-[0.16em]">
          <Link
            href="/privacy"
            className={`${
              isContact
                ? "text-white/70 hover:text-white"
                : "text-red/40 hover:text-red/70"
            } transition-colors duration-200`}>
            Privacy
          </Link>
          <Link
            href="/terms"
            className={`${
              isContact
                ? "text-white/70 hover:text-white"
                : "text-red/40 hover:text-red/70"
            } transition-colors duration-200`}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

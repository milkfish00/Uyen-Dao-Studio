"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const isHidden =
    pathname === "/about" ||
    pathname === "/work" ||
    /^\/work\/.+/.test(pathname);

  useEffect(() => {
    if (isHidden) return;
    const el = headingRef.current;
    const footer = footerRef.current;
    if (!el || !footer) return;
    const words = el.querySelectorAll<HTMLElement>(".footer-word");
    gsap.set(words, { y: "110%" });

    let ctx: ReturnType<typeof gsap.context>;

    const init = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.to(words, {
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        });
      }, el);
    };

    // Double rAF so all sibling components have painted before measuring
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        init();
      });
    });

    // Re-refresh once all assets have loaded (fonts, images, etc.)
    const onLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <footer ref={footerRef} className={isContact ? "bg-red" : "bg-cream"}>
      {/* Full‑width heading, capped at 9xl */}
      <div ref={headingRef} className="px-4 sm:px-6 overflow-hidden mt-4 pb-2">
        <div className="flex w-full justify-center flex-nowrap gap-[0.06em]">
          {["UYEN", "DAO"].map((word, i) => (
            <div key={i} className="overflow-hidden pb-[0.04em]">
              <span
                className={`footer-word block font-bold leading-none tracking-[-0.04em] ${
                  isContact ? "text-white" : "text-red"
                }`}
                style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}>
                {word}
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

"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drop this anywhere in the layout.
 * Any element with data-reveal (or data-reveal="up" / "left" / "right") will
 * fade + slide in as it enters the viewport.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

      els.forEach((el) => {
        const dir = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.revealDelay ?? "0");

        const from: gsap.TweenVars = {
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay,
        };

        if (dir === "up") from.y = 40;
        if (dir === "down") from.y = -40;
        if (dir === "left") from.x = 40;
        if (dir === "right") from.x = -40;

        gsap.from(el, {
          ...from,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Description = () => {
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paraRef.current;
    if (!el) return;

    const split = new SplitText(el, { type: "words" });

    gsap.from(split.words, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24 lg:py-36">
      <div className="max-w-7xl mx-auto">
        {/* Top row: label + paragraph */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            marginBottom: "64px",
          }}
          className="lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* Label */}
          <div style={{ paddingTop: "6px" }}>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(13,13,13,0.4)",
              }}>
              + Our Focus
            </span>
          </div>

          {/* Main paragraph */}
          <p
            ref={paraRef}
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0d0d0d",
              margin: 0,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            suscipit massa ut lectus consectetur pulvinar. Nulla aliquet
            vulputate magna vel viverra. Morbi vel nisi euismod, molestie est
            semper, bibendum ligula.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Description;

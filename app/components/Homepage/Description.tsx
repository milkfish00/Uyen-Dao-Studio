"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Description = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const el = paraRef.current;
    if (!section || !label || !el) return;

    gsap.set(label, { opacity: 0 });
    gsap.set(el, { opacity: 0 });

    const split = new SplitText(el, {
      type: "lines",
      linesClass: "split-line",
    });

    // Wrap each line in an overflow-hidden div for the clip reveal
    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.set(split.lines, { y: "100%" });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(label, { opacity: 0.7, duration: 0.4 })
      .to(el, { opacity: 1, duration: 0 }, "<")
      .to(
        split.lines,
        {
          y: 0,
          ease: "sine.out",
          transformOrigin: "top",
          stagger: 0.1,
          duration: 1.2,
        },
        "<0.4",
      );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-40">
      <div className="max-w-7xl mx-auto">
        {/* Top row: label + paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16 mb-16">
          {/* Label */}
          <div className="pt-1.5">
            <span
              ref={labelRef}
              className="text-[0.6rem] tracking-[0.2em] uppercase text-red/40">
              + Our Focus
            </span>
          </div>

          {/* Main paragraph */}
          <p
            ref={paraRef}
            className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-red m-0">
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

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
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    tl.to(label, { opacity: 0.7, duration: 0.3 })
      .to(el, { opacity: 1, duration: 0 }, "<")
      .to(
        split.lines,
        {
          y: 0,
          ease: "power3.out",
          stagger: 0.06,
          duration: 0.7,
        },
        "<",
      );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-10 lg:px-16 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-40 lg:pb-20">
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
            I believe products are an extension of personal identity. They exist
            not only to solve problems, but to express who we are and how we
            live.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Description;

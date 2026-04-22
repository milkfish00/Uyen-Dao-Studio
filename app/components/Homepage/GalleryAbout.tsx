"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const galleryImgs = [
  { src: "https://picsum.photos/seed/gw1/1200/800", alt: "Selected work 1" },
  { src: "https://picsum.photos/seed/gw2/800/1100", alt: "Selected work 2" },
  { src: "https://picsum.photos/seed/gw3/1200/900", alt: "Selected work 3" },
  { src: "https://picsum.photos/seed/gw4/900/1200", alt: "Selected work 4" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const eyebrow = eyebrowRef.current;
    if (!section || !heading || !eyebrow) return;

    gsap.set(eyebrow, { opacity: 0 });

    const split = new SplitText(heading, {
      type: "lines",
      linesClass: "split-line",
    });

    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.set(split.lines, { y: "108%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        toggleActions: "play none none none",
      },
    });

    tl.to(eyebrow, { opacity: 1, duration: 0.4, ease: "none" }).to(
      split.lines,
      {
        y: 0,
        ease: "power3.out",
        stagger: 0.08,
        duration: 1.1,
      },
      "<0.2",
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      galleryRef.current
        ?.querySelectorAll<HTMLElement>(".gallery-img-wrap")
        .forEach((el) => {
          const yFrom = parseFloat(el.dataset.yFrom ?? "10");
          const yTo = parseFloat(el.dataset.yTo ?? "-10");
          gsap.fromTo(
            el,
            { yPercent: yFrom },
            {
              yPercent: yTo,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });
    }, galleryRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="relative text-white bg-[#c2090a] overflow-visible">
        <div className="min-h-screen px-6 sm:px-10 lg:px-16 pt-24 pb-24 flex flex-col items-center">
          {/* Editorial headline */}
          <h2
            ref={headingRef}
            className="relative z-10 flex flex-wrap justify-center gap-x-[0.25em] uppercase text-[clamp(3rem,10vw,9rem)] tracking-[-0.05em] font-bold text-white leading-[0.85] mb-6 text-center">
            Uyen Dao
          </h2>

          {/* Large Polaroid - overlapping the text */}
          <div className="flex justify-center relative z-30 -mt-0 sm:-mt-16 md:-mt-0 mb-12">
            <div className="bg-white p-3 sm:p-4 pb-16 sm:pb-20 shadow-lg rotate-[-1.5deg] relative">
              <div className="relative w-[280px] sm:w-[420px] md:w-[540px] lg:w-[640px] aspect-4/5 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Mola Piasecka — Founder of Mola"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 420px, (max-width: 1024px) 540px, 640px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Body text */}
          <div className="flex items-center justify-center">
            <p className="text-[clamp(0.74rem,0.86vw,0.82rem)] max-w-2xl  text-justify leading-[1.75] text-white m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              purus orci, dignissim sed vehicula at, tristique vel est. Maecenas
              sollicitudin bibendum ante. In condimentum semper tincidunt. Etiam
              ex mauris, euismod fermentum nisl in, hendrerit vulputate mauris.
              Ut eget ipsum purus. Curabitur accumsan neque a elit ultrices
              volutpat. Quisque pretium mattis nunc, vitae sodales ipsum laoreet
              vitae. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Fusce ut facilisis dui.
            </p>
          </div>
          {/* CTA row */}
          <div className="flex gap-4 mt-16 w-full max-w-sm relative z-20">
            <a
              href="/contact"
              className="flex-1 text-white text-center text-[0.6rem] uppercase tracking-[0.18em] py-3.5 underline transition-all duration-200 font-mono hover:text-white/70">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

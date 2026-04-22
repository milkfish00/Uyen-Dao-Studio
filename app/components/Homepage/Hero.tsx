"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const heroImages = [
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Image carousel
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Text split animation on mount
  useEffect(() => {
    const title = titleRef.current;
    const desc = descRef.current;
    if (!title || !desc) return;

    const splitTitle = new SplitText(title, { type: "chars" });
    const splitDesc = new SplitText(desc, { type: "words" });

    // Wrap each char/word in an overflow-hidden clip container
    [...splitTitle.chars, ...splitDesc.words].forEach((el) => {
      const wrap = document.createElement("div");
      wrap.style.cssText =
        "overflow:hidden;display:inline-block;vertical-align:bottom;";
      el.parentNode?.insertBefore(wrap, el);
      wrap.appendChild(el);
    });

    gsap.set([splitTitle.chars, splitDesc.words], { y: "110%" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(splitTitle.chars, { y: "0%", duration: 0.75, stagger: 0.03 }).to(
      splitDesc.words,
      { y: "0%", duration: 0.65, stagger: 0.05 },
      "-=0.3",
    );

    return () => {
      splitTitle.revert();
      splitDesc.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100dvh] bg-cream px-3 pb-3 pt-16 md:p-5">
      <div className="relative w-full h-full flex flex-col">
        {/* Photo — fills most of height */}
        <div className="relative flex-1 overflow-hidden">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? "Featured project" : ""}
              aria-hidden={i !== current}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                opacity: i === current ? 1 : 0,
                transition: "opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: i === current ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Bottom — large display title */}
        <div className="shrink-0 pt-3 md:pt-4">
          <h1
            ref={titleRef}
            className="uppercase font-bold text-center text-red leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 7.5vw, 7rem)" }}>
            Uyen Dao Design
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;

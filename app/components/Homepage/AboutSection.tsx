"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;
    if (!image || !text) return;

    gsap.set(image, { opacity: 0, y: 56 });
    gsap.set(text, { opacity: 0, y: 36 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(image, { opacity: 1, y: 0, duration: 1.3, ease: "power3.out" }).to(
      text,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      "<0.3",
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-ink min-h-[200vh]">
      {/* Brand name — sticky, pinned behind scroll content */}
      <div className="sticky top-0 h-screen z-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none">
        <p
          className="font-bold uppercase text-white text-center leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(5rem, 22vw, 16rem)" }}>
          UYEN DAO
        </p>
      </div>

      {/* Scroll content — image + text scroll over the brand name */}
      <div className="relative z-10 -mt-[40vh] flex flex-col items-center pb-40">
        <div
          ref={imageRef}
          className="relative bg-cream shadow-[0_48px_120px_rgba(0,0,0,0.8)]"
          style={{
            padding: "clamp(8px, 1.5vw, 14px)",
            paddingBottom: "clamp(40px, 8vw, 72px)",
          }}>
          {/* Washi tape */}
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-20 h-7 bg-[#c9a97e]/55"
            style={{ clipPath: "polygon(1% 8%, 99% 2%, 98% 92%, 2% 98%)" }}
          />
          <div className="relative w-[80vw] max-w-115 aspect-3/4 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Uyen Dao Studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 260px"
              priority
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="mt-14 text-center space-y-5 max-w-xs px-8">
          <p className="text-lg leading-[1.72] text-white/80 font-sans">
            Hi, I&apos;m Uyen &ndash; a brand identity designer crafting
            tailor-made visual systems for ambitious founders.
          </p>
          <p className="text-lg leading-[1.72] text-white/80 font-sans">
            Ready to build something lasting? Reach out to start the
            conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

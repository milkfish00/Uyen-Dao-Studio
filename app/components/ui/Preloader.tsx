"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["✳", "UYEN", "DAO", "DESIGN"];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Lock scroll while preloader is shown
    document.body.style.overflow = "hidden";

    const spans = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(spans, { y: "110%" });

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the whole overlay, then unmount
        gsap.to(root, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = "";
            setVisible(false);
          },
        });
      },
    });

    // Stagger words in
    tl.to(spans, {
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    })
      // Hold briefly
      .to({}, { duration: 0.45 })
      // Stagger words out upward
      .to(spans, {
        y: "-110%",
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.07,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-9999 bg-red flex items-center justify-center px-6">
      <div className="flex items-center gap-[0.3em] leading-none">
        {WORDS.map((word, i) => (
          <div key={i} className="overflow-hidden pb-[0.08em]">
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="block font-bold text-white tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.4rem, 5vw,1rem)" }}>
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

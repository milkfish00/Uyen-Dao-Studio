"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "industrial-design",
    num: "01",
    title: "Industrial Design",
    tagline: "Turning ideas into tangible product concepts",
    description:
      "Helping entrepreneurs and creators visualize their ideas as physical products through concept sketches, form exploration, and early-stage product thinking.",
    items: [
      "Product concept sketches",
      "Form exploration",
      "Early product visualization",
      "Idea development toward a physical object",
    ],
  },
  {
    id: "fashion-design",
    num: "02",
    title: "Fashion Design",
    tagline: "Developing wearable product designs",
    description:
      "Supporting fashion creators with design illustration and technical documentation needed to develop garments.",
    items: [
      "Fashion illustration",
      "Technical sketches",
      "Tech pack development",
      "Adobe Illustrator garment drawings",
    ],
  },
  {
    id: "art-direction",
    num: "03",
    title: "Art Direction",
    tagline: "Shaping the visual identity of products",
    description:
      "Guiding the visual storytelling of a product through imagery, styling, and campaign direction.",
    items: [
      "Photoshoot direction",
      "Visual marketing concepts",
      "Campaign storytelling",
      "Connecting brands with photographers and creatives",
      "Styling experience for wearable products",
    ],
  },
];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const serviceTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Animate page header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".header-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Animate service section titles
  useEffect(() => {
    const ctxs = serviceTitleRefs.current.map((el) => {
      if (!el) return null;
      const words = el.querySelectorAll<HTMLElement>(".service-section-word");
      gsap.set(words, { y: "110%" });
      const ctx = gsap.context(() => {
        gsap.to(words, {
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }, el);
      return ctx;
    });
    return () => ctxs.forEach((c) => c?.revert());
  }, []);

  // Scroll to hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 15) {
        setTimeout(tryScroll, 80);
      }
    };
    setTimeout(tryScroll, 150);
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="px-6 sm:px-10 lg:px-16 pt-40 pb-16 border-b border-red/10">
        <div ref={headerRef}>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-[-0.05em] uppercase leading-none text-red flex flex-wrap gap-x-[0.2em]">
            {"Services".split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span className="block header-word">{word}</span>
              </div>
            ))}
          </h1>
        </div>
      </div>

      {/* Service sections */}
      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          ref={(el) => {
            sectionRefs.current[s.id] = el;
          }}
          className={`px-6 sm:px-10 lg:px-16 py-20 lg:py-28 border-b border-red/10 flex flex-col lg:flex-row lg:gap-[8vw] ${
            i % 2 === 1 ? "bg-red text-cream" : "bg-cream text-red"
          }`}>
          {/* Left: number + title + tagline */}
          <div className="lg:w-[40%] shrink-0 mb-12 lg:mb-0 flex flex-col justify-between">
            <div>
              <p
                className={`text-[0.6rem] tracking-[0.22em] uppercase mb-6 ${
                  i % 2 === 1 ? "text-cream/40" : "text-red/40"
                }`}>
                {s.num}
              </p>
              <h2
                ref={(el) => {
                  serviceTitleRefs.current[i] = el;
                }}
                className="text-[clamp(2.4rem,5vw,5.5rem)] font-bold tracking-[-0.05em] uppercase leading-[0.92] mb-6 flex flex-wrap gap-x-[0.2em]">
                {s.title.split(" ").map((word, wi) => (
                  <div key={wi} className="overflow-hidden">
                    <span className="block service-section-word">{word}</span>
                  </div>
                ))}
              </h2>
              <p
                className={`text-[clamp(1rem,1.6vw,1.3rem)] font-medium leading-[1.3] tracking-[-0.02em] ${
                  i % 2 === 1 ? "text-cream/70" : "text-red/70"
                }`}>
                {s.tagline}
              </p>
            </div>

            <Link
              href="/contact"
              className={`mt-10  self-start text-[0.6rem] tracking-[0.22em] uppercase px-5 py-3 border rounded-full transition-colors duration-200 ${
                i % 2 === 1
                  ? "border-cream/30 text-cream hover:bg-cream hover:text-red"
                  : "border-red/30 text-red hover:bg-red hover:text-cream"
              }`}>
              Inquire →
            </Link>
          </div>

          {/* Right: description + what I help with */}
          <div className="lg:w-[60%] flex flex-col justify-center">
            <p
              className={`text-[clamp(0.85rem,1vw,0.95rem)] leading-[1.8] mb-10 max-w-[52ch] ${
                i % 2 === 1 ? "text-cream/65" : "text-red/65"
              }`}>
              {s.description}
            </p>

            <div>
              <p
                className={`text-[0.55rem] tracking-[0.22em] uppercase mb-4 ${
                  i % 2 === 1 ? "text-cream/40" : "text-red/40"
                }`}>
                What I help with
              </p>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 text-[clamp(0.82rem,0.95vw,0.9rem)] leading-[1.6] ${
                      i % 2 === 1 ? "text-cream/80" : "text-red/80"
                    }`}>
                    <span
                      className={`mt-[0.45em] w-1 h-1 rounded-full shrink-0 ${
                        i % 2 === 1 ? "bg-cream/40" : "bg-red/40"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

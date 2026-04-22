"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PICSUM = "https://picsum.photos/seed/";

const BASE = [
  {
    idx: 1,
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    image: `${PICSUM}p1/480/720`,
    category: "Branding",
  },
  {
    idx: 2,
    title: "Dolor Sit",
    slug: "dolor-sit",
    image: `${PICSUM}p2/480/720`,
    category: "Web",
  },
  {
    idx: 3,
    title: "Amet Consec",
    slug: "amet-consec",
    image: `${PICSUM}p3/480/720`,
    category: "Identity",
  },
  {
    idx: 4,
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    image: `${PICSUM}p4/480/720`,
    category: "Branding",
  },
  {
    idx: 5,
    title: "Consectetur",
    slug: "consectetur",
    image: `${PICSUM}p5/480/720`,
    category: "Motion",
  },
  {
    idx: 6,
    title: "Sed Euismod",
    slug: "sed-euismod",
    image: `${PICSUM}p6/480/720`,
    category: "Print",
  },
];

const CATEGORIES = ["All", "Branding", "Web", "Identity", "Motion", "Print"];

const ITEMS = [...BASE, ...BASE, ...BASE];
const N = BASE.length;

// Card
function Card({ p, isCenter }: { p: (typeof BASE)[0]; isCenter: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className={`card-wrap${isCenter ? " is-center" : ""} relative shrink-0 block overflow-hidden self-center${!isCenter ? " grayscale-[0.3] brightness-[0.82]" : ""}`}
      draggable={false}
      style={{
        width: isCenter ? "clamp(320px,38vw,600px)" : "clamp(240px,32vw,520px)",
        height: isCenter
          ? "clamp(500px,92vh,960px)"
          : "clamp(320px,74vh,740px)",
        transition:
          "width 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="hover-layer absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-[clamp(1.4rem,3.5vw,5rem)] text-red mix-blend-difference uppercase whitespace-nowrap relative tracking-[-0.05em] font-bold leading-none">
          {p.title}
        </h2>
      </div>
      <div className="hover-layer absolute bottom-4 left-4">
        <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/55">
          {String(p.idx).padStart(2, "0")}
        </p>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileHeadingRef = useRef<HTMLHeadingElement>(null);
  const jumping = useRef(false);

  const [centerIdx, setCenterIdx] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const items = track.querySelectorAll<HTMLElement>(".card-wrap");
        const target = items[N];
        if (target) {
          track.scrollLeft =
            target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
        }
      });
    });
  }, [isMobile]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > 2 ? e.deltaX : e.deltaY;
      track.scrollLeft += delta;
    };

    const onScroll = () => {
      if (jumping.current) return;
      const { scrollLeft, scrollWidth } = track;
      const third = scrollWidth / 3;
      if (scrollLeft >= third * 2) {
        jumping.current = true;
        track.scrollLeft = scrollLeft - third;
        jumping.current = false;
      } else if (scrollLeft <= 0) {
        jumping.current = true;
        track.scrollLeft = scrollLeft + third;
        jumping.current = false;
      }

      const viewCenter = track.scrollLeft + track.clientWidth / 2;
      const items = track.querySelectorAll<HTMLElement>(".card-wrap");
      let closest = 0,
        minDist = Infinity;
      items.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - viewCenter);
        if (d < minDist) {
          minDist = d;
          closest = i % N;
        }
      });
      setCenterIdx(closest);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    const el = mobileHeadingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  if (isMobile === null) return null;

  const filteredItems =
    filter === "All" ? BASE : BASE.filter((p) => p.category === filter);

  // ── Mobile ───────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <main className="min-h-screen w-screen bg-cream">
        <div className="px-5 pt-40 pb-6 flex flex-col gap-5">
          <div className="relative inline-block mb-5">
            <h1
              ref={mobileHeadingRef}
              className="text-[clamp(2.2rem,13vw,4rem)] font-bold tracking-[-0.05em] uppercase leading-[0.88] text-red">
              <div className="flex flex-wrap gap-x-[0.3em]">
                {["Selected", "Work"].map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <span className="block heading-word">{word}</span>
                  </div>
                ))}
              </div>
            </h1>
          </div>

          <div
            className="relative inline-block"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 text-[0.55rem] tracking-[0.2em] uppercase px-3 py-2 border border-red bg-cream rounded-2xl text-red hover:border-red/40 transition-colors">
              {filter}
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                <path
                  d="M1 1l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 z-30 bg-cream border border-black/15 shadow-sm min-w-27.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilter(cat);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[0.55rem] tracking-[0.2em] uppercase transition-colors block ${
                      filter === cat
                        ? "text-red bg-red/5"
                        : "text-red/50 hover:text-red/80 hover:bg-red/4"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-28 overflow-x-hidden flex flex-col gap-6">
          {filteredItems.map((p) => (
            <Link key={p.idx} href={`/work/${p.slug}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="pt-6">
                <h2 className="text-red text-md font-bold uppercase tracking-[-0.03em] leading-none">
                  {p.title}
                </h2>
                <p className="text-[0.75rem] tracking-[0.15em] uppercase text-red/40 mt-1.5">
                  {p.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4 pointer-events-none">
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-red/38">
            Selected Work
          </p>
          <p className="text-[0.55rem] tracking-[0.2em] uppercase text-red/38">
            ({String(filteredItems.length).padStart(2, "0")}/{N}) Projects
          </p>
        </div>
      </main>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────────────
  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col bg-cream select-none">
      <div
        ref={trackRef}
        className="scrollbar-hide flex-1 overflow-x-auto overflow-y-hidden cursor-grab">
        <div className="flex items-center h-full min-w-max gap-[5vw] px-[28vw]">
          {ITEMS.map((p, i) => {
            const baseI = i % N;
            const isCenter = baseI === centerIdx;
            return <Card key={i} p={p} isCenter={isCenter} />;
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-10 py-6 pointer-events-none">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-red/38">
          Selected Work
        </p>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-red/38">
          ({String(centerIdx + 1).padStart(2, "0")}/{N}) Projects
        </p>
      </div>
    </main>
  );
}

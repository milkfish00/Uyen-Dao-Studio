"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PICSUM = "https://picsum.photos/seed/";

const BASE = [
  {
    idx: 1,
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    image: `${PICSUM}p1/480/720`,
  },
  {
    idx: 2,
    title: "Dolor Sit",
    slug: "dolor-sit",
    image: `${PICSUM}p2/480/720`,
  },
  {
    idx: 3,
    title: "Amet Consec",
    slug: "amet-consec",
    image: `${PICSUM}p3/480/720`,
  },
  {
    idx: 4,
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    image: `${PICSUM}p4/480/720`,
  },
  {
    idx: 5,
    title: "Consectetur",
    slug: "consectetur",
    image: `${PICSUM}p5/480/720`,
  },
  {
    idx: 6,
    title: "Sed Euismod",
    slug: "sed-euismod",
    image: `${PICSUM}p6/480/720`,
  },
];

// Triple for infinite loop
const ITEMS = [...BASE, ...BASE, ...BASE];
const N = BASE.length;

export default function WorkPage() {
  const [ready, setReady] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const jumping = useRef(false);

  // Which BASE index is centered — derived from scroll position
  const [centerIdx, setCenterIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Jump to middle copy on mount — center item N in viewport
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Double rAF so layout (flex sizing) is fully settled
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
  }, []);

  // Remap vertical → horizontal + infinite loop (from original)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Use horizontal delta if available (trackpad), else vertical
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

      // Find which item centre is closest to the viewport centre
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
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col bg-white select-none">
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="scrollbar-hide flex-1 overflow-x-auto overflow-y-hidden cursor-grab">
        <div className="flex items-center h-full min-w-max gap-[5vw] px-[28vw]">
          {ITEMS.map((p, i) => {
            const baseI = i % N;
            const isCenter = baseI === centerIdx;
            return (
              <Link
                key={i}
                href={`/work/${p.slug}`}
                className={`card-wrap${isCenter ? " is-center" : ""} relative shrink-0 block overflow-hidden self-center${!isCenter ? " grayscale-[0.3] brightness-[0.82]" : ""}`}
                draggable={false}
                style={{
                  width: isCenter
                    ? "clamp(320px, 38vw, 600px)"
                    : "clamp(240px, 32vw, 520px)",
                  height: isCenter
                    ? "clamp(500px, 92vh, 960px)"
                    : "clamp(320px, 74vh, 740px)",
                  transition:
                    "width 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>
                {/* Image clip + reveal */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover img-reveal"
                    draggable={false}
                    style={{ animationDelay: `${(i % N) * 0.08}s` }}
                  />
                </div>

                {/* Hover overlay — title + index */}
                <div className="hover-layer absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="text-[clamp(1.4rem,3.5vw,5rem)]  text-[#c2090a] mix-blend-difference uppercase whitespace-nowrap  relative tracking-[-0.05em] font-bold  leading-none">
                    {p.title}
                    <span className="absolute top-[-0.3em] right-[-0.3em] text-[0.6em] font-bold">
                      ✳
                    </span>
                  </h2>
                </div>

                {/* Index bottom-left on hover */}
                <div className="hover-layer absolute bottom-4 left-4">
                  <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/55">
                    {String(p.idx).padStart(2, "0")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-10 py-6 pointer-events-none">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#c2090a]/38">
          Selected Work
        </p>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#c2090a]/38">
          ({String(centerIdx + 1).padStart(2, "0")}/{N}) Projects
        </p>
      </div>
    </main>
  );
}

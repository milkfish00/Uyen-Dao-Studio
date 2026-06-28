"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SITE_IMAGE_ALT = "Uyen Dao Studio";
const PICSUM = "https://picsum.photos/seed/";
const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

type Work = {
  idx: number;
  title: string;
  slug: string;
  category: string;
  image: string;
};

type SanityWork = {
  _id: string;
  title: string;
  slug: string;
  skills?: string[];
  year?: number;
  boards?: (string | null)[];
  hero?: string | null;
};

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const FALLBACK_WORKS: Work[] = [
  {
    idx: 1,
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    category: "Branding",
    image: mk("p1", 480, 720),
  },
  {
    idx: 2,
    title: "Dolor Sit",
    slug: "dolor-sit",
    category: "Web",
    image: mk("p2", 480, 720),
  },
  {
    idx: 3,
    title: "Amet Consec",
    slug: "amet-consec",
    category: "Identity",
    image: mk("p3", 480, 720),
  },
  {
    idx: 4,
    title: "Adipiscing Elit",
    slug: "adipiscing-elit",
    category: "Motion",
    image: mk("p4", 480, 720),
  },
];

function toWork(work: SanityWork): Work {
  const fallback = `https://picsum.photos/seed/${work._id}h/480/720`;

  return {
    idx: 0,
    title: work.title,
    slug: work.slug,
    category: work.skills?.find(Boolean) || "Project",
    image: hasImageSrc(work.hero) ? work.hero : fallback,
  };
}

function Card({ work, isCenter }: { work: Work; isCenter: boolean }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className={`card-wrap relative block shrink-0 self-center overflow-hidden ${
        isCenter ? "is-center" : "brightness-[0.82] grayscale-[0.3]"
      }`}
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
          src={work.image}
          alt={work.title || SITE_IMAGE_ALT}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="hover-layer absolute inset-0 flex items-center justify-center">
        <h2 className="relative whitespace-nowrap text-[clamp(1.4rem,3.5vw,5rem)] font-bold uppercase leading-none tracking-[-0.05em] text-red mix-blend-difference">
          {work.title}
        </h2>
      </div>
      <div className="hover-layer absolute bottom-4 left-4">
        <p className="text-[0.5rem] uppercase tracking-[0.2em] text-white/55">
          {String(work.idx).padStart(2, "0")}
        </p>
      </div>
    </Link>
  );
}

export default function WorkContent({
  initialProjects,
}: {
  initialProjects?: SanityWork[] | null;
}) {
  const jumping = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const works = useMemo(
    () =>
      (initialProjects && initialProjects.length > 0
        ? initialProjects.map(toWork)
        : FALLBACK_WORKS
      ).map((work, index) => ({
        ...work,
        idx: index + 1,
      })),
    [initialProjects],
  );

  const categories = useMemo(() => {
    const values = new Set<string>();

    works.forEach((work) => {
      if (work.category) {
        values.add(work.category);
      }
    });

    return ["All", ...values];
  }, [works]);

  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [centerIdx, setCenterIdx] = useState(0);
  const [breakpoint, setBreakpoint] = useState<
    "mobile" | "tablet" | "desktop" | null
  >(null);

  const visibleWorks = useMemo(() => {
    if (filter === "All") {
      return works;
    }

    return works.filter((work) => work.category === filter);
  }, [filter, works]);

  const itemCount = visibleWorks.length;
  const loopedItems = useMemo(
    () => [...visibleWorks, ...visibleWorks, ...visibleWorks],
    [visibleWorks],
  );

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || breakpoint !== "desktop" || itemCount === 0) {
      return;
    }

    setCenterIdx(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const items = track.querySelectorAll<HTMLElement>(".card-wrap");
        const target = items[itemCount];

        if (target) {
          track.scrollLeft =
            target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
        }
      });
    });
  }, [breakpoint, itemCount, filter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || breakpoint !== "desktop" || itemCount === 0) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > 2 ? event.deltaX : event.deltaY;
      track.scrollLeft += delta;
    };

    const onScroll = () => {
      if (jumping.current) {
        return;
      }

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
      let closest = 0;
      let minDist = Number.POSITIVE_INFINITY;

      items.forEach((element, index) => {
        const distance = Math.abs(
          element.offsetLeft + element.offsetWidth / 2 - viewCenter,
        );

        if (distance < minDist) {
          minDist = distance;
          closest = index % itemCount;
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
  }, [breakpoint, itemCount]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || breakpoint === "desktop") {
      return;
    }

    const words = heading.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });

    const context = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, heading);

    return () => context.revert();
  }, [breakpoint, filter]);

  useEffect(() => {
    if (!dropdownOpen) {
      return;
    }

    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  if (breakpoint === null) {
    return null;
  }

  if (breakpoint === "mobile") {
    return (
      <main className="min-h-screen w-screen bg-cream">
        <div className="flex flex-col gap-5 px-5 pt-40 pb-6">
          <div className="relative mb-5 inline-block">
            <h1
              ref={headingRef}
              className="text-[clamp(2.2rem,13vw,4rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] text-red">
              <div className="flex flex-wrap gap-x-[0.3em]">
                {["Selected", "Work"].map((word) => (
                  <div key={word} className="overflow-hidden">
                    <span className="heading-word block">{word}</span>
                  </div>
                ))}
              </div>
            </h1>
          </div>

          <div
            className="relative inline-block"
            onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setDropdownOpen((value) => !value)}
              className="flex items-center gap-2 rounded-2xl border border-red bg-cream px-3 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-red transition-colors hover:border-red/40">
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

            {dropdownOpen ? (
              <div className="absolute top-full left-0 z-30 mt-1 min-w-28 border border-black/15 bg-cream shadow-sm">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setFilter(category);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-[0.55rem] uppercase tracking-[0.2em] transition-colors ${
                      filter === category
                        ? "bg-red/5 text-red"
                        : "text-red/50 hover:bg-red/4 hover:text-red/80"
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-6 overflow-x-hidden px-5 pb-28">
          {visibleWorks.map((work) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title || SITE_IMAGE_ALT}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="pt-6">
                <h2 className="text-md font-bold uppercase leading-none tracking-[-0.03em] text-red">
                  {work.title}
                </h2>
                <p className="mt-1.5 text-[0.75rem] uppercase tracking-[0.15em] text-red/40">
                  {work.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pointer-events-none fixed right-0 bottom-0 left-0 flex items-center justify-between px-5 py-4">
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-red/38">
            Selected Work
          </p>
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-red/38">
            ({String(visibleWorks.length).padStart(2, "0")}/
            {itemCount || works.length}) Projects
          </p>
        </div>
      </main>
    );
  }

  if (breakpoint === "tablet") {
    return (
      <main className="min-h-screen w-screen bg-cream">
        <div className="flex items-end justify-between px-8 pt-40 pb-8">
          <h1
            ref={headingRef}
            className="text-[clamp(2.8rem,7vw,5rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em] text-red">
            <div className="flex flex-wrap gap-x-[0.3em]">
              {["Selected", "Work"].map((word) => (
                <div key={word} className="overflow-hidden">
                  <span className="heading-word block">{word}</span>
                </div>
              ))}
            </div>
          </h1>

          <div
            className="relative mb-1"
            onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setDropdownOpen((value) => !value)}
              className="flex items-center gap-2 rounded-2xl border border-red bg-cream px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] text-red transition-colors hover:border-red/40">
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

            {dropdownOpen ? (
              <div className="absolute top-full right-0 z-30 mt-1 min-w-28 border border-black/15 bg-cream shadow-sm">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setFilter(category);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
                      filter === category
                        ? "bg-red/5 text-red"
                        : "text-red/50 hover:bg-red/4 hover:text-red/80"
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 px-8 pb-28">
          {visibleWorks.map((work) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className="block">
              <div className="relative aspect-3/4 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title || SITE_IMAGE_ALT}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="pt-4">
                <h2 className="text-[clamp(1rem,2.2vw,1.4rem)] font-bold uppercase leading-none tracking-[-0.03em] text-red">
                  {work.title}
                </h2>
                <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.15em] text-red/40">
                  {work.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pointer-events-none fixed right-0 bottom-0 left-0 flex items-center justify-between px-8 py-4">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-red/38">
            Selected Work
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-red/38">
            ({String(visibleWorks.length).padStart(2, "0")}/
            {itemCount || works.length}) Projects
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-screen select-none flex-col overflow-hidden bg-cream">
      <div
        ref={trackRef}
        className="scrollbar-hide flex-1 cursor-grab overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max items-center gap-[5vw] px-[28vw]">
          {loopedItems.map((work, index) => {
            const baseIndex = itemCount > 0 ? index % itemCount : 0;
            const isCenter = baseIndex === centerIdx;

            return (
              <Card
                key={`${work.slug}-${index}`}
                work={work}
                isCenter={isCenter}
              />
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex items-center justify-between px-10 py-6">
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-red/38">
          Selected Work
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-red/38">
          ({String(centerIdx + 1).padStart(2, "0")}/{itemCount || works.length})
          Projects
        </p>
      </div>
    </main>
  );
}

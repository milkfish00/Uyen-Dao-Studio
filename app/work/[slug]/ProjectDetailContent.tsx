"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const SITE_IMAGE_ALT = "Uyen Dao Studio";
const PICSUM = "https://picsum.photos/seed/";

type ProjectDetail = {
  title: string;
  slug: string;
  year?: number;
  skills?: string[];
  additionalInformation?: {
    title?: string;
    description?: string;
  } | null;
  boards?: (string | null)[];
};

type NextProject = {
  title: string;
  slug: string;
  image?: string | null;
} | null;

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const fallbackImage = (seed: string) => `${PICSUM}${seed}/1200/1600`;

export default function ProjectDetailContent({
  project,
  nextProject,
}: {
  project: ProjectDetail;
  nextProject: NextProject;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.innerWidth < 1024) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > 2 ? event.deltaX : event.deltaY;
      track.scrollLeft += delta;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const titleLines = project.title.split(/\s+/).filter(Boolean);
  const description = project.additionalInformation?.description?.trim() || "";
  const infoTitle = project.additionalInformation?.title?.trim() || "";
  const skillsText = project.skills?.filter(Boolean).join(" / ") || "";
  const metaLine = [infoTitle || "Project", project.year?.toString()]
    .filter(Boolean)
    .join(" / ");

  const imageSources = (project.boards ?? []).filter(hasImageSrc);
  const imageAt = (index: number) => {
    if (imageSources.length === 0) {
      return fallbackImage(`${project.slug}-${index}`);
    }
    return imageSources[index % imageSources.length];
  };

  const nextHref = nextProject ? `/work/${nextProject.slug}` : "/work";
  const nextLabel = nextProject?.title || "All Work";
  const nextImage = hasImageSrc(nextProject?.image)
    ? nextProject.image
    : imageAt(0);

  return (
    <main
      className="individual-work-page w-screen bg-cream font-sans lg:h-screen"
      style={{ overflow: "clip" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-[2.8rem] py-[1.6rem] pointer-events-none">
        <Link
          href="/work"
          className="pointer-events-auto rounded-full bg-cream px-6 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-red no-underline">
          ← Back
        </Link>
      </nav>

      <div
        ref={trackRef}
        className="scrollbar-hide w-full overflow-y-auto overflow-x-hidden lg:h-full lg:cursor-grab lg:overflow-x-auto lg:overflow-y-hidden">
        <div className="flex flex-col lg:h-full lg:min-w-max lg:flex-row">
          {/* SECTION 1: Intro Title + First Image Frame */}
          <section className="shrink-0 flex flex-col-reverse lg:h-full lg:flex-row">
            {/* Title / Description Area */}
            <div className="flex w-full flex-col justify-end px-6 pt-8 pb-12 sm:px-10 lg:w-[54vw] lg:pt-0 lg:pr-[4vw] lg:pb-[9vh] lg:pl-[5.5vw]">
              <div className="relative inline-block">
                <h1 className="pb-20 text-center text-[clamp(3.5rem,7vw,9rem)] font-bold uppercase leading-none tracking-[-0.04em] text-red md:text-left">
                  {titleLines.map((word, index) => (
                    <div key={`${word}-${index}`} className="hero-line">
                      <span className={index === 1 ? "pl-[1.1em]" : ""}>
                        {word}
                      </span>
                    </div>
                  ))}
                </h1>
              </div>
              <div className="hero-meta">
                <p className="mb-[3.5vh] text-[clamp(0.8rem,1.05vw,0.95rem)] tracking-[0.01em] text-red">
                  {metaLine}
                </p>
              </div>
              <div className="hero-desc max-w-full columns-1 gap-x-[3vw] sm:columns-2 lg:max-w-[43vw]">
                <p className="m-0 text-[clamp(0.74rem,0.86vw,0.82rem)] leading-[1.75] text-red/52">
                  {description}
                </p>
              </div>
              <div className="flex w-full flex-col justify-center py-12 lg:py-0">
                {skillsText ? (
                  <div className="mt-8 max-w-[36ch]">
                    <p className="mb-3 text-[0.6rem] uppercase tracking-[0.22em] text-red/40">
                      Skills
                    </p>
                    <p className="text-[clamp(0.74rem,0.86vw,0.82rem)] leading-[1.75] text-red/52">
                      {skillsText}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Image 1 Container */}
            <div className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
              <div className="relative w-full h-full  overflow-hidden rounded-sm">
                <img
                  src={imageAt(0)}
                  alt={SITE_IMAGE_ALT}
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: Uniform Frame (Image 1 alternate) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(1)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 3: Uniform Frame (Image 2) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(2)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 4: Uniform Frame (Image 3) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(3)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 5: Uniform Frame (Image 4 - Grayscale) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(4)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain grayscale"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 6: Uniform Frame (Image 5) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(5)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 7: Uniform Frame (Image 6) */}
          <section className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:w-screen lg:p-[5vh]">
            <div className="relative w-full h-full  overflow-hidden rounded-sm">
              <img
                src={imageAt(6)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </section>

          {/* SECTION 8: Next Project Action Frame */}
          <section className="flex w-full shrink-0 flex-col bg-cream lg:h-full lg:w-screen lg:flex-row">
            <div className="flex w-full flex-col justify-center px-6 pt-14 pb-12 sm:px-10 lg:w-1/2 lg:px-[5vw] lg:pt-0 lg:pb-0">
              <p className="mb-[1.4rem] text-[0.6rem] uppercase tracking-[0.22em] text-red/40">
                Next project
              </p>
              <Link href={nextHref} className="no-underline">
                <h2 className="cursor-pointer text-[clamp(3.5rem,7vw,9rem)] font-bold uppercase leading-none tracking-[-0.05em] text-red">
                  {nextLabel}
                </h2>
              </Link>
            </div>

            {/* Uniform Next-Image container wrapping next thumbnail */}
            <div className="relative h-[72vw] w-full shrink-0 p-6 sm:h-[60vw] lg:h-full lg:flex-1 lg:p-[5vh]">
              <div className="relative w-full h-full  overflow-hidden rounded-sm">
                <img
                  src={nextImage}
                  alt={SITE_IMAGE_ALT}
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

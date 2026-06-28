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
          <section className="shrink-0 flex flex-col-reverse lg:h-full lg:flex-row">
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
              <div className="flex w-full flex-col justify-center  py-12 lg:py-0">
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

            <div className="relative h-[72vw] w-full shrink-0 overflow-hidden sm:h-[60vw] lg:h-full lg:w-screen">
              <img
                src={imageAt(0)}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
          </section>

          <section className="relative min-h-[100vw] w-full shrink-0 bg-cream lg:h-full lg:min-h-0 lg:w-screen">
            <div className="absolute top-[27%] left-[4%] w-[21%] overflow-hidden">
              <img
                src={imageAt(1)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-3/4 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[5%] left-[25%] w-[41%] overflow-hidden">
              <img
                src={imageAt(2)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-2/3 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[17%] right-0 w-[27%] overflow-hidden">
              <img
                src={imageAt(3)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-3/4 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
          </section>

          <section className="relative h-[60vw] w-full shrink-0 overflow-hidden sm:h-[50vw] lg:h-full lg:w-screen">
            <img
              src={imageAt(2)}
              alt={SITE_IMAGE_ALT}
              className="absolute inset-0 h-full w-full object-cover lg:object-contain"
              draggable={false}
            />
          </section>

          <section className="flex w-full shrink-0 flex-col bg-cream lg:h-full lg:w-screen lg:flex-row">
            <div className="relative h-[80vw] w-full sm:h-[65vw] lg:h-full lg:w-[57%]">
              <div className="absolute top-[6%] left-0 bottom-[12%] w-[55%] overflow-hidden">
                <img
                  src={imageAt(4)}
                  alt={SITE_IMAGE_ALT}
                  className="h-full w-full object-cover grayscale lg:object-contain"
                  draggable={false}
                />
              </div>
              <div className="absolute top-[18%] left-[24%] right-0 bottom-0 overflow-hidden">
                <img
                  src={imageAt(5)}
                  alt={SITE_IMAGE_ALT}
                  className="h-full w-full object-cover grayscale lg:object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </section>

          <section className="relative h-[60vw] w-full shrink-0 overflow-hidden sm:h-[50vw] lg:h-full lg:w-screen">
            <img
              src={imageAt(5)}
              alt={SITE_IMAGE_ALT}
              className="absolute inset-0 h-full w-full object-cover lg:object-contain"
              draggable={false}
            />
          </section>

          <section className="relative min-h-[130vw] w-full shrink-0 bg-cream sm:min-h-[100vw] lg:h-full lg:min-h-0 lg:w-[155vw]">
            <div className="absolute top-[36%] left-[2%] w-[16%] overflow-hidden">
              <img
                src={imageAt(6)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-3/4 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[10%] left-[15%] w-[36%] overflow-hidden">
              <img
                src={imageAt(7)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-4/3 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[56%] left-[15%] w-[28%] overflow-hidden">
              <img
                src={imageAt(8)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-3/2 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[5%] right-[7%] w-[19%] overflow-hidden">
              <img
                src={imageAt(1)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-2/3 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute top-[46%] right-[4%] w-[15%] overflow-hidden">
              <img
                src={imageAt(3)}
                alt={SITE_IMAGE_ALT}
                className="block aspect-3/4 w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
          </section>

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
            <div className="relative h-[75vw] w-full overflow-hidden sm:h-[60vw] lg:h-full lg:flex-1">
              <img
                src={nextImage}
                alt={SITE_IMAGE_ALT}
                className="absolute inset-0 h-full w-full object-cover lg:object-contain"
                draggable={false}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

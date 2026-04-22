"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState, use } from "react";

const PICSUM = "https://picsum.photos/seed/";

const PROJECTS = [
  {
    slug: "lorem-ipsum",
    name: ["Lorem", "Ipsum"],
    school: "École des Beaux-Arts",
    year: "2023",
    desc: "The student redesigns a traditional suit jacket and explores its structural possibilities. Working unconventionally, using wool and ceramics as the starting point for the study — looking for materials that express the contradiction between the delicate and the coarse.",
    secondaryTitle: "Materials and volumes",
    secondaryText:
      "The upper part of the design is made of silk organza and ceramic buttons. The skirt, hand-crafted in felt onto a mould, provides the counterpoint to this sculptural outfit. It is fascinating to experiment with materials that create volumes and new silhouettes.",
    images: [
      `${PICSUM}lp1/1200/900`,
      `${PICSUM}lp2/600/900`,
      `${PICSUM}lp3/900/700`,
      `${PICSUM}lp4/700/900`,
      `${PICSUM}lp5/900/600`,
      `${PICSUM}lp6/600/800`,
      `${PICSUM}lp7/800/600`,
      `${PICSUM}lp8/600/900`,
      `${PICSUM}lp9/900/700`,
    ],
    next: {
      name: "Dolor Sit",
      slug: "dolor-sit",
      image: `${PICSUM}ds1/1600/900`,
    },
  },
  {
    slug: "dolor-sit",
    name: ["Dolor", "Sit"],
    school: "Central Saint Martins",
    year: "2022",
    desc: "An exploration of negative space and structural tension in garment construction. The work challenges conventional tailoring through a rigorous study of silhouette, proportion, and the unexpected.",
    secondaryTitle: "Tension and form",
    secondaryText:
      "Each piece is constructed from a single pattern piece, folded and cut to reveal its inherent geometry. The relationship between inside and outside, hidden and exposed, drives the design language throughout.",
    images: [
      `${PICSUM}ds1/1200/900`,
      `${PICSUM}ds2/600/900`,
      `${PICSUM}ds3/900/700`,
      `${PICSUM}ds4/700/900`,
      `${PICSUM}ds5/900/600`,
      `${PICSUM}ds6/600/800`,
      `${PICSUM}ds7/800/600`,
      `${PICSUM}ds8/600/900`,
      `${PICSUM}ds9/900/700`,
    ],
    next: {
      name: "Amet Consec",
      slug: "amet-consec",
      image: `${PICSUM}ac1/1600/900`,
    },
  },
  {
    slug: "amet-consec",
    name: ["Amet", "Consec"],
    school: "Parsons School of Design",
    year: "2023",
    desc: "A study in transparency and opacity through layered textile work. The collection investigates the boundary between the garment and the body.",
    secondaryTitle: "Surface and depth",
    secondaryText:
      "The layering process creates optical depth and shifts in perception depending on movement and light. Each layer is considered both independently and in relation to those beneath and above.",
    images: [
      `${PICSUM}ac1/1200/900`,
      `${PICSUM}ac2/600/900`,
      `${PICSUM}ac3/900/700`,
      `${PICSUM}ac4/700/900`,
      `${PICSUM}ac5/900/600`,
      `${PICSUM}ac6/600/800`,
      `${PICSUM}ac7/800/600`,
      `${PICSUM}ac8/600/900`,
      `${PICSUM}ac9/900/700`,
    ],
    next: {
      name: "Adipiscing Elit",
      slug: "adipiscing-elit",
      image: `${PICSUM}ae1/1600/900`,
    },
  },
  {
    slug: "adipiscing-elit",
    name: ["Adipiscing", "Elit"],
    school: "Royal College of Art",
    year: "2022",
    desc: "The brand needed to communicate luxury and a sense of restraint surrounding the unique items being presented. Showcasing flexibility across disciplines was key.",
    secondaryTitle: "Craft and precision",
    secondaryText:
      "Every seam is considered as a design element, every closure a moment of reveal. The work draws from archival couture techniques while pushing toward an entirely contemporary resolution.",
    images: [
      `${PICSUM}ae1/1200/900`,
      `${PICSUM}ae2/600/900`,
      `${PICSUM}ae3/900/700`,
      `${PICSUM}ae4/700/900`,
      `${PICSUM}ae5/900/600`,
      `${PICSUM}ae6/600/800`,
      `${PICSUM}ae7/800/600`,
      `${PICSUM}ae8/600/900`,
      `${PICSUM}ae9/900/700`,
    ],
    next: {
      name: "Consectetur",
      slug: "consectetur",
      image: `${PICSUM}co1/1600/900`,
    },
  },
  {
    slug: "consectetur",
    name: ["Consec-", "tetur"],
    school: "Antwerp Royal Academy",
    year: "2024",
    desc: "An investigation into the relationship between garment and architecture. The project draws from structural engineering principles to create wearable forms.",
    secondaryTitle: "Structure as body",
    secondaryText:
      "The pieces are constructed using techniques borrowed from basket weaving and metal fabrication. The result is a collection that occupies space rather than simply covering the body.",
    images: [
      `${PICSUM}co1/1200/900`,
      `${PICSUM}co2/600/900`,
      `${PICSUM}co3/900/700`,
      `${PICSUM}co4/700/900`,
      `${PICSUM}co5/900/600`,
      `${PICSUM}co6/600/800`,
      `${PICSUM}co7/800/600`,
      `${PICSUM}co8/600/900`,
      `${PICSUM}co9/900/700`,
    ],
    next: {
      name: "Sed Euismod",
      slug: "sed-euismod",
      image: `${PICSUM}se1/1600/900`,
    },
  },
  {
    slug: "sed-euismod",
    name: ["Sed", "Euismod"],
    school: "Istituto Marangoni",
    year: "2023",
    desc: "A dialogue between tradition and rupture, exploring how historical garment archetypes can be deconstructed and reassembled with a contemporary sensibility.",
    secondaryTitle: "Memory and rupture",
    secondaryText:
      "Each piece begins with a historical reference — a specific garment, period, or gesture — and is systematically dismantled. The reconstruction prioritises the emotional residue over the literal form.",
    images: [
      `${PICSUM}se1/1200/900`,
      `${PICSUM}se2/600/900`,
      `${PICSUM}se3/900/700`,
      `${PICSUM}se4/700/900`,
      `${PICSUM}se5/900/600`,
      `${PICSUM}se6/600/800`,
      `${PICSUM}se7/800/600`,
      `${PICSUM}se8/600/900`,
      `${PICSUM}se9/900/700`,
    ],
    next: {
      name: "Lorem Ipsum",
      slug: "lorem-ipsum",
      image: `${PICSUM}lp1/1600/900`,
    },
  },
];

export default function IndividualProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const {
    name,
    school,
    year,
    desc,
    secondaryTitle,
    secondaryText,
    images,
    next,
  } = project;

  const trackRef = useRef<HTMLDivElement>(null);
  const jumping = useRef(false);

  // Wheel → horizontal scroll (trackpad + mouse)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      track.scrollLeft += delta;
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-cream">
      {/* Fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-none">
        <Link
          href="/work"
          className="pointer-events-auto flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#0a0a0a]">
          ← Back
        </Link>
        <button className="pointer-events-auto flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#0a0a0a]">
          Menu{" "}
          <span className="inline-block w-2 h-2 rounded-full bg-[#0a0a0a]" />
        </button>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="scrollbar-hide h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full items-stretch w-max">
          {/* ── PANEL 1: HERO — left text + right portrait (split) ── */}
          <div className="relative flex h-full shrink-0 w-screen">
            {/* Left: text */}
            <div className="flex flex-col justify-center px-16 pt-20 w-[58%]">
              {/* Vertical rule */}
              <div className="w-px h-32 bg-[#0a0a0a] mb-8" />
              <div className="relative inline-block mb-10">
                <h1 className="text-[clamp(4rem,11vw,10rem)] font-normal leading-[0.88] tracking-[-0.04em]">
                  {name.map((word, i) => (
                    <span key={i} className="mask-wrap block">
                      <span className={`mask-inner${i === 1 ? " d1" : ""}`}>
                        {word}
                      </span>
                    </span>
                  ))}
                </h1>
                <span className="absolute text-red -top-[0.3em] -right-[0.8em] text-[3em] font-bold leading-none">
                  ✳
                </span>
              </div>
              <div className="flex items-center gap-8 mb-10">
                <span className="mask-wrap">
                  <span className="mask-inner d2 text-[0.62rem] tracking-[0.22em] uppercase text-red/40 italic">
                    {school}
                  </span>
                </span>
                <span className="mask-wrap">
                  <span className="mask-inner d3 text-[0.62rem] tracking-[0.22em] uppercase text-red/40">
                    / {year}
                  </span>
                </span>
              </div>
              <div className="mask-wrap max-w-152">
                <p className="mask-inner d4 text-[clamp(0.85rem,1.1vw,0.95rem)] leading-[1.7] text-red/55">
                  {desc}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden w-[42%] h-full">
              <img
                src={images[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── PANEL 2: three overlapping images (screenshot 5) ── */}
          <div className="relative shrink-0 flex items-center w-[110vw] px-[6vw]">
            {/* Small portrait — left, vertically centered */}
            <div className="relative shrink-0 w-[22vw] h-[65vh] -mr-[4vw] z-1">
              <img
                src={images[1]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Large center portrait — tallest */}
            <div className="relative shrink-0 w-[38vw] h-[85vh] z-2">
              <img
                src={images[2]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right portrait — partially cropped */}
            <div className="relative shrink-0 w-[28vw] h-[75vh] -ml-[2vw] z-1">
              <img
                src={images[3]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── PANEL 3: collage scatter (screenshot 3) ── */}
          <div className="relative shrink-0 w-[120vw] h-full">
            {/* Top center — wide landscape */}
            <div className="absolute overflow-hidden top-[6vh] left-[28vw] w-[36vw] h-[42vh]">
              <img
                src={images[4]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Left center — portrait */}
            <div className="absolute overflow-hidden top-[18vh] left-[12vw] w-[24vw] h-[52vh]">
              <img
                src={images[5]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Center large — overlapping */}
            <div className="absolute overflow-hidden top-[28vh] left-[22vw] w-[40vw] h-[50vh]">
              <img
                src={images[6]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right top */}
            <div className="absolute overflow-hidden top-[4vh] right-[6vw] w-[22vw] h-[38vh]">
              <img
                src={images[7]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom left — tall portrait */}
            <div className="absolute overflow-hidden bottom-[4vh] left-[2vw] w-[16vw] h-[44vh]">
              <img
                src={images[8]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right bottom sketch */}
            <div className="absolute overflow-hidden bottom-[4vh] right-[4vw] w-[18vw] h-[38vh]">
              <img
                src={images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── PANEL 4: two B&W portraits + text right (screenshot 4) ── */}
          <div className="relative shrink-0 flex items-center w-[110vw]">
            {/* Two overlapping portrait photos left */}
            <div className="relative shrink-0 w-[32vw] h-[88vh] mt-[4vh]">
              <img
                src={images[1]}
                alt=""
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="relative shrink-0 w-[36vw] h-[80vh] -ml-[6vw] z-2">
              <img
                src={images[2]}
                alt=""
                className="w-full h-full object-cover grayscale"
              />
            </div>
            {/* Text block right */}
            <div className="pl-[6vw] max-w-[30vw]">
              <h2 className="font-serif italic font-normal text-[clamp(1.8rem,3.5vw,3.5rem)] tracking-[-0.02em] leading-[1.15] mb-8">
                {secondaryTitle}
              </h2>
              <p className="text-[clamp(0.82rem,1vw,0.92rem)] leading-[1.75] text-red/55">
                {secondaryText}
              </p>
            </div>
          </div>

          {/* ── PANEL 5: secondary images grid (screenshot 2) ── */}
          <div className="relative shrink-0 flex items-start w-[90vw] px-[6vw] pt-[10vh]">
            <div className="grid gap-3 grid-cols-2 w-full">
              {/* Row 1: two images side by side */}
              <div className="relative overflow-hidden aspect-4/3">
                <img
                  src={images[3]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden aspect-4/3">
                <img
                  src={images[4]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Row 2: wide landscape */}
              <div className="relative overflow-hidden col-span-2 aspect-16/7">
                <img
                  src={images[5]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Next project text floating right */}
            <div className="absolute right-[8vw] top-[38vh]">
              <p
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.45)",
                  marginBottom: "1rem",
                }}>
                Next project
              </p>
              <h3
                style={{
                  fontSize: "clamp(3rem, 7vw, 8rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: "#0a0a0a",
                }}>
                {next.name}
              </h3>
            </div>
          </div>

          {/* ── PANEL 6: NEXT PROJECT — text left + image right split (screenshot 1 & 6) ── */}
          <Link
            href={`/work/${next.slug}`}
            className="next-panel relative shrink-0 flex h-full w-screen">
            {/* Left: white with text */}
            <div className="flex flex-col justify-center px-16 w-[58%] bg-cream">
              <p
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.45)",
                  marginBottom: "2rem",
                }}>
                Next project
              </p>
              <h2
                style={{
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  color: "#0a0a0a",
                }}>
                {next.name}
              </h2>
            </div>
            {/* Right: image */}
            <div className="relative overflow-hidden w-[42%] h-full">
              <img
                src={next.image}
                alt={next.name}
                className="next-img absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

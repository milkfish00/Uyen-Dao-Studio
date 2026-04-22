"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useRef } from "react";

const PICSUM = "https://picsum.photos/seed/";

const PROJECTS = [
  {
    slug: "lorem-ipsum",
    name: ["Lorem", "Ipsum"],
    school: "Lorem Ipsum Studio",
    year: "2023",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    secondaryTitle: "Dolor sit amet",
    secondaryText:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: [
      `${PICSUM}lp1/900/1300`,
      `${PICSUM}lp2/600/900`,
      `${PICSUM}lp3/800/1200`,
      `${PICSUM}lp4/600/900`,
      `${PICSUM}lp5/900/1200`,
      `${PICSUM}lp6/800/1100`,
      `${PICSUM}lp7/600/800`,
      `${PICSUM}lp8/1200/800`,
      `${PICSUM}lp9/900/600`,
    ],
    next: {
      name: "Dolor Sit",
      slug: "dolor-sit",
      image: `${PICSUM}ds1/900/1300`,
    },
  },
  {
    slug: "dolor-sit",
    name: ["Dolor", "Sit"],
    school: "Dolor Sit Institute",
    year: "2022",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    secondaryTitle: "Nemo enim ipsam",
    secondaryText:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    images: [
      `${PICSUM}ds1/900/1300`,
      `${PICSUM}ds2/600/900`,
      `${PICSUM}ds3/800/1200`,
      `${PICSUM}ds4/600/900`,
      `${PICSUM}ds5/900/1200`,
      `${PICSUM}ds6/800/1100`,
      `${PICSUM}ds7/600/800`,
      `${PICSUM}ds8/1200/800`,
      `${PICSUM}ds9/900/600`,
    ],
    next: {
      name: "Amet Consec",
      slug: "amet-consec",
      image: `${PICSUM}ac1/900/1300`,
    },
  },
  {
    slug: "amet-consec",
    name: ["Amet", "Consec"],
    school: "Amet Consec Academy",
    year: "2023",
    desc: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    secondaryTitle: "Ut labore et dolore",
    secondaryText:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit.",
    images: [
      `${PICSUM}ac1/900/1300`,
      `${PICSUM}ac2/600/900`,
      `${PICSUM}ac3/800/1200`,
      `${PICSUM}ac4/600/900`,
      `${PICSUM}ac5/900/1200`,
      `${PICSUM}ac6/800/1100`,
      `${PICSUM}ac7/600/800`,
      `${PICSUM}ac8/1200/800`,
      `${PICSUM}ac9/900/600`,
    ],
    next: {
      name: "Adipiscing Elit",
      slug: "adipiscing-elit",
      image: `${PICSUM}ae1/900/1300`,
    },
  },
  {
    slug: "adipiscing-elit",
    name: ["Adipiscing", "Elit"],
    school: "Adipiscing Elit School",
    year: "2022",
    desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    secondaryTitle: "Similique sunt in culpa",
    secondaryText:
      "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    images: [
      `${PICSUM}ae1/900/1300`,
      `${PICSUM}ae2/600/900`,
      `${PICSUM}ae3/800/1200`,
      `${PICSUM}ae4/600/900`,
      `${PICSUM}ae5/900/1200`,
      `${PICSUM}ae6/800/1100`,
      `${PICSUM}ae7/600/800`,
      `${PICSUM}ae8/1200/800`,
      `${PICSUM}ae9/900/600`,
    ],
    next: {
      name: "Conseur",
      slug: "consectetur",
      image: `${PICSUM}co1/900/1300`,
    },
  },
  {
    slug: "consectetur",
    name: ["Consec-", "tetur"],
    school: "Consectetur Design Lab",
    year: "2024",
    desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.",
    secondaryTitle: "Itaque earum rerum",
    secondaryText:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    images: [
      `${PICSUM}co1/900/1300`,
      `${PICSUM}co2/600/900`,
      `${PICSUM}co3/800/1200`,
      `${PICSUM}co4/600/900`,
      `${PICSUM}co5/900/1200`,
      `${PICSUM}co6/800/1100`,
      `${PICSUM}co7/600/800`,
      `${PICSUM}co8/1200/800`,
      `${PICSUM}co9/900/600`,
    ],
    next: {
      name: "Sed Euismod",
      slug: "sed-euismod",
      image: `${PICSUM}se1/900/1300`,
    },
  },
  {
    slug: "sed-euismod",
    name: ["Sed", "Euismod"],
    school: "Sed Euismod College",
    year: "2023",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    secondaryTitle: "Magna aliqua enim",
    secondaryText:
      "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur aut perferendis doloribus asperiores repellat.",
    images: [
      `${PICSUM}se1/900/1300`,
      `${PICSUM}se2/600/900`,
      `${PICSUM}se3/800/1200`,
      `${PICSUM}se4/600/900`,
      `${PICSUM}se5/900/1200`,
      `${PICSUM}se6/800/1100`,
      `${PICSUM}se7/600/800`,
      `${PICSUM}se8/1200/800`,
      `${PICSUM}se9/900/600`,
    ],
    next: {
      name: "Lorem Ipsum",
      slug: "lorem-ipsum",
      image: `${PICSUM}lp1/900/1300`,
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

  const trackRef = useRef<HTMLDivElement>(null);
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

  // Remap vertical wheel → horizontal scroll — desktop only
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.innerWidth < 1024) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > 2 ? e.deltaX : e.deltaY;
      track.scrollLeft += delta;
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="w-screen bg-cream font-sans overflow-x-hidden lg:h-screen lg:overflow-hidden">
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-[2.8rem] py-[1.6rem] pointer-events-none">
        <Link
          href="/work"
          className="pointer-events-auto bg-cream font-bold px-6 py-2 rounded-full text-[0.6rem] tracking-[0.2em] uppercase text-red no-underline">
          ← Back
        </Link>
      </nav>

      {/* Scroll track — vertical on mobile, horizontal on desktop */}
      <div
        ref={trackRef}
        className="scrollbar-hide w-full overflow-y-auto overflow-x-hidden lg:h-full lg:overflow-x-auto lg:overflow-y-hidden lg:cursor-grab">
        <div className="flex flex-col lg:flex-row lg:h-full">
          {/* ── P1: HERO ── */}
          <section className="w-full shrink-0 flex flex-col-reverse lg:flex-row lg:h-full">
            {/* Left: title + meta + 2-col desc */}
            <div className="w-full lg:w-[54vw] flex flex-col justify-end pt-8 px-6 sm:px-10 pb-12 lg:pt-0 lg:pr-[4vw] lg:pb-[9vh] lg:pl-[5.5vw]">
              <div className="relative inline-block">
                <h1 className="text-[clamp(3.5rem,7vw,9rem)] text-center md:text-left cursor-pointer uppercase tracking-[-0.04em] font-bold text-red leading-none pb-20">
                  {name.map((w, i) => (
                    <div key={i} className="hero-line">
                      <span className={i === 1 ? "pl-[1.1em]" : ""}>{w}</span>
                    </div>
                  ))}
                </h1>
              </div>
              <div className="hero-meta">
                <p className="text-[clamp(0.8rem,1.05vw,0.95rem)] text-red mb-[3.5vh] tracking-[0.01em]">
                  {school}&nbsp;&nbsp;/&nbsp;&nbsp;{year}
                </p>
              </div>
              <div className="hero-desc columns-1 sm:columns-2 gap-x-[3vw] max-w-full lg:max-w-[43vw]">
                <p className="text-[clamp(0.74rem,0.86vw,0.82rem)] leading-[1.75] text-red/52 m-0"></p>
              </div>
            </div>
            {/* Right: full-bleed portrait */}
            <div className="w-full h-[72vw] sm:h-[60vw] lg:w-screen lg:h-full shrink-0 relative overflow-hidden">
              <img
                src={images[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </section>

          {/* ── P2: THREE PORTRAITS ── */}
          <section className="w-full min-h-[100vw] lg:w-screen lg:min-h-0 lg:h-full shrink-0 relative bg-cream">
            {/* Small — far left */}
            <div className="absolute left-[4%] top-[27%] w-[21%] overflow-hidden">
              <img
                src={images[1]}
                alt=""
                className="block w-full aspect-3/4 object-cover"
                draggable={false}
              />
            </div>
            {/* Large — center, from top */}
            <div className="absolute left-[25%] top-[5%] w-[41%] overflow-hidden">
              <img
                src={images[2]}
                alt=""
                className="block w-full aspect-2/3 object-cover"
                draggable={false}
              />
            </div>
            {/* Medium — right edge */}
            <div className="absolute right-0 top-[17%] w-[27%] overflow-hidden">
              <img
                src={images[3]}
                alt=""
                className="block w-full aspect-3/4 object-cover"
                draggable={false}
              />
            </div>
          </section>

          {/* ── FULL BLEED B ── */}
          <section className="w-full h-[60vw] sm:h-[50vw] lg:w-screen lg:h-full shrink-0 relative overflow-hidden">
            <img
              src={images[2]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </section>

          {/* ── P3: B&W IMAGES + TEXT ── */}
          <section className="w-full shrink-0 flex flex-col lg:flex-row lg:w-screen lg:h-full bg-cream">
            {/* Left: two overlapping B&W images */}
            <div className="w-full h-[80vw] sm:h-[65vw] lg:w-[57%] lg:h-full relative">
              <div className="absolute left-0 top-[6%] w-[55%] bottom-[12%] overflow-hidden">
                <img
                  src={images[4]}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  draggable={false}
                />
              </div>
              <div className="absolute left-[24%] top-[18%] right-0 bottom-0 overflow-hidden">
                <img
                  src={images[5]}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                  draggable={false}
                />
              </div>
            </div>
            {/* Right: secondary text */}
            <div className="w-full lg:w-[43%] flex flex-col justify-center px-6 sm:px-10 py-12 lg:py-0 lg:pr-[5.5vw] lg:pl-[2vw]">
              <h2 className="text-[clamp(1.8rem,3.2vw,3.8rem)] tracking-[-0.05em] font-bold leading-[1.1] mb-[2.8vh] text-red">
                {secondaryTitle}
              </h2>
              <p className="text-[clamp(0.74rem,0.86vw,0.82rem)] leading-[1.75] text-red/52 max-w-[36ch]">
                {secondaryText}
              </p>
            </div>
          </section>

          {/* ── FULL BLEED C ── */}
          <section className="w-full h-[60vw] sm:h-[50vw] lg:w-screen lg:h-full shrink-0 relative overflow-hidden">
            <img
              src={images[5]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </section>

          {/* ── P4: SCATTER COLLAGE (wider) ── */}
          <section className="w-full min-h-[130vw] sm:min-h-[100vw] lg:w-[155vw] lg:min-h-0 lg:h-full shrink-0 relative bg-cream">
            {/* Tall portrait — far left */}
            <div className="absolute left-[2%] top-[36%] w-[16%] overflow-hidden">
              <img
                src={images[6]}
                alt=""
                className="block w-full aspect-3/4 object-cover"
                draggable={false}
              />
            </div>
            {/* Wide landscape — upper center */}
            <div className="absolute left-[15%] top-[10%] w-[36%] overflow-hidden">
              <img
                src={images[7]}
                alt=""
                className="block w-full aspect-4/3 object-cover"
                draggable={false}
              />
            </div>
            {/* Landscape — lower center */}
            <div className="absolute left-[15%] top-[56%] w-[28%] overflow-hidden">
              <img
                src={images[8]}
                alt=""
                className="block w-full aspect-3/2 object-cover"
                draggable={false}
              />
            </div>
            {/* Portrait — upper right */}
            <div className="absolute right-[7%] top-[5%] w-[19%] overflow-hidden">
              <img
                src={images[1]}
                alt=""
                className="block w-full aspect-2/3 object-cover"
                draggable={false}
              />
            </div>
            {/* Portrait — lower right */}
            <div className="absolute right-[4%] top-[46%] w-[15%] overflow-hidden">
              <img
                src={images[3]}
                alt=""
                className="block w-full aspect-3/4 object-cover"
                draggable={false}
              />
            </div>
          </section>

          {/* ── P5: NEXT PROJECT ── */}
          <section className="w-full shrink-0 flex flex-col lg:flex-row lg:w-screen lg:h-full bg-cream">
            {/* Left: label + big title */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 pt-14 pb-12 lg:pt-0 lg:pb-0 lg:px-[5vw]">
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-red/40 mb-[1.4rem]">
                Next project
              </p>
              <Link href={`/work/${next.slug}`} className="no-underline">
                <h2 className="text-[clamp(3.5rem,7vw,9rem)] cursor-pointer uppercase tracking-[-0.05em] font-bold text-red leading-none">
                  {next.name}
                </h2>
              </Link>
            </div>
            {/* Right: next portrait */}
            <div className="w-full h-[75vw] sm:h-[60vw] lg:h-full lg:flex-1 relative overflow-hidden">
              <img
                src={next.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const slugs = [
  "lorem-ipsum",
  "dolor-sit",
  "amet-consect",
  "adipiscing",
  "sed-do",
  "tempor",
  "ut-labore",
  "dolore-magna",
  "enim-ad",
  "project",
];

export default async function IndividualProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();

  return (
    <main className="min-h-screen bg-[#EDEDDD] text-[#771605]">
      {/* ── Title + metadata ── */}
      <section className="px-6 pt-60 pb-10 sm:px-10 lg:px-16">
        <h1
          className="font-medium leading-none tracking-[-0.04em] mb-10"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
          Project Name
        </h1>
      </section>

      {/* ── Hero image ── */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="relative w-full overflow-hidden aspect-video">
          <img
            src="https://assets.codepen.io/16327/portrait-image-12.jpg"
            alt="Project hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Intro: text left + image right ── */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-start">
          <p
            className="leading-relaxed text-[rgba(119,22,5,0.65)] max-w-md"
            style={{ fontSize: "clamp(0.9rem, 1.3vw, 1rem)" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. The brand
            needed to communicate luxury and a sense of fun surrounding the
            unique items being stored. Because the project involved a broad
            array of designs in rapid order, showcasing our flexibility across
            disciplines was key to the outcome.
          </p>
          <div>
            <div className="relative w-full overflow-hidden aspect-4/3">
              <img
                src="https://assets.codepen.io/16327/portrait-image-1.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section label + two-col text ── */}
      <section className="px-6 pb-16 sm:px-10 lg:px-16  pt-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20 max-w-4xl">
          <p
            className="leading-relaxed text-[rgba(119,22,5,0.65)]"
            style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}>
            The platform required multiple platforms, multiple deliverables, and
            multiple stakeholders. We worked closely with the team to define
            visual language, design, and implementation from first concepts.
          </p>
        </div>
      </section>

      {/* ── Asymmetric image pair ── */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-start">
          <div>
            <div className="relative w-full overflow-hidden aspect-16/11">
              <img
                src="https://assets.codepen.io/16327/portrait-image-2.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:mt-24">
            <div className="relative w-full overflow-hidden aspect-4/5">
              <img
                src="https://assets.codepen.io/16327/portrait-image-3.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width cinematic image ── */}
      <section className="px-6 sm:px-10 lg:px-16 py-4">
        <div className="relative w-full overflow-hidden aspect-21/9">
          <img
            src="https://assets.codepen.io/16327/portrait-image-5.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Production section label + text + image ── */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:items-start">
          <div>
            <div className="relative w-full overflow-hidden aspect-[9/16]">
              <img
                src="https://assets.codepen.io/16327/portrait-image-4.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="relative w-full overflow-hidden aspect-[9/16]">
              <img
                src="https://assets.codepen.io/16327/portrait-image-4.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width cinematic image ── */}
      <section className="px-6 sm:px-10 lg:px-16 pb-4">
        <div className="relative w-full overflow-hidden aspect-21/9">
          <img
            src="https://assets.codepen.io/16327/portrait-image-5.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}

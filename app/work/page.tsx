"use client";
import { useState, useRef } from "react";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  year: string;
  thumbnail: string;
};

const projects: Project[] = [
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum",
    description:
      "Helping a busy airport to embrace and express the difference.",
    categories: ["Brand Identity", "Strategy"],
    year: "2024",
    thumbnail:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "dolor-sit",
    title: "Dolor Sit",
    description:
      "Creating a retail environment destination with three floors of fashion retail.",
    categories: ["Retail"],
    year: "2024",
    thumbnail:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "amet-consect",
    title: "Amet Consect",
    description: "Building a world-class destination from the inside up.",
    categories: ["Hospitality", "Identity"],
    year: "2024",
    thumbnail:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "adipiscing",
    title: "Adipiscing Elit",
    description: "Shaping the next chapter of the great British shoe store.",
    categories: ["Retail"],
    year: "2023",
    thumbnail:
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "sed-do",
    title: "Sed Do Eiusmod",
    description: "Reframing an ancient ritual for modern life.",
    categories: ["Brand Identity", "Art Direction"],
    year: "2023",
    thumbnail: "https://assets.codepen.io/16327/portrait-image-1.jpg",
  },
  {
    slug: "tempor",
    title: "Incididunt Tempor",
    description:
      "Refreshing a brand to put a smile at the heart of everything they do.",
    categories: ["Hospitality"],
    year: "2023",
    thumbnail: "https://assets.codepen.io/16327/portrait-image-2.jpg",
  },
  {
    slug: "ut-labore",
    title: "Ut Labore",
    description: "Creating the original bad-boy bolthole.",
    categories: ["Hospitality"],
    year: "2022",
    thumbnail: "https://assets.codepen.io/16327/portrait-image-3.jpg",
  },
  {
    slug: "dolore-magna",
    title: "Dolore Magna",
    description: "Redefining office space with a design-led approach.",
    categories: ["Workplace"],
    year: "2022",
    thumbnail: "https://assets.codepen.io/16327/portrait-image-4.jpg",
  },
  {
    slug: "enim-ad",
    title: "Enim Ad Minim",
    description:
      "Bringing gender stereotypes with an immersive retail wonderland.",
    categories: ["Retail", "Brand Identity"],
    year: "2022",
    thumbnail: "https://assets.codepen.io/16327/portrait-image-5.jpg",
  },
];

const allCategories = [
  "All",
  "Retail",
  "Brand Identity",
  "Hospitality",
  "Workplace",
  "Art Direction",
  "Identity",
];

export default function WorkPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <main className="min-h-screen bg-[#EDEDDD]">
      {/* ── Hero heading ── */}
      <section className="px-6 pt-40 pb-10 sm:px-10 lg:px-16 text-center">
        <h1
          className="font-bold leading-tight tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: "#771605" }}>
          The Work
        </h1>
      </section>

      {/* ── Filter bar ── */}
      <section className="px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-100"
              style={{
                color: cat === active ? "#771605" : "rgba(119,22,5,0.35)",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── 3-column grid ── */}
      <section className="px-6 sm:px-10 lg:px-16 py-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
              {/* Image */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4/3" }}>
                {/* Category tags */}
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                  {p.categories.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 text-[0.55rem] rounded-sm font-medium uppercase tracking-[0.14em]"
                      style={{
                        background: "rgba(255,255,255,0.90)",
                        color: "#771605",
                      }}>
                      {c}
                    </span>
                  ))}
                </div>
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Caption */}
              <div className="mt-4">
                <p
                  className="font-semibold tracking-tight"
                  style={{
                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                    color: "#771605",
                  }}>
                  {p.title}
                </p>
                <p
                  className="mt-2 leading-snug"
                  style={{ fontSize: "0.78rem", color: "rgba(119,22,5,0.50)" }}>
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

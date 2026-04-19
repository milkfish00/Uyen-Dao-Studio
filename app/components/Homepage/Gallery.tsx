"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PICSUM = "https://picsum.photos/seed/";

// ── Data ──────────────────────────────────────────────────────────────────────

interface MiniImg {
  src: string;
  /** translate X in em (relative to 9px base set on wrapper) */
  tx: string;
  /** translate Y in em */
  ty: string;
  scale: number;
  /** starts invisible with blur, reveals on scroll */
  blurred: boolean;
}

const miniImgs: MiniImg[] = [
  {
    src: `${PICSUM}mini1/120/120`,
    tx: "0em",
    ty: "0em",
    scale: 1,
    blurred: false,
  },
  {
    src: `${PICSUM}mini2/120/120`,
    tx: "-10.6em",
    ty: "7em",
    scale: 1.5,
    blurred: false,
  },
  {
    src: `${PICSUM}mini3/120/120`,
    tx: "-24.8em",
    ty: "25.8em",
    scale: 1.66,
    blurred: false,
  },
  {
    src: `${PICSUM}mini4/120/120`,
    tx: "5em",
    ty: "20em",
    scale: 1,
    blurred: true,
  },
  {
    src: `${PICSUM}mini5/120/120`,
    tx: "10em",
    ty: "15em",
    scale: 1,
    blurred: true,
  },
  {
    src: `${PICSUM}mini6/120/120`,
    tx: "30em",
    ty: "30em",
    scale: 1,
    blurred: true,
  },
  {
    src: `${PICSUM}mini7/120/120`,
    tx: "33em",
    ty: "22em",
    scale: 1,
    blurred: true,
  },
  {
    src: `${PICSUM}mini8/120/120`,
    tx: "-30em",
    ty: "40em",
    scale: 1,
    blurred: true,
  },
];

interface Creation {
  n: number;
  slug: string;
  title: string;
  tagline: string;
  skills: string[];
  imgs: [string, string, string, string, string, string, string];
}

const mk = (seed: string, w: number, h: number) => `${PICSUM}${seed}/${w}/${h}`;

const creations: Creation[] = [
  {
    n: 1,
    slug: "lorem-ipsum",
    title: "Lorem Ipsum",
    tagline:
      "Where the sensorial richness of nature meets the living force of light, for the benefit of the skin.",
    skills: [
      "#strategy",
      "#identity",
      "#branding",
      "#packaging",
      "#storytelling",
    ],
    imgs: [
      mk("c1a", 400, 600),
      mk("c1b", 600, 893),
      mk("c1c", 400, 552),
      mk("c1d", 500, 500),
      mk("c1e", 500, 493),
      mk("c1f", 600, 554),
      mk("c1g", 500, 633),
    ],
  },
  {
    n: 2,
    slug: "dolor-sit",
    title: "Dolor Sit",
    tagline:
      "Where rich care blends with gourmand textures and sensorial fragrances, nourishing the skin.",
    skills: [
      "#strategy",
      "#territory",
      "#concept",
      "#signature",
      "#storytelling",
    ],
    imgs: [
      mk("c2a", 400, 286),
      mk("c2b", 600, 857),
      mk("c2c", 400, 533),
      mk("c2d", 500, 750),
      mk("c2e", 500, 500),
      mk("c2f", 600, 554),
      mk("c2g", 500, 667),
    ],
  },
  {
    n: 3,
    slug: "amet-consec",
    title: "Amet Consec",
    tagline:
      "Where breakthrough biotechnology opens the path to a new symbiosis between humans and nature.",
    skills: [
      "#innovation",
      "#strategy",
      "#concept",
      "#packaging",
      "#prototype",
    ],
    imgs: [
      mk("c3a", 400, 443),
      mk("c3b", 600, 697),
      mk("c3c", 400, 500),
      mk("c3d", 500, 625),
      mk("c3e", 500, 500),
      mk("c3f", 600, 641),
      mk("c3g", 500, 381),
    ],
  },
  {
    n: 4,
    slug: "adipiscing-elit",
    title: "Adipiscing Elit",
    tagline:
      "Where timeless simplicity meets the confidence of an iconic design, celebrating lasting heritage.",
    skills: [
      "#strategy",
      "#branding",
      "#packaging",
      "#art direction",
      "#storytelling",
    ],
    imgs: [
      mk("c4a", 400, 535),
      mk("c4b", 600, 745),
      mk("c4c", 400, 500),
      mk("c4d", 500, 350),
      mk("c4e", 500, 500),
      mk("c4f", 600, 554),
      mk("c4g", 500, 625),
    ],
  },
  {
    n: 5,
    slug: "sed-tempor",
    title: "Sed Tempor",
    tagline:
      "Where retail and spa experiences become moments of discovery, connection and well-being.",
    skills: [
      "#audit",
      "#strategy",
      "#retail experience",
      "#spa activation",
      "#storytelling",
    ],
    imgs: [
      mk("c5a", 400, 600),
      mk("c5b", 600, 830),
      mk("c5c", 400, 533),
      mk("c5d", 500, 859),
      mk("c5e", 500, 501),
      mk("c5f", 600, 554),
      mk("c5g", 500, 627),
    ],
  },
  {
    n: 6,
    slug: "incid-labore",
    title: "Incid Labore",
    tagline:
      "Where expert care, natural protection and gentle design come together to safeguard the youngest lives.",
    skills: ["#strategy", "#branding", "#packaging", "#guidelines", "#motion"],
    imgs: [
      mk("c6a", 400, 582),
      mk("c6b", 600, 1017),
      mk("c6c", 400, 498),
      mk("c6d", 500, 666),
      mk("c6e", 500, 493),
      mk("c6f", 600, 554),
      mk("c6g", 500, 521),
    ],
  },
  {
    n: 7,
    slug: "dolore-magna",
    title: "Dolore Magna",
    tagline:
      "Where self-expression, eclectic beauty and bold aesthetics redefine the codes of the universe.",
    skills: [
      "#communication",
      "#retail experience",
      "#sales materials",
      "#lookbook",
      "#invitations",
    ],
    imgs: [
      mk("c7a", 400, 488),
      mk("c7b", 600, 383),
      mk("c7c", 400, 255),
      mk("c7d", 500, 489),
      mk("c7e", 500, 500),
      mk("c7f", 600, 552),
      mk("c7g", 500, 379),
    ],
  },
  {
    n: 8,
    slug: "aliqua-enim",
    title: "Aliqua Enim",
    tagline:
      "Where the simple gesture becomes a symbol of connection, elegance and precious shared moments.",
    skills: [
      "#visual merchandising",
      "#concept",
      "#storytelling",
      "#retail experience",
      "#illustration",
    ],
    imgs: [
      mk("c8a", 400, 519),
      mk("c8b", 600, 536),
      mk("c8c", 400, 600),
      mk("c8d", 500, 664),
      mk("c8e", 500, 503),
      mk("c8f", 600, 554),
      mk("c8g", 500, 381),
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const Gallery = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const worksSecRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading fade-out: disappears as creations section ends ────
      gsap.to(headingRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#creations",
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // ── Image parallax ────────────────────────────────────────────
      worksSecRef.current
        ?.querySelectorAll<HTMLElement>(".work-img-wrap")
        .forEach((wrap) => {
          const yFrom = parseFloat(wrap.dataset.yFrom ?? "15");
          const yTo = parseFloat(wrap.dataset.yTo ?? "-15");
          gsap.fromTo(
            wrap,
            { yPercent: yFrom },
            {
              yPercent: yTo,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            },
          );
        });

      // ── Work title rotation ────────────────────────────────────────
      worksSecRef.current
        ?.querySelectorAll<HTMLElement>(".work-title")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { rotate: 5, yPercent: 40 },
            {
              rotate: -5,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            },
          );
        });

      // ── Skills rotation ────────────────────────────────────────────
      worksSecRef.current
        ?.querySelectorAll<HTMLElement>(".work-skills")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { rotate: -8, yPercent: 50 },
            {
              rotate: 8,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fade = fadeRef.current;
    if (!wrap || !fade) return;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "bottom 60%",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        fade.style.opacity = String(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  const gc = (pos: string) => {
    const [s, sp] = pos.split("+");
    return `${s} / span ${sp}`;
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* Fade-to-white overlay at the bottom */}
      <div
        ref={fadeRef}
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40vh",
          background: "linear-gradient(to bottom, transparent 0%, #fff 100%)",
          pointerEvents: "none",
          zIndex: 10,
          opacity: 0,
          marginTop: "-40vh",
        }}
      />
      {/* ═══════════════════════════════════════════════════════════════
          Heading — sticky in center, works scroll over it
      ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={headingRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
          background: "white",
        }}>
        <span
          style={{
            display: "block",
            color: "#0d0d0d",
            fontSize: "clamp(2.5rem, 9vw, 9rem)",
            fontFamily: "var(--font-castoro), serif",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}>
          Selected Work
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          Works — scroll over the sticky heading
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="creations"
        ref={worksSecRef}
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "25vh",
          paddingBottom: "15vh",
        }}>
        {creations.map((c) => (
          <div key={c.slug} style={{ marginBottom: "20vh" }}>
            {/* ── Row 1: single image, upper right-of-center ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(24, 1fr)",
                alignItems: "start",
              }}>
              <div
                className="work-img-wrap"
                data-y-from="15"
                data-y-to="-15"
                style={{ gridColumn: gc("6+7") }}>
                <img
                  src={c.imgs[0]}
                  alt={c.title}
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>

            {/* ── Row 2: three images spread, columns overlap for collage effect ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(24, 1fr)",
                alignItems: "start",
                marginTop: "-8vh",
              }}>
              <div
                className="work-img-wrap"
                data-y-from="-10"
                data-y-to="10"
                style={{ gridColumn: gc("2+10"), zIndex: 2 }}>
                <img
                  src={c.imgs[1]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <div
                className="work-img-wrap"
                data-y-from="10"
                data-y-to="-5"
                style={{ gridColumn: gc("12+7"), zIndex: 3 }}>
                <img
                  src={c.imgs[2]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <div
                className="work-img-wrap"
                data-y-from="-10"
                data-y-to="10"
                style={{ gridColumn: gc("15+10"), zIndex: 2 }}>
                <img
                  src={c.imgs[3]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>

            {/* ── Row 3: project title + image ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(24, 1fr)",
                alignItems: "center",
                marginTop: "6vh",
              }}>
              <div
                className="work-img-wrap"
                data-y-from="5"
                data-y-to="-5"
                style={{ gridColumn: gc("11+9") }}>
                <img
                  src={c.imgs[4]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>

            {/* ── Row 4: image left + sub-grid (image + skills) right ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(24, 1fr)",
                alignItems: "start",
                marginTop: "4vh",
              }}>
              <div
                className="work-img-wrap"
                data-y-from="15"
                data-y-to="-10"
                style={{ gridColumn: gc("5+7") }}>
                <img
                  src={c.imgs[5]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
              <div
                style={{
                  gridColumn: gc("16+9"),
                  display: "grid",
                  gridTemplateColumns: "repeat(9, 1fr)",
                  alignItems: "start",
                }}>
                <div
                  className="work-img-wrap"
                  data-y-from="20"
                  data-y-to="-15"
                  style={{ gridColumn: "1 / span 9" }}>
                  <img
                    src={c.imgs[6]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
                <Link
                  href={`/work/${c.slug}`}
                  style={{
                    gridColumn: "3 / span 5",
                    textDecoration: "none",
                    marginTop: "1.5rem",
                  }}></Link>
              </div>
            </div>

            {/* ── Full-bleed accent image (after select projects) ── */}
            {(c.n === 2 || c.n === 5) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(24, 1fr)",
                  marginTop: "8vh",
                }}>
                <div
                  className="work-img-wrap"
                  data-y-from="8"
                  data-y-to="-8"
                  style={{
                    gridColumn: "1 / span 24",
                    overflow: "hidden",
                    height: "65vh",
                  }}>
                  <img
                    src={mk(`fb${c.n}`, 1600, 800)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Gallery;

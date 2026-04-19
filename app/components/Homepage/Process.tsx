"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#c9b89a";

const steps = [
  {
    n: "01",
    title: "Ideation",
    body: "We talk through your idea — no jargon, no deck required. Just what you want to make and why it matters.",
  },
  {
    n: "02",
    title: "Sketching",
    body: "Rough drawings to explore form, proportion, and flow. Getting the concept out of your head onto paper.",
  },
  {
    n: "03",
    title: "Prototyping",
    body: "Cardboard, foam, found materials — real objects you can hold, test, and pitch. No factory needed.",
  },
  {
    n: "04",
    title: "Final concept",
    body: "Drawings, models, documentation — ready to take anywhere next. On your terms, at your pace.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathAreaRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const livePathRef = useRef<SVGPathElement>(null);
  const ghostPathRef = useRef<SVGPathElement>(null);
  const travellerRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const mobileLiveRef = useRef<SVGPathElement>(null);
  const mobileGhostRef = useRef<SVGPathElement>(null);
  const mobileTravellerRef = useRef<SVGCircleElement>(null);
  const mobileDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [activeMobileStep, setActiveMobileStep] = useState(0);

  useEffect(() => {
    const setup = setTimeout(() => {
      const journey = journeyRef.current;
      const svg = svgRef.current;
      const live = livePathRef.current;
      const ghost = ghostPathRef.current;
      const traveller = travellerRef.current;
      if (!journey || !svg || !live || !ghost || !traveller) return;

      // Mobile: scroll-driven vertical timeline (no pin)
      if (window.innerWidth < 768) {
        const mobileEl = mobileRef.current;
        const svg = mobileSvgRef.current;
        const live = mobileLiveRef.current;
        const ghost = mobileGhostRef.current;
        const traveller = mobileTravellerRef.current;
        if (!mobileEl || !svg || !live || !ghost || !traveller) return;

        const svgRect = svg.getBoundingClientRect();
        const totalW = mobileEl.offsetWidth;
        const totalH = mobileEl.offsetHeight;
        svg.setAttribute("width", String(totalW));
        svg.setAttribute("height", String(totalH));
        svg.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);

        const pts = mobileDotRefs.current.map((dot) => {
          if (!dot) return { x: 24, y: 0 };
          const r = dot.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - svgRect.left,
            y: r.top + r.height / 2 - svgRect.top,
          };
        });

        const railX = pts[0]?.x ?? 24;
        const pathD = `M ${railX} ${pts[0]?.y ?? 0} L ${railX} ${pts[pts.length - 1]?.y ?? totalH}`;
        ghost.setAttribute("d", pathD);
        live.setAttribute("d", pathD);

        const totalLen = live.getTotalLength();
        live.style.strokeDasharray = String(totalLen);
        live.style.strokeDashoffset = String(totalLen);
        const startPt = live.getPointAtLength(0);
        traveller.setAttribute("r", "4");
        traveller.setAttribute("cx", String(startPt.x));
        traveller.setAttribute("cy", String(startPt.y));

        const cachedLen = totalLen;
        ctxRef.current = gsap.context(() => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: mobileEl,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
                onUpdate: (self) => {
                  const idx = Math.min(
                    steps.length - 1,
                    Math.floor(self.progress * steps.length),
                  );
                  setActiveMobileStep(idx);
                  const pt = live.getPointAtLength(cachedLen * self.progress);
                  traveller.setAttribute("cx", String(pt.x));
                  traveller.setAttribute("cy", String(pt.y));
                },
              },
              defaults: { ease: "none" },
            })
            .to(live, { strokeDashoffset: 0, duration: 4 }, 0);
        });
        return;
      }

      // ── Build SVG path once from column DOM positions (horizontal) ──
      const svgRect = svg.getBoundingClientRect();
      const totalW = journey.offsetWidth;
      const totalH = journey.offsetHeight;

      svg.setAttribute("width", String(totalW));
      svg.setAttribute("height", String(totalH));
      svg.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);

      const points = rowRefs.current.map((col) => {
        if (!col) return { x: 0, y: totalH / 2 };
        const r = col.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - svgRect.left,
          y: r.top + r.height / 2 - svgRect.top,
        };
      });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midX = (prev.x + curr.x) / 2;
        const cpY = i % 2 === 1 ? curr.y - 24 : curr.y + 24;
        d += ` C ${midX} ${cpY} ${midX} ${cpY} ${curr.x} ${curr.y}`;
      }

      ghost.setAttribute("d", d);
      live.setAttribute("d", d);

      const totalLen = live.getTotalLength();

      // Init — fully undrawn, circle at start
      live.style.strokeDasharray = String(totalLen);
      live.style.strokeDashoffset = String(totalLen);
      const startPt = live.getPointAtLength(0);
      // Reveal circle now that position is known
      traveller.setAttribute("r", "4");
      traveller.setAttribute("cx", String(startPt.x));
      traveller.setAttribute("cy", String(startPt.y));
      svg.style.visibility = "visible";

      // ── One scrubbed timeline ─────────────────────────────────────────
      // Cache totalLen so onUpdate never calls getTotalLength() per frame
      const cachedLen = totalLen;
      ctxRef.current = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pathAreaRef.current,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: "+=7200",
            scrub: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length),
              );
              setActiveStep(idx);
              // Direct DOM attribute set — no tween allocation per frame
              const pt = live.getPointAtLength(cachedLen * self.progress);
              traveller.setAttribute("cx", String(pt.x));
              traveller.setAttribute("cy", String(pt.y));
            },
          },
          defaults: { ease: "none" },
        });

        // Path draws on scroll
        tl.to(live, { strokeDashoffset: 0, duration: 4 }, 0);
      });
    }, 150);

    return () => {
      clearTimeout(setup);
      ctxRef.current?.revert();
    };
  }, []);

  return (
    <section
      id="process-section"
      ref={sectionRef}
      style={{
        background: "#771605",
        color: "#ECEDDD",
        overflow: "hidden",
        clipPath: "inset(0)",
      }}>
      {/* Header */}
      <div
        style={{
          padding: "18vh 5vw 10vh",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}>
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(236,237,221,0.3)",
              border: "0.5px solid rgba(236,237,221,0.15)",
              padding: "0.35em 1em",
              borderRadius: "999px",
            }}>
            How it works
          </span>
        </div>
        <h2
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7rem)",
            fontWeight: 300,
            letterSpacing: "-0.045em",
            lineHeight: 0.9,
            color: "#ECEDDD",
          }}>
          Your idea.
          <br />
          <span style={{ color: "rgba(236,237,221,0.22)" }}>Made real.</span>
        </h2>
      </div>

      {/* ── Mobile vertical timeline (< md) ── */}
      <div
        ref={mobileRef}
        className="md:hidden"
        style={{ position: "relative", padding: "0 24px 80px 56px" }}>
        {/* Animated SVG rail */}
        <svg
          ref={mobileSvgRef}
          width="100"
          height="100"
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 1,
          }}>
          <path
            ref={mobileGhostRef}
            fill="none"
            stroke="rgba(236,237,221,0.08)"
            strokeWidth="1"
          />
          <path
            ref={mobileLiveRef}
            fill="none"
            stroke={ACCENT}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2000"
            strokeDashoffset="2000"
          />
          <circle
            ref={mobileTravellerRef}
            cx="0"
            cy="0"
            r="0"
            fill="#771605"
            stroke={ACCENT}
            strokeWidth="1.5"
          />
        </svg>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {steps.map((s, i) => (
            <li
              key={s.n}
              style={{
                position: "relative",
                marginBottom: i < steps.length - 1 ? "72px" : 0,
                opacity: i <= activeMobileStep ? 1 : 0.2,
                transition: "opacity 0.4s ease",
              }}>
              {/* Circle on rail */}
              <div
                ref={(el) => {
                  mobileDotRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  left: "-40px",
                  top: "14px",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: i <= activeMobileStep ? ACCENT : "#771605",
                  border: `1px solid ${i <= activeMobileStep ? ACCENT : "rgba(236,237,221,0.15)"}`,
                  transition: "background 0.4s, border-color 0.4s",
                  zIndex: 2,
                }}
              />
              {/* Number */}
              <p
                style={{
                  fontSize: "clamp(3.2rem, 12vw, 4.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "rgba(236,237,221,0.88)",
                  marginBottom: "14px",
                }}>
                {s.n}
              </p>
              {/* Title */}
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.38)",
                  marginBottom: "12px",
                }}>
                {s.title}
              </p>
              {/* Body */}
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.75,
                  color: "rgba(236,237,221,0.45)",
                  maxWidth: "36ch",
                }}>
                {s.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Desktop pinned journey — horizontal columns (md+) ── */}
      <div
        ref={pathAreaRef}
        className="hidden md:block md:h-screen"
        style={{ overflow: "hidden" }}>
        <div ref={journeyRef} style={{ position: "relative", height: "100%" }}>
          {/* SVG path — full width overlay */}
          <svg
            ref={svgRef}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 2,
              visibility: "hidden",
            }}>
            <path
              ref={ghostPathRef}
              fill="none"
              stroke="rgba(236,237,221,0.06)"
              strokeWidth="1"
            />
            <path
              ref={livePathRef}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
            />
            <circle
              ref={travellerRef}
              cx="0"
              cy="0"
              r="0"
              fill="#771605"
              stroke={ACCENT}
              strokeWidth="1.5"
            />
          </svg>

          <ul
            className="flex flex-col md:flex-row md:h-full"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}>
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <li
                  key={s.n}
                  data-process-item=""
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onClick={() => setActiveStep(i)}
                  onMouseEnter={() => setActiveStep(i)}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                    padding: "40px 3vw",
                    borderRight:
                      i < steps.length - 1
                        ? "0.5px solid rgba(236,237,221,0.05)"
                        : "none",
                  }}>
                  {/* Upper half: step number */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: "32px",
                    }}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: isActive
                          ? "rgba(236,237,221,0.35)"
                          : "rgba(236,237,221,0.12)",
                        transition: "color 0.4s",
                      }}>
                      {s.n}
                    </p>
                  </div>

                  {/* Node dot — sits on the path */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      border: `1px solid ${
                        isActive ? ACCENT : "rgba(236,237,221,0.12)"
                      }`,
                      background: isActive ? ACCENT : "#771605",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 3,
                      transition: "border-color 0.4s, background 0.4s",
                    }}
                  />

                  {/* Lower half: title + body */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: "32px",
                    }}>
                    <p
                      style={{
                        fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                        fontWeight: 300,
                        letterSpacing: "-0.035em",
                        lineHeight: 1,
                        color: isActive ? "#ECEDDD" : "rgba(236,237,221,0.28)",
                        marginBottom: "16px",
                        textAlign: "center",
                        transition: "color 0.4s",
                      }}>
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.75,
                        color: isActive
                          ? "rgba(236,237,221,0.45)"
                          : "rgba(236,237,221,0.15)",
                        maxWidth: "22ch",
                        textAlign: "center",
                        transition: "color 0.4s",
                      }}>
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div style={{ height: "10vh" }} />
    </section>
  );
};

export default Process;

"use client";
import { useEffect, useRef, useState } from "react";

// Pexels stock images — cycle through during scroll-expand flicker
const heroImages = [
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

// Full path data from title.svg
const TITLE_PATH =
  "M82.5299 97.6496V4.61956H112.35V97.6496C112.35 131.46 91.5599 148.89 55.0199 148.89C21.2099 148.89 -7.77245e-05 132.93 -7.77245e-05 99.3296V4.61956H29.6099V96.5996C29.6099 113.82 38.8499 124.74 54.5999 124.74C73.2899 124.74 82.5299 115.92 82.5299 97.6496ZM196.337 144.06H167.147V91.3496L118.847 4.61956H152.867L182.267 61.3196L209.357 4.61956H242.957L196.337 91.7696V144.06ZM355.215 144.06H249.375V4.61956H351.855V28.9796H277.725V58.7996H345.975V83.3696H277.725V119.28H355.215V144.06ZM474.753 144.06H447.873L388.233 50.3996V144.06H361.143V4.61956H392.013L447.453 94.2896V4.61956H474.753V144.06ZM564.219 120.33H588.369C613.779 120.33 624.699 104.37 624.699 72.8696C624.699 41.3696 613.779 28.7696 585.849 28.7696H564.219V120.33ZM594.249 144.06H535.869V4.61956H589.839C627.639 4.61956 654.519 30.4496 654.519 72.8696C654.519 115.29 630.369 144.06 594.249 144.06ZM727.842 91.3496L710.412 35.9096H710.202L692.352 91.3496H727.842ZM776.772 144.06H745.062L736.242 115.29H684.792L674.922 144.06H644.052L693.822 4.61956H727.632L776.772 144.06ZM833.738 123.9C854.738 123.9 871.538 109.2 871.538 76.2296C871.538 43.2596 858.098 25.8296 833.738 25.8296C809.168 25.8296 795.518 43.2596 795.518 76.2296C795.518 109.2 809.588 123.9 833.738 123.9ZM833.738 148.89C790.898 148.89 766.748 122.64 766.748 75.5996C766.748 28.3496 790.898 -0.000440001 833.738 -0.000440001C876.578 -0.000440001 900.308 28.3496 900.308 76.2296C900.308 124.11 876.578 148.89 833.738 148.89ZM1066.45 45.7796H1038.73C1037.26 31.4996 1028.65 24.5696 1011.01 24.5696C994.626 24.5696 986.016 30.4496 986.016 40.9496C986.016 49.7696 992.106 54.8096 1007.65 58.5896C1023.4 62.3696 1038.73 66.1496 1049.02 70.7696C1061.2 76.2296 1070.86 84.8396 1070.86 104.58C1070.86 135.24 1047.76 148.89 1015.21 148.89C980.766 148.89 956.826 133.56 956.196 102.27H984.336C984.756 116.55 996.726 125.37 1015.42 125.37C1032.64 125.37 1042.51 118.02 1042.51 105.63C1042.51 97.4396 1038.31 91.7696 1020.88 87.9896C1003.66 84.2096 992.526 81.6896 982.656 77.2796C967.746 70.5596 959.346 60.4796 959.346 42.8396C959.346 17.8496 976.356 -0.000440001 1010.38 -0.000440001C1045.66 -0.000440001 1065.4 19.1096 1066.45 45.7796ZM1138.73 144.06H1109.54V28.9796H1067.54V4.61956H1180.94V28.9796H1138.73V144.06ZM1270.34 97.6496V4.61956H1300.16V97.6496C1300.16 131.46 1279.37 148.89 1242.83 148.89C1209.02 148.89 1187.81 132.93 1187.81 99.3296V4.61956H1217.42V96.5996C1217.42 113.82 1226.66 124.74 1242.41 124.74C1261.1 124.74 1270.34 115.92 1270.34 97.6496ZM1339.21 120.33H1363.36C1388.77 120.33 1399.69 104.37 1399.69 72.8696C1399.69 41.3696 1388.77 28.7696 1360.84 28.7696H1339.21V120.33ZM1369.24 144.06H1310.86V4.61956H1364.83C1402.63 4.61956 1429.51 30.4496 1429.51 72.8696C1429.51 115.29 1405.36 144.06 1369.24 144.06ZM1467.61 144.06H1438.42V4.61956H1467.61V144.06ZM1542.9 123.9C1563.9 123.9 1580.7 109.2 1580.7 76.2296C1580.7 43.2596 1567.26 25.8296 1542.9 25.8296C1518.33 25.8296 1504.68 43.2596 1504.68 76.2296C1504.68 109.2 1518.75 123.9 1542.9 123.9ZM1542.9 148.89C1500.06 148.89 1475.91 122.64 1475.91 75.5996C1475.91 28.3496 1500.06 -0.000440001 1542.9 -0.000440001C1585.74 -0.000440001 1609.47 28.3496 1609.47 76.2296C1609.47 124.11 1585.74 148.89 1542.9 148.89Z";

// Each word uses the same full path but a different viewBox that clips to only that word.
// Splits based on the 1610x149 viewBox: UYEN 0-505, DAO 505-928, STUDIO 928-1610
const titleWords = [
  { viewBox: "0 0 505 149", flex: "0 0 31.37%" }, // UYEN
  { viewBox: "505 0 423 149", flex: "0 0 26.27%" }, // DAO
  { viewBox: "928 0 682 149", flex: "0 0 42.36%" }, // STUDIO
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [flickerIdx, setFlickerIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const applyProgress = (p: number) => {
      const isMobile = window.innerWidth < 768;
      const imgProgress = Math.min(p / 0.7, 1);

      // Desktop: 65→100% wide, 72→100vh tall
      // Mobile: 88→96% wide, 65→85vh tall
      const imgW = isMobile ? 88 + 8 * imgProgress : 65 + 35 * imgProgress;
      const imgH = isMobile ? 65 + 20 * imgProgress : 72 + 28 * imgProgress;

      const contentOpacity = Math.max(0, 1 - p * 3.5);

      if (imgWrapRef.current) {
        const s = imgWrapRef.current.style;
        s.width = `${imgW}%`;
        s.height = `${imgH}vh`;
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(contentOpacity);
        overlayRef.current.style.pointerEvents =
          contentOpacity > 0.05 ? "auto" : "none";
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const total = sectionRef.current.offsetHeight - window.innerHeight;
        const p = Math.min(Math.max(window.scrollY / total, 0), 1);
        progressRef.current = p;
        applyProgress(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    applyProgress(0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cycle images with a smooth cross-fade; stops once image is full-size.
  useEffect(() => {
    const id = setInterval(() => {
      if (progressRef.current >= 0.7) return;
      setFlickerIdx((i) => (i + 1) % heroImages.length);
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#ffffff]">
        {/* Expanding image with flicker */}
        <div
          ref={imgWrapRef}
          className="absolute  overflow-hidden will-change-[width,height]"
          style={{
            width: "35%",
            height: "55vh",
            left: "50%",
            top: "50%",

            transform: mounted
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-50%, -48%) scale(0.97)",
            opacity: mounted ? 1 : 0,
            transition:
              "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}>
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? "Hero" : ""}
              aria-hidden={i !== flickerIdx}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                opacity: i === flickerIdx ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Overlay content */}
        <div
          ref={overlayRef}
          className="relative z-10 flex h-full flex-col justify-between px-8 py-6"
          style={{ opacity: 1, pointerEvents: "auto" }}>
          <div>
            {/* Split-word title: 3 overflow-hidden clips, each slides up with stagger */}
            <div className="flex w-full items-end" aria-label="Uyen Dao Studio">
              {titleWords.map(({ viewBox, flex }, i) => (
                <div key={i} className="overflow-hidden" style={{ flex }}>
                  <svg
                    viewBox={viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full block"
                    aria-hidden="true"
                    style={{
                      transform: mounted ? "translateY(0)" : "translateY(110%)",
                      transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.13}s`,
                    }}>
                    <path d={TITLE_PATH} fill="#0d0d0d" fillRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar: tagline left + scroll indicator right */}
          <div className="flex items-end justify-between">
            <p
              className="text-[0.65rem] font-medium uppercase tracking-[0.22em]"
              style={{ color: "rgba(13,13,13,0.40)" }}>
              Brand identity &amp; digital design
            </p>
            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-3">
              <span
                className="text-[0.6rem] font-medium uppercase tracking-[0.2em]"
                style={{
                  color: "rgba(13,13,13,0.40)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}>
                Scroll
              </span>
              <div
                className="w-px h-12"
                style={{ background: "rgba(13,13,13,0.20)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

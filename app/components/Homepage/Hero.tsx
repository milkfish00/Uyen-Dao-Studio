"use client";
import { useEffect, useState } from "react";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

type SiteSettings = {
  studioName?: string;
  heroImages?: { _key: string; url: string; alt?: string }[];
} | null;

type HeroSlide = {
  key: string;
  src: string;
  alt: string;
};

const FALLBACK_IMAGES = [
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const Hero = ({ settings }: { settings?: SiteSettings }) => {
  const [current, setCurrent] = useState(0);

  const heroImages: HeroSlide[] =
    settings?.heroImages && settings.heroImages.length > 0
      ? settings.heroImages
          .filter((img) => hasImageSrc(img?.url))
          .map((img) => ({
            key: img._key || img.url,
            src: img.url,
            alt: SITE_IMAGE_ALT,
          }))
      : FALLBACK_IMAGES.map((src, index) => ({
          key: `fallback-${index}`,
          src,
          alt: SITE_IMAGE_ALT,
        }));

  const slides: HeroSlide[] =
    heroImages.length > 0
      ? heroImages
      : FALLBACK_IMAGES.map((src, index) => ({
          key: `fallback-${index}`,
          src,
          alt: SITE_IMAGE_ALT,
        }));

  const studioName = settings?.studioName ?? "Uyen Dao Design";

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden bg-cream lg:border-10 border-red">
      {/* Full screen edge-to-edge images */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((img, i) => (
          <img
            key={img.key}
            src={img.src}
            alt={SITE_IMAGE_ALT}
            aria-hidden={i !== current}
            className="absolute inset-0 w-full h-full object-cover object-top select-none"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: i === current ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Overlay Layout */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-12 bg-gradient-to-t from-black/40 via-black/10 to-transparent">
        <h1
          className="uppercase font-bold text-center text-[#8C0014] tracking-tight leading-[0.85] select-none dropped-shadow-sm"
          style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}>
          {studioName}
        </h1>
      </div>
    </section>
  );
};

export default Hero;

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

gsap.registerPlugin(ScrollTrigger);

type SanityService = {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: string | null;
};

type ServiceItem = {
  title: string;
  href: string;
  img: string;
};

const FALLBACK_SERVICE_IMAGE =
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800";

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    title: "Industrial Design",
    href: "/services#industrial-design",
    img: FALLBACK_SERVICE_IMAGE,
  },
  {
    title: "Brand & Creative Direction",
    href: "/services#brand-creative",
    img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function toServiceItem(s: SanityService): ServiceItem {
  return {
    title: s.title,
    href: s.slug
      ? `/services/${s.slug}`
      : `/services#${s.title.toLowerCase().replace(/\s+/g, "-")}`,
    img: hasImageSrc(s.coverImage) ? s.coverImage : FALLBACK_SERVICE_IMAGE,
  };
}

export default function ServicesSection({
  services: rawServices,
}: {
  services?: SanityService[] | null;
}) {
  const services: ServiceItem[] =
    rawServices && rawServices.length > 0
      ? rawServices.map(toServiceItem)
      : FALLBACK_SERVICES;

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    gsap.set(imgRefs.current, { yPercent: -50, xPercent: -50, autoAlpha: 0 });
    if (!isMobile) {
      gsap.set(rowRefs.current, { opacity: 0.13 });
    }

    const cleanups: (() => void)[] = [];

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const image = imgRefs.current[i];
      if (!image) return;
      if (isMobile) return;

      let firstEnter = false;

      const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
      const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

      const align = (e: MouseEvent) => {
        if (firstEnter) {
          setX(e.clientX, e.clientX);
          setY(e.clientY, e.clientY);
          firstEnter = false;
        } else {
          setX(e.clientX);
          setY(e.clientY);
        }
      };

      const startFollow = () => document.addEventListener("mousemove", align);
      const stopFollow = () => document.removeEventListener("mousemove", align);

      const fade = gsap.to(image, {
        autoAlpha: 1,
        ease: "none",
        paused: true,
        duration: 0.15,
        onReverseComplete: stopFollow,
      });

      const onEnter = (e: MouseEvent) => {
        firstEnter = true;
        fade.play();
        startFollow();
        align(e);
        gsap.to(el, { opacity: 1, duration: 0.3, ease: "power2.out" });
        rowRefs.current.forEach((other, j) => {
          if (other && j !== i)
            gsap.to(other, {
              opacity: 0.06,
              duration: 0.3,
              ease: "power2.out",
            });
        });
      };

      const onLeave = () => {
        fade.reverse();
        rowRefs.current.forEach((other) => {
          if (other)
            gsap.to(other, {
              opacity: 0.13,
              duration: 0.3,
              ease: "power2.out",
            });
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        stopFollow();
        fade.kill();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Service title slide-up animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".service-title-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-cream text-ink px-6 sm:px-10 lg:px-16 pt-24 pb-24  ">
      {/* Cursor-following images */}
      {services.map((s, i) => (
        <img
          key={`${s.href}-cursor`}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          src={s.img}
          alt={SITE_IMAGE_ALT}
          className="service-cursor-img"
        />
      ))}

      {/* Header */}
      <div className="mb-8 flex items-center justify-center">
        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-red/38">
          + Services
        </span>
      </div>

      {/* Service list */}
      <ul className="w-full m-0 p-0 list-none">
        {services.map((s, i) => (
          <li
            key={s.href}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="w-full py-6 cursor-default select-none">
            <div className="flex items-baseline justify-center">
              <Link href="/services" className="no-underline">
                <h3 className="text-center uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-[-0.05em] font-bold text-red leading-none flex flex-wrap justify-center gap-x-[0.2em] hover:opacity-60 transition-opacity duration-200">
                  {s.title.split(" ").map((word, wi) => (
                    <div key={wi} className="overflow-hidden">
                      <span className="block service-title-word">{word}</span>
                    </div>
                  ))}
                </h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

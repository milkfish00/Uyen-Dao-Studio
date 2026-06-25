"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const recognitions = [
  {
    title: "Lorem Ipsum Award",
    program: "Lorem Ipsum Program",
    issuer: "Lorem Ipsum Institute",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc purus orci, dignissim sed vehicula at, tristique vel est. Maecenas sollicitudin bibendum ante.",
  },
  {
    title: "Dolor Sit Prize",
    program: "Dolor Sit Foundation",
    issuer: "Amet Consectetur",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
  },
  {
    title: "Amet Consec Grant",
    program: "Adipiscing Elit Program",
    issuer: "Sed Do Eiusmod",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur accumsan neque a elit ultrices volutpat.",
  },
  {
    title: "Adipiscing Honours",
    program: "Tempor Incididunt Initiative",
    issuer: "Labore Et Dolore",
    description:
      "Quisque pretium mattis nunc, vitae sodales ipsum laoreet vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];

const GalleryAbout = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-cream text-red overflow-hidden">
      {/* ── Two-column editorial layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-28 lg:pt-32 px-6 sm:px-10 lg:px-16 pb-16 gap-12 lg:gap-16 items-start">
        {/* Left — Polaroid */}
        <div className="w-full lg:sticky lg:top-24">
          <div className="relative w-full aspect-[4/5] overflow-hidden md:h-190 bg-[#d9d9d9]">
            <Image
              src="/images/title.svg"
              alt="Uyen Dao title graphic"
              fill
              className="placeholder-media object-cover object-left scale-[1.35] opacity-100"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* Right — bio + contact info */}
        <div className="flex flex-col gap-12 lg:pt-8">
          <p className="text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-red max-w-[36ch]">
            Uyen Dao is a Vietnamese-Canadian industrial designer with a passion
            for creating products that balance function, aesthetics, and human
            experience. Drawing inspiration from culture, wellness,
            sustainability and emerging technology, she designs with the belief
            that great products become a meaningful part of everyday life.{" "}
            <br /> <br /> Her work combines thoughtful problem-solving with a
            fashion-informed perspective, ensuring aesthetics are never an
            afterthought but an integral part of every solution.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Info
              </p>
              <p className="text-red/60">hello@uyendaodesign.com</p>
              <p className="text-red/60">+1 234 45670</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Follow
              </p>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Instagram
              </a>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Behance
              </a>
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Tiktok
              </a>{" "}
              <a
                href="#"
                className="text-red/60 hover:text-red transition-colors duration-200">
                Linkedin
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Services
              </p>
              <p className="text-red/60">Brand Identity</p>
              <p className="text-red/60">Art Direction</p>
              <p className="text-red/60">Fashion & Editorial</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red mb-1">
                Work with us
              </p>
              <a
                href="/contact"
                className="text-red/60 hover:text-red transition-colors duration-200 underline underline-offset-2">
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 sm:px-10 lg:px-16 pb-18 lg:pb-24">
        <div className="border-t border-red/10 pt-10 sm:pt-12 lg:pt-14 divide-y divide-red/10">
          {recognitions.map((recognition, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={recognition.title}
                className="grid grid-cols-1 lg:grid-cols-2">
                {/* Text */}
                <div
                  className={`flex flex-col gap-4 py-12 lg:py-16 justify-center ${
                    isEven ? "lg:pr-16" : "lg:order-last lg:pl-16"
                  }`}>
                  <span className="text-red">✳</span>
                  <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-red">
                    {recognition.title}
                  </h2>
                  <div className="flex flex-wrap gap-x-8 gap-y-0.5 text-sm">
                    <p className="text-red/65">{recognition.program}</p>
                    <p className="text-red/65">{recognition.issuer}</p>
                  </div>
                  <p className="text-[1rem] leading-[1.7] text-red/75">
                    {recognition.description}
                  </p>
                </div>
                {/* Red card — hidden on mobile */}
                <div
                  className={`hidden lg:block relative overflow-hidden rounded-[2rem] bg-red min-h-[28rem] ${
                    isEven ? "" : "lg:order-first"
                  }`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_48%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/10 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Full-width giant heading ── */}
      <div
        ref={headingRef}
        className="px-4 sm:px-6 overflow-hidden hidden lg:block mt-4 pb-2">
        <div className="flex w-full justify-center flex-nowrap gap-[0.06em]">
          {["UYEN", "DAO"].map((word, i) => (
            <div key={i} className="overflow-hidden pb-[0.04em]">
              <span
                className="block heading-word font-bold leading-none tracking-[-0.04em] text-red"
                style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}>
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GalleryAbout;

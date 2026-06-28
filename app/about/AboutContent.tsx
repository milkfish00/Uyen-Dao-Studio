"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

gsap.registerPlugin(ScrollTrigger);

type Recognition = {
  _key?: string;
  awardName?: string;
  year?: number;
  description?: string;
  image?: string | null;
};

type SocialLink = {
  _key?: string;
  platform?: string;
  url?: string;
};

type ServiceItem = {
  _id: string;
  title: string;
  slug?: string;
};

type AboutContentData = {
  heading?: string;
  intro?: string;
  portrait?: string | null;
  recognitions?: Recognition[];
  email?: string;
  phoneNumber?: string;
  socialLinks?: SocialLink[];
  services?: ServiceItem[];
};

export default function AboutContent({
  content,
}: {
  content: AboutContentData;
}) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = headingRef.current;
    if (!element) {
      return;
    }

    const words = element.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });

    const context = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: element,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => context.revert();
  }, []);

  const intro = content.intro?.trim() || "About content coming soon.";
  const portrait = content.portrait || "/images/title.svg";
  const recognitions = content.recognitions ?? [];
  const services = content.services ?? [];
  const socials = content.socialLinks ?? [];
  const headingWords = ["UYEN", "DAO."];

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-red">
      <div className="grid grid-cols-1 items-start gap-12 px-6 pt-28 pb-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pt-32">
        <div className="w-full lg:sticky lg:top-24">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-[#d9d9d9] md:h-190">
            <Image
              src={portrait}
              alt={SITE_IMAGE_ALT}
              fill
              className="object-cover object-left"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:pt-8">
          <p className="max-w-[36ch] text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-red whitespace-pre-line">
            {intro}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
            <div className="flex flex-col gap-1.5">
              <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red">
                Info
              </p>
              {content.email ? (
                <a
                  href={`mailto:${content.email}`}
                  className="text-red/60 transition-colors duration-200 hover:text-red">
                  {content.email}
                </a>
              ) : null}
              {content.phoneNumber ? (
                <a
                  href={`tel:${content.phoneNumber.replace(/\s+/g, "")}`}
                  className="text-red/60 transition-colors duration-200 hover:text-red">
                  {content.phoneNumber}
                </a>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red">
                Follow
              </p>
              {socials.map((social) =>
                social.platform && social.url ? (
                  <a
                    key={social._key || social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red/60 transition-colors duration-200 hover:text-red">
                    {social.platform}
                  </a>
                ) : null,
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red">
                Services
              </p>
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={
                    service.slug ? `/services/${service.slug}` : "/services"
                  }
                  className="text-red/60 transition-colors duration-200 hover:text-red">
                  {service.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-red">
                Work with us
              </p>
              <Link
                href="/contact"
                className="text-red/60 underline underline-offset-2 transition-colors duration-200 hover:text-red">
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 pb-18 sm:px-10 lg:px-16 lg:pb-24">
        <div className="divide-y divide-red/10 border-t border-red/10 pt-10 sm:pt-12 lg:pt-14">
          {recognitions.map((recognition, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={recognition._key || `${recognition.awardName}-${index}`}
                className="grid grid-cols-1 lg:grid-cols-2">
                <div
                  className={`flex flex-col justify-center gap-4 py-12 lg:py-16 ${
                    isEven ? "lg:pr-16" : "lg:order-last lg:pl-16"
                  }`}>
                  <span className="text-red">✳</span>
                  <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-red">
                    {recognition.awardName || "Recognition"}
                  </h2>
                  <div className="flex flex-wrap gap-x-8 gap-y-0.5 text-sm">
                    {recognition.year ? (
                      <p className="text-red/65">{recognition.year}</p>
                    ) : null}
                  </div>
                  <p className="text-[1rem] leading-[1.7] text-red/75">
                    {recognition.description}
                  </p>
                </div>

                <div
                  className={`relative hidden min-h-112 overflow-hidden bg-red lg:block ${
                    isEven ? "" : "lg:order-first"
                  }`}>
                  {recognition.image ? (
                    <Image
                      src={recognition.image}
                      alt={recognition.awardName || SITE_IMAGE_ALT}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_48%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/10 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div
        ref={headingRef}
        className="mt-4 hidden overflow-hidden px-4 pb-2 sm:px-6 lg:block">
        <div className="flex w-full flex-nowrap justify-center gap-[0.06em]">
          {headingWords.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className="overflow-hidden pb-[0.04em]">
              <span
                className="heading-word block font-bold leading-none tracking-[-0.04em] text-red"
                style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}>
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

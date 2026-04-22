"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white text-[#c2090a]">
      <div className="min-h-screen px-6 sm:px-10 lg:px-16 pt-20 pb-24 flex flex-col items-center">
        {/* Polaroid */}
        <div className="flex justify-center mb-14">
          <div className="bg-white p-2.5 pb-14 shadow-2xl -rotate-2">
            <div className="relative w-[260px] sm:w-[360px] md:w-[440px] aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="About — Uyen Dao Studio"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 640px) 260px, (max-width: 768px) 360px, 440px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Body text */}
        <div className="max-w-lg text-center">
          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#c2090a]">
            The <em>founders</em>, Mie Ejdrup and Caroline Chalmer, <em>are</em>{" "}
            long-time friends <em>from</em> business school <em>and</em> have
            always had the <em>ambition &amp; entrepreneurial</em> spirit{" "}
            <em>to</em> build their own company.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex gap-4 mt-16 w-full max-w-sm">
          <a
            href="/contact"
            className="flex-1 border border-[#c2090a] text-[#c2090a] text-center text-[0.6rem] uppercase tracking-[0.18em] py-3.5 no-underline hover:bg-[#c2090a] hover:text-white transition-colors duration-200 font-sans">
            Book Now
          </a>
          <a
            href="/contact"
            className="flex-1 border border-[#c2090a] text-[#c2090a] text-center text-[0.6rem] uppercase tracking-[0.18em] py-3.5 no-underline hover:bg-[#c2090a] hover:text-white transition-colors duration-200 font-sans">
            Send a Request
          </a>
        </div>
      </div>
    </section>
  );
}

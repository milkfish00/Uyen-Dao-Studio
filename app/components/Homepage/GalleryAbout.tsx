import React from "react";
import Image from "next/image";

const GalleryAbout = () => {
  return (
    <>
      <section id="about" className="relative text-red overflow-visible">
        <div className=" px-6 sm:px-10 lg:px-16 pt-24 pb-24 flex flex-col items-center">
          {/* Editorial headline */}
          <h2 className="relative z-10 flex flex-wrap justify-center gap-x-[0.25em] text-red mb-6 text-center uppercase text-[clamp(2.5rem,8vw,7rem)] tracking-[-0.05em] font-bold leading-none">
            Uyen Dao
          </h2>

          {/* Large Polaroid - overlapping the text */}
          <div className="flex justify-center relative z-30 mt-0 sm:-mt-16 md:mt-0 mb-12">
            <div className=" p-3 sm:p-4 pb-16 sm:pb-20 shadow-lg rotate-[-1.5deg] relative">
              <div className="relative w-70 sm:w-105 md:w-135 lg:w-110 aspect-4/5 overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Mola Piasecka — Founder of Mola"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 420px, (max-width: 1024px) 540px, 640px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Body text */}
          <div className="flex items-center justify-center">
            <p className="text-[clamp(0.74rem,0.86vw,0.82rem)] max-w-sm md:max-w-lg text-justify leading-[1.75] text-red m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              purus orci, dignissim sed vehicula at, tristique vel est. Maecenas
              sollicitudin bibendum ante. In condimentum semper tincidunt. Etiam
              ex mauris, euismod fermentum nisl in, hendrerit vulputate mauris.
              Ut eget ipsum purus. Curabitur accumsan neque a elit ultrices
              volutpat. Quisque pretium mattis nunc, vitae sodales ipsum laoreet
              vitae. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Fusce ut facilisis dui.
            </p>
          </div>
          {/* CTA row */}
          <div className="flex gap-4 mt-16 w-full max-w-sm relative z-20">
            <a
              href="/contact"
              className="flex-1 text-white text-center text-[0.6rem] uppercase tracking-[0.18em] py-3.5 underline transition-all duration-200 font-mono hover:text-white/70">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryAbout;

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const BigImage = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>('[data-image-wrapper-item="true"]'),
    );

    if (items.length < 2) return;

    let frame = 0;

    const clamp = (value: number, min: number, max: number) => {
      return Math.min(max, Math.max(min, value));
    };

    const smoothstep = (value: number) => {
      return value * value * (3 - 2 * value);
    };

    const update = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 1);

      for (let index = 1; index < items.length; index += 1) {
        const item = items[index];
        const totalAnimated = items.length - 1;
        const start = ((index - 1) / totalAnimated) * 0.9;
        const end = start + 0.3;
        const local = clamp((progress - start) / (end - start), 0, 1);
        const eased = smoothstep(local);
        const scale = 0.25 + eased * 0.75;

        item.style.opacity = eased.toString();
        item.style.transform = `scale(${scale})`;
      }
    };

    const requestUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] w-screen md:h-[300vh]">
      <div className="hidden" aria-hidden="true">
        <img
          src="https://images.pexels.com/photos/34636070/pexels-photo-34636070.jpeg"
          srcSet="https://images.pexels.com/photos/34636070/pexels-photo-34636070.jpeg 1x, https://images.pexels.com/photos/34636070/pexels-photo-34636070.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />{" "}
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />{" "}
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />{" "}
        <img
          src="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          srcSet="https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg 1x, https://images.pexels.com/photos/34636071/pexels-photo-34636071.jpeg"
          alt=""
        />
      </div>

      <div className="sticky left-0 top-0 h-screen w-full p-4">
        <div className="image-wrapper absolute left-1/2 top-0 z-0 flex h-full w-full -translate-x-1/2 items-center justify-center">
          <div
            className="relative overflow-clip"
            data-image-wrapper-item="true"
            style={{
              width: "calc(100% - 64px)",
              height: "calc(100% - 64px)",
              transform: "scale(0.8)",
              opacity: 1,
            }}>
            <Image
              className="object-cover"
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Image 1"
              fill
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="image-wrapper absolute left-1/2 top-0 z-1 flex h-full w-full -translate-x-1/2 items-center justify-center">
          <div
            className="relative overflow-clip"
            data-image-wrapper-item="true"
            style={{
              width: "calc(100% - 128px)",
              height: "calc(100% - 128px)",
              transform: "scale(0.25)",
              opacity: 0,
            }}>
            <Image
              className="object-cover"
              src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Image 2"
              fill
              sizes="100vw"
            />
          </div>
        </div>

        <div className="image-wrapper absolute left-1/2 top-0 z-2 flex h-full w-full -translate-x-1/2 items-center justify-center">
          <div
            className="relative overflow-clip"
            data-image-wrapper-item="true"
            style={{
              width: "calc(100% - 192px)",
              height: "calc(100% - 192px)",
              transform: "scale(0.25)",
              opacity: 0,
            }}>
            <Image
              className="object-cover"
              src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Image 3"
              fill
              sizes="100vw"
            />
          </div>
        </div>

        <div className="image-wrapper absolute left-1/2 top-0 z-3 flex h-full w-full -translate-x-1/2 items-center justify-center">
          <div
            className="relative overflow-clip"
            data-image-wrapper-item="true"
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(0.25)",
              opacity: 0,
            }}>
            <Image
              className="object-cover"
              src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Image 4"
              fill
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigImage;

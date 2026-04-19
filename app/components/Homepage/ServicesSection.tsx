"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  {
    title: "Lorem Ipsum",
    subtitle: "Strategy",
    num: "01",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Dolor Sit",
    subtitle: "Identity",
    num: "02",
    img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Amet Consect",
    subtitle: "Direction",
    num: "03",
    img: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Adipiscing Elit",
    subtitle: "Campaign",
    num: "04",
    img: "https://assets.codepen.io/16327/portrait-image-14.jpg",
  },
  {
    title: "Sed Do Eiusmod",
    subtitle: "Motion",
    num: "05",
    img: "https://assets.codepen.io/16327/portrait-image-6.jpg",
  },
];

export default function ServicesSection() {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    gsap.set(imgRefs.current, { yPercent: -50, xPercent: -50, autoAlpha: 0 });
    gsap.set(rowRefs.current, { opacity: 0.13 });

    const cleanups: (() => void)[] = [];

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const image = imgRefs.current[i];
      if (!image) return;

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

  return (
    <section
      id="services"
      className="relative bg-[#EDEDDD] text-[#771605] px-8 py-24">
      {/* Cursor-following images */}
      {services.map((s, i) => (
        <img
          key={i}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          src={s.img}
          alt={s.title}
          className="service-cursor-img"
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <span className="header-label">Our Services</span>
        <span className="header-label text-[#771605]">
          {services.length.toString().padStart(2, "0")} Disciplines
        </span>
      </div>

      {/* Service list */}
      <ul className="w-full m-0 p-0 list-none">
        {services.map((s, i) => (
          <li
            key={i}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="w-full py-6 cursor-default select-none">
            <div className="flex items-baseline justify-center">
              <h3 className="service-title">
                {s.title}
                <sup className="service-num">(0{i + 1})</sup>
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

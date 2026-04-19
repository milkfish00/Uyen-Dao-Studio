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
    <>
      {/* Castoro Titling loaded via next/font in layout */}
      <style>{`
        #services * { box-sizing: border-box; }

        #services .service-num {
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: #999;
          vertical-align: super;
          margin-left: 6px;
          font-weight: 300;
        }

        #services .service-title {
          font-family: var(--font-castoro), serif;
          font-weight: 600;
          color: #0d0d0d;
          line-height: 1;
          letter-spacing: -0.01em;
          font-size: clamp(3rem, 8vw, 6.5rem);
          text-transform: uppercase;
          display: inline;
        }

     
        #services li:last-child {
          border-bottom: 1px solid #e0e0e0;
        }

        #services .header-label {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #999;
          font-weight: 400;
        }
      `}</style>

      <section
        id="services"
        style={{
          position: "relative",
          background: "#fff",
          color: "#0d0d0d",
          padding: "6rem 3rem",
        }}>
        {/* Cursor-following images */}
        {services.map((s, i) => (
          <img
            key={i}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            src={s.img}
            alt={s.title}
            style={{
              pointerEvents: "none",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 50,
              width: 320,
              height: 320,
              objectFit: "cover",
            }}
          />
        ))}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}>
          <span className="header-label">Our Services</span>
          <span className="header-label" style={{ color: "#0d0d0d" }}>
            {services.length.toString().padStart(2, "0")} Disciplines
          </span>
        </div>

        {/* Service list */}
        <ul style={{ width: "100%", margin: 0, padding: 0, listStyle: "none" }}>
          {services.map((s, i) => (
            <li
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              style={{
                width: "100%",
                padding: "1.5rem 0",
                cursor: "default",
                userSelect: "none",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}>
                <h3 className="service-title">
                  {s.title}
                  <sup className="service-num">(0{i + 1})</sup>
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

const EMAIL = "hello@uyendaostudio.com";

const photos = [
  {
    url: "https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=900",
    caption: "Studio Life",
  },
  {
    url: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=900",
    caption: "Creative Process",
  },
  {
    url: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=900",
    caption: "The Atelier",
  },
];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="about"
      style={{ background: "#fff", color: "#0d0d0d" }}
      className="px-6 sm:px-10 lg:px-16 py-28 lg:py-40">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div style={{ marginBottom: "56px" }}>
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(13,13,13,0.35)",
              border: "0.5px solid rgba(13,13,13,0.15)",
              padding: "0.35em 1em",
              borderRadius: "999px",
            }}>
            About
          </span>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}
          className="lg:grid-cols-2 lg:gap-24 items-start">
          {/* Photo */}
          <div style={{ position: "relative", aspectRatio: "3/4" }}>
            {photos.map((p, i) => (
              <div
                key={p.url}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === current ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}>
                <Image
                  src={p.url}
                  alt={p.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  priority={i === 0}
                />
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                display: "flex",
                gap: "8px",
                zIndex: 1,
              }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Photo ${i + 1}`}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background:
                      i === current ? "#fff" : "rgba(255,255,255,0.45)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "400px",
              paddingTop: "4px",
            }}>
            <div>
              <h2
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                  marginBottom: "32px",
                }}>
                Brand&nbsp;identity
                <br />
                <span style={{ color: "rgba(13,13,13,0.2)" }}>
                  &amp;&nbsp;digital design.
                </span>
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.85,
                  color: "rgba(13,13,13,0.45)",
                  maxWidth: "38ch",
                  marginBottom: "40px",
                }}>
                Independent studio focused on brand identity, visual
                storytelling, and digital craft. Based between continents —
                working globally.
              </p>
            </div>

            <div
              style={{
                borderTop: "0.5px solid rgba(13,13,13,0.1)",
                paddingTop: "24px",
              }}>
              <button
                onClick={copyEmail}
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(13,13,13,0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}>
                {copied ? "Copied!" : EMAIL}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

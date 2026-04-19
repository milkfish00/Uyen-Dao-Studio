"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-6 sm:px-10 lg:px-16"
      style={{ background: "#771605", color: "#ECEDDD" }}>
      {/* Top spacer for navbar */}
      <div className="pt-28 sm:pt-36" />

      {/* Main content */}
      <div className="flex-1 flex items-start">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — heading + info */}
          <div className="flex flex-col gap-10">
            <span
              className="inline-flex items-center w-fit"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(236,237,221,0.3)",
                border: "0.5px solid rgba(236,237,221,0.15)",
                padding: "0.35em 1em",
                borderRadius: "999px",
              }}>
              Get in touch
            </span>

            <h1
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#ECEDDD",
              }}>
              Let's make
              <br />
              <span style={{ color: "rgba(236,237,221,0.22)" }}>
                something real.
              </span>
            </h1>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(236,237,221,0.4)",
                maxWidth: "34ch",
              }}>
              Whether it's a rough sketch on a napkin or a full brief — we'd
              love to hear about it. No pressure, just a conversation.
            </p>

            <div
              className="flex flex-col gap-3"
              style={{
                borderTop: "0.5px solid rgba(236,237,221,0.1)",
                paddingTop: "24px",
              }}>
              <a
                href="mailto:hello@uyendaostudio.com"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ECEDDD")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(236,237,221,0.4)")
                }>
                hello@uyendaostudio.com
              </a>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.25)",
                }}>
                Based between continents
              </p>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 lg:pt-16">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.3)",
                }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Smith"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "0.5px solid rgba(236,237,221,0.15)",
                  padding: "12px 0",
                  fontSize: "15px",
                  color: "#ECEDDD",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.15)")
                }
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.3)",
                }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "0.5px solid rgba(236,237,221,0.15)",
                  padding: "12px 0",
                  fontSize: "15px",
                  color: "#ECEDDD",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.15)")
                }
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(236,237,221,0.3)",
                }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your idea..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "0.5px solid rgba(236,237,221,0.15)",
                  padding: "12px 0",
                  fontSize: "15px",
                  color: "#ECEDDD",
                  outline: "none",
                  fontFamily: "inherit",
                  resize: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderBottomColor =
                    "rgba(236,237,221,0.15)")
                }
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                marginTop: "8px",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#771605",
                background: "#ECEDDD",
                border: "none",
                borderRadius: "999px",
                padding: "0.85em 2.4em",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 500,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              Send message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="pb-12" />
    </div>
  );
}

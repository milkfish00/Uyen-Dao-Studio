"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.backgroundColor;
    html.style.backgroundColor = "#8c0014";
    document.body.style.backgroundColor = "#8c0014";
    return () => {
      html.style.backgroundColor = prev;
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.2,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-red text-white px-6 lg:px-16 pt-32 lg:pt-40 pb-20">
      <div className="max-w-9xl grid grid-cols-1 lg:grid-cols-[1.5fr_0.5fr] gap-20">
        {/* LEFT */}
        <div className="flex flex-col gap-20">
          <h1
            ref={headingRef}
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold">
            <div className="flex flex-wrap gap-x-[0.3em]">
              {["Let\u2019s", "start", "a"].map((word, i) => (
                <div key={i} className="overflow-hidden pb-[0.15em]">
                  <span className="block heading-word">{word}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-[0.3em]">
              {["project", "together"].map((word, i) => (
                <div key={i} className="overflow-hidden pb-[0.15em]">
                  <span className="block heading-word">{word}</span>
                </div>
              ))}
            </div>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-14">
            {/* 01 */}
            <div className="border-b border-white/20 pb-6 flex gap-6">
              <div className="flex-1">
                <p className="text-white/80 mb-2">What’s your name?</p>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe *"
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-lg"
                />
              </div>
            </div>

            {/* 02 */}
            <div className="border-b border-white/20 pb-6 flex gap-6">
              <div className="flex-1">
                <p className="text-white/80 mb-2">What’s your email?</p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@doe.com *"
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-lg"
                />
              </div>
            </div>

            {/* 04 MESSAGE */}
            <div className="border-b border-white/20 pb-6 flex gap-6">
              <div className="flex-1">
                <p className="text-white/80 mb-2">Tell me about your project</p>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Type your message..."
                  className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-lg resize-none"
                />
              </div>
            </div>

            {/* 05 SUBMIT */}
            <div className="flex items-center gap-6 pt-4">
              <button
                type="submit"
                className="text-white text-lg underline underline-offset-4 hover:opacity-70 transition">
                Send message →
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-12 lg:pt-24">
          <img src="/ui/star.svg" className="w-16 h-16  invert rounded-full" />

          <div className="text-sm text-white/70 space-y-3">
            <p className="uppercase text-white/30 text-xs">Contact details</p>
            <p>info@dennissnellenberg.com</p>
            <p>+31 6 27 84 74 30</p>
          </div>

          <div className="text-sm text-white/70 space-y-2">
            <p className="uppercase text-white/30 text-xs">Business details</p>
            <p>CoC: 65527690</p>
            <p>VAT: NL002323039B05</p>
            <p>Location: The Netherlands</p>
          </div>

          <div className="text-sm text-white/70 space-y-2">
            <p className="uppercase text-white/30 text-xs">Socials</p>
            <p>Awwwards</p>
            <p>Instagram</p>
            <p>Dribbble</p>
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </main>
  );
}

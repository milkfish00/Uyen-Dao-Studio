"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SplitTextLink from "./SplitTextLink";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
];

const mobileMenuLinks = [
  { label: "Index", href: "/" },
  { label: "Services", href: "/process" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }
    const check = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight : window.innerHeight;
      setPastHero(window.scrollY >= threshold);
      const distFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setNearFooter(distFromBottom < 80);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome]);

  return (
    <>
      {/* ── NON-HOME: classic top bar ── */}
      {!isHome && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 backdrop-blur-sm"
          style={{
            backgroundColor: isContact
              ? "#771606"
              : isOpen
                ? "rgba(13,13,13,0.95)"
                : "rgba(255,255,255,0.9)",
          }}>
          <Link
            href="/"
            className="text-[0.72rem] font-medium uppercase tracking-[0.14em] whitespace-nowrap"
            style={{ color: isContact || isOpen ? "white" : "#0d0d0d" }}>
            Uyen Dao Studio
          </Link>

          <div
            className="hidden md:flex items-center gap-0.5 rounded-lg border px-1.5 py-1.5 backdrop-blur-2xl"
            style={{
              borderColor: isContact
                ? "rgba(255,255,255,0.15)"
                : "rgba(13,13,13,0.10)",
              backgroundColor: isContact
                ? "rgba(0,0,0,0.25)"
                : "rgba(13,13,13,0.82)",
            }}>
            {navLinks.map((link) => (
              <SplitTextLink
                key={link.href}
                href={link.href}
                className="rounded-lg uppercase px-4 py-2 text-[0.68rem] text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-200">
                {link.label}
              </SplitTextLink>
            ))}
            <span className="h-4 w-px bg-white/10 mx-0.5" />
            <SplitTextLink
              href="/contact"
              className="uppercase rounded-lg px-4 py-2 text-[0.68rem] font-medium transition-colors duration-200 whitespace-nowrap bg-white text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white">
              Inquire →
            </SplitTextLink>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((o) => !o)}
            className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-200">
            <span
              className={`block h-[1.5px] w-4 origin-center transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "white" : "#0d0d0d",
              }}
            />
            <span
              className={`block h-[1.5px] w-4 transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "white" : "#0d0d0d",
              }}
            />
            <span
              className={`block h-[1.5px] w-4 origin-center transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "white" : "#0d0d0d",
              }}
            />
          </button>
        </nav>
      )}

      {/* ── HOME: floating pill ── */}
      {isHome && (
        <nav className="fixed bottom-18 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div
            className={`pointer-events-auto flex items-center gap-0.5 rounded-lg border px-1.5 py-1.5 backdrop-blur-2xl transition-[opacity,transform] duration-500 ease-out ${
              !pastHero || nearFooter
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(13,13,13,0.60)",
            }}>
            {/* Logo */}
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white hover:bg-black/5 transition-colors duration-200 whitespace-nowrap">
              Uyen Dao Studio
            </Link>

            {/* Divider */}
            <span className="hidden md:block h-4 w-px bg-white/10 mx-0.5" />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <SplitTextLink
                  key={link.href}
                  href={link.href}
                  className="rounded-lg uppercase px-4 py-2 text-[0.68rem] text-white/55 hover:text-white hover:bg-white/5 transition-colors duration-200">
                  {link.label}
                </SplitTextLink>
              ))}
            </div>

            {/* Divider */}
            <span className="hidden md:block h-4 w-px bg-white/10 mx-0.5" />

            {/* Desktop contact */}
            <SplitTextLink
              href="/contact"
              className="hidden md:block uppercase rounded-lg px-4 py-2 text-[0.68rem] font-medium transition-colors duration-200 whitespace-nowrap bg-white text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white">
              Inquire →
            </SplitTextLink>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full hover:bg-white/10 transition-colors duration-200">
              <span
                className={`block h-[1.5px] w-4 bg-white origin-center transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-white origin-center transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
      )}

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col md:hidden transition-[opacity,visibility] duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        }`}>
        {/* Nav links */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          {mobileMenuLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-black uppercase leading-[0.88] text-white hover:text-white/50 transition-colors"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              {link.label}
            </Link>
          ))}

          {/* Decorative asterisk + image row */}
          <div
            className="flex items-center justify-center"
            style={{ gap: "0.4em" }}>
            <span
              className="font-black text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              *
            </span>
            <span
              className="font-black text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              (
            </span>
            <div
              className="rounded-sm overflow-hidden flex-shrink-0"
              style={{
                width: "clamp(2.4rem, 11vw, 4.8rem)",
                height: "clamp(2.4rem, 11vw, 4.8rem)",
              }}>
              <img
                src="https://assets.codepen.io/16327/portrait-image-1.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="font-black text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              )
            </span>
          </div>

          {mobileMenuLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-black uppercase leading-[0.88] text-white hover:text-white/50 transition-colors"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;

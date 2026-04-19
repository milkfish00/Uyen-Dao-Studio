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
              ? "#771605"
              : isOpen
                ? "rgba(119,22,5,0.95)"
                : "rgba(255,255,255,0.9)",
          }}>
          <Link
            href="/"
            className="text-[0.72rem] font-medium uppercase tracking-[0.14em] whitespace-nowrap"
            style={{ color: isContact || isOpen ? "#ECEDDD" : "#771605" }}>
            Uyen Dao Studio
          </Link>

          <div
            className="hidden md:flex items-center gap-0.5 rounded-lg border px-1.5 py-1.5 backdrop-blur-2xl"
            style={{
              borderColor: isContact
                ? "rgba(255,255,255,0.15)"
                : "rgba(119,22,5,0.10)",
              backgroundColor: isContact
                ? "rgba(0,0,0,0.25)"
                : "rgba(119,22,5,0.82)",
            }}>
            {navLinks.map((link) => (
              <SplitTextLink
                key={link.href}
                href={link.href}
                className="rounded-lg uppercase px-4 py-2 text-[0.68rem] text-[#ECEDDD]/70 hover:text-[#ECEDDD] hover:bg-[#ECEDDD]/5 transition-colors duration-200">
                {link.label}
              </SplitTextLink>
            ))}
            <span className="h-4 w-px bg-[#ECEDDD]/10 mx-0.5" />
            <SplitTextLink
              href="/contact"
              className="uppercase rounded-lg px-4 py-2 text-[0.68rem] font-medium transition-colors duration-200 whitespace-nowrap bg-[#ECEDDD] text-[#771605] hover:bg-[#771605] hover:text-[#ECEDDD]">
              Inquire →
            </SplitTextLink>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((o) => !o)}
            className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-1.25 rounded-full transition-colors duration-200">
            <span
              className={`block h-[1.5px] w-4 origin-center transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "#ECEDDD" : "#771605",
              }}
            />
            <span
              className={`block h-[1.5px] w-4 transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "#ECEDDD" : "#771605",
              }}
            />
            <span
              className={`block h-[1.5px] w-4 origin-center transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              style={{
                backgroundColor: isContact || isOpen ? "#ECEDDD" : "#771605",
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
              backgroundColor: "rgba(119,22,5,.9)",
            }}>
            {/* Logo */}
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#ECEDDD] hover:bg-[#771605]/5 transition-colors duration-200 whitespace-nowrap">
              Uyen Dao Studio
            </Link>

            {/* Divider */}
            <span className="hidden md:block h-4 w-px bg-[#ECEDDD]/10 mx-0.5" />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <SplitTextLink
                  key={link.href}
                  href={link.href}
                  className="rounded-lg uppercase px-4 py-2 text-[0.68rem] text-[#ECEDDD] hover:text-[#ECEDDD] hover:bg-[#ECEDDD]/5 transition-colors duration-200">
                  {link.label}
                </SplitTextLink>
              ))}
            </div>

            {/* Divider */}
            <span className="hidden md:block h-4 w-px bg-[#ECEDDD]/10 mx-0.5" />

            {/* Desktop contact */}
            <SplitTextLink
              href="/contact"
              className="hidden md:block uppercase rounded-lg px-4 py-2 text-[0.68rem] font-medium transition-colors duration-200 whitespace-nowrap bg-[#ECEDDD] text-[#771605] hover:bg-[#771605] hover:text-[#ECEDDD]">
              Inquire →
            </SplitTextLink>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-1.25 rounded-full hover:bg-[#ECEDDD]/10 transition-colors duration-200">
              <span
                className={`block h-[1.5px] w-4 bg-[#ECEDDD] origin-center transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-[#ECEDDD] transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-[#ECEDDD] origin-center transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
      )}

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#771605] flex flex-col md:hidden transition-[opacity,visibility] duration-300 ${
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
              className="font-black uppercase leading-[0.88] text-[#ECEDDD] hover:text-[#ECEDDD]/50 transition-colors"
              style={{ fontSize: "clamp(2.8rem, 15vw, 6rem)" }}>
              {link.label}
            </Link>
          ))}

          {mobileMenuLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-black uppercase leading-[0.88] text-[#ECEDDD] hover:text-[#ECEDDD]/50 transition-colors"
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

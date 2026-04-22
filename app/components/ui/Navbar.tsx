"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SplitTextLink from "./SplitTextLink";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
];

const mobileMenuLinks = [
  { label: "Index", href: "/" },
  { label: "Services", href: "/#process" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Inquire", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const isProjectPage = /^\/work\/.+/.test(pathname);

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

  const hamburger = (bgClass: string) => (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={() => setIsOpen((o) => !o)}
      className="md:hidden flex h-8 w-8 flex-col items-center justify-center gap-2">
      {[
        isOpen ? "translate-y-[5px] rotate-45" : "",
        isOpen ? "-translate-y-[5px] -rotate-45" : "",
      ].map((cls, i) => (
        <span
          key={i}
          className={`block h-px w-6 origin-center transition-all duration-300 ease-in-out ${bgClass} ${cls}`}
        />
      ))}
    </button>
  );

  if (isProjectPage) return null;

  return (
    <>
      {/* ── NON-HOME: top bar ── */}
      {!isHome && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 backdrop-blur-sm ${
            isContact ? "bg-[#c2090a]" : isOpen ? "bg-white" : "bg-white"
          }`}>
          <Link
            href="/"
            className={`text-[0.7rem] font-medium uppercase tracking-[0.14em] whitespace-nowrap ${
              isContact || isOpen ? "text-[#000000]" : "text-[#c2090a]"
            }`}>
            Uyen Dao Studio
          </Link>

          {/* Desktop pill */}
          <div className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5">
            {navLinks.map((link) => (
              <SplitTextLink
                key={link.href}
                href={link.href}
                className="rounded-lg uppercase px-4 py-2 text-[0.65rem] text-[#c2090a] transition-colors duration-200 hover:bg-white/10">
                {link.label}
              </SplitTextLink>
            ))}
            <span className="h-4 w-px mx-0.5 bg-[#EDEDDD]/10" />
            <SplitTextLink
              href="/#contact"
              className="rounded-lg uppercase px-4 py-2 text-[0.65rem] text-[#c2090a] font-medium whitespace-nowrap transition-colors duration-200 hover:opacity-90">
              Contact
            </SplitTextLink>
          </div>

          {hamburger(isContact || isOpen ? "bg-[#EDEDDD]" : "bg-[#c2090a]")}
        </nav>
      )}

      {/* ── HOME: floating pill ── */}
      {isHome && (
        <nav className="fixed bottom-18 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div
            className={`pointer-events-auto flex items-center gap-0.5 rounded-lg border border-[rgba(119,22,5,0.15)] px-1.5 py-1.5 bg-[#c2090a] backdrop-blur-2xl transition-[opacity,transform] duration-500 ease-out ${
              !pastHero || nearFooter
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}>
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#ffffff] transition-colors duration-200 hover:bg-white/10 whitespace-nowrap">
              Uyen Dao
            </Link>

            <span className="hidden md:block h-4 w-px mx-0.5 bg-[#EDEDDD]/10" />

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <SplitTextLink
                  key={link.href}
                  href={link.href}
                  className="rounded-lg uppercase px-4 py-2 text-[0.65rem] text-[#ffffff] transition-colors duration-200 hover:bg-white/10">
                  {link.label}
                </SplitTextLink>
              ))}
            </div>

            <span className="hidden md:block h-4 w-px mx-0.5 bg-[#EDEDDD]/10" />

            <SplitTextLink
              href="/#contact"
              className="hidden md:block rounded-lg uppercase px-4 py-2 text-[0.65rem] font-medium whitespace-nowrap bg-white text-[#c2090a] transition-colors duration-200 hover:opacity-90">
              Inquire
            </SplitTextLink>

            {hamburger("bg-[#EDEDDD]")}
          </div>
        </nav>
      )}

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col md:hidden bg-white transition-[opacity,visibility] duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        }`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#c2090a]">
            Uyen Dao
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#c2090a]">
            Close
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex flex-col justify-center px-6 -mt-8">
          {mobileMenuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-[#c2090a] uppercase leading-[0.9] text-[clamp(2.8rem,15vw,5.5rem)] text-[#c2090a] transition-opacity duration-200 hover:opacity-30">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-6 pb-8">
          <div className="grid grid-cols-2 gap-y-1 pb-5 border-b border-[#c2090a]/10 text-[0.65rem] text-[#c2090a]/60 leading-[1.9]">
            <span>@uyendaostudio</span>
            <span>hello@uyendaostudio.com</span>
            <span>Ho Chi Minh City</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

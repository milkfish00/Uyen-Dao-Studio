"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-0 overflow-hidden bg-ink h-(--footer-height)">
      <div className="flex flex-col justify-between h-full px-8 py-10 sm:px-10 lg:px-14">
        {/* Top row: logo + 3 columns */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-0">
          {/* Logo */}
          <div className="sm:w-1/2">
            <Image
              src="/images/stretch.svg"
              alt="Duong Studio"
              width={56}
              height={56}
              className="w-12 h-12 invert"
            />
          </div>

          {/* Columns */}
          <div className="grid grid-cols-3 gap-8 sm:w-1/2">
            {/* Navigation */}
            <div>
              <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-ecru/30 mb-5">
                Navigation
              </h4>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "About", href: "/about" },
                  { label: "Portfolio", href: "/work" },
                  { label: "Services", href: "/#services" },
                  { label: "Let&apos;s Talk", href: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ecru hover:text-ecru/60 transition-colors duration-200">
                      {link.label === "Let&apos;s Talk"
                        ? "Let\u2019s Talk"
                        : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-ecru/30 mb-5">
                Connect
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-ecru hover:text-ecru/60 transition-colors duration-200">
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-ecru hover:text-ecru/60 transition-colors duration-200">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-ecru/30 mb-5">
                Contact
              </h4>
              <a
                href="mailto:hello@duongstudio.com"
                className="text-sm text-ecru hover:text-ecru/60 transition-colors duration-200 break-all">
                hello@duongstudio.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom credits row */}
        <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.2em] text-ecru/25">
          <span>&copy; Duong Studio 2026</span>
          <span className="hidden sm:block">
            Website by DUONG creative studio.
          </span>
          <button
            onClick={scrollToTop}
            className="hover:text-ecru transition-colors duration-200 cursor-pointer bg-transparent border-none uppercase tracking-[0.2em] text-[0.6rem] text-ecru/25 p-0">
            Back to top
          </button>
        </div>

        {/* Large watermark title — bleeds off bottom */}
        <div className="-mx-8 sm:-mx-10 lg:-mx-14 -mb-[0.15em]">
          <Image
            src="/images/title.svg"
            alt=""
            aria-hidden="true"
            width={1800}
            height={200}
            className="w-full opacity-15 invert"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

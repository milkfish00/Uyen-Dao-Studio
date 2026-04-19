"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  return (
    <footer
      className="fixed bottom-0 left-0 w-full z-0 overflow-hidden"
      style={{
        backgroundColor: isContact ? "#771606" : "#0d0d0d",
        height: "var(--footer-height)",
      }}>
      <div className="flex flex-col justify-between h-full px-8 py-8 sm:px-10 lg:px-30">
        {/* Description */}
        <p className="text-center text-sm leading-relaxed text-[#e8dccf]/70 max-w-md mx-auto"></p>

        {/* Large title */}
        <div className="-mx-8 sm:-mx-10 lg:-mx-14">
          <Image
            src="/images/title.svg"
            alt="Duong Studio"
            width={1800}
            height={200}
            className="w-full"
            style={{
              filter: isContact ? "invert(1) brightness(0.6)" : "invert(1)",
            }}
          />
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.2em] text-[#e8dccf]/40">
          <div className="flex gap-8">
            <Link
              href="/terms"
              className="hover:text-[#e8dccf] transition-colors duration-200">
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#e8dccf] transition-colors duration-200">
              Contact Us
            </Link>
          </div>
          <span>© 2026</span>
          <div className="flex gap-8">
            <a
              href="#"
              className="hover:text-[#e8dccf] transition-colors duration-200">
              TikTok
            </a>
            <a
              href="#"
              className="hover:text-[#e8dccf] transition-colors duration-200">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

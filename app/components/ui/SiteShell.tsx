"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RevealOnScroll from "./RevealOnScroll";
import Preloader from "./Preloader";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  if (isStudioRoute) {
    return children;
  }

  return (
    <>
      <Preloader />
      <RevealOnScroll />

      <div className="relative z-10 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

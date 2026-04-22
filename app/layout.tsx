import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import RevealOnScroll from "./components/ui/RevealOnScroll";
import Preloader from "./components/ui/Preloader";

const bdGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/BD/BDOGrotesk-Light-BF648a656f46f93.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BD/BDOGrotesk-Regular-BF648a656f74a27.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BD/BDOGrotesk-Medium-BF648a656f49882.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BD/BDOGrotesk-Bold-BF648a656f312c4.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bd",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uyen  Dao Design",
  description: "Design studio portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bdGrotesk.variable} ${geistMono.variable}`}>
      <body className="antialiased text-ink">
        <Preloader />
        <RevealOnScroll />

        <div className="relative z-10 min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

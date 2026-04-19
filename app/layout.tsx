import type { Metadata } from "next";
import { Castoro_Titling, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import RevealOnScroll from "./components/ui/RevealOnScroll";

const castoro = Castoro_Titling({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-castoro",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uyen  Dao Studio",
  description: "Design studio portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${castoro.variable} ${jetbrains.variable}`}>
      <body className="antialiased" style={{ color: "#0d0d0d" }}>
        <RevealOnScroll />

        <div className="relative z-10  min-h-screen ">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}

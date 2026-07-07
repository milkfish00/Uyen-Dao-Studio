import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

import "./globals.css";
import SiteShell from "./components/ui/SiteShell";
import CustomCursor from "./components/ui/CustomCursor";
import { SanityLive } from "@/sanity/lib/live";

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
    <html
      lang="en"
      className={`${bdGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning>
      <body className="antialiased text-ink" suppressHydrationWarning>
        <CustomCursor />
        <SiteShell>{children}</SiteShell>
        <SanityLive />
      </body>
    </html>
  );
}

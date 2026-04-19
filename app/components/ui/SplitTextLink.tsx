"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface SplitTextLinkProps {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export default function SplitTextLink({
  href,
  children,
  className,
  onClick,
  style,
  "aria-label": ariaLabel,
}: SplitTextLinkProps) {
  const topRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const splitsRef = useRef<{ top: SplitText; bot: SplitText } | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!topRef.current || !botRef.current) return;
    const top = new SplitText(topRef.current, { type: "chars" });
    const bot = new SplitText(botRef.current, { type: "chars" });
    splitsRef.current = { top, bot };
    gsap.set(bot.chars, { yPercent: 110 });
    return () => {
      top.revert();
      bot.revert();
    };
  }, [children]);

  const handleEnter = () => {
    const s = splitsRef.current;
    if (!s) return;
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap
      .timeline()
      .to(s.top.chars, {
        yPercent: -110,
        duration: 0.38,
        stagger: 0.022,
        ease: "power2.inOut",
      })
      .to(
        s.bot.chars,
        {
          yPercent: 0,
          duration: 0.38,
          stagger: 0.022,
          ease: "power2.inOut",
        },
        "<",
      );
  };

  const handleLeave = () => {
    const s = splitsRef.current;
    if (!s) return;
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap
      .timeline()
      .to(s.top.chars, {
        yPercent: 0,
        duration: 0.38,
        stagger: 0.022,
        ease: "power2.inOut",
      })
      .to(
        s.bot.chars,
        {
          yPercent: 110,
          duration: 0.38,
          stagger: 0.022,
          ease: "power2.inOut",
        },
        "<",
      );
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      style={{
        ...style,
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}>
      {/* Tight clip wrapper — overflow hidden here, NOT on the padded Link */}
      <span
        style={{ display: "block", overflow: "hidden", position: "relative" }}>
        {/* Top layer */}
        <span ref={topRef} style={{ display: "block", pointerEvents: "none" }}>
          {children}
        </span>
        {/* Bottom layer — starts below, slides up on hover */}
        <span
          ref={botRef}
          aria-hidden="true"
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            pointerEvents: "none",
          }}>
          {children}
        </span>
      </span>
    </Link>
  );
}

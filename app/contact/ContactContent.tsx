"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type SocialLink = {
  _key?: string;
  platform?: string;
  url?: string;
};

type ServiceItem = {
  _id: string;
  title: string;
  slug?: string;
};

export default function ContactContent({
  email,
  phoneNumber,
  socialLinks,
  services,
}: {
  email?: string;
  phoneNumber?: string;
  socialLinks?: SocialLink[];
  services?: ServiceItem[];
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const didSubmit = useRef(false);
  const formAction = "https://www.form-to-email.com/api/s/ZkakbSqdWk0E";

  useEffect(() => {
    setNextUrl(window.location.origin + "/api/contact/done");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.backgroundColor;
    html.style.backgroundColor = "#8c0014";
    document.body.style.backgroundColor = "#8c0014";
    return () => {
      html.style.backgroundColor = prev;
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const element = headingRef.current;
    if (!element) {
      return;
    }

    const words = element.querySelectorAll<HTMLElement>(".heading-word");
    gsap.set(words, { y: "110%" });
    const context = gsap.context(() => {
      gsap.to(words, {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.2,
      });
    }, element);
    return () => context.revert();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Let the form submit natively into the hidden iframe — no preventDefault.
    // We set state before the native submit fires.
    void event;
    didSubmit.current = true;
    setIsSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleIframeLoad = () => {
    if (!didSubmit.current || !iframeRef.current) return;
    try {
      const path = iframeRef.current.contentWindow?.location.pathname;
      if (path === "/api/contact/done") {
        setSuccessMsg("Thanks! Your message has been sent.");
        formRef.current?.reset();
        didSubmit.current = false;
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      // Cross-origin iframe means form-to-email didn't redirect to _next.
      // Treat as success since the browser POST went through.
      setSuccessMsg("Thanks! Your message has been sent.");
      didSubmit.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-red px-6 pt-32 pb-20 text-white lg:px-16 lg:pt-40">
      <div className="max-w-9xl grid grid-cols-1 gap-20 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="flex flex-col gap-20">
          <h1
            ref={headingRef}
            className="text-[clamp(3rem,8vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <div className="flex flex-wrap gap-x-[0.3em] uppercase">
              {["Let’s", "start", "a"].map((word) => (
                <div key={word} className="overflow-hidden pb-[0.15em]">
                  <span className="heading-word block">{word}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-[0.3em] uppercase">
              {["project", "together"].map((word) => (
                <div key={word} className="overflow-hidden pb-[0.15em]">
                  <span className="heading-word block">{word}</span>
                </div>
              ))}
            </div>
          </h1>

          <iframe
            ref={iframeRef}
            name="contact-frame"
            onLoad={handleIframeLoad}
            style={{ display: "none" }}
            title="contact-frame"
          />
          <form
            ref={formRef}
            action={formAction}
            method="POST"
            target="contact-frame"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col gap-14">
            <input type="hidden" name="_next" value={nextUrl} />
            <div className="flex gap-6 border-b border-white/20 pb-6">
              <div className="flex-1">
                <p className="mb-2 text-white/80">What’s your name?</p>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe *"
                  required
                  className="w-full bg-transparent text-lg text-white placeholder:text-white/30 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-6 border-b border-white/20 pb-6">
              <div className="flex-1">
                <p className="mb-2 text-white/80">What’s your email?</p>
                <input
                  type="email"
                  name="email"
                  placeholder="john@doe.com *"
                  required
                  className="w-full bg-transparent text-lg text-white placeholder:text-white/30 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-6 border-b border-white/20 pb-6">
              <div className="flex-1">
                <p className="mb-2 text-white/80">Tell me about your project</p>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Type your message..."
                  required
                  className="w-full resize-none bg-transparent text-lg text-white placeholder:text-white/30 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-lg text-white underline underline-offset-4 transition hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Sending..." : "Send message →"}
              </button>

              {successMsg && (
                <div className="text-sm font-medium text-emerald-300 animate-fade-in">
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="text-sm font-medium text-amber-200 animate-fade-in">
                  <p>{errorMsg}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-12 lg:pt-24">
          <img src="/ui/star.svg" className="h-16 w-16 invert rounded-full" />

          <div className="space-y-3 text-sm text-white/70">
            <p className="text-xs uppercase text-white/30">Contact details</p>
            {email ? <p>{email}</p> : null}
            {phoneNumber ? <p>{phoneNumber}</p> : null}
          </div>

          <div className="space-y-2 text-sm text-white/70">
            <p className="text-xs uppercase text-white/30">Services</p>
            {(services ?? []).map((service) => (
              <Link
                key={service._id}
                href="/services"
                className="block transition-colors hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>

          <div className="space-y-2 text-sm text-white/70">
            <p className="text-xs uppercase text-white/30">Socials</p>
            {(socialLinks ?? []).map((social) =>
              social.platform && social.url ? (
                <a
                  key={social._key || social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition-colors hover:text-white">
                  {social.platform}
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

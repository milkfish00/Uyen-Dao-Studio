"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-ink text-ecru px-6 sm:px-10 lg:px-16 pb-40">
      {/* Top spacer */}
      <div className="pt-40 sm:pt-52" />

      {/* Split heading */}
      <div className="max-w-9xl flex items-baseline gap-[38%] mb-16">
        <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold tracking-[-0.03em] leading-none">
          Let&rsquo;s Talk
        </h1>
      </div>

      {/* Two-column: info + form */}
      <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-12 items-start">
        {/* Left — info */}
        <div className="flex flex-col gap-10 pt-2">
          <div>
            <p className="text-sm font-semibold mb-3">Hola </p>
            <p className="text-sm leading-[1.75] text-ecru/50 max-w-[30ch]">
              We are always open to new opportunities and collaborative
              projects. For all enquiries, please get in touch.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <a
              href="mailto:hello@uyendaostudio.com"
              className="text-sm text-ecru no-underline hover:text-ecru/70 transition-colors duration-200">
              hello@uyendaostudio.com
            </a>
            <span className="text-sm text-ecru">0407 720 300</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-ecru/40">Follow</span>
            <a
              href="#"
              className="text-sm text-ecru no-underline hover:text-ecru/70 transition-colors duration-200">
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-ecru no-underline hover:text-ecru/70 transition-colors duration-200">
              Linkedin
            </a>
          </div>
        </div>

        {/* Right — form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-cream text-ink p-8 sm:p-10 flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-ink/5 border border-ink/10 rounded-md px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors duration-200"
            />
          </div>

          {/* Email + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-ink/5 border border-ink/10 rounded-md px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-semibold">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-ink/5 border border-ink/10 rounded-md px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-ink/5 border border-ink/10 rounded-md px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors duration-200 resize-y"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="self-start mt-2 text-sm text-ecru bg-ink border-none rounded-md px-6 py-2.5 cursor-pointer font-medium hover:opacity-85 transition-opacity duration-200">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

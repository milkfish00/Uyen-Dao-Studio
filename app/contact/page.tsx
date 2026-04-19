"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#771606" }}>
      <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Header */}
        <div
          className="pt-36 pb-16 border-b"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <h1
            className="font-normal leading-[0.9] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-castoro), serif",
              fontSize: "clamp(3.5rem,9vw,8rem)",
              color: "rgba(255,255,255,0.92)",
            }}>
            <span className="block font-semibold">get in</span>
            <span
              className="block italic"
              style={{ paddingLeft: "clamp(1.5rem,4vw,5rem)" }}>
              touch.
            </span>
          </h1>
        </div>

        {/* Form */}
        <form className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[0.58rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Name
              </label>
              <input
                type="text"
                className="w-full h-12 px-4 outline-none text-sm text-white rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "none" }}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[0.58rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Phone
              </label>
              <input
                type="tel"
                className="w-full h-12 px-4 outline-none text-sm text-white rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "none" }}
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[0.58rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Company
              </label>
              <input
                type="text"
                className="w-full h-12 px-4 outline-none text-sm text-white rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "none" }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[0.58rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Email
              </label>
              <input
                type="email"
                className="w-full h-12 px-4 outline-none text-sm text-white rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "none" }}
              />
            </div>

            {/* Message — full width */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <label
                className="text-[0.58rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 outline-none text-sm text-white resize-none rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "none" }}
              />
            </div>
          </div>

          {/* Footer row */}
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12 pt-10 border-t"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <p
              className="text-[0.58rem] leading-[1.8] max-w-sm"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              By submitting this form, I agree that the information entered may
              be used in the context of your request and the commercial
              relationship that may result. To withdraw consent, email{" "}
              <a
                href="mailto:contact@uyendao.studio"
                className="underline underline-offset-2"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                contact@uyendao.studio
              </a>
            </p>

            <button
              type="submit"
              className="flex items-center gap-3 shrink-0 group transition-opacity hover:opacity-60">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M0 0L10 6L0 12V0Z" fill="rgba(255,255,255,0.75)" />
              </svg>
              <span
                className="text-[0.62rem] uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.75)" }}>
                Send
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

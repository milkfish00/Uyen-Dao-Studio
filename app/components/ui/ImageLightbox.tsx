"use client";

import { useCallback, useEffect } from "react";

type ImageLightboxProps = {
  images: string[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  alt: string;
  onChange: (index: number | null) => void;
};

// Larger rendition for close-up viewing. Keeps any crop rect already on the URL.
const zoomed = (url: string) => {
  if (!url.includes("cdn.sanity.io")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=2400&q=90`;
};

export default function ImageLightbox({
  images,
  index,
  alt,
  onChange,
}: ImageLightboxProps) {
  const isOpen = index !== null && images[index] !== undefined;
  const count = images.length;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null || count < 2) return;
      onChange((index + direction + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onChange, step]);

  if (!isOpen || index === null) return null;

  const buttonClass =
    "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-lg text-red transition-colors hover:bg-cream";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-10"
      onClick={() => onChange(null)}>
      <button
        type="button"
        aria-label="Close"
        className={`${buttonClass} right-4 top-4 sm:right-6 sm:top-6`}
        onClick={() => onChange(null)}>
        ✕
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className={`${buttonClass} left-3 top-1/2 -translate-y-1/2 sm:left-6`}
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}>
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            className={`${buttonClass} right-3 top-1/2 -translate-y-1/2 sm:right-6`}
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}>
            →
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.2em] text-cream/70">
            {index + 1} / {count}
          </p>
        </>
      ) : null}

      <img
        src={zoomed(images[index])}
        alt={alt}
        draggable={false}
        className="max-h-full max-w-full rounded-sm object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

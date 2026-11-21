"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Photo = { src: string; alt: string };

/**
 * Full-screen photo viewer for the vehicle gallery ("View all N photos" on screen 19,
 * "Full Folio" on screen 30). Not drawn in Stitch; styled with the dark-room tokens from DESIGN.md.
 */
export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [touchX, setTouchX] = useState<number | null>(null);
  const n = photos.length;
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[120] bg-[#171B19] text-[#F5F3EE] flex flex-col"
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        setTouchX(null);
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d3330]">
        <span className="font-mono text-xs uppercase tracking-widest text-[#8A9089]">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <span className="hidden sm:block font-mono text-xs text-[#8A9089] truncate max-w-[50vw]">{photo.alt}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="w-11 h-11 flex items-center justify-center hover:text-white"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="relative flex-1 min-h-0">
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" quality={90} className="object-contain" />
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#252A27]/80 hover:bg-[#252A27] flex items-center justify-center rounded-[2px]"
            >
              <Icon name="arrow_back" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#252A27]/80 hover:bg-[#252A27] flex items-center justify-center rounded-[2px]"
            >
              <Icon name="arrow_forward" />
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-6 py-4 border-t border-[#2d3330]">
          {photos.map((p, i) => (
            <button
              key={p.src + i}
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`relative shrink-0 w-24 h-16 overflow-hidden ${i === index ? "outline outline-1 outline-[#F5F3EE]" : "opacity-60 hover:opacity-100"}`}
            >
              <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

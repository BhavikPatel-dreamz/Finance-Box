"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export interface BlogVideoCardProps {
  title?: string;
  videoUrl?: string;
  imageSrc?: string;
  className?: string;
}

/** Default demo/explainer video if none is provided */
const DEFAULT_VIDEO_URL = "https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?autoplay=1&rel=0";

/**
 * Resolves a video URL into an embeddable iframe URL or direct video source
 */
function resolveVideoSource(rawUrl?: string): { type: "iframe" | "video"; src: string } {
  if (!rawUrl || !rawUrl.trim()) {
    return { type: "iframe", src: DEFAULT_VIDEO_URL };
  }

  const trimmed = rawUrl.trim();

  // Direct video file (mp4, webm, ogg, mov)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return { type: "video", src: trimmed };
  }

  // YouTube match: watch?v=ID, youtu.be/ID, embed/ID
  const ytMatch = trimmed.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo match: vimeo.com/ID
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i
  );
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
    const id = vimeoMatch[3] || vimeoMatch[1];
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${id}?autoplay=1`,
    };
  }

  // Fallback: if already an embed link, ensure autoplay=1
  const sep = trimmed.includes("?") ? "&" : "?";
  const src = trimmed.includes("autoplay=") ? trimmed : `${trimmed}${sep}autoplay=1`;
  return { type: "iframe", src };
}

export function BlogVideoCard({
  title = "Businessman collecting coins with profit chart analysis",
  videoUrl,
  imageSrc = "/media/video-thumb.png",
  className = "",
}: BlogVideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Escape key and scroll lock handling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  const video = resolveVideoSource(videoUrl);

  const modalContent = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeModal}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close video"
          className="absolute -top-11 sm:-top-12 right-0 z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Frame */}
        <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15">
          {video.type === "iframe" ? (
            <iframe
              src={video.src}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={video.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Video Caption */}
        {title && (
          <p className="mt-3.5 text-center text-[14px] sm:text-[15px] text-white/80 font-medium max-w-2xl">
            {title}
          </p>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* 1. Standalone Video Card with separate text, play button and requested gradient overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Play video: ${title}`}
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
        className={`relative aspect-[719/499] w-full rounded-[13px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/60 ${className}`}
      >
        {/* Video thumbnail image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 380px"
        />

        {/* Overlay on the video thumb and below the text and play button */}
        <div
          className="absolute inset-0 pointer-events-none bg-blend-multiply mix-blend-multiply bg-[linear-gradient(0deg,#EDE9E6,#EDE9E6),linear-gradient(0deg,rgba(18,24,38,0.6),rgba(18,24,38,0.6))]"
        />

        {/* Text and play button on the banner separated from image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
          {title && (
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-[1.35] max-w-[300px] mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
          )}
          <div className="w-10 h-10 sm:w-12.5 sm:h-12.5 rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7 text-brand-blue translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Interactive Video Modal portaled to document.body to prevent header overlap */}
      {mounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  );
}

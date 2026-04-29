"use client";

import { useEffect, useState, useTransition } from "react";

/**
 * Renders the hero background video on viewports ≥641px and a still
 * poster image only on smaller viewports. Saves the ~4MB MP4 download
 * over cellular and gives the hero a readable dark backdrop from the
 * first paint regardless of viewport.
 */
export function HeroVideo() {
  const [allowVideo, setAllowVideo] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-data: reduce)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = matchMedia("(min-width: 641px)").matches;
    if (desktop) startTransition(() => setAllowVideo(true));
  }, []);

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      <video
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
      >
        {allowVideo && <source src="/hero-bg.mp4" type="video/mp4" />}
      </video>
    </div>
  );
}

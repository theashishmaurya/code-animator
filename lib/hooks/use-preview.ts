"use client";

import { useState, useEffect, useCallback } from "react";

export function usePreview(
  slideCount: number,
  currentSlide: number,
  onSlideChange: (index: number) => void,
  interval: number = 1500
) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      onSlideChange((currentSlide + 1) % slideCount);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, slideCount, onSlideChange, interval]);

  return {
    isPlaying,
    play,
    stop
  };
}
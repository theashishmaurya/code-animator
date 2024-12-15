"use client";

import { useState } from "react";
import type { Slide } from "@/lib/types";

export function useSlides(initialSlide: Slide) {
  const [slides, setSlides] = useState<Slide[]>([initialSlide]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      code: slides[currentSlide].code,
    };
    setSlides([...slides, newSlide]);
    setPreviousSlide(currentSlide);
    setCurrentSlide(slides.length);
  };

  const updateSlide = (code: string) => {
    const newSlides = [...slides];
    newSlides[currentSlide].code = code;
    setSlides(newSlides);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, index) => index !== currentSlide);
    setPreviousSlide(currentSlide);
    setCurrentSlide(Math.max(0, currentSlide - 1));
    setSlides(newSlides);
  };

  const selectSlide = (index: number) => {
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
  };

  return {
    slides,
    currentSlide,
    previousSlide,
    addSlide,
    updateSlide,
    deleteSlide,
    selectSlide,
  };
}
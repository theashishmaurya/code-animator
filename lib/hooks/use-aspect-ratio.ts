"use client";

import { useState } from "react";

export type AspectRatioType = "16:9" | "9:16";

export function useAspectRatio(initialRatio: AspectRatioType = "16:9") {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>(initialRatio);

  const getRatioValue = () => {
    return aspectRatio === "16:9" ? 16 / 9 : 9 / 16;
  };

  return {
    aspectRatio,
    setAspectRatio,
    getRatioValue,
  };
}
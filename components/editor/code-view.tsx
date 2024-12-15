"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { computeCodeDiff } from "@/lib/diff";
import { CodeLine } from "./code-line";
import type { Slide } from "@/lib/types";

interface CodeViewProps {
  slides: Slide[];
  currentSlide: number;
  previousSlide: number;
}

export function CodeView({ slides, currentSlide, previousSlide }: CodeViewProps) {
  const [diff, setDiff] = useState<Array<{
    content: string;
    type: "unchanged" | "changed";
    position: number;
    indentation: number;
  }>>([]);

  useEffect(() => {
    const oldCode = slides[previousSlide]?.code || "";
    const newCode = slides[currentSlide]?.code || "";
    setDiff(computeCodeDiff(oldCode, newCode));
  }, [currentSlide, previousSlide, slides]);

  return (
    <div className="w-full h-full bg-black/90 p-4 overflow-auto flex flex-col text-white">
      <div className="font-mono text-sm flex-1">
        <AnimatePresence initial={false}>
          {diff.map((line) => (
            <CodeLine key={`${line.position}-${line.content}`} {...line} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { PreviewControls } from "./preview-controls";
import { ExportButton } from "./export-button";
import type { Slide } from "@/lib/types";

interface SlideControlsProps {
  slides: Slide[];
  currentSlide: number;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
  onSelectSlide: (index: number) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onExport: () => Promise<string[]>;
  aspectRatio: "16:9" | "9:16";
}

export function SlideControls({
  slides,
  currentSlide,
  onAddSlide,
  onDeleteSlide,
  onSelectSlide,
  isPlaying,
  onPlay,
  onStop,
  onExport,
  aspectRatio,
}: SlideControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant={currentSlide === index ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectSlide(index)}
            disabled={isPlaying}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDeleteSlide}
          disabled={slides.length <= 1 || isPlaying}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Slide
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddSlide}
          disabled={isPlaying}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Slide
        </Button>
        <PreviewControls
          isPlaying={isPlaying}
          onPlay={onPlay}
          onStop={onStop}
        />
        <ExportButton
          onExport={onExport}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

interface PreviewControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function PreviewControls({
  isPlaying,
  onPlay,
  onStop
}: PreviewControlsProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={isPlaying ? onStop : onPlay}
    >
      {isPlaying ? (
        <>
          <Square className="h-4 w-4 mr-1" />
          Stop Preview
        </>
      ) : (
        <>
          <Play className="h-4 w-4 mr-1" />
          Preview
        </>
      )}
    </Button>
  );
}
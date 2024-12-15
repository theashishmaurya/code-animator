"use client";

import { useRef } from "react";
import { Code2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor, CodeView, SlideControls } from "@/components/editor";
import { useSlides, useAspectRatio, usePreview } from "@/lib/hooks";
import { captureFrame } from "@/lib/video";

const INITIAL_SLIDE = {
  id: 1,
  code: '// Welcome to Code Animator\nfunction greet() {\n  console.log("Hello World!");\n}',
};

const FRAME_DURATION = 1500; // 1.5 seconds per slide

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const {
    slides,
    currentSlide,
    previousSlide,
    addSlide,
    updateSlide,
    deleteSlide,
    selectSlide,
  } = useSlides(INITIAL_SLIDE);

  const { aspectRatio, setAspectRatio, getRatioValue } = useAspectRatio();
  
  const { isPlaying, play, stop } = usePreview(
    slides.length,
    currentSlide,
    selectSlide
  );

  const handleExport = async () => {
    if (!previewRef.current) return [];

    const frames: string[] = [];
    const frameCount = Math.ceil(FRAME_DURATION / (1000 / 60)); // 60fps

    for (let i = 0; i < slides.length; i++) {
      selectSlide(i);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      for (let f = 0; f < frameCount; f++) {
        const frame = await captureFrame(previewRef.current);
        frames.push(frame);
      }
    }

    return frames;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Code Animator</h1>
          </div>
          <Tabs 
            defaultValue={aspectRatio} 
            onValueChange={(value) => setAspectRatio(value as "16:9" | "9:16")}
          >
            <TabsList>
              <TabsTrigger value="16:9">16:9</TabsTrigger>
              <TabsTrigger value="9:16">9:16</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <SlideControls
            slides={slides}
            currentSlide={currentSlide}
            onAddSlide={addSlide}
            onDeleteSlide={deleteSlide}
            onSelectSlide={selectSlide}
            isPlaying={isPlaying}
            onPlay={play}
            onStop={stop}
            onExport={handleExport}
            aspectRatio={aspectRatio}
          />
          <div className={`grid gap-6 ${
            aspectRatio === "16:9" 
              ? "grid-cols-2" 
              : "grid-cols-1 md:grid-cols-[1fr_400px]"
          }`}>
            <div className="bg-card border rounded-lg overflow-hidden h-[600px]">
              <CodeEditor
                value={slides[currentSlide].code}
                onChange={updateSlide}
              />
            </div>
            <div className={`${
              aspectRatio === "9:16" 
                ? "h-[80vh] md:h-[600px]" 
                : "h-[600px]"
            }`}>
              <AspectRatio
                ratio={getRatioValue()}
                className="bg-card border rounded-lg overflow-hidden h-full"
              >
                <div ref={previewRef} className="h-full">
                  <CodeView
                    slides={slides}
                    currentSlide={currentSlide}
                    previousSlide={previousSlide}
                  />
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
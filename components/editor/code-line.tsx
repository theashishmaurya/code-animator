"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSyntaxHighlight } from "@/lib/hooks/use-syntax-highlight";

interface CodeLineProps {
  content: string;
  type: "unchanged" | "changed";
  position: number;
  indentation: number;
}

export function CodeLine({ content, type, position, indentation }: CodeLineProps) {
  const highlighted = useSyntaxHighlight(content);

  return (
    <motion.div
      key={`${position}-${content}`}
      initial={type === "changed" ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={type === "changed" ? { opacity: 0, y: -20 } : false}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={{
        paddingLeft: `${indentation * 0.5}rem`
      }}
      className={cn(
        "px-2 py-0.5 whitespace-pre",
        type === "changed" ? "bg-blue-500/10" : "bg-transparent"
      )}
      dangerouslySetInnerHTML={{ __html: highlighted || "\u00A0" }}
    />
  );
}
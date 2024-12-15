"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSyntaxHighlight } from "@/lib/hooks";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  className,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighted = useSyntaxHighlight(value);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 600)}px`;
    }
  }, [value]);

  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const spaces = '  '; // 2 spaces for indentation
      
      const newValue = value.substring(0, start) + spaces + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className={cn("relative group font-mono h-full", className)}>
      <pre 
        aria-hidden="true"
        className="absolute inset-0 p-4 overflow-auto pointer-events-none"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleTab}
        className="w-full h-full p-4 bg-transparent text-transparent caret-foreground font-mono text-sm rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        spellCheck={false}
      />
    </div>
  );
}
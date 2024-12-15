"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSyntaxHighlight } from "@/lib/hooks";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tabSize?: number; // Configurable indentation
}

export function CodeEditor({
  value,
  onChange,
  className,
  tabSize = 2, // Default to 2 spaces
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighted = useSyntaxHighlight(value);

  // Adjust textarea height dynamically
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 600)}px`;
    }
  }, [value]);

  // Handle Tab key for indentation
  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const spaces = " ".repeat(tabSize); // Dynamic tab size
      
      const newValue = value.substring(0, start) + spaces + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tabSize;
        }
      }, 0);
    }
  };

  // Sync scroll position between <textarea> and <pre>
  useEffect(() => {
    const syncScroll = () => {
      if (textareaRef.current) {
        const pre = textareaRef.current.previousElementSibling as HTMLElement;
        pre.scrollTop = textareaRef.current.scrollTop;
        pre.scrollLeft = textareaRef.current.scrollLeft;
      }
    };

    textareaRef.current?.addEventListener("scroll", syncScroll);

    return () => {
      textareaRef.current?.removeEventListener("scroll", syncScroll);
    };
  }, []);

  return (
    <div className={cn("relative group font-mono h-full", className)}>
      {/* Syntax Highlighting Layer */}
      {/* <pre
        aria-hidden="true"
        className="absolute inset-0 p-4 overflow-auto pointer-events-none bg-gray-900 text-white whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      /> */}
      {/* Editable Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleTab}
        className="absolute inset-0 w-full h-full p-4 bg-transparent font-mono text-black text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 caret-white"
        spellCheck={false}
        style={{ overflowY: "hidden" }}
      />
    </div>
  );
}

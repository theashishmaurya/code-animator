"use client";

import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

export function useSyntaxHighlight(code: string, language: string = "typescript") {
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    const html = Prism.highlight(code, Prism.languages[language], language);
    setHighlighted(html);
  }, [code, language]);

  return highlighted;
}
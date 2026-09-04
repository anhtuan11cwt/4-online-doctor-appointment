"use client";

import { useEffect, useState } from "react";

interface TransitionTextProps {
  className?: string;
  interval?: number;
  text: string[];
}

export default function TransitionText({
  text,
  className,
  interval = 3000,
}: TransitionTextProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % text.length);
        setIsAnimating(false);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [text.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-300 ${
        isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      } ${className ?? ""}`}
    >
      {text[index]}
    </span>
  );
}

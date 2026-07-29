"use client";

import { useEffect, useState } from "react";

// Rotation list — edit this array to change what "Currently:" cycles through.
// Nothing below this needs to change when you add, remove, or reorder items.
const ROTATION: readonly string[] = [
  "Systems Design Engineering, Waterloo",
  "Data Analyst @ LHP",
  "Shipped Bullet Check & JobLens",
  "Coffee nerd",
  "Builds in LEGO too",
];

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 35;
const PAUSE_MS = 1400;
const CURSOR_BLINK_MS = 500;

type Phase = "typing" | "pausing" | "deleting";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroTypewriter() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [typedText, setTypedText] = useState(ROTATION[0]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let wordIndex = 0;
    let charIndex = 0;
    let phase: Phase = "typing";
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROTATION[wordIndex];

      if (phase === "typing") {
        charIndex += 1;
        setTypedText(word.slice(0, charIndex));
        timeoutId = setTimeout(tick, charIndex >= word.length ? PAUSE_MS : TYPE_SPEED_MS);
        if (charIndex >= word.length) phase = "pausing";
        return;
      }

      if (phase === "pausing") {
        phase = "deleting";
        timeoutId = setTimeout(tick, DELETE_SPEED_MS);
        return;
      }

      charIndex -= 1;
      setTypedText(word.slice(0, charIndex));
      if (charIndex <= 0) {
        wordIndex = (wordIndex + 1) % ROTATION.length;
        phase = "typing";
      }
      timeoutId = setTimeout(tick, DELETE_SPEED_MS);
    };

    timeoutId = setTimeout(tick, TYPE_SPEED_MS);
    return () => clearTimeout(timeoutId);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const intervalId = setInterval(() => setShowCursor((visible) => !visible), CURSOR_BLINK_MS);
    return () => clearInterval(intervalId);
  }, [reducedMotion]);

  const displayText = reducedMotion ? ROTATION[0] : typedText;

  return (
    <>
      <span aria-hidden="true">{displayText}</span>
      {reducedMotion ? null : (
        <span aria-hidden="true" className={showCursor ? "opacity-100" : "opacity-0"}>
          |
        </span>
      )}
      <span className="sr-only">{ROTATION[0]}</span>
    </>
  );
}

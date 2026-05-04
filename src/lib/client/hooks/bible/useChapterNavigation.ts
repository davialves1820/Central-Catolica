"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseChapterNavigationOptions {
  initialIndex: number;
  total: number;
  onNavigate?: () => void;
}

interface UseChapterNavigationReturn {
  chapterIndex: number;
  direction: 1 | -1;
  hasNext: boolean;
  hasPrev: boolean;
  navigate: (delta: 1 | -1) => void;
  goTo: (index: number) => void;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function useChapterNavigation({
  initialIndex,
  total,
  onNavigate,
}: UseChapterNavigationOptions): UseChapterNavigationReturn {
  const [chapterIndex, setChapterIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const hasNext = chapterIndex < total - 1;
  const hasPrev = chapterIndex > 0;

  const navigate = useCallback(
    (delta: 1 | -1) => {
      const next = chapterIndex + delta;
      if (next < 0 || next >= total) return;
      setDirection(delta);
      setChapterIndex(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigate?.();
    },
    [chapterIndex, total, onNavigate]
  );

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setDirection(index > chapterIndex ? 1 : -1);
      setChapterIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigate?.();
    },
    [chapterIndex, total, onNavigate]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      navigate(dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return {
    chapterIndex,
    direction,
    hasNext,
    hasPrev,
    navigate,
    goTo,
    touchHandlers: { onTouchStart, onTouchEnd },
  };
}

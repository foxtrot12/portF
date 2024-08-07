"use client";
import { useState, useEffect } from "react";
import { fromEvent } from "rxjs";

interface WindowSizeT {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSizeT {
  const [windowSize, setWindowSize] = useState<WindowSizeT>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    const resizeSubs = fromEvent(window, "resize").subscribe(() => {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    });

    return () => {
      resizeSubs?.unsubscribe();
    };
  }, []);

  return windowSize;
}

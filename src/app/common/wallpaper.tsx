"use client";

import { useRef, useEffect, useState, useContext, memo } from "react";
import { Subscription, animationFrames, fromEvent } from "rxjs";
import { useWindowSize } from "./windowSize";


const MAX_RAD = 25,
  MIN_RAD = 3;

const Wallpaper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null),
    containerRef = useRef<HTMLDivElement>(null),
    [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 }),
    mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }),
    circleArr = useRef<Array<{ update: () => void }>>([]),
    { height : windowHeight, width : windowWidth } = useWindowSize(),
    WALLPAPER_COLORS = ["#05445E", "#189AB4", "#75E6DA", "#D4F1F4"]

  const newCircle: (
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    ctx: CanvasRenderingContext2D
  ) => () => void = (
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const color =
      WALLPAPER_COLORS[Math.floor(Math.random() * WALLPAPER_COLORS.length)];

    const draw = () => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
    };
    const update = () => {
      if (x + radius > canvasSize.width || x - radius < 0) {
        dx = -dx;
      }
      if (y + radius > canvasSize.height || y - radius < 0) {
        dy = -dy;
      }
      x += dx;
      y += dy;

      if (
        mouseRef.current.x - x < 50 &&
        mouseRef.current.x - x > -50 &&
        mouseRef.current.y - y < 50 &&
        mouseRef.current.y - y > -50
      ) {
        if (radius < MAX_RAD) {
          radius += 1;
        }
      } else if (radius > MIN_RAD) {
        radius -= 1;
      }

      draw();
    };

    return update;
  };

  const init = (ctx: CanvasRenderingContext2D) => {
    let circleArray: Array<{ update: () => void }> = [];
    let canvasTotal = canvasSize.width + canvasSize.height;
    for (let i = 0; i < canvasTotal / 3; i++) {
      const radius = Math.random() * 5 + 1,
        x = Math.random() * (canvasSize.width - radius * 2) + radius,
        y = Math.random() * (canvasSize.height - radius * 2) + radius,
        dx = (Math.random() - 0.5) * 2,
        dy = (Math.random() - 0.5) * 2;

      circleArray.push({
        update: newCircle(x, y, dx, dy, radius, ctx),
      });
    }

    circleArr.current = circleArray;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { height, width } = container.getBoundingClientRect();

    setCanvasSize({ height, width });
  }, [windowHeight, windowWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasSize.height === 0 || canvasSize.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init(ctx);

    const subsManager = new Subscription();

    const ptrMoveSubs = fromEvent<PointerEvent>(
      containerRef.current as any,
      "pointermove"
    ).subscribe((ev) => {
      mouseRef.current.x = ev.clientX;
      mouseRef.current.y = ev.clientY;
    });

    subsManager.add(ptrMoveSubs);

    const animationSubs = animationFrames().subscribe(() => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      circleArr.current.forEach((cr) => cr.update());
    });

    subsManager.add(animationSubs);

    return () => {
      subsManager.unsubscribe();
    };
  }, [canvasSize]);

  return (
    <div ref={containerRef} className="h-full w-full" style={{backgroundColor:''}}>
      <canvas
        ref={canvasRef}
        height={canvasSize.height}
        width={canvasSize.width}
      />
    </div>
  );
};

export default memo(Wallpaper);

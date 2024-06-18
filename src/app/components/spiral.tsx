import React, { memo, useEffect, useRef } from "react";
import { fromEvent, animationFrameScheduler, Subscription } from "rxjs";
import { switchMap, takeUntil, tap } from "rxjs/operators";
import { appColors } from "../../../tailwind.config";
import { useWindowSize } from "../common/windowSize";

interface SpiralProp {
  animationStarted?: Function;
}

const Spiral = (props: SpiralProp) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const subsManager = new Subscription();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let time = 0;
    let velocity = 0.1;
    let velocityTarget = 0.1;
    let lastX: number, lastY: number;

    const MAX_OFFSET = 400;
    const SPACING = 4;
    const POINTS = MAX_OFFSET / SPACING;
    const PEAK = MAX_OFFSET * 0.25;
    const POINTS_PER_LAP = 6;

    const resize = () => {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
    };

    const clear = () => {
      context.clearRect(0, 0, windowSize.width, windowSize.height);
    };

    const render = () => {
      let x: number, y: number;
      const cx = windowSize.width / 1.3;
      const cy = windowSize.height / 1.5;

      context.globalCompositeOperation = "lighter";
      context.strokeStyle = appColors.ORANGE_SUNSHINE[500];
      context.shadowColor = appColors.POLI_PURPLE[500];
      context.lineWidth = 1.5;
      context.shadowBlur = 10;
      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;
      context.beginPath();

      for (let i = POINTS; i > 0; i--) {
        const value = i * SPACING + (time % SPACING);

        const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI;
        const ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;

        x = ax * value;
        y = ay * value * 0.35;

        const o = 1 - Math.min(value, PEAK) / PEAK;

        y -= Math.pow(o, 2) * 200;
        y += (200 * value) / MAX_OFFSET;
        y += (x / cx) * (windowSize.width * 0.1);

        context.globalAlpha = 1 - value / MAX_OFFSET;

        context.lineTo(cx + x, cy + y);
        context.stroke();

        context.beginPath();
        context.moveTo(cx + x, cy + y);
      }

      context.lineTo(cx, cy - 200);
      context.lineTo(cx, 0);
      context.stroke();
    };

    const step = () => {
      time += velocity;
      velocity += (velocityTarget - velocity) * 0.6;

      clear();
      render();

      subsManager.add(animationFrameScheduler.schedule(step));
    };

    const onMouseMove = (event: MouseEvent) => {
      let vx = (event.clientX - lastX) / 100;
      let vy = (event.clientY - lastY) / 100;

      if (event.clientY < windowSize.height / 2) vx *= -1;
      if (event.clientX > windowSize.width / 2) vy *= -1;

      velocityTarget = vx + vy;

      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      let vx = (event.touches[0].clientX - lastX) / 100;
      let vy = (event.touches[0].clientY - lastY) / 100;

      if (event.touches[0].clientY < windowSize.height / 2) vx *= -1;
      if (event.touches[0].clientX > windowSize.width / 2) vy *= -1;

      velocityTarget = vx + vy;

      lastX = event.touches[0].clientX;
      lastY = event.touches[0].clientY;
    };

    const setup = () => {
      // resize();
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
      step();

      // subsManager.add(fromEvent(window, "resize").subscribe(resize));
      subsManager.add(
        fromEvent<MouseEvent>(document, "mousedown")
          .pipe(
            tap((event) => {
              lastX = event.clientX;
              lastY = event.clientY;
            }),
            switchMap(() =>
              fromEvent<MouseEvent>(document, "mousemove").pipe(
                tap(onMouseMove),
                takeUntil(fromEvent(document, "mouseup"))
              )
            )
          )
          .subscribe()
      );
      subsManager.add(
        fromEvent<TouchEvent>(document, "touchstart")
          .pipe(
            tap((event) => {
              // event.preventDefault();
              lastX = event.touches[0].clientX;
              lastY = event.touches[0].clientY;
            }),
            switchMap(() =>
              fromEvent<TouchEvent>(document, "touchmove").pipe(
                tap(onTouchMove),
                takeUntil(fromEvent(document, "touchend"))
              )
            )
          )
          .subscribe()
      );
    };

    setup();

    return () => {
      subsManager.unsubscribe();
    };
  }, [windowSize]);

  return <canvas ref={canvasRef} />;
};

export default memo(Spiral);

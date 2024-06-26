'use client'

import { memo, useEffect, useRef } from "react";
import { useWindowSize } from "./windowSize";
import { animationFrameScheduler, Subscription } from "rxjs";

function LinesBg(props: { lineColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const subsManager = new Subscription();

    if (canvas && container) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const setCanvas = () => {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };

      const generateLines = () => {
        const lineCount = Math.floor(canvas.height / 10);
        const lines = [];

        for (let i = 0; i < lineCount; i++) {
          const yPosition = i * 10 + 5;
          const speed = Math.random() * 2 + 2;
          const xPosition = Math.random() > 0.5 ? 0 : canvas.width;
          lines.push({
            x: xPosition,
            y: yPosition,
            speed,
            direction: xPosition === 0 ? 1 : -1,
          });
        }

        return lines;
      };

      const lines = generateLines();

      const animateLine = (line: any) => {
        ctx.clearRect(0, line.y - 1, canvas.width, 2);

        line.x += line.speed * line.direction;

        ctx.beginPath();
        // ctx.strokeStyle = props.lineColor;
        ctx.lineWidth = 2;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + canvas.width/3, line.y);
        ctx.stroke();

        if (line.x > canvas.width || line.x < 0) {
          line.direction *= -1;
        }
      };

      const animate = () => {
        for (let line of lines) {
          animateLine(line);
        }
        subsManager.add(animationFrameScheduler.schedule(animate));
      };

      setCanvas();
      animate();
    }

    return () => {
      subsManager.unsubscribe();
    };
  }, [windowSize]);

  useEffect(()=>{
    const ctx = canvasRef.current?.getContext('2d');

    if(ctx){
        ctx.strokeStyle = props.lineColor;
        console.log(props.lineColor)
    }
  },[props.lineColor,windowSize])
  

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default memo(LinesBg);

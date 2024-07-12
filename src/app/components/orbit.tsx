import { memo, useEffect, useRef, useState } from "react";
import {
  animationFrameScheduler,
  fromEvent,
  interval,
  Subscription,
} from "rxjs";
import { takeWhile } from "rxjs/operators";
import { useWindowSize } from "../common/windowSize";

function Orbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contRef = useRef<HTMLDivElement>(null);

  const wSize = useWindowSize();

  const rand = (rMi: number, rMa: number) =>
    Math.floor(Math.random() * (rMa - rMi + 1) + rMi);

  useEffect(() => {
    const orbs: any[] = [];

    const createOrb = (
      mx: number,
      my: number,
      cw: number,
      ch: number,
      ctx: CanvasRenderingContext2D
    ) => {
      const dx = cw / 2 - mx;
      const dy = ch / 2 - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      orbs.push({
        x: mx,
        y: my,
        lastX: mx,
        lastY: my,
        hue: 0,
        colorAngle: 0,
        angle: angle + Math.PI / 2,
        size: rand(1, 3) / 2,
        centerX: cw / 2,
        centerY: ch / 2,
        radius: dist,
        speed: (rand(5, 10) / 1000) * (dist / 750) + 0.015,
        alpha: 1 - Math.abs(dist) / cw,
        draw: function () {
          ctx.strokeStyle = `hsla(${this.colorAngle}, 100%, 50%, 1)`;
          ctx.lineWidth = this.size;
          ctx.beginPath();
          ctx.moveTo(this.lastX, this.lastY);
          ctx.lineTo(this.x, this.y);
          ctx.stroke();
        },
        update: function (cw: number, ch: number) {
          this.lastX = this.x;
          this.lastY = this.y;
          const x1 = cw / 2;
          const y1 = ch / 2;
          const x2 = this.x;
          const y2 = this.y;
          const rise = y1 - y2;
          const run = x1 - x2;
          const slope = -(rise / run);
          let radian = Math.atan(slope);
          let angleH = Math.floor(radian * (180 / Math.PI));
          if (x2 < x1 && y2 < y1) angleH += 180;
          if (x2 < x1 && y2 > y1) angleH += 180;
          if (x2 > x1 && y2 > y1) angleH += 360;
          if (y2 < y1 && slope === -Infinity) angleH = 90;
          if (y2 > y1 && slope === Infinity) angleH = 270;
          if (x2 < x1 && slope === 0) angleH = 180;
          if (isNaN(angleH)) angleH = 0;

          this.colorAngle = angleH;
          this.x = this.centerX + Math.sin(this.angle * -1) * this.radius;
          this.y = this.centerY + Math.cos(this.angle * -1) * this.radius;
          this.angle += this.speed;
        },
      });
    };
    const subsManager = new Subscription();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = contRef.current;

    if (!ctx || !container) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dpr = window.devicePixelRatio;
    const rect = container.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";

    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.pageX - canvas.offsetLeft;
      const my = e.pageY - canvas.offsetTop;
      createOrb(mx, my, cw, ch, ctx);
    };

    let ptrMoveSubs: Subscription;

    const handleMouseDown = (e: MouseEvent) => {
      handleMouseMove(e);
      ptrMoveSubs = fromEvent<PointerEvent>(window, "pointermove").subscribe(
        handleMouseMove
      );
      subsManager.add(ptrMoveSubs);
    };

    const loop = () => {
      const updateOrbs = () => {
        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, cw, ch);

        orbs.forEach((orb) => {
          orb.update(cw, ch);
          orb.draw();
        });
      };

      subsManager.add(
        interval(25, animationFrameScheduler)
          .pipe(takeWhile(() => true))
          .subscribe(updateOrbs)
      );
    };

    const ptrDownSubs = fromEvent<PointerEvent>(
      window,
      "pointerdown"
    ).subscribe(handleMouseDown);
    subsManager.add(ptrDownSubs);
    subsManager.add(
      fromEvent<PointerEvent>(window, "pointerup").subscribe(() => {
        ptrMoveSubs.unsubscribe();
      })
    );

    for (let count = 0; count < 500; count++) {
      createOrb(cw / 2, ch / 2 + count * 2, cw, ch, ctx);
    }

    loop();

    return () => {
      subsManager.unsubscribe();
    };
  }, [wSize]);

  return (
    <div ref={contRef} className="h-full w-full">
      <canvas id="c" ref={canvasRef} />
    </div>
  );
}

export default memo(Orbit);

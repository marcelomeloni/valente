'use client';

import { useEffect, useRef } from 'react';
import { InterpreterState } from './interpreter';

export const CANVAS_SIZE = 500;

const LINE_COLOR = '#9cd068';
const TURTLE_COLOR = '#ffffcc';
const BG_COLOR = '#000000';
const GRID_COLOR = 'rgba(0, 85, 0, 0.35)';

function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 0.5;
  const step = 50;

  for (let x = 0; x <= CANVAS_SIZE; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_SIZE); ctx.stroke();
  }
  for (let y = 0; y <= CANVAS_SIZE; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_SIZE, y); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(0, 85, 0, 0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(CANVAS_SIZE / 2, 0); ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, CANVAS_SIZE / 2); ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2); ctx.stroke();
}

function drawTurtle(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(7, 8);
  ctx.lineTo(0, 4);
  ctx.lineTo(-7, 8);
  ctx.closePath();

  ctx.fillStyle = 'rgba(255, 255, 204, 0.15)';
  ctx.fill();
  ctx.strokeStyle = TURTLE_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fillStyle = TURTLE_COLOR;
  ctx.fill();

  ctx.restore();
}

interface LogoCanvasProps {
  state: InterpreterState;
}

export function LogoCanvas({ state }: LogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    drawGrid(ctx);

    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const line of state.lines) {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    }

    if (state.turtle.visible) {
      drawTurtle(ctx, state.turtle.x, state.turtle.y, state.turtle.angle);
    }
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      // CSS scales the canvas to fill its container while preserving aspect ratio
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
    />
  );
}
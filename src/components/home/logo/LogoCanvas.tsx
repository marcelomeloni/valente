'use client';

import { useEffect, useRef } from 'react';
import { InterpreterState } from './interpreter';

export const CANVAS_SIZE = 600;

// Aesthetic Config
const LINE_COLOR = '#ef4444'; // Tailwind red-500
const TURTLE_COLOR = '#ffffff';
const BG_COLOR = 'transparent';
const GRID_COLOR = 'rgba(255, 255, 255, 0.04)';

function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  const step = 50;

  for (let x = 0; x <= CANVAS_SIZE; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_SIZE); ctx.stroke();
  }
  for (let y = 0; y <= CANVAS_SIZE; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_SIZE, y); ctx.stroke();
  }

  // Center Crosshairs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(CANVAS_SIZE / 2, 0); ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, CANVAS_SIZE / 2); ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2); ctx.stroke();
}

function drawTurtle(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  // Turtle Body (Modern styling: sleek glowing triangle)
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(8, 10);
  ctx.lineTo(0, 5);
  ctx.lineTo(-8, 10);
  ctx.closePath();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
  
  // Subtle glow
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
  ctx.shadowBlur = 10;
  ctx.strokeStyle = TURTLE_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();

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

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    drawGrid(ctx);

    // Ink Path Styling
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 2.5; // Slightly thicker
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = LINE_COLOR;
    ctx.shadowBlur = 4; // Glowing red ink

    ctx.beginPath();
    for (const line of state.lines) {
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow for turtle

    if (state.turtle.visible) {
      drawTurtle(ctx, state.turtle.x, state.turtle.y, state.turtle.angle);
    }
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="w-full h-full object-contain mix-blend-screen"
    />
  );
}
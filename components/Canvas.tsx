'use client';

import { useEffect, useRef, useState } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const {
    canvas,
    canvasWidth,
    canvasHeight,
    pixelSize,
    currentTool,
    currentColor,
    setPixel,
    initCanvas,
  } = useCanvasStore();

  // Initialize canvas on mount
  useEffect(() => {
    initCanvas(32, 32);
  }, [initCanvas]);

  // Render canvas
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth * pixelSize, canvasHeight * pixelSize);

    // Draw grid
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= canvasWidth; i++) {
      ctx.beginPath();
      ctx.moveTo(i * pixelSize, 0);
      ctx.lineTo(i * pixelSize, canvasHeight * pixelSize);
      ctx.stroke();
    }

    for (let i = 0; i <= canvasHeight; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * pixelSize);
      ctx.lineTo(canvasWidth * pixelSize, i * pixelSize);
      ctx.stroke();
    }

    // Draw pixels
    canvas.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel.color !== 'transparent') {
          ctx.fillStyle = pixel.color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      });
    });
  }, [canvas, canvasWidth, canvasHeight, pixelSize]);

  // Handle mouse events
  const getPixelCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return null;

    const rect = canvasElement.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coords = getPixelCoordinates(e);
    if (coords) {
      const color = currentTool === 'eraser' ? 'transparent' : currentColor;
      setPixel(coords.x, coords.y, color);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const coords = getPixelCoordinates(e);
    if (coords) {
      const color = currentTool === 'eraser' ? 'transparent' : currentColor;
      setPixel(coords.x, coords.y, color);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <canvas
        ref={canvasRef}
        width={canvasWidth * pixelSize}
        height={canvasHeight * pixelSize}
        className="border-2 border-gray-300 cursor-crosshair shadow-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const {
    canvas,
    canvasWidth,
    canvasHeight,
    pixelSize,
    zoom,
    panX,
    panY,
    currentTool,
    currentColor,
    setPixel,
    initCanvas,
    setZoom,
    setPan,
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

  // Get pixel coordinates with zoom adjustment
  const getPixelCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return null;

    const rect = canvasElement.getBoundingClientRect();
    // Adjust for zoom
    const x = Math.floor((e.clientX - rect.left) / (pixelSize * zoom));
    const y = Math.floor((e.clientY - rect.top) / (pixelSize * zoom));

    return { x, y };
  };

  // Handle zoom with Ctrl/Cmd + mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Only zoom when Ctrl or Cmd is pressed
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = zoom * delta;
      setZoom(newZoom);
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Middle mouse button or Shift + left mouse button for panning
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    // Normal drawing
    if (e.button === 0 && !isPanning) {
      setIsDrawing(true);
      const coords = getPixelCoordinates(e);
      if (coords) {
        const color = currentTool === 'eraser' ? 'transparent' : currentColor;
        setPixel(coords.x, coords.y, color);
      }
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPan(panX + deltaX, panY + deltaY);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (!isDrawing) return;

    const coords = getPixelCoordinates(e);
    if (coords) {
      const color = currentTool === 'eraser' ? 'transparent' : currentColor;
      setPixel(coords.x, coords.y, color);
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsPanning(false);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDrawing(false);
    setIsPanning(false);
  };


  return (
    <div
      ref={containerRef}
      className="relative overflow-auto bg-neutral-800 rounded"
      style={{ maxWidth: '1400px', maxHeight: '900px', width: '100%', height: '700px' }}
      onWheel={handleWheel}
    >
      <div
        className="flex items-center justify-center p-8"
        style={{
          transform: `translate(${panX}px, ${panY}px)`,
          minWidth: '100%',
          minHeight: '100%',
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth * pixelSize}
          height={canvasHeight * pixelSize}
          className="border-2 border-neutral-300 shadow-lg bg-white"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            cursor: isPanning ? 'grabbing' : 'crosshair',
            imageRendering: 'pixelated',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

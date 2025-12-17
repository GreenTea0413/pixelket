'use client';

import { useState } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { useLanguageStore } from '@/store/useLanguageStore';

const presetSizes = [32, 64, 128, 256, 512];

export default function CanvasSettings() {
  const { canvasWidth, canvasHeight, setCanvasSize } = useCanvasStore();
  const { t } = useLanguageStore();
  const [customWidth, setCustomWidth] = useState(canvasWidth.toString());
  const [customHeight, setCustomHeight] = useState(canvasHeight.toString());

  const handlePresetSize = (size: number) => {
    if (confirm(`캔버스를 ${size}x${size}로 변경하시겠습니까? 현재 작업이 초기화됩니다.`)) {
      setCanvasSize(size, size);
      setCustomWidth(size.toString());
      setCustomHeight(size.toString());
    }
  };

  const handleCustomSize = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);

    if (isNaN(width) || isNaN(height) || width < 8 || height < 8 || width > 1024 || height > 1024) {
      alert('크기는 8 ~ 1024 사이의 숫자여야 합니다.');
      return;
    }

    if (confirm(`캔버스를 ${width}x${height}로 변경하시겠습니까? 현재 작업이 초기화됩니다.`)) {
      setCanvasSize(width, height);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 bg-neutral-900 border border-neutral-700">
      <h3 className="text-xs font-pixel text-neutral-400">캔버스 크기</h3>

      {/* Current Size */}
      <div className="text-xs font-pixel text-neutral-300">
        현재: {canvasWidth} × {canvasHeight}
      </div>

      {/* Preset Sizes */}
      <div>
        <h4 className="text-xs font-pixel text-neutral-500 mb-1.5">프리셋</h4>
        <div className="flex flex-col gap-1.5">
          {presetSizes.map((size) => (
            <button
              key={size}
              onClick={() => handlePresetSize(size)}
              className={`
                w-full px-2 py-1.5 text-xs font-pixel transition-colors flex items-center justify-center
                ${
                  canvasWidth === size && canvasHeight === size
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }
              `}
            >
              {size} × {size}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Size */}
      <div>
        <h4 className="text-xs font-pixel text-neutral-500 mb-1.5">커스텀</h4>
        <div className="flex gap-1.5">
          <input
            type="number"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            placeholder="가로"
            className="w-full px-1.5 py-1 bg-neutral-800 text-neutral-200 text-xs font-pixel border border-neutral-600 focus:border-green-500 focus:outline-none"
            min="8"
            max="1024"
          />
          <span className="text-neutral-500 font-pixel text-xs flex items-center">×</span>
          <input
            type="number"
            value={customHeight}
            onChange={(e) => setCustomHeight(e.target.value)}
            placeholder="세로"
            className="w-full px-1.5 py-1 bg-neutral-800 text-neutral-200 text-xs font-pixel border border-neutral-600 focus:border-green-500 focus:outline-none"
            min="8"
            max="1024"
          />
        </div>
        <button
          onClick={handleCustomSize}
          className="w-full mt-1.5 px-2 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-pixel transition-colors flex items-center justify-center"
        >
          적용
        </button>
      </div>
    </div>
  );
}

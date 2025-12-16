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
    <div className="flex flex-col gap-4 p-4 bg-gray-800 border border-gray-700">
      <h3 className="text-sm font-pixel text-gray-400">캔버스 크기</h3>

      {/* Current Size */}
      <div className="text-sm font-pixel text-gray-300">
        현재: {canvasWidth} × {canvasHeight}
      </div>

      {/* Preset Sizes */}
      <div>
        <h4 className="text-sm font-pixel text-gray-500 mb-2">프리셋</h4>
        <div className="grid grid-cols-3 gap-2">
          {presetSizes.map((size) => (
            <button
              key={size}
              onClick={() => handlePresetSize(size)}
              className={`
                px-2 py-2 text-sm font-pixel transition-colors flex items-center justify-center
                ${
                  canvasWidth === size && canvasHeight === size
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }
              `}
            >
              {size}×{size}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Size */}
      <div>
        <h4 className="text-sm font-pixel text-gray-500 mb-2">커스텀</h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            placeholder="가로"
            className="w-full px-2 py-1 bg-gray-700 text-gray-200 text-sm font-pixel border border-gray-600 focus:border-green-500 focus:outline-none"
            min="8"
            max="1024"
          />
          <span className="text-gray-500 font-pixel text-sm flex items-center">×</span>
          <input
            type="number"
            value={customHeight}
            onChange={(e) => setCustomHeight(e.target.value)}
            placeholder="세로"
            className="w-full px-2 py-1 bg-gray-700 text-gray-200 text-sm font-pixel border border-gray-600 focus:border-green-500 focus:outline-none"
            min="8"
            max="1024"
          />
        </div>
        <button
          onClick={handleCustomSize}
          className="w-full mt-2 px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-pixel transition-colors flex items-center justify-center"
        >
          적용
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useCanvasStore } from '@/store/useCanvasStore';

const presetColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00',
  '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
];

export default function ColorPicker() {
  const { currentColor, setColor } = useCanvasStore();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
      <h3 className="text-sm font-semibold text-gray-700">Color</h3>

      {/* Current Color */}
      <div className="flex items-center gap-3">
        <div
          className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-md"
          style={{ backgroundColor: currentColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Current</span>
          <span className="text-sm font-mono font-semibold">{currentColor}</span>
        </div>
      </div>

      {/* Color Picker */}
      {showPicker && (
        <div className="mt-2">
          <HexColorPicker color={currentColor} onChange={setColor} />
        </div>
      )}

      {/* Preset Colors */}
      <div>
        <h4 className="text-xs font-semibold text-gray-600 mb-2">Presets</h4>
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={`
                w-10 h-10 rounded-md border-2 transition-all
                ${
                  currentColor === color
                    ? 'border-blue-500 scale-110 shadow-md'
                    : 'border-gray-300 hover:scale-105'
                }
              `}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

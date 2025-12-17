'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useCanvasStore } from '@/store/useCanvasStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { Plus, Check } from 'lucide-react';

export default function ColorPicker() {
  const { currentColor, setColor, savedColors, addColorToPalette, removeColorFromPalette } = useCanvasStore();
  const { t } = useLanguageStore();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-3 bg-neutral-900 border border-neutral-700">
      <h3 className="text-xs font-pixel text-neutral-400">{t.color.title}</h3>

      {/* Current Color */}
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-12 border-2 border-neutral-600 cursor-pointer"
          style={{ backgroundColor: currentColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <div className="flex flex-col">
          <span className="text-xs text-neutral-500 font-pixel">{t.color.hex}</span>
          <span className="text-xs font-pixel text-neutral-300">{currentColor}</span>
        </div>
      </div>

      {/* Color Picker */}
      {showPicker && (
        <div className="mt-1">
          <HexColorPicker color={currentColor} onChange={setColor} />
        </div>
      )}

      {/* Add to Palette Button */}
      <button
        onClick={() => addColorToPalette(currentColor)}
        className="px-2 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-pixel transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={savedColors.includes(currentColor) || savedColors.length >= 20}
      >
        {savedColors.includes(currentColor) ? (
          <>
            <Check size={16} />
            <span>저장됨</span>
          </>
        ) : (
          <>
            <Plus size={16} />
            <span>팔레트에 추가</span>
          </>
        )}
      </button>

      {/* Saved Colors */}
      {savedColors.length > 0 && (
        <div>
          <h4 className="text-xs font-pixel text-neutral-500 mb-2">내 팔레트</h4>
          <div className="grid grid-cols-4 gap-2">
            {savedColors.map((color) => (
              <div key={color} className="relative group">
                <button
                  onClick={() => setColor(color)}
                  className={`
                    w-10 h-10 border-2 transition-all
                    ${
                      currentColor === color
                        ? 'border-green-500 scale-110'
                        : 'border-neutral-600 hover:scale-105'
                    }
                  `}
                  style={{ backgroundColor: color }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeColorFromPalette(color);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-4 pt-3 border-t border-neutral-700">
        <h4 className="text-xs font-pixel text-neutral-500 mb-2">{t.help.title}</h4>
        <div className="space-y-1">
          <p className="text-xs text-neutral-400">{t.help.zoom}</p>
          <p className="text-xs text-neutral-400">{t.help.pan}</p>
        </div>
      </div>
    </div>
  );
}

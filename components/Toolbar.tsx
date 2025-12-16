'use client';

import { useCanvasStore } from '@/store/useCanvasStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import type { Tool } from '@/types';

const tools: { name: Tool; icon: string }[] = [
  { name: 'pen', icon: '✏️' },
  { name: 'eraser', icon: '🧹' },
  { name: 'fill', icon: '🪣' },
  { name: 'eyedropper', icon: '💧' },
];

export default function Toolbar() {
  const { currentTool, setTool, clearCanvas, undo, redo } = useCanvasStore();
  const { t } = useLanguageStore();

  const getToolLabel = (toolName: Tool) => {
    switch (toolName) {
      case 'pen':
        return t.tools.pen;
      case 'eraser':
        return t.tools.eraser;
      case 'fill':
        return t.tools.fill;
      case 'eyedropper':
        return t.tools.eyedropper;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 border border-gray-700">
      {/* Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-pixel text-gray-400 mb-2">{t.tools.title}</h3>
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => setTool(tool.name)}
            className={`
              flex items-center justify-center gap-2 px-3 py-2 transition-all text-sm font-pixel
              ${
                currentTool === tool.name
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }
            `}
          >
            <span className="text-lg">{tool.icon}</span>
            <span>{getToolLabel(tool.name)}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-pixel text-gray-400 mb-2">{t.actions.title}</h3>
        <button
          onClick={undo}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-pixel transition-colors flex items-center justify-center"
        >
          {t.actions.undo}
        </button>
        <button
          onClick={redo}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-pixel transition-colors flex items-center justify-center"
        >
          {t.actions.redo}
        </button>
        <button
          onClick={clearCanvas}
          className="px-3 py-2 bg-red-900 hover:bg-red-800 text-red-200 text-sm font-pixel transition-colors flex items-center justify-center"
        >
          {t.actions.clear}
        </button>
      </div>
    </div>
  );
}

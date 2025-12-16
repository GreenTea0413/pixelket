'use client';

import { useCanvasStore } from '@/store/useCanvasStore';
import type { Tool } from '@/types';

const tools: { name: Tool; icon: string; label: string }[] = [
  { name: 'pen', icon: '✏️', label: 'Pen' },
  { name: 'eraser', icon: '🧹', label: 'Eraser' },
  { name: 'fill', icon: '🪣', label: 'Fill' },
  { name: 'eyedropper', icon: '💧', label: 'Eyedropper' },
];

export default function Toolbar() {
  const { currentTool, setTool, clearCanvas, undo, redo } = useCanvasStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 border border-gray-700">
      {/* Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-pixel text-gray-400 mb-2">TOOLS</h3>
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => setTool(tool.name)}
            className={`
              flex items-center gap-2 px-3 py-2 transition-all text-xs font-pixel
              ${
                currentTool === tool.name
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }
            `}
          >
            <span className="text-base">{tool.icon}</span>
            <span>{tool.label.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-pixel text-gray-400 mb-2">ACTIONS</h3>
        <button
          onClick={undo}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-xs font-pixel text-gray-300 transition-colors"
        >
          UNDO
        </button>
        <button
          onClick={redo}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-xs font-pixel text-gray-300 transition-colors"
        >
          REDO
        </button>
        <button
          onClick={clearCanvas}
          className="px-3 py-2 bg-red-900 hover:bg-red-800 text-xs font-pixel text-red-200 transition-colors"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

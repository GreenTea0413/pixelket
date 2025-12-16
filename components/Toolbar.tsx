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
    <div className="flex flex-col gap-4 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
      {/* Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Tools</h3>
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => setTool(tool.name)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${
                currentTool === tool.name
                  ? 'bg-blue-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="text-sm font-medium">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Actions</h3>
        <button
          onClick={undo}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          ↩️ Undo
        </button>
        <button
          onClick={redo}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          ↪️ Redo
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium text-red-700 transition-colors"
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
}

'use client';

import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';
import ColorPicker from '@/components/ColorPicker';
import CanvasSettings from '@/components/CanvasSettings';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguageStore } from '@/store/useLanguageStore';
import { Download, Save } from 'lucide-react';

export default function Home() {
  const { t } = useLanguageStore();
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-pixel text-white tracking-wider">
                {t.header.title}
              </h1>
              <p className="text-xs text-gray-400 mt-2">{t.header.subtitle}</p>
            </div>
            <div className="flex gap-2 items-center">
              <LanguageSelector />
              <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-pixel transition-colors flex items-center justify-center gap-1.5">
                <Download size={16} />
                <span>{t.header.export}</span>
              </button>
              <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-pixel transition-colors flex items-center justify-center gap-1.5">
                <Save size={16} />
                <span>{t.header.save}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-3 max-w-[1800px] mx-auto">
          {/* Left Sidebar - Tools */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <Toolbar />
            <CanvasSettings />
          </div>

          {/* Center - Canvas */}
          <div className="flex flex-col items-center">
            <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-2">
              <Canvas />
            </div>
          </div>

          {/* Right Sidebar - Color Picker */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ColorPicker />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-xs text-neutral-600 font-pixel">
        <p>{t.footer.text}</p>
      </footer>
    </div>
  );
}

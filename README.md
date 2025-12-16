# Pixeora

A free, web-based pixel art editor built with Next.js and TypeScript.

## Features

- **Drawing Tools**: Pen, eraser, fill bucket, and eyedropper tools
- **Canvas Grid**: Visual grid overlay for precise pixel placement
- **Color Picker**: Full RGB color selection with HexColorPicker
- **Undo/Redo**: Complete history management for your artwork
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **State Management**: Efficient canvas state handling with Zustand

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Color Picker**: react-colorful
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GreenTea0413/pixeora.git
cd pixeora
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pixeora/
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main page component
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Canvas.tsx       # Drawing canvas component
│   ├── Toolbar.tsx      # Tool selection toolbar
│   └── ColorPicker.tsx  # Color selection component
├── store/              # Zustand state management
│   └── useCanvasStore.ts # Canvas state store
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
├── docs/               # Documentation
│   └── image-export-plan.md # Export feature implementation plan
└── public/             # Static assets
```

## Roadmap

### Current Features
- [x] Canvas drawing with pen tool
- [x] Eraser tool
- [x] Color picker
- [x] Undo/Redo functionality
- [x] Clear canvas

### Planned Features
- [ ] PNG image export
- [ ] Save/Load artwork
- [ ] Fill bucket tool implementation
- [ ] Eyedropper tool implementation
- [ ] Canvas size customization
- [ ] Layer support
- [ ] Custom color palettes
- [ ] Keyboard shortcuts

See [docs/image-export-plan.md](docs/image-export-plan.md) for detailed implementation plans.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Color picker by [react-colorful](https://github.com/omgovich/react-colorful)

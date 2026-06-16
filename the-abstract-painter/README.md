# The Abstract Painter

A browser-based painting studio for abstract art. Vanilla JavaScript and HTML5 Canvas — no build step required.

## Features

- **Layers** — add, remove, reorder, duplicate, merge, opacity, blend modes, drawing filter (photo to sketch)
- **Standard tools** — brush, pencil, eraser, fill, clear fill, eyedropper, line, rectangle, ellipse, smudge, lighten, darken, move, blur
- **Abstract tools** — kaleidoscope, gradient flow, noise smear, flow field, fractal, echo trail, color mix, wet drip, splatter, flow trails, soft blobs, circle pattern
- **Palette** — primary/secondary colors, 12 preset palettes, swatches, harmony generator, multi-color brush modes
- **File I/O** — save/load `.abstract` projects; import/export PNG, JPEG, WebP

## Run

From this folder:

```bash
npx serve .
```

Then open the URL shown (usually http://localhost:3000).

> Use a local server rather than opening `index.html` directly — file downloads and some APIs work better over HTTP.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| B | Brush |
| E | Eraser |
| G | Fill |
| T | Clear Fill (transparent flood fill) |
| I | Eyedropper |
| P | Pencil |
| X | Swap primary/secondary |
| [ / ] | Brush size down/up |
| Space + drag | Pan canvas |
| Scroll wheel | Zoom |
| Ctrl+Z / Ctrl+Y | Undo / Redo |
| Ctrl+S | Save project |
| Ctrl+O | Open project |

Click the project name in the header (or **File → Rename**) to change the name used for saves and exports. New documents prompt for a name on startup and when using **File → New**.

**Circle Pattern** (Abstract tools) stamps random arrangements of full circles, arcs, rings, and nested curves. Use **Size** for the pattern area, **Complexity** (1–10) for simple to dense layouts, and click or drag on the canvas.

**Canvas → Generate Abstract Layer** (or **Random Gen** in the Abstract tools panel) creates a new layer filled with a random abstract composition using your palette colors.

**Canvas → Generate Golden Ratio Layer** (or **Golden Gen**) builds structured abstracts from φ ratios: dual golden-section focal gradients, Fibonacci-frequency Lissajous curves, ring mandalas, phi-spaced moiré grids, golden-angle mesh webs, and sine wave bands.

**Canvas → Generate Seed of Life Layer** (or **Seed of Life** in the Abstract tools panel) creates sacred-geometry patterns: seven overlapping equal circles (classic seed), with random rotation, palette colors, outline/fill styles, optional bloom rings, and occasional multi-cluster layouts.

**Fractal** (Abstract tools) or **Fractal Gen** / **Canvas → Generate Fractal Layer** fills a layer with a random fractal type: Clifford, De Jong, Hopalong, Ikeda, Sierpinski triangle, Barnsley fern, Julia set, or IFS flame — scaled to cover the entire canvas. Each click or generation picks a different style; ~22% of runs blend a second fractal on top.

**Shape Gen** or **Canvas → Generate Shape Layer** creates a new layer filled with random geometric shapes — rectangles, rounded rects, circles, ellipses, triangles, polygons, diamonds, lines, arcs, rings, and crosses — in varied sizes and colors from your current palette (primary, secondary, and swatches).

**Drawing filter** — **Edit → Drawing Filter** or the **Drawing** button in the Layers panel turns the active layer into a pencil-sketch look (ideal for imported photos). Adjust **Drawing detail** (blur amount) and **Color keep** in the tool options bar before applying. Undo with Ctrl+Z.

## Project Format

`.abstract` files are JSON containing canvas size, palette, and all layers as PNG data URLs. Export PNG/JPEG/WebP for flat images to share.

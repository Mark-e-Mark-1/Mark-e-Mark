# The Abstract Painter

A browser-based painting studio for abstract art. Vanilla JavaScript and HTML5 Canvas — no build step required.

## Features

- **Layers** — add, remove, reorder, duplicate, merge, opacity, blend modes, drawing filter (photo to sketch)
- **Standard tools** — brush, pencil, eraser, fill, clear fill, eyedropper, line, rectangle, ellipse, smudge, lighten, darken, move, **select**, blur
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
| S | Select |
| X | Swap primary/secondary |
| [ / ] | Brush size down/up |
| Space + drag | Pan canvas |
| Scroll wheel | Zoom |
| Ctrl+Z / Ctrl+Y | Undo / Redo |
| Ctrl+S | Save project |
| Ctrl+O | Open project |

Click the project name in the header (or **File → Rename**) to change the name used for saves and exports. New documents prompt for a name on startup and when using **File → New**.

**Circle Pattern** (Abstract tools) stamps random arrangements of full circles, arcs, rings, and nested curves. Use **Size** for the pattern area, **Complexity** (1–10) for simple to dense layouts, and click or drag on the canvas.

**Canvas → Generate Abstract Layer** (or **Random Gen** in the Abstract tools panel) previews a random abstract on the canvas. Generator buttons redraw the same preview each time until you click **Create Layer** below them to save it as a new layer.

**Canvas → Generate Golden Ratio Layer** (or **Golden Gen**) previews structured abstracts from φ ratios: dual golden-section focal gradients, Fibonacci-frequency Lissajous curves, ring mandalas, phi-spaced moiré grids, golden-angle mesh webs, and sine wave bands.

**Canvas → Generate Seed of Life Layer** (or **Seed of Life** in the Abstract tools panel) previews sacred-geometry patterns: seven overlapping equal circles (classic seed), with random rotation, palette colors, outline/fill styles, optional bloom rings, and occasional multi-cluster layouts.

**Fractal** (Abstract tools) or **Fractal Gen** / **Canvas → Generate Fractal Layer** previews a random fractal type: Clifford, De Jong, Hopalong, Ikeda, Sierpinski triangle, Barnsley fern, Julia set, or IFS flame — scaled to cover the entire canvas. Each click picks a different style; ~22% of runs blend a second fractal on top.

**Shape Gen** or **Canvas → Generate Shape Layer** previews random geometric shapes — rectangles, rounded rects, circles, ellipses, triangles, polygons, diamonds, lines, arcs, rings, and crosses — in varied sizes and colors from your current palette (primary, secondary, and swatches).

**Cityscape Gen** or **Canvas → Generate Cityscape Layer** previews a stylized skyline — layered buildings with lit windows, spires, optional bridges and streetlights, and skies ranging from day and sunset to dusk, night, and neon. About 40% of runs include a waterfront reflection.

**Abstract Gen 1** or **Canvas → Generate Abstract 1 Layer** previews sweeping ribbon-like bands on a black background — layered magenta, pink, orange, and neutral stripes following curved paths, similar to fluid 3D extrusions.

**Abstract Gen 2** or **Canvas → Generate Abstract 2 Layer** uses the same ribbon style with much more size variation — ribbons can sweep across the full canvas and grow large enough to dominate most of the frame.

**Abstract Gen 3** or **Canvas → Generate Abstract 3 Layer** picks a random style each time — cosmic nebula blooms, orbital ring diagrams, stained-glass mosaics, meteor fields, luminous triangle meshes, or flowing ink blooms — using your palette colors.

**Abstract Gen 4** or **Canvas → Generate Abstract 4 Layer** fills the canvas with a particle spray of varied splatters and blobs — tiny specks, elongated splats, soft washes, drip trails, and large color blooms scattered from multiple spray bursts across the frame.

**Abstract Gen 5** or **Canvas → Generate Abstract 5 Layer** previews fiery fluid-art clusters on black — marbled cellular blooms with glossy highlights and fractal dendrite spikes. Each run randomly picks a color family (red, blue, yellow, green, purple, cyan, magenta, or orange) and a widely varied blob shape — size, stretch, rotation, lobes, and offset all change dramatically between previews.

**Abstract Gen 6** or **Canvas → Generate Abstract 6 Layer** previews stylized bare trees or forests — rolling ground, sky (day, dusk, night, or overcast), and 2–32 leafless trees with fractal branches. About 72% of trees get extra-heavy branching; pine-style trees use tiered bare limbs instead of foliage.

**Create Layer** (below the generator buttons) commits the current preview to a new layer. Until you click it, generators only update the on-canvas preview and do not add layers.

**Drawing filter** — **Edit → Drawing Filter** or the **Drawing** button in the Layers panel turns the active layer into a pencil-sketch look (ideal for imported photos). Adjust **Drawing detail** (blur amount) and **Color keep** in the tool options bar before applying. Undo with Ctrl+Z.

### Selection tool

Press **S** or choose **Select**. Use **Rect** mode to drag a box, or **Wand** mode to click a connected region (uses **Tolerance**). Choose **Cut** to lift pixels from the layer, or **Copy** to duplicate them while leaving the original in place.

The selection floats so you can **move** (drag inside), **resize** (corner/edge handles), or **rotate** (handle above the selection). **Shift+drag** or **Shift+click** (wand) adds another selection. Click a secondary selection to activate it; only the active one shows resize/rotate handles.

**Paste on another layer:** switch to the target layer in the Layers panel, then press **Enter** or **Apply to layer**. The selection is placed on whichever layer is active — not necessarily the layer it came from.

**Copy / paste:** **Ctrl+C** (or **Copy**) stores the floating selection. Switch layers, then **Ctrl+V** (or **Paste**) to float a copy on the new layer. Position it and apply. **Esc** or **Cancel** discards floating selections (cut selections are restored). Click outside to apply.

**Crop:** After defining a selection (while dragging, floating, or after a recent rect/wand select), use **Crop Image** to shrink the whole canvas to that region, or **Crop Layer** to clear everything outside the selection on the active layer only (canvas size stays the same). Floating selections are applied to the layer first. Also available under **Edit → Crop Image/Layer to Selection**. Undo with Ctrl+Z.

## Project Format

`.abstract` files are JSON containing canvas size, palette, and all layers as PNG data URLs. Export PNG/JPEG/WebP for flat images to share.

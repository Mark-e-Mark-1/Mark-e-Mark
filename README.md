# Mark-e-Mark Web Apps

A launcher hub for browser-based apps. Visitors open the menu and click an app to run it — no build step, no install.

**Live site:** https://mark-e-mark-1.github.io/Mark-e-Mark/

## Apps included

| App | Folder | Description |
|-----|--------|-------------|
| Letter Dash | `letter-dash/` | Letter platformer + level editor |
| The Abstract Painter | `the-abstract-painter/` | Abstract painting studio |
| Word Processor | `word-processor/` | Simple browser word processor |
| Basic Spreadsheet | `my-basic-spreadsheet/` | Spreadsheet with formulas |
| Undersea Adventure | `undersea-adventure/` | Undersea side-scroller |
| Domino Simulator | `domino-simulator/` | 3D domino physics |
| Cosmos Explorer | `cosmos-explorer/` | 3D star-system flight |
| Solitaire | `solitaire/` | Classic Klondike solitaire |
| 3D Solitaire | `3d-solitaire/` | Klondike on a 3D felt table |
| 3D Frogger | `3d-frogger/` | Classic Frogger remade in 3D |

## Run locally

From this folder:

```bash
npx serve .
```

Open the URL shown (usually http://localhost:3000).

## GitHub Pages

This repo is published from the **`main`** branch, root folder **`/`**.

If Pages is not enabled yet: **Settings → Pages → Build from branch `main`**, folder **`/` (root)**.

## Add another app

1. Copy the project into a new subfolder (use lowercase with hyphens, e.g. `physics-sandbox/`).
2. Add a card to `index.html`.
3. Add an **All Apps** link in the new app pointing to `../`.
4. Commit and push.

## Updating an app

Edit files in the app's subfolder here, then commit and push. The live site updates automatically on GitHub Pages.

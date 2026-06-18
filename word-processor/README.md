# Word Processor

A browser-based word processor for everyday writing. Vanilla JavaScript and HTML — no build step required. Structured like [The Abstract Painter](../The-Abstract-Painter) and [Letter Dash](../letter-dash).

More capable than a plain text editor, but intentionally lighter than Microsoft Word.

## Features

- **Rich text** — bold, italic, underline, strikethrough, colors, highlights
- **Paragraph styles** — Normal, Heading 1–3
- **Lists & alignment** — bullets, numbering, indent/outdent, left/center/right/justify
- **Document tools** — undo/redo, find & replace, word count, reading time estimate
- **Outline panel** — jump to headings in long documents
- **Page setup** — Letter, A4, or Legal with adjustable margins
- **File I/O** — save/load `.wdoc` projects; export plain text or HTML; print
- **Autosave** — drafts recover automatically if you close the tab
- **Focus mode** — hide toolbars for distraction-free writing

## Run

From this folder:

```bash
npx serve .
```

Then open the URL shown (usually http://localhost:3000).

> Use a local server rather than opening `index.html` directly — downloads and some browser features work better over HTTP.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+U | Underline |
| Ctrl+Z / Ctrl+Y | Undo / Redo |
| Ctrl+S | Save document |
| Ctrl+O | Open document |
| Ctrl+F | Find & Replace |
| Ctrl+P | Print |

Click the document name in the header (or **File → Rename**) to change the title used for saves and exports.

## Project Format

`.wdoc` files are JSON containing the document title, rich HTML content, page settings, and typography defaults. Export HTML or plain text to share with others who do not use this app.

## What It Does Not Include

By design, this is not a full office suite. There are no tables, images, mail merge, track changes, comments, footnotes, or collaborative editing.

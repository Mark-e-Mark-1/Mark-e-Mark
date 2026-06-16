# Letter Dash

A Geometry Dash–style side scroller where everything is made of alphabet letters.

## Play

Open `index.html` in a browser, or run a local server:

```bash
npx serve .
```

## Controls

- **Space / Click / Tap** — Jump
- **Hold** — Glide (reduced gravity while falling)
- **🔊 button** — Toggle music

## Levels

Four built-in levels:

1. **Alphabet Run** — The original mixed obstacle course
2. **Spike Alley** — Fast spike chains
3. **Sky Hop** — Platform jumping focus
4. **Gap Runner** — Leap over gaps

Custom levels you create in the editor are saved to your browser and appear in the level dropdown.

## Level Editor

Open `editor.html` to build your own levels:

- **Generate Random Level** — auto-build a draft level for a chosen duration (15–180 seconds) and difficulty
- **Load into Editor** — reload any built-in or saved custom level from the dropdown
- **Click** to place obstacles
- **Drag** to move selected objects
- **Scroll** (or Shift+drag) to pan the timeline
- **Export / Import** JSON to share levels
- **Save as New Level** stores a copy in localStorage
- **Update Saved Level** overwrites a custom level you loaded from the list
- **Play Test** launches the game with your level

Open a specific level directly: `editor.html?edit=alphabet-run`

### Obstacle types

| Type | Description |
|------|-------------|
| Spike | Triangle hazard (letter inside) |
| Block | Solid rectangle |
| Platform | Floating platform (adjust Y offset) |
| Gap | Missing ground section |
| Finish | Level end marker (★) |

## Tech

Vanilla HTML5 Canvas + Web Audio API — no build step required.

# SVGViewer

Free online SVG viewer and live editor. Paste or upload SVG, preview it side-by-side, share a link or embed, and export to React, React Native, PNG, or Data URI. Runs entirely in the browser — no account required.

**Live demo:** [https://your-domain.com](https://your-domain.com) *(replace with your real domain)*

## Features

- Live preview with zoom and canvas backgrounds
- Paste, upload, or download SVG
- Share link and iframe embed (payload in the URL, not on a server)
- Export: React, React Native, PNG, Data URI
- Client-side sanitizer for unsafe SVG before preview and share
- Privacy Policy and Terms included

## Run locally

From the project root (uses prebuilt `*.min.js` / `styles.min.css`):

```bash
npx --yes serve .
```

Or with Python:

**Linux / macOS**

```bash
python3 -m http.server 8000
```

**Windows**

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` (or the URL `serve` prints). Opening `index.html` as a file also works; share/embed are more reliable over `http://localhost`.

## Build (after editing source JS/CSS)

```bash
./build.sh
```

Regenerates `app.min.js`, `embed.min.js`, `styles.min.css`, and `fonts.min.css` via esbuild.

## Stack

HTML, CSS, and JavaScript. Fonts are self-hosted (woff2). LZ-String is vendored locally for share/embed links. Production pages load minified bundles.

## License

MIT

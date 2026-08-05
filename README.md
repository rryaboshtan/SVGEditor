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

No build step. From the project root:

```bash
npx --yes serve .
```

Or with Python 3:

```bash
python3 -m http.server 8000
```

(`python` may not exist on Linux — use `python3`.)

Then open `http://localhost:8000` (or the URL `serve` prints). Opening `index.html` as a file also works; share/embed are more reliable over `http://localhost`.

## Stack

HTML, CSS, and JavaScript. Prettier (CDN) formats SVG on upload.

## License

MIT

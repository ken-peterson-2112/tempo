# Tempo

Browser-based golf swing analyzer. Upload a slow-mo video, calibrate the scale by tapping two reference points, get ball speed / club speed / smash factor / launch angle.

No backend. No app install. Drop a phone slow-mo into a webpage and get numbers.

## Status

- **v0.1** — upload, frame paint, scale calibration ✓
- **v0.2** — frame extraction (WebCodecs), ball/club detection (OpenCV.js), kinematics math (in progress)
- **v0.3** — shareable result URL, coach-package export

## Architecture

```
index.html        ← shell + layout
styles.css        ← all styling
js/
  state.js        ← Tempo namespace, session state
  upload.js       ← Step 1: file input, drag-drop, video metadata
  scale.js        ← Step 2: two-point calibration, px/inch math
  frames.js       ← v0.2 — WebCodecs frame extraction
  detect.js       ← v0.2 — ball + club tracking via frame differencing
  kinematics.js   ← v0.2 — speed, angle, smash factor math
  app.js          ← bootstraps all modules
```

Modules attach to a single `Tempo` global. Load order (in `index.html`) matters: state first, features in any order, app last.

## Run locally

Just open `index.html`. No build step, no dependencies.

## Deploy

Push to `main`, GitHub Pages auto-deploys. Live at `https://<user>.github.io/tempo/`.

## Capture spec

- **Frame rate**: 240 fps recommended, 120 fps minimum
- **Angle**: side-on (down-the-line) — face-on coming in v0.3
- **Distance**: phone tripod 6–8 feet from the ball
- **Reference**: include a known-length object in frame (alignment stick = 48″, golf ball = 1.68″)

## Privacy

All analysis happens in-browser. No video, no frames, no metrics ever leave the device.

/* =========================================================
   Tempo · state.js
   Global namespace + session state. Loaded first.
   ========================================================= */

window.Tempo = window.Tempo || {};

Tempo.state = {
  // Video
  videoFile: null,
  videoEl: null,
  fps: null,
  videoWidth: 0,
  videoHeight: 0,

  // Calibration
  scalePoints: [],   // [{x, y}, {x, y}] in native canvas-pixel coords
  pxPerInch: null,

  // Frames (populated in v0.2 by frames.js)
  frames: [],

  // Detection (populated in v0.2 by detect.js)
  ballTrack: [],
  clubTrack: [],
  impactFrameIndex: null,

  // Session
  sessionId: Math.random().toString(36).slice(2, 8).toUpperCase(),
};

// Convenience: short reference for hot paths
Tempo.s = Tempo.state;

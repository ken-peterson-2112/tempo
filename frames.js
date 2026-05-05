/* =========================================================
   Tempo · frames.js  [v0.2 — STUB]
   Frame-by-frame video decoding for the analysis pipeline.

   Plan:
     1. Use WebCodecs VideoDecoder (with mp4box.js for container demux)
        to walk every encoded frame at native fps.
     2. Each frame becomes an ImageBitmap or VideoFrame stored in
        Tempo.s.frames as { ts, bitmap } objects.
     3. Memory budget: a 5s slow-mo at 240fps is 1200 frames — at 1080p
        that's ~5GB raw. Solutions: downscale to ~480p, store as
        ImageData, or process streaming and only retain features.

   Browser support note:
     WebCodecs is solid in Chromium. Safari support shipped in 16.4.
     For unsupported browsers we'll fall back to seeked-frame extraction
     via the <video> element (slower, less reliable timing).
   ========================================================= */

Tempo.Frames = (function () {

  function init() {
    // No-op for v0.1
  }

  /**
   * Extract all frames from Tempo.s.videoEl.
   * Returns: Promise<Array<{ ts: number, frame: ImageBitmap }>>
   */
  async function extractAll() {
    throw new Error('Tempo.Frames.extractAll not implemented (v0.2)');
  }

  return { init, extractAll };
})();

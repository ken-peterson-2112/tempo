/* =========================================================
   Tempo · detect.js  [v0.2 — STUB]
   Ball + club head detection across frames.

   Algorithm plan (classical CV first, ML upgrade later):
     1. Frame differencing — subtract frame N from frame N-1, threshold
        the result. Anything moving lights up.
     2. Connected-component / blob analysis on the diff image.
     3. Classify blobs:
          - Ball: small, near-circular, highest contrast
          - Club head: largest fast-moving blob in pre-impact frames
     4. Track centroids across frames into Tempo.s.ballTrack /
        Tempo.s.clubTrack as [{ frameIdx, x, y }, ...].
     5. Impact frame = first frame where ball position delta exceeds
        a velocity threshold (ball goes from ~0 to fast in one frame).

   Library: OpenCV.js (CDN, ~10MB) handles all of the above well.
   Performance target: process 1200 frames in under 30 seconds on a
   mid-range phone via WebAssembly.
   ========================================================= */

Tempo.Detect = (function () {

  function init() {
    // No-op for v0.1
  }

  /**
   * Run detection over Tempo.s.frames.
   * Populates Tempo.s.ballTrack, Tempo.s.clubTrack, Tempo.s.impactFrameIndex.
   */
  async function run() {
    throw new Error('Tempo.Detect.run not implemented (v0.2)');
  }

  return { init, run };
})();

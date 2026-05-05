/* =========================================================
   Tempo · kinematics.js  [v0.2 — STUB]
   Convert tracked positions into real-world swing metrics.

   Inputs:  Tempo.s.ballTrack, Tempo.s.clubTrack,
            Tempo.s.impactFrameIndex, Tempo.s.pxPerInch, Tempo.s.fps
   Outputs: { ballSpeed, clubSpeed, smashFactor, launchAngle }

   Math:
     - Distance per frame (px) = hypot(p2.x - p1.x, p2.y - p1.y)
     - Distance (in)  = px / pxPerInch
     - Time (s)       = 1 / fps
     - Velocity (in/s) = distance / time
     - Convert in/s → mph: multiply by 0.05681818
     - Smash factor   = ballSpeed / clubSpeed   (driver: ~1.45–1.50)
     - Launch angle   = atan2(dy, dx) of fitted line over ball positions
                        in the first ~5 frames after impact, relative
                        to the calibrated horizontal reference.

   Sanity bounds (clamp results outside these for warning UI):
     - Ball speed   : 30 – 200 mph
     - Club speed   : 30 – 140 mph
     - Smash factor : 1.0 – 1.55
     - Launch angle : -10 – 60 degrees
   ========================================================= */

Tempo.Kinematics = (function () {

  function init() {
    // No-op for v0.1
  }

  /**
   * Compute swing metrics from current state.
   * @returns {{ ballSpeed: number, clubSpeed: number,
   *            smashFactor: number, launchAngle: number }}
   */
  function compute() {
    throw new Error('Tempo.Kinematics.compute not implemented (v0.2)');
  }

  // Unit helpers used by the future implementation
  const IN_PER_S_TO_MPH = 0.05681818;
  function inPerSecToMph(v) { return v * IN_PER_S_TO_MPH; }

  return { init, compute, inPerSecToMph };
})();

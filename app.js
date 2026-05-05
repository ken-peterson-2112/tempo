/* =========================================================
   Tempo · app.js
   Bootstraps every module after the DOM is ready.
   Loaded last so all Tempo.* namespaces exist.
   ========================================================= */

(function () {
  function boot() {
    // Surface session ID
    document.getElementById('sessionId').textContent = Tempo.s.sessionId;

    // Init feature modules
    Tempo.Upload.init();
    Tempo.Scale.init();
    Tempo.Frames.init();
    Tempo.Detect.init();
    Tempo.Kinematics.init();

    // Step 3 button — stub for v0.1
    document.getElementById('runAnalysis').addEventListener('click', runAnalysis);
  }

  async function runAnalysis() {
    const btn = document.getElementById('runAnalysis');
    btn.disabled = true;
    btn.textContent = 'Detection pipeline not yet wired (v0.2)';

    // The v0.2 flow:
    //   await Tempo.Frames.extractAll();
    //   await Tempo.Detect.run();
    //   const m = Tempo.Kinematics.compute();
    //   renderResults(m);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

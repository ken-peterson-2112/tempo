/* =========================================================
   Tempo · upload.js
   Step 1: file input, drag-drop, video metadata, first-frame paint.
   ========================================================= */

Tempo.Upload = (function () {

  function init() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput  = document.getElementById('fileInput');

    ['dragenter', 'dragover'].forEach(ev =>
      uploadZone.addEventListener(ev, e => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
      })
    );
    ['dragleave', 'drop'].forEach(ev =>
      uploadZone.addEventListener(ev, e => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
      })
    );
    uploadZone.addEventListener('drop', e => {
      const f = e.dataTransfer.files[0];
      if (f) handleVideoFile(f);
    });
    fileInput.addEventListener('change', e => {
      const f = e.target.files[0];
      if (f) handleVideoFile(f);
    });
  }

  async function handleVideoFile(file) {
    if (!file.type.startsWith('video/')) {
      alert('Please drop a video file (MP4 or MOV).');
      return;
    }

    Tempo.s.videoFile = file;

    // Hidden video element used for decoding + frame seek
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    Tempo.s.videoEl = video;

    await new Promise(res =>
      video.addEventListener('loadedmetadata', res, { once: true })
    );

    Tempo.s.videoWidth  = video.videoWidth;
    Tempo.s.videoHeight = video.videoHeight;
    Tempo.s.fps = guessFps(file);

    document.getElementById('fpsRead').textContent = Tempo.s.fps + ' (est)';

    // Seek slightly past 0 — some encoders need it for a clean first frame
    video.currentTime = 0.05;
    await new Promise(res =>
      video.addEventListener('seeked', res, { once: true })
    );

    // Hand the frame off to the scale module to paint
    Tempo.Scale.paintFrame(video);

    // Step gating
    document.getElementById('step1').classList.add('complete');
    document.getElementById('step2').classList.add('active');
  }

  /**
   * Best-effort FPS guess. The HTML5 video API doesn't expose true frame rate.
   * v0.2 will replace this with WebCodecs / mp4box parsing.
   */
  function guessFps(file) {
    const name = file.name.toLowerCase();
    if (name.includes('60'))  return 60;
    if (name.includes('120')) return 120;
    if (name.includes('30'))  return 30;
    return 240; // assume slow-mo by default
  }

  return { init };
})();

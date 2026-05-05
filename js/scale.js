/* =========================================================
   Tempo · scale.js
   Step 2: paint a frame, click two points on a known distance,
   compute pixels-per-inch.
   ========================================================= */

Tempo.Scale = (function () {

  let scaleCanvas, overlay;

  function init() {
    scaleCanvas = document.getElementById('scaleCanvas');
    overlay     = document.getElementById('scaleOverlay');

    scaleCanvas.addEventListener('click', onCanvasClick);
    document.getElementById('resetScale').addEventListener('click', reset);
    document.getElementById('confirmScale').addEventListener('click', confirmCalibration);
  }

  function paintFrame(video) {
    const ctx = scaleCanvas.getContext('2d');

    // Set canvas backing store to native video dimensions
    scaleCanvas.width  = video.videoWidth;
    scaleCanvas.height = video.videoHeight;

    // Match the stage's aspect ratio to the video so the canvas
    // displays without distortion (handles both landscape + portrait).
    const stage = scaleCanvas.parentElement;
    stage.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;

    // Cap stage height for portrait videos so they don't dominate the page
    if (video.videoHeight > video.videoWidth) {
      stage.style.maxHeight = '70vh';
      stage.style.width = 'auto';
      stage.style.margin = '0 auto';
    } else {
      stage.style.maxHeight = '';
      stage.style.width = '';
      stage.style.margin = '';
    }

    overlay.setAttribute('viewBox',
      `0 0 ${video.videoWidth} ${video.videoHeight}`);
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  }

  function onCanvasClick(e) {
    if (Tempo.s.scalePoints.length >= 2) return;

    // getBoundingClientRect on the canvas itself gives the displayed area
    const rect = scaleCanvas.getBoundingClientRect();

    // Translate display-space coords (CSS pixels) into native canvas pixels
    const scaleX = scaleCanvas.width  / rect.width;
    const scaleY = scaleCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top)  * scaleY;

    // Clamp to canvas bounds in case of any sub-pixel weirdness
    const clampedX = Math.max(0, Math.min(scaleCanvas.width,  x));
    const clampedY = Math.max(0, Math.min(scaleCanvas.height, y));

    Tempo.s.scalePoints.push({ x: clampedX, y: clampedY });
    renderOverlay();
    updateStepIndicators();
  }

  function renderOverlay() {
    overlay.innerHTML = '';
    const w = scaleCanvas.width;
    const r = Math.max(6, w / 200);

    Tempo.s.scalePoints.forEach((p, i) => {
      // Outer ring
      const ring = svg('circle', {
        cx: p.x, cy: p.y, r,
        fill: 'none',
        stroke: '#c4ff3d',
        'stroke-width': Math.max(2, w / 600),
      });
      overlay.appendChild(ring);

      // Inner dot
      const dot = svg('circle', {
        cx: p.x, cy: p.y, r: r / 3,
        fill: '#c4ff3d',
      });
      overlay.appendChild(dot);

      // Label
      const label = svg('text', {
        x: p.x + r * 1.5,
        y: p.y - r,
        fill: '#c4ff3d',
        'font-family': 'JetBrains Mono, monospace',
        'font-size': Math.max(12, w / 80),
      });
      label.textContent = `P${i + 1}`;
      overlay.appendChild(label);
    });

    if (Tempo.s.scalePoints.length === 2) {
      const [a, b] = Tempo.s.scalePoints;
      const line = svg('line', {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        stroke: '#c4ff3d',
        'stroke-width': Math.max(1.5, w / 800),
        'stroke-dasharray': '6 6',
      });
      overlay.appendChild(line);
    }
  }

  function svg(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function updateStepIndicators() {
    const s1  = document.getElementById('scaleStep1');
    const s2  = document.getElementById('scaleStep2');
    const s3  = document.getElementById('scaleStep3');
    const btn = document.getElementById('confirmScale');

    [s1, s2, s3].forEach(s => s.classList.remove('active', 'done'));

    const n = Tempo.s.scalePoints.length;
    if (n === 0) {
      s1.classList.add('active');
      btn.disabled = true;
    } else if (n === 1) {
      s1.classList.add('done');
      s2.classList.add('active');
      btn.disabled = true;
    } else {
      s1.classList.add('done');
      s2.classList.add('done');
      s3.classList.add('active');
      btn.disabled = false;
    }
  }

  function reset() {
    Tempo.s.scalePoints = [];
    renderOverlay();
    updateStepIndicators();
  }

  function confirmCalibration() {
    const [a, b] = Tempo.s.scalePoints;
    const pixelDist = Math.hypot(b.x - a.x, b.y - a.y);

    const refValue = parseFloat(document.getElementById('refDistance').value);
    const refUnit  = document.getElementById('refUnit').value;

    let inches = refValue;
    if (refUnit === 'cm') inches = refValue / 2.54;
    if (refUnit === 'm')  inches = refValue * 39.3701;

    Tempo.s.pxPerInch = pixelDist / inches;

    document.getElementById('scaleRead').textContent =
      Tempo.s.pxPerInch.toFixed(2) + ' px/in';

    document.getElementById('step2').classList.add('complete');
    document.getElementById('step3').classList.add('active');
    document.getElementById('runAnalysis').disabled = false;

    // Scroll the results section into view so it's obvious something happened
    document.getElementById('step3').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Public API
  return { init, paintFrame };
})();

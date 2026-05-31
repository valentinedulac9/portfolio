// Generates project/assets/og.png (1200×630) matching the site DA
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

// Register Archivo Black
registerFont(path.join(ROOT, 'project/assets/fonts/Archivo-Black.ttf'), {
  family: 'Archivo',
  weight: '900',
});

const W = 1200;
const H = 630;

const BG       = '#16151a';
const ACCENT   = '#a99bc6';
const ACCENT_D = '#7a6f9b';
const FG       = '#f4f1ee';
const FG_DIM   = '#c9c4cf';
const FG_MUTE  = '#8b8693';
const SURFACE  = '#201e28';

async function generate() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // ── background ──────────────────────────────────────────
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // radial glow top-left-ish
  const glow = ctx.createRadialGradient(420, -60, 0, 420, -60, 660);
  glow.addColorStop(0,   'rgba(169,155,198,0.28)');
  glow.addColorStop(0.6, 'rgba(169,155,198,0.06)');
  glow.addColorStop(1,   'rgba(22,21,26,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── left column — text ───────────────────────────────────
  const PL = 80; // padding left

  // eyebrow — mono label
  ctx.font = '600 15px "DejaVu Sans Mono", monospace';
  ctx.fillStyle = ACCENT;
  ctx.letterSpacing = '3px';
  ctx.fillText('CHEF DE PROJET COMMUNICATION & DIGITAL', PL, 108);

  // big name — VALENTINE (réduit à 84px pour ne pas coller à la photo)
  ctx.font = '900 84px "Archivo", "Liberation Sans", sans-serif';
  ctx.fillStyle = FG;
  ctx.fillText('VALENTINE', PL, 210);

  // DULAC — accent color
  ctx.fillStyle = ACCENT;
  ctx.fillText('DULAC', PL, 300);

  // stats row — plus grands, positionnés juste après le nom
  const stats = [
    { n: '+3', l: 'ans d\'expérience' },
    { n: '+6', l: 'marques accompagnées' },
    { n: '+12', l: 'outils maîtrisés' },
  ];
  let sx = PL;
  stats.forEach(({ n, l }) => {
    ctx.font = '900 58px "Archivo", "Liberation Sans", sans-serif';
    ctx.fillStyle = ACCENT;
    ctx.fillText(n, sx, 420);
    const nw = ctx.measureText(n).width;
    ctx.font = '700 15px "DejaVu Sans Mono", monospace';
    ctx.fillStyle = FG_DIM;
    ctx.fillText(l.toUpperCase(), sx, 452);
    sx += Math.max(nw + 20, 210);
  });

  // ── bottom bar ───────────────────────────────────────────
  ctx.fillStyle = 'rgba(244,241,238,0.07)';
  ctx.fillRect(0, H - 68, W, 68);

  ctx.font = '400 13px "DejaVu Sans Mono", monospace';
  ctx.fillStyle = FG_MUTE;
  ctx.fillText('PARIS · 75004', PL, H - 32);
  ctx.fillText('valentinedulac9@gmail.com', PL + 230, H - 32);

  // right-align "Red Agency"
  ctx.fillText('RED AGENCY · CHEF DE GROUPE DIGITAL', W - PL - 340, H - 32);

  // ── portrait ─────────────────────────────────────────────
  try {
    const portraitPath = path.join(ROOT, 'project/assets/valentine.png');
    const img = await loadImage(portraitPath);

    const r  = 170;              // rayon réduit
    const cx = W - 80 - r;      // même padding à droite qu'à gauche (80px)
    const cy = 272;

    ctx.save();

    // subtle outer glow
    const halo = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r + 60);
    halo.addColorStop(0,   'rgba(169,155,198,0.18)');
    halo.addColorStop(1,   'rgba(22,21,26,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 60, 0, Math.PI * 2);
    ctx.fill();

    // clip to circle and draw portrait
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const size = r * 2;
    ctx.drawImage(img, cx - r, cy - r, size, size);

    // blend grey background into dark bg — radial overlay darker at edges
    const blend = ctx.createRadialGradient(cx, cy, r * 0.42, cx, cy, r);
    blend.addColorStop(0, 'rgba(22,21,26,0)');
    blend.addColorStop(1, 'rgba(22,21,26,0.82)');
    ctx.fillStyle = blend;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // lavender ring (dessiné après clip restauré)
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
  } catch (e) {
    const r = 170, cx = W - 80 - 170, cy = 272;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = SURFACE;
    ctx.fill();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 3;
    ctx.stroke();
  }


  // ── save ─────────────────────────────────────────────────
  const out = path.join(ROOT, 'project/assets/og.png');
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(out, buf);
  console.log(`✓ OG image saved → ${out}  (${(buf.length / 1024).toFixed(0)} KB)`);
}

generate().catch((err) => { console.error(err); process.exit(1); });

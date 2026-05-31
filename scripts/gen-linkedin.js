// Generates project/assets/linkedin-banner.png (1584×396)
// Bannière branding — pas de nom ni photo (LinkedIn les affiche déjà par-dessus)
const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

registerFont(path.join(ROOT, 'project/assets/fonts/Archivo-Black.ttf'), {
  family: 'Archivo',
  weight: '900',
});

const W = 1584;
const H = 396;

const BG      = '#16151a';
const ACCENT  = '#a99bc6';
const FG      = '#f4f1ee';
const FG_MUTE = '#8b8693';
const LINE    = 'rgba(244,241,238,0.12)';

function generate() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // ── background ────────────────────────────────────────────
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // lueur radiale lavande (haut-droite, là où vit le contenu)
  const glow = ctx.createRadialGradient(W - 380, -60, 0, W - 380, -60, 620);
  glow.addColorStop(0,   'rgba(169,155,198,0.24)');
  glow.addColorStop(0.6, 'rgba(169,155,198,0.05)');
  glow.addColorStop(1,   'rgba(22,21,26,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // lueur douce diffuse au centre pour la profondeur
  const glow2 = ctx.createRadialGradient(W / 2, H + 60, 0, W / 2, H + 60, 520);
  glow2.addColorStop(0, 'rgba(122,111,155,0.10)');
  glow2.addColorStop(1, 'rgba(22,21,26,0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  const PR = 80;              // padding droit
  const xRight = W - PR;      // ligne de droite (tout est aligné à droite)

  // ── eyebrow (mono lavande, aligné à droite) ───────────────
  ctx.textAlign = 'right';
  ctx.font = '700 14px "DejaVu Sans Mono", monospace';
  ctx.fillStyle = ACCENT;
  ctx.fillText('CHEF DE PROJET COMMUNICATION & DIGITAL', xRight, 96);

  // petit trait lavande sous l'eyebrow
  ctx.fillStyle = ACCENT;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(xRight - 90, 112, 90, 2);
  ctx.globalAlpha = 1;

  // ── 3 mots-clés empilés (effet affiche) ───────────────────
  const keywords = [
    { t: 'GESTION DE PROJET',  c: FG },
    { t: 'COMMUNICATION 360°', c: ACCENT },
    { t: 'STRATÉGIE',          c: FG },
  ];

  ctx.font = '900 56px "Archivo", "Liberation Sans", sans-serif';
  const lineH = 70;
  const blockTop = 175;      // baseline de la 1re ligne

  keywords.forEach(({ t, c }, i) => {
    ctx.fillStyle = c;
    ctx.fillText(t, xRight, blockTop + i * lineH);
  });

  // ── détail bas-droite (mono muted) ────────────────────────
  ctx.font = '400 13px "DejaVu Sans Mono", monospace';
  ctx.fillStyle = FG_MUTE;
  ctx.fillText('PARIS · 75004   —   DISPONIBLE POUR DE NOUVELLES OPPORTUNITÉS', xRight, 360);

  // reset
  ctx.textAlign = 'left';

  // ── save ──────────────────────────────────────────────────
  const out = path.join(ROOT, 'project/assets/linkedin-banner.png');
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(out, buf);
  console.log(`✓ LinkedIn banner saved → ${out}  (${(buf.length / 1024).toFixed(0)} KB)`);
}

generate();

const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const scale = size / 512;

  // Dark background
  const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.7);
  bgGrad.addColorStop(0, '#0a1a1a');
  bgGrad.addColorStop(1, '#050810');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Green glow behind ball
  const glowGrad = ctx.createRadialGradient(cx, cy + 10 * scale, 50 * scale, cx, cy + 10 * scale, 220 * scale);
  glowGrad.addColorStop(0, 'rgba(6, 214, 160, 0.6)');
  glowGrad.addColorStop(0.5, 'rgba(6, 214, 160, 0.2)');
  glowGrad.addColorStop(1, 'rgba(6, 214, 160, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy + 10 * scale, 220 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Ball shadow
  ctx.beginPath();
  ctx.arc(cx + 5 * scale, cy + 20 * scale, 160 * scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fill();

  // Main ball
  const ballR = 155 * scale;
  const ballGrad = ctx.createRadialGradient(
    cx - 40 * scale, cy - 50 * scale, 10 * scale,
    cx, cy + 10 * scale, ballR
  );
  ballGrad.addColorStop(0, '#ffffff');
  ballGrad.addColorStop(0.3, '#f5f0e0');
  ballGrad.addColorStop(0.7, '#e8dcc8');
  ballGrad.addColorStop(1, '#c8bca8');
  ctx.beginPath();
  ctx.arc(cx, cy + 10 * scale, ballR, 0, Math.PI * 2);
  ctx.fillStyle = ballGrad;
  ctx.fill();

  // Ball highlight
  const hlGrad = ctx.createRadialGradient(
    cx - 30 * scale, cy - 30 * scale, 5 * scale,
    cx - 30 * scale, cy - 30 * scale, 80 * scale
  );
  hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
  hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.beginPath();
  ctx.arc(cx, cy + 10 * scale, ballR, 0, Math.PI * 2);
  ctx.fillStyle = hlGrad;
  ctx.fill();

  // Star
  const starX = cx + 110 * scale;
  const starY = cy - 110 * scale;
  const starR = 65 * scale;

  // Star glow
  const starGlowGrad = ctx.createRadialGradient(starX, starY, 0, starX, starY, starR * 1.8);
  starGlowGrad.addColorStop(0, 'rgba(255, 180, 0, 0.5)');
  starGlowGrad.addColorStop(1, 'rgba(255, 180, 0, 0)');
  ctx.fillStyle = starGlowGrad;
  ctx.beginPath();
  ctx.arc(starX, starY, starR * 1.8, 0, Math.PI * 2);
  ctx.fill();

  // Star shape
  function drawStar5(cx, cy, r, innerR) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI / 5);
      const rad = i % 2 === 0 ? r : innerR;
      if (i === 0) ctx.moveTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad);
      else ctx.lineTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad);
    }
    ctx.closePath();
  }

  drawStar5(starX, starY, starR, starR * 0.42);
  const starGrad = ctx.createRadialGradient(
    starX - 10 * scale, starY - 10 * scale, 0,
    starX, starY, starR
  );
  starGrad.addColorStop(0, '#ffe066');
  starGrad.addColorStop(0.5, '#ffb833');
  starGrad.addColorStop(1, '#e69500');
  ctx.fillStyle = starGrad;
  ctx.fill();

  // Star highlight
  const starHl = ctx.createRadialGradient(
    starX - 10 * scale, starY - 15 * scale, 0,
    starX - 10 * scale, starY - 15 * scale, 30 * scale
  );
  starHl.addColorStop(0, 'rgba(255, 255, 220, 0.6)');
  starHl.addColorStop(1, 'rgba(255, 255, 220, 0)');
  drawStar5(starX, starY, starR, starR * 0.42);
  ctx.fillStyle = starHl;
  ctx.fill();

  return canvas.toBuffer('image/png');
}

fs.writeFileSync('icon-512.png', generateIcon(512));
fs.writeFileSync('icon-192.png', generateIcon(192));
console.log('Generated icon-512.png and icon-192.png');

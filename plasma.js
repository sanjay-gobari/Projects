const canvas = document.getElementById("plasmaCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

class PlasmaParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 10;
    this.distance = 20 + Math.random() * 100;
    this.speed = 0.001 + Math.random() * 0.001;
    this.size = 2 + Math.random() * 3;
    this.color = `hsla(${Math.random() * 30 + 0}, 100%, 50%, 1)`;
  }

  update() {
    this.angle += this.speed;
    this.radius += (Math.random() - 0.5) * 0.5;
    this.distance += Math.sin(this.angle * 2) * 0.1;
    if (this.distance > 150 || this.distance < 10) this.reset();
  }

  draw() {
    const x = centerX + Math.cos(this.angle) * this.distance;
    const y = centerY + Math.sin(this.angle) * this.distance;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 4);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 50 }, () => new PlasmaParticle());

function drawCoreGlow() {
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
  gradient.addColorStop(0, "rgba(255, 0, 0, 0.6)");
  gradient.addColorStop(0.4, "rgba(255, 50, 0, 0.3)");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.fillStyle = "#06030f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCoreGlow();

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
canvas.width = 300;
canvas.height = 300;
});
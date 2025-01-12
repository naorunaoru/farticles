import { getRandomElement, getRandomBellCurve } from "./utils";

function hexToRgb(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

export class Particle {
  constructor(system, { x, y }) {
    this.system = system;

    this.initialX = x;
    this.initialY = y;

    this.reset();
  }

  reset() {
    this.baseColor = hexToRgb(getRandomElement(this.system.config.baseColors));

    this.size = Math.max(
      getRandomBellCurve(
        this.system.config.baseSize,
        this.system.config.sizeDeviation
      ),
      0.1
    );
    this.maxOpacity = Math.min(1, this.system.config.baseSize / this.size);

    this.x = this.initialX;
    this.y = this.initialY;

    this.velocityX = 0;
    this.velocityY = 0;

    this.state = "fadeIn";
    this.opacity = 0;
    this.life = 0;
    this.maxLife = getRandomBellCurve(
      this.system.config.baseLife,
      this.system.config.lifeDeviation
    );

    const angle = Math.random() * Math.PI * 2;

    this.velocityX = Math.cos(angle) * this.system.config.driftSpeed;
    this.velocityY = Math.sin(angle) * this.system.config.driftSpeed;

    this.annihilationRadius = getRandomBellCurve(
      this.system.config.baseAnnihilationRadius,
      1
    );
  }

  applyForce(forceX, forceY) {
    this.velocityX += forceX * this.system.config.mass;
    this.velocityY += forceY * this.system.config.mass;
  }

  update(deltaTime) {
    this.life += deltaTime;
    const dt = deltaTime / 20; // Normalize time step

    switch (this.state) {
      case "fadeIn":
        this.opacity += deltaTime * 0.002;
        if (this.opacity >= this.maxOpacity) {
          this.opacity = this.maxOpacity;
          this.state = "idle";
        }
        break;

      case "idle":
        if (this.life > this.maxLife) {
          this.state = "fadeOut";
        }
        this.updatePhysics(dt);
        break;

      case "fadeOut":
        this.opacity -= deltaTime * 0.001;
        this.updatePhysics(dt);

        if (this.opacity <= 0 || this.y <= 5) {
          this.reset();
        }
        break;

      case "annihilation":
        this.opacity -= this.system.config.annihilationSpeed;

        this.velocityX *= 0.9;
        this.velocityY *= 0.9;

        this.x += this.velocityX * dt;
        this.y += this.velocityY * dt;

        if (this.opacity <= 0) {
          this.reset();
        }
        break;
    }
  }

  updatePhysics(dt) {
    this.applyForce(0, -this.system.config.upwardForce);

    if (this.system.isMouseOver) {
      const dx = this.system.mouseX - this.x;
      const dy = this.system.mouseY - this.y;
      const distanceSquared = dx * dx + dy * dy;
      const distance = Math.sqrt(distanceSquared);

      if (distance < this.system.config.attractionRadius) {
        if (
          distance < this.annihilationRadius &&
          this.state !== "annihilation"
        ) {
          this.state = "annihilation";

          return;
        }

        const force =
          this.system.config.cursorGravity / Math.max(distanceSquared, 100);
        const forceX = dx * force;
        const forceY = dy * force;

        this.applyForce(forceX, forceY);
      }
    }

    this.velocityX *= this.system.config.friction;
    this.velocityY *= this.system.config.friction;

    this.x += this.velocityX * dt;
    this.y += this.velocityY * dt;
  }

  draw() {
    this.system.ctx.beginPath();
    this.system.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.system.ctx.fillStyle = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, ${this.opacity})`;
    this.system.ctx.fill();
  }
}

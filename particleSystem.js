var farticles = (function (exports) {
  'use strict';

  const getRandomBellCurve = (mean, stdDev) => {
    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    return z0 * stdDev + mean;
  };

  const getRandomElement = (array) => {
    if (array.length === 0) {
      throw new Error("Cannot pick a random element from an empty array");
    }
    return array[Math.floor(Math.random() * array.length)];
  };

  function hexToRgb(hex) {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }

  class Particle {
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

  class PixelDetector {
    width = 0;
    height = 0;

    constructor(width, height) {
      this.width = width;
      this.height = height;

      this.canvas = new OffscreenCanvas(this.width, this.height);
      this.ctx = this.canvas.getContext("2d");
    }

    async loadAndDrawSVG(svgUrl, x, y, width, height) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.ctx.drawImage(img, x, y, width, height);
          resolve();
        };
        img.onerror = reject;
        img.src = svgUrl;
      });
    }

    getOpaquePixels() {
      const imageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const pixels = [];

      for (let y = 0; y < this.canvas.height; y++) {
        for (let x = 0; x < this.canvas.width; x++) {
          const index = (y * this.canvas.width + x) * 4;
          if (imageData.data[index + 3] > 0) {
            pixels.push({
              x,
              y,
            });
          }
        }
      }

      return pixels;
    }
  }

  const DEFAULT_CONFIG = {
    maxParticles: 10000,
    baseSize: 0.7,
    sizeDeviation: 0.8,
    baseLife: 1000,
    lifeDeviation: 800,
    mass: 1,
    cursorGravity: 1,
    attractionRadius: 100,
    upwardForce: 0.005,
    friction: 0.99,
    baseAnnihilationRadius: 10,
    annihilationSpeed: 0.05,
    driftSpeed: 0.1,
    baseColors: ["#d4e4ff", "#bddaff"],
    padding: 20,
  };

  function sampleN(array, n) {
    if (n > array.length) {
      throw new Error("Sample size cannot be larger than array length");
    }

    const copy = [...array];

    for (let i = 0; i < n; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, n);
  }

  class ParticleSystem {
    constructor(url, { canvas, config = {} }) {
      this.url = url;
      this.canvas = canvas;

      this.config = {
        ...DEFAULT_CONFIG,
        ...config,
      };

      this.ctx = null;
      this.mouseX = 0;
      this.mouseY = 0;
      this.particles = [];
      this.lastTime = performance.now();
      this.isMouseOver = false;
    }

    setupCanvasDPI = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();

      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;

      this.ctx.scale(dpr, dpr);
    };

    init = async () => {
      if (!this.canvas) {
        console.error("Required elements not found");
        return;
      }

      const detector = new PixelDetector(
        this.canvas.offsetWidth,
        this.canvas.offsetHeight
      );
      try {
        await detector.loadAndDrawSVG(
          this.url,
          this.config.padding,
          this.config.padding,
          this.canvas.offsetWidth - this.config.padding * 2,
          this.canvas.offsetHeight - this.config.padding * 2
        );

        this.pointData = detector.getOpaquePixels();
      } catch (error) {
        console.error("you are penis", error);
      }

      this.setPoints();

      this.ctx = this.canvas.getContext("2d");

      this.setupCanvasDPI();

      this.canvas.addEventListener("mousemove", this.handleMouseMove);
      this.canvas.addEventListener("mouseleave", this.handleMouseLeave);

      this.animate();
    };

    setPoints = () => {
      this.particles = sampleN(this.pointData, this.config.maxParticles).map(
        (pixel) => new Particle(this, pixel)
      );
    };

    setConfig = (config) => {
      this.config = Object.assign(this.config, config);

      this.setPoints();
    };

    handleMouseMove = (e) => {
      this.isMouseOver = true;
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    };

    handleMouseLeave = () => {
      this.isMouseOver = false;
    };

    animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((particle) => {
        particle.update(deltaTime);
        particle.draw();
      });

      requestAnimationFrame(this.animate);
    };
  }

  exports.ParticleSystem = ParticleSystem;

  return exports;

})({});

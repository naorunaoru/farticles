import { Particle } from "./particle";
import { PixelDetector } from "./pixelDetector";

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

export class ParticleSystem {
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

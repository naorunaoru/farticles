import { Particle } from "./particle";
import { getRandomInt } from "./utils";

const DEFAULT_CONFIG = {
  maxParticles: 10000,
  baseSize: 0.7,
  baseLife: 1000,
  mass: 1,
  cursorGravity: 0.2,
  attractionRadius: 100,
  upwardForce: 0.005,
  friction: 0.99,
  annihilationRadius: 10 + getRandomInt(-5, 5),
  annihilationSpeed: 0.05,
  driftSpeed: 0.1,
  baseColors: ["#d4e4ff", "#bddaff"],
};

export class ParticleSystem {
  constructor({ canvas, svg, config = DEFAULT_CONFIG }) {
    this.canvas = canvas;
    this.svg = svg;

    this.bbox = this.svg.getBoundingClientRect();

    const viewBoxValues = this.svg.viewBox.baseVal;

    this.scaleX = this.bbox.width / viewBoxValues.width;
    this.scaleY = this.bbox.height / viewBoxValues.height;

    this.config = config;

    this.ctx = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.particles = [];
    this.lastTime = performance.now();
    this.isMouseOver = false;
  }

  init = () => {
    if (!this.canvas || !this.svg) {
      console.error("Required elements not found");
      return;
    }

    this.spawnAreas = Array.from(
      this.svg.querySelectorAll("circle, rect, path, polygon, ellipse")
    );

    if (!this.spawnAreas.length) {
      console.error("No spawn areas detected");
    }

    this.ctx = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseenter", this.handleMouseEnter);
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave);

    this.animate();
  };

  setConfig = (config) => {
    this.config = Object.assign(this.config, config);

    if (config.maxParticles < this.particles.length) {
      this.particles.length = config.maxParticles;
    }
  };

  handleMouseMove = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  };

  handleMouseEnter = () => {
    this.isMouseOver = true;
  };

  handleMouseLeave = () => {
    this.isMouseOver = false;
  };

  isPointInShape = (point) => {
    const pointObj = this.svg.createSVGPoint();

    pointObj.x = point.x;
    pointObj.y = point.y;

    const isPointInFill = this.spawnAreas
      .map((shape) => shape.isPointInFill(pointObj))
      .some(Boolean);

    return isPointInFill;
  };

  getRandomPointInShape = () => {
    let point;
    do {
      point = {
        x: this.bbox.x + Math.random() * this.bbox.width,
        y: this.bbox.y + Math.random() * this.bbox.height,
      };
    } while (!this.isPointInShape(point));

    return {
      x: point.x * this.scaleX,
      y: point.y * this.scaleY,
    };
  };

  animate = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.particles.length < this.config.maxParticles) {
      const particlesToAdd = Math.floor(Math.random() * 50);
      for (let i = 1; i <= particlesToAdd; i++) {
        let spawnPoint;

        if (this.spawnAreas.length) {
          spawnPoint = this.getRandomPointInShape();
        } else {
          spawnPoint = {
            x: getRandomInt(0, this.canvas.width),
            y: getRandomInt(0, this.canvas.height),
          };
        }

        this.particles.push(
          new Particle(this, { x: spawnPoint.x, y: spawnPoint.y })
        );
      }
    }

    this.particles.forEach((particle) => {
      particle.update(deltaTime);
      particle.draw();
    });

    requestAnimationFrame(this.animate);
  };
}

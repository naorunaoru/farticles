import { ParticleSystem } from "../dist/particleSystem";

import GUI from "lil-gui";

function initializeGUI(particleSystem) {
  const gui = new GUI();

  // Particles
  const particleFolder = gui.addFolder("Particles");
  particleFolder
    .add(particleSystem.config, "maxParticles", 1000, 50000, 1000)
    .onChange((value) => {
      particleSystem.setConfig({ maxParticles: value });
    });
  particleFolder
    .add(particleSystem.config, "baseSize", 0.1, 2, 0.1)
    .onChange((value) => {
      particleSystem.setConfig({ baseSize: value });
    });
  particleFolder
    .add(particleSystem.config, "baseLife", 100, 5000, 100)
    .onChange((value) => {
      particleSystem.setConfig({ baseLife: value });
    });
  particleFolder
    .add(particleSystem.config, "lifeDeviation", 0, 1000, 50)
    .onChange((value) => {
      particleSystem.setConfig({ baseLife: value });
    });

  // Physics
  const physicsFolder = gui.addFolder("Physics");
  physicsFolder
    .add(particleSystem.config, "mass", 0.1, 5, 0.1)
    .onChange((value) => {
      particleSystem.setConfig({ mass: value });
    });
  physicsFolder
    .add(particleSystem.config, "cursorGravity", 0, 5, 0.1)
    .onChange((value) => {
      particleSystem.setConfig({ cursorGravity: value });
    });
  physicsFolder
    .add(particleSystem.config, "attractionRadius", 10, 300, 10)
    .onChange((value) => {
      particleSystem.setConfig({ attractionRadius: value });
    });
  physicsFolder
    .add(particleSystem.config, "upwardForce", 0, 0.05, 0.001)
    .onChange((value) => {
      particleSystem.setConfig({ upwardForce: value });
    });
  physicsFolder
    .add(particleSystem.config, "friction", 0.8, 1, 0.01)
    .onChange((value) => {
      particleSystem.setConfig({ friction: value });
    });

  // Annihilation
  const annihilationFolder = gui.addFolder("Annihilation");
  annihilationFolder
    .add(particleSystem.config, "baseAnnihilationRadius", 1, 20, 1)
    .onChange((value) => {
      particleSystem.setConfig({ baseAnnihilationRadius: value });
    });
  annihilationFolder
    .add(particleSystem.config, "annihilationSpeed", 0, 0.2, 0.01)
    .onChange((value) => {
      particleSystem.setConfig({ annihilationSpeed: value });
    });

  // Movement
  const movementFolder = gui.addFolder("Movement");
  movementFolder
    .add(particleSystem.config, "driftSpeed", 0, 1, 0.05)
    .onChange((value) => {
      particleSystem.setConfig({ driftSpeed: value });
    });

  // Colors
  const colorsFolder = gui.addFolder("Colors");
  const colorConfig = {
    color1: particleSystem.config.baseColors[0],
    color2: particleSystem.config.baseColors[1],
  };

  colorsFolder.addColor(colorConfig, "color1").onChange((value) => {
    particleSystem.setConfig({
      baseColors: [value, particleSystem.config.baseColors[1]],
    });
  });
  colorsFolder.addColor(colorConfig, "color2").onChange((value) => {
    particleSystem.setConfig({
      baseColors: [particleSystem.config.baseColors[0], value],
    });
  });

  // Open folders by default
  particleFolder.open();
  physicsFolder.open();
  annihilationFolder.open();
  movementFolder.open();
  colorsFolder.open();

  return gui;
}

const svg = document.getElementById("constraint");
const canvas = document.getElementById("particleCanvas");

svg.addEventListener("load", () => {
  const system = new ParticleSystem({ canvas, svg });

  system.init();

  initializeGUI(system);
});

class Particle {
  constructor(x, y, particleColor) {
    this.x = x; // Initial position (collision point)
    this.y = y;
    this.vx = random(-2, 2); // Random x velocity
    this.vy = random(-4, -1); // Upward motion
    this.alpha = 255; // Transparency for fading
    this.size = random(5, 10); // Size of particle
    this.color = particleColor;
  }

  update() {
    this.x += this.vx; // Update position
    this.y += this.vy;
    this.alpha -= 5; // Fade out over time
  }

  show() {
    noStroke();
    this.color.setAlpha(this.alpha);
    fill(this.color); // White particles with fading
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0; // Particle is dead when fully transparent
  }
}

class ParticleSystem {
  constructor(particleColor) {
    this.particles = []; // Array to hold particles
    this.color = particleColor;
  }

  emit(x, y) {
    for (let i = 0; i < 10; i++) {
      // Emit multiple particles
      this.particles.push(new Particle(x, y, this.color));
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1); // Remove dead particles
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}

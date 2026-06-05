let time = 0;

const SEEDS = [12, 16, 34, 122];

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(1);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 2;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

const Particle = function () {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.velocityMag = random(0.5, 2);

  this.addForce = function (force) {
    this.velocity = force;
  };

  this.update = function (velocity) {
    // this.velocity.add(this.acceleration);
    velocity.setMag(this.velocityMag);
    this.position.add(velocity);

    if (this.position.x > width)
      this.position = createVector(0, random(height));
    if (this.position.x < 0)
      this.position = createVector(width, random(height));
    if (this.position.y > height)
      this.position = createVector(random(width), 0);
    if (this.position.y < 0)
      this.position = createVector(random(width), height);
  };

  this.show = function () {
    point(this.position.x, this.position.y);
  };
};

const particles = [];

function setup() {
  noiseSeed(SEEDS[Math.floor(random(SEEDS.length * 2) / 2)]);
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle());
  }
  background(0);
}

function draw() {
  // for (let x = 0; x < width; x += scale) {
  //   for (let y = 0; y < height; y += scale) {
  //     const angle = noise(x / 1000, y / 1000, time * 10) * TWO_PI;

  //     drawArrow(
  //       createVector(x, y),
  //       p5.Vector.fromAngle(angle).setMag(scale),
  //       color(100),
  //     );
  //   }
  // }

  colorMode(HSL);

  strokeWeight(1.25);
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    // why doesn't it ever flow to the right
    const angle =
      noise(
        particle.position.x / width / 2,
        particle.position.y / height / 2,
        time / 2,
      ) *
      TWO_PI *
      4;
    stroke(
      noise(i, angle / TWO_PI) * 40 + 20,
      100,
      noise(i, angle / TWO_PI) * 30 + 30,
      0.1,
    );
    const velocity = p5.Vector.fromAngle(angle);
    particle.update(velocity);
    point(particle.position.x, particle.position.y);
  }

  time += 0.001;
}

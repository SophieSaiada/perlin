let time = 0;
const scale = 20;

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
  this.velocityMag = random(0.25, 1.25);

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

let bgColor;

function setup() {
  createCanvas(windowWidth / 4, windowHeight / 4);
  for (let i = 0; i < 4000; i++) {
    particles.push(new Particle());
  }
  colorMode(HSL);
  bgColor = color(200, 70, 30);
  background(bgColor);
  bgColor.setAlpha(12);
}

function draw() {
  background(bgColor);

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

  strokeWeight(3);
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    // why doesn't it ever flow to the right
    const angle =
      noise(
        (particle.position.x / width) * 5,
        (particle.position.y / height) * 5,
        time * 5,
      ) * TWO_PI;
    stroke((angle / TWO_PI) * 40 + 180, 100, (angle / TWO_PI) * 90 + 30);
    const velocity = p5.Vector.fromAngle(angle);
    particle.update(velocity);
    point(particle.position.x, particle.position.y);
  }

  time += 0.001;
}

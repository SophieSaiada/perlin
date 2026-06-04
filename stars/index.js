function setup() {
  createCanvas(windowWidth, windowHeight);
}

const NEW_LOCAL = 8;
const CIRCLE_RADIUS = 25;
const STROKE_WIDTH = 1;
const ANGLE_STEP = 2;
const BOBBLE_RATE = 0.5;
let time = 0;

function draw() {
  const circleY = windowHeight / 2;

  background(0);
  noStroke();

  colorMode(HSL);

  for (
    let initialX = -windowWidth / 10;
    initialX < windowWidth * 1.1;
    initialX++
  ) {
    const initialY = circleY + initialX - windowWidth / 2;
    const localNoise = noise(
      initialX,
      initialY,
      mouseX / windowWidth + time / 20,
    );
    const offset = map(localNoise, 0, 1, -1, 1) * 250;

    const depth = noise(initialX, 1000);
    fill(map(noise(initialX, 5), 0, 1, 0, 420), 50, map(depth, 0, 1, 50, 90));
    circle(initialX + offset, initialY - offset, map(depth, 0, 1, 1, 3));
  }

  time += 1 / frameRate();
}

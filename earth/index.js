const WIDTH = 200;
const HEIGHT = 200;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  pixelDensity(4);
  noiseSeed(10);
}

const NEW_LOCAL = 8;
const CIRCLE_RADIUS = 25;
const STROKE_WIDTH = 1;
const ANGLE_STEP = 2;
const BOBBLE_RATE = 0.5;
let darkMode = false;
let time = 0;

function mouseClicked() {
  darkMode = !darkMode;
}

function draw() {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const localNoise = noise(x / 30, y / 30, time / 20);
      const windNoise = map(
        noise(x / 15 + time / 5, y / 15 + time / 10, time / 5 + 1600),
        0,
        1,
        0,
        175,
      );
      const windOffset = windNoise > 75 ? windNoise - 75 : 0;
      const color = getColor(localNoise, x, y, time, windOffset);
      // fill(map(color, 0, 1, 0, 255));
      set(x, y, color);
    }
  }

  updatePixels();

  time += 1 / frameRate();
}
const THRESHOLD = 0.5;
const rgb = (r, g, b) => [r, g, b, 255];
function getColor(localNoise, x, y, time, windOffset) {
  if (!darkMode) {
    if (localNoise < THRESHOLD) {
      return color(63 + windOffset, 119 + windOffset, 198 + windOffset);
    }

    if (localNoise < 0.03 + THRESHOLD) {
      return color(95 + windOffset, 145 + windOffset, 30 + windOffset);
    }

    return color(140 + windOffset, 198 + windOffset, 63 + windOffset);
  }

  if (localNoise < THRESHOLD) {
    return rgb(0 + windOffset, 4 + windOffset, 27 + windOffset);
  }

  if (localNoise < 0.03 + THRESHOLD) {
    return rgb(17 + windOffset, 20 + windOffset, 32 + windOffset);
  }

  const newLocal = noise(x, y, time / 3);
  return lerpColor(
    color(rgb(4 + windOffset, 22 + windOffset, 8 + windOffset)),
    color(rgb(255 + windOffset, 255 + windOffset, 143 + windOffset)),
    newLocal > 0.6 ? (newLocal - 0.6) * 2 : 0,
  );
}

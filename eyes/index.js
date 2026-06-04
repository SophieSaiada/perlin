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

  const mouseNoise = map(
    noise(mouseX / windowWidth, mouseY / windowHeight),
    0,
    1,
    0,
    5,
  );

  for (let x = 0; x < NEW_LOCAL; x++) {
    for (let y = 0; y < NEW_LOCAL; y++) {
      drawCircle({
        circleX: (windowWidth / NEW_LOCAL) * (x + (y % 2 ? 0.5 : 0) + 0.25),
        CIRCLE_RADIUS,
        circleY: (windowHeight / NEW_LOCAL) * (y + 0.5),
        mouseNoise,
      });
    }
  }

  time += 1 / frameRate();
}
const drawCircle = ({ circleX, CIRCLE_RADIUS, circleY }) => {
  const radius = map(
    constrain(
      dist(0, 0, abs(circleX - mouseX), abs(circleY - mouseY)),
      0,
      min(windowWidth, windowHeight) / 4,
    ),
    0,
    min(windowWidth, windowHeight) / 4,
    CIRCLE_RADIUS * 3,
    CIRCLE_RADIUS,
  );

  const circleNoise = noise(circleX, circleY);
  for (let angle = 0; angle < 360; angle += ANGLE_STEP) {
    const angleRad = radians(angle);
    const xoff = map(cos(angleRad), -1, 1, 0, BOBBLE_RATE);
    const yoff = map(sin(angleRad), -1, 1, 0, BOBBLE_RATE);
    const pointNoise = noise(xoff + time / 5, yoff + time / 5, circleNoise / 2);

    const radiusWithNoise = map(pointNoise, 0, 1, 0, radius);
    const pointX = circleX + radiusWithNoise * cos(angleRad);
    const pointY = circleY - radiusWithNoise * sin(angleRad);

    colorMode(HSL);
    fill((angle / 3 + circleNoise * 360 * 2) % 360, 50, 50, 1);

    const strokeWidth = radius * 0.02 * map(pointNoise, 0, 1, 0, 50);
    ellipse(pointX, pointY, strokeWidth, strokeWidth);
  }
};

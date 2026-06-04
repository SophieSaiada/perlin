const BOBBLE_MULTIPLIER = 1.5;
const VERTEX_COUNT = 360;
let time = 0;
let radius = 0;

let minRad = 200;
let maxRad = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = windowWidth / 3;
}

function draw() {
  const circleY = windowHeight / 2;
  translate(width / 2, height / 2);

  background(0);
  noStroke();

  // colorMode(HSL);
  stroke(255, 255, 255);
  noFill();
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / VERTEX_COUNT) {
    const xOffset = radius * cos(angle);
    const yOffset = radius * sin(angle);

    const x = lerp(
      xOffset,
      xOffset * BOBBLE_MULTIPLIER,
      noise(xOffset, yOffset, time / 4),
    );
    const y = lerp(
      yOffset,
      yOffset * BOBBLE_MULTIPLIER,
      noise(xOffset, yOffset, time / 4),
    );
    vertex(x, y);
  }
  endShape(CLOSE);

  time += 1 / frameRate();
}

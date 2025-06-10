let doveImg;
let dots = [];

function preload() {
  doveImg = loadImage("assets/Pablo Picasso Dove of peace.jpg");
}

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  doveImg.resize(600, 0); // Resize to fit canvas
  doveImg.loadPixels();

  // Center the image
  let xOffset = (width - doveImg.width) / 2;
  let yOffset = (height - doveImg.height) / 2;

  // Loop through pixels
  for (let y = 0; y < doveImg.height; y += 3) {
    for (let x = 0; x < doveImg.width; x += 3) {
      let idx = (x + y * doveImg.width) * 4;
      let r = doveImg.pixels[idx];
      let g = doveImg.pixels[idx + 1];
      let b = doveImg.pixels[idx + 2];
      let brightness = (r + g + b) / 3;

      // Only draw dots for dark pixels (outline)
      if (brightness < 80) {
        dots.push({ x: x + xOffset, y: y + yOffset });
      }
    }
  }

  noLoop(); // Draw once, no animation needed
}

function draw() {
  background(255);
  fill(0);
  noStroke();

  for (let dot of dots) {
    ellipse(dot.x, dot.y, 2.5, 2.5);
  }

  fill(50);
  textSize(14);
  text("Dove outline drawn with dots based on brightness", 20, height - 20);
}
let doveImg;
let dots = [];

function preload() {
  doveImg = loadImage("assets/dove-1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Accurate pixel-to-pixel mapping

  doveImg.resize(600, 0);
  doveImg.loadPixels();

  // Center the image
  let xOffset = (width - doveImg.width) / 2;
  let yOffset = (height - doveImg.height) / 2;

  // Scan image and add a dot for each dark pixel
  for (let y = 0; y < doveImg.height; y += 3) {
    for (let x = 0; x < doveImg.width; x += 3) {
      let index = (x + y * doveImg.width) * 4;
      let r = doveImg.pixels[index];
      let g = doveImg.pixels[index + 1];
      let b = doveImg.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      if (brightness < 50) {
        dots.push(new Dot(x + xOffset, y + yOffset));
      }
    }
  }

  noStroke();
  fill(0);
}

function draw() {
  background(255);
  let mouse = createVector(mouseX, mouseY);

  for (let dot of dots) {
    dot.update(mouse);
    dot.display();
  }

  fill(100);
  textSize(14);
  text("Drag the mouse to animate the dove lines!", 20, height - 20);
}

class Dot {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.pos = this.origin.copy();
    this.vel = createVector(0, 0);
  }

  update(mouseVec) {
    let dir = p5.Vector.sub(this.pos, mouseVec);
    let d = dir.mag();

    if (d < 80 && mouseIsPressed) {
      dir.setMag(1.2);
      this.vel.add(dir);
    }

    this.vel.mult(0.9);        // Apply friction
    this.pos.add(this.vel);   // Update position

    let back = p5.Vector.sub(this.origin, this.pos); // Pull back to original spot
    back.mult(0.03);
    this.pos.add(back);
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 2.8, 2.8);
  }
}
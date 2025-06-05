let doveImg;
let dots = [];
let song;
let analyser;

function preload() {
  doveImg = loadImage("assets/dove-1.png");
  song = loadSound("assets/piano-loops-093-effect-120-bpm.wav"); // replace with your audio
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  doveImg.resize(800, 0);
  doveImg.loadPixels();

  let xOffset = (width - doveImg.width) / 2;
  let yOffset = (height - doveImg.height) / 2;

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

  analyser = new p5.Amplitude();
  analyser.setInput(song);

  let button = createButton("Sound");
  button.position(20, height - 40);
  button.mousePressed(() => {
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.loop();
    }
  });

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

  // Optional: Visualize the sound with a floating circle
  let rms = analyser.getLevel(); // volume
  fill(200, 180);
  ellipse(width - 60, height - 60, 10 + rms * 200);

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

    this.vel.mult(0.9);
    this.pos.add(this.vel);

    let back = p5.Vector.sub(this.origin, this.pos);
    back.mult(0.03);
    this.pos.add(back);
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 2.8, 2.8);
  }
}
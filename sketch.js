
let doveImg;
let dots = [];

function preload() {
  // 加载鸽子图像（确保文件路径正确）
  doveImg = loadImage("assets/pngtree-peace-dove-hand-drawn-bird-olive-branch-vector-illustration-png-image_6412538.png");
}


function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  doveImg.resize(600, 0); // 缩小一点以适配画布
  doveImg.loadPixels();

  for (let y = 0; y < doveImg.height; y += 3) {
    for (let x = 0; x < doveImg.width; x += 3) {
      let index = (x + y * doveImg.width) * 4;
      let r = doveImg.pixels[index];
      let g = doveImg.pixels[index + 1];
      let b = doveImg.pixels[index + 2];

      // 判断是否是线条部分（越黑越保留）
      let brightness = (r + g + b) / 3;
      if (brightness < 50) {
        dots.push(new Dot(x + 100, y + 50)); // 调整坐标偏移以居中
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

  fill(50);
  textSize(14);
  text("Drag the mouse to animate the dove lines!", 20, height +10);
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
    this.vel.mult(0.9); // friction
    this.pos.add(this.vel);

    // 回归原位
    let back = p5.Vector.sub(this.origin, this.pos);
    back.mult(0.03);
    this.pos.add(back);
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 2.8, 2.8);
  }
}

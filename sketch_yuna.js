let doveImg;
let dots = [];

function preload() {
    doveImg = loadImage("assets/pngtree-peace-dove-hand-drawn-bird-olive-branch-vector-illustration-png-image_6412538.png");
}

function setup() {
    createCanvas(800,600);
    pixelDensity(1);
    //Uses 1 physical pixel per canvas pixel
    doveImg.resize(600, 0);
    doveImg.loadPixels();

    for (let y = 0; y < doveImg.height; y += 3) {
        for (let x = 0; x < doveImg.width; x += 3) {
            let index = (x + y * doveImg.width) * 4;
            let r = doveImg.pixels[index];
            let g = doveImg.pixels[index + 1];
            let b = doveImg.pixels[index + 2];

      // keep the dark line
        let brightness = (r + g + b) / 3;
        if (brightness < 50) {
            dots.push(new Dot(x + 100, y + 50)); // adjust (x,y) make it centre 
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

    // back to ori. position
    let back = p5.Vector.sub(this.origin, this.pos);
    back.mult(0.03);
    this.pos.add(back);
    }

    display() {
        ellipse(this.pos.x, this.pos.y, 2.8, 2.8);
    }
}

class Walker {
  constructor(img) {
    this.img = img;
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    image(this.img, this.x, this.y, 50, 50);
    // stroke(0);
    // circle(this.x, this.y, 10);
  }

  step () {

    let step = acceptreject(30);
  
    let stepx = random(-step, step);
    let stepy = random(-step, step);
    this.x += stepx;
    this.y += stepy;

}
}


// accept/reject algorithm. The lower the number, the likelier it is to be chosen.
function acceptreject(amt) {
  while(true) {
    let r1 = random(amt);
    let probability = r1;
    let r2 = random(amt);
    if (r2 > probability) {
      return r1
    }
  }
}
class Particle extends VerletParticle2D {
    constructor(x, y, w, r){
        
        super(x, y, w)
        
        this.r = r;
        
    }

    show() {
        fill(27);
        stroke(0);
        circle(this.x, this.y, this.r)
    }
}



class Food extends VerletParticle2D {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
        
        physics.addBehavior(new AttractionBehavior(this,width,.001));
        console.log(physics)
        
    }
    show(){
        fill(0);
        circle(this.x, this.y, this.r * 2)
    }
    followMouse(){
        let target = new Vec2D(mouseX, mouseY)
        
        let position = new Vec2D(this.x, this.y)
        let desired = target.sub(position);
        desired.magnitude(this.maxSpeed);

        desired.limit(this.maxForce)
        
        this.addForce(desired)
    }
}
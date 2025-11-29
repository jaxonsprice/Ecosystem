class Fish extends VerletParticle2D {
    constructor(img, x, y, w, r) {
        super(x, y, w);
        
        this.r = r;
        this.img = img
        
        
        // physics.addBehavior(new AttractionBehavior(this, width, 10));
        // physics.addBehavior(new AttractionBehavior(this, this.r, -10));
        // this.physics.addParticle(this);
        this.maxSpeed = 1
        this.maxForce = random(1, 5)
        
        
    }
    show(){
        
        
        let position = new Vec2D(this.x, this.y)
        
      
       
       
        let heading = position.heading()

        fill(0);
        push()
        
        translate(this.x, this.y)
        angleMode(RADIANS)
        rotate(heading)
        
        translate(-this.r/2, -this.r/2)
        image(this.img, 0, 0, this.r, this.r)
        
        pop()
       

    }
    seek(target){
        
        // let position = new Vec2D(this.x, this.y)
        // let desired = target.sub(position);
        // desired.magnitude(this.maxSpeed);

        // desired.limit(this.maxForce)

        // this.addForce(desired)
    }
}
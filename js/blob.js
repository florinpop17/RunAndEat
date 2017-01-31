function Blob() {
    this.pos = createVector(width/2, height/2);
    this.r = 30;
    this.speed = 5;
    
    this.show = function() {
        fill(100, 0, 200);
        
        this.move();
        this.edges();
        
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
    this.move = function() {
        if (keyIsDown(LEFT_ARROW))
            this.pos.x-=this.speed;

        if (keyIsDown(RIGHT_ARROW))
            this.pos.x+=this.speed;

        if (keyIsDown(UP_ARROW))
            this.pos.y-=this.speed;

        if (keyIsDown(DOWN_ARROW))
            this.pos.y+=this.speed;
        
    }
    
    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
    
    this.increaseSpeed = function(val) {
        this.speed += val;
    }
}
function Blob() {
    this.pos = createVector(width/2, height/2);
    this.r = 30;
    this.speed = 20;
    
    this.show = function() {
        fill(100, 0, 200);
        
        this.move();
        console.log(this.pos);
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
}
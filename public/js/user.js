function User(id) {
    this.x = width/2;
    this.y = height/2;
    this.r = width / 30;
    this.speed = 5;
    this.name = "Florin";
    this.id = id;
    
    this.show = function() {
        
        this.move();
        this.edges();
        
        fill(255);
        textAlign(CENTER);
        text(`${this.name}(${this.speed.toFixed(2)})`, this.x, this.y - this.r*1.5);
        fill(100, 0, 200);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
    
    this.move = function() {
        if (keyIsDown(LEFT_ARROW))
            this.x -= this.speed;

        if (keyIsDown(RIGHT_ARROW))
            this.x += this.speed;

        if (keyIsDown(UP_ARROW))
            this.y -= this.speed;

        if (keyIsDown(DOWN_ARROW))
            this.y += this.speed;
        
    }
    
    this.edges = function() {
        if (this.x > width + this.r) {
            this.x = -this.r;
        } else if (this.x < -this.r) {
            this.x = width + this.r;
        }
        
        if (this.y > height + this.r) {
            this.y = -this.r;
        } else if (this.y < -this.r) {
            this.y = height + this.r;
        }
    }
    
    this.eat = function(val) {
        this.speed += val / 10;
    }
}
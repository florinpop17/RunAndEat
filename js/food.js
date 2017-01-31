function Food() {
    this.pos = createVector(random(width), random(height));
    this.val = random(1,5);
    this.col = function() {
        return Color(255/(1*this.val), 0, 0);
    }
    
    this.show = function() {
        fill(this.col);
        
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
}
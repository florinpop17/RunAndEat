function Food() {
    this.pos = createVector(random(width), random(height));
    this.r = 10;
    this.val = random(1,5);
    
    this.show = function() {
        fill('white');
        console.log(this.pos.x, this.pos.y)
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
}
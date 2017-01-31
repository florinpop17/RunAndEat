var colors = ['white', 'yellow', 'orange', 'red'];

function Food() {
    this.pos = createVector(random(width), random(height));
    this.r = 10;
    this.val = Math.round(random(1,4));
    
    this.show = function() {
        fill(colors[this.val - 1]);
        
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
    
}
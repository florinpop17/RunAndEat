var blobs = [];
var foods = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    blobs[0] = new Blob();
    
    for(var i=0; i<5; i++){
        foods.push(new Food());
    }
}

function draw() {
    background(0);
    
    foods.forEach(food => { food.show(); });
    
    blobs.forEach(blob => { blob.show(); });
}

function eatFood() {
}
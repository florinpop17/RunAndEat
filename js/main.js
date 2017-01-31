var blob = [];
var foods = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    blob = new Blob();
    
    for(var i=0; i<5; i++){
        foods.push(new Food());
    }
}

function draw() {
    background(0);
    
    foods.forEach(food => {
        food.show();
    });
    
    blob.show();
}
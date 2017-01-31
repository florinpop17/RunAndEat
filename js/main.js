var blob;
var food;

function setup() {
    createCanvas(windowWidth, windowHeight);
    blob = new Blob();
    food = new Food();
}

function draw() {
    background(0);
    blob.show();
    food.show();
}
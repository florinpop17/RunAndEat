var blob;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    blob = new Blob();
    console.log("blobl");
}

function draw() {
    background(0);
    blob.show();
}
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
    
    eatFood();
    
    foods.forEach(food => { food.show(); });
    blobs.forEach(blob => { blob.show(); });
}

function eatFood() {
    blobs.forEach(blob =>{
        foods.forEach(foods =>{
            var d = dist(blob.pos.x, blob.pos.y, foods.pos.x, foods.pos.y);
            if(d < blob.r + foods.r)
                console.log("eat")
        })
    })
}
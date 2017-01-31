var blobs = [];
var foods = [];
var data = {};
var socket;

function setup() {
    socket = io.connect('http://localhost:3000');
    createCanvas(windowWidth, windowHeight);
    blobs[0] = new Blob();
    
    for(var i=0; i<5; i++){
        foods.push(new Food());
    }
    
    data = {blobs, foods};
    
    socket.emit('start', data);
}

function draw() {
    background(0);
    
    eatFood();
    
    if(frameCount % 100 === 0)
        foods.push(new Food());
    
    foods.forEach(food => { food.show(); });
    blobs.forEach(blob => { blob.show(); });
}

function eatFood() {
    blobs.forEach(blob =>{
        foods = foods.filter(food =>{
            var d = dist(blob.pos.x, blob.pos.y, food.pos.x, food.pos.y);
            if(d < blob.r + food.r){
                //Food eaten                
                blob.eat(food.val);
                
                return false;
            }
            return true;
        })
    })
}
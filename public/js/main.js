var users = [];
var foods = [];
var data = {};
var socket;

function setup() {
    socket = io.connect('http://localhost:3000');
    createCanvas(windowWidth, windowHeight);
    users[0] = new User();
    
    for(var i=0; i<5; i++){
        foods.push(new Food());
    }
    
    //doesn't work
    socket.emit('start', users);
}

function draw() {
    background(0);
    
    eatFood();
    
    if(frameCount % 100 === 0)
        foods.push(new Food());
    
    foods.forEach(food => { food.show(); });
    users.forEach(user => { user.show(); });
}

function eatFood() {
    users.forEach(user =>{
        foods = foods.filter(food =>{
            var d = dist(user.x, user.y, food.x, food.y);
            if(d < user.r + food.r){
                //Food eaten                
                user.eat(food.val);
                
                return false;
            }
            return true;
        })
    })
}
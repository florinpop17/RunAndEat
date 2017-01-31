var users = [];
var foods = [];
var data = {};
var socket = io.connect('http://localhost:3000');
socket.emit('start', {users: users});

function setup() {
    createCanvas(windowWidth, windowHeight);
    users[0] = new User();
    
    for(var i=0; i<5; i++){
        foods.push(new Food());
    }
    
    data = {users: users, foods: foods};
    
    
    //Works
//    socket.emit('start', {hi: users[0]});
    
    //doesn't work
    //socket.emit('start', data);
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
            var d = dist(user.pos.x, user.pos.y, food.pos.x, food.pos.y);
            if(d < user.r + food.r){
                //Food eaten                
                user.eat(food.val);
                
                return false;
            }
            return true;
        })
    })
}
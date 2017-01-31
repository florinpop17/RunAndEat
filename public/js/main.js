var user;
var users = [];
var foods = [];
var data = {};
var socket;

function setup() {
    frameRate(1);
    
    socket = io.connect('http://localhost:3000');
    createCanvas(windowWidth, windowHeight);
    user = new User();
    users.push(user);
    
    //doesn't work
    socket.emit('start', user);
    
//    socket.on('send users', function(allUsers){
//        users = allUsers;
//    });
}

function draw() {
    background(0);
    console.log(users);
    
    eatFood();
    
    foods.forEach(food => { food.show(); });
    users.forEach(user => { user.show(); });

//    socket.emit('update', user);
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
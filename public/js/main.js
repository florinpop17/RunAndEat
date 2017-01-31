var user;
var users = [];
var foods = [];
var data = {};
var socket;

function setup() {
    frameRate(1);
    socket = io.connect('http://localhost:3000');
    createCanvas(windowWidth, windowHeight);
    user = new User(socket.id);
    console.log(socket.id, socket);
    users.push(user);
    
    socket.emit('start', user);
    
    socket.on('send users', function(allUsers){
//        users[0] = allUsers;
        console.log(users[0].id, allUsers[0].id);
    });
    
    console.log("end setup");
}

function draw() {
    background(0);
//    console.log(users);
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
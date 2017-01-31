var user;
var users = [];
var foods = [];
var data = {};
var socket;

function setup() {
    socket = io.connect('http://localhost:3000');
    createCanvas(windowWidth, windowHeight);
    
    user = new User();
    
    var data = {
        x: user.x,
        y: user.y,
        r: user.r
    }

    socket.emit('start', data);
    
    socket.on('tick', function(data) {
        users = data;
    });
}

function draw() {
    background(0);
    
    eatFood();
    
    foods.forEach(food => { food.show(); });
    
    for (var i = users.length - 1; i >= 0; i--) {
        var id = users[i].id;
        if (id.substring(2, id.length) !== socket.id) {
        
            fill(0, 0, 255);
            ellipse(users[i].x, users[i].y, users[i].r * 2, users[i].r * 2);
        }
    }
    
    
    
//    console.log(users);
    
    

    user.show();
    
    var data = {
        x: user.x,
        y: user.y,
        r: user.r
    };
    
    socket.emit('update', data);
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
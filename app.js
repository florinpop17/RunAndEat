const express = require('express');
const app = express();
const server = require('http').createServer(app);
var bodyParser = require('body-parser');
const io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3000;

let id = 1;
let users = [];
let foods = [];
let connections = [];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('index.html');
});

server.listen(PORT, function() {
    console.log('Server running on port',PORT);
});

function Food(id, x, y, r, val){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.val = val;
}

function User(id, x, y, r, name, speed, col) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
    this.speed = speed;
    this.col = col;
}


setInterval(draw, 33);
setInterval(addFood, 700);

function addFood(){
    if(foods.length < 40){
        foods.push(new Food(id, Math.random() * 800, Math.random() * 800, 8, Math.floor(Math.random() * 4) + 1));
        id++;
    }
}

function draw(){
    io.sockets.emit('tick', {users, foods});
}

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
    
    socket.on('start', function(data){
        var user = new User(socket.id, data.x, data.y, data.r, data.name, data.speed, data.col);
        users.push(user);
    });
    
    socket.on('update', function(data){
        var newUser = {};
        users.forEach(user => {
            if(user.id === socket.id){
                newUser = user;
            }
        });
        
        newUser.x = data.x;
        newUser.y = data.y;
        newUser.r = data.r;
        newUser.name = data.name;
        newUser.speed = data.speed;
        newUser.col = data.col;
    });
    
    socket.on('eat food', function(foodId){
//        console.log(foodId);
        foods = foods.filter(food => foodId !== food.id);
    });
    
    
    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(user => user.id !== socket.id);
        console.log('Disconnected: %s sockets connected.', connections.length);
    });
});
const express = require('express');
const app = express();
const server = require('http').createServer(app);
var bodyParser = require('body-parser');
const io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3000;

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

function Food(x, y, r, val){
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


setInterval(draw, 3000);
setInterval(addFood, 800);

function addFood(){
    if(foods.length < 50)
        foods.push(new Food(Math.random() * 800, Math.random() * 800, 8, Math.floor(Math.random() * 4) + 1));
}

function draw(){
//    console.log(users, foods);
    console.log(users);
    io.sockets.emit('tick', users);
//    console.log(users);
}

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
    
    socket.on('start', function(data){
        var user = new User(socket.id, data.x, data.y, data.r, data.name, data.speed, data.col);
        users.push(user);
        console.log(users);
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
    
    socket.on('eaten', function(data){
        foods = data; 
    });
    
    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(user => user.id !== socket.id);
        console.log('Disconnected: %s sockets connected.', connections.length);
    });
});
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

setInterval(sendUsers, 3000);

function sendUsers(){
    io.sockets.emit('send users', users);
//    console.log(users);
}

io.sockets.on('connection', function(socket){
    connections.push(socket);
    socket.send(socket.id);
    console.log('Connected: %s sockets connected.', connections.length);
    
    //Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(user => user.id !== socket.id);
        console.log('Disconnected: %s sockets connected.', connections.length);
    });
    
    socket.on('start', function(user){
        console.log("Server start");
        console.log(user);
        user.id = socket.id;
        users.push(user);
    });
    
    socket.on('update', function(user){
        let currentUser = users.find(function(user) {
            return user.id === socket.id;
        });
        console.log(currentUser.id, user.id)
        currentUser = user;
    })
    
//    
//    //Send message
//    socket.on('send message', function(data){
//        console.log(data);
//        io.sockets.emit('new message', {msg: data, user:socket.username}); 
//    });
//    
//    //New user
//    socket.on('new user', function(data, callback){
//        callback(true);
//        socket.username = data;
//        users.push(socket.username);
//        updateUsernames();
//    })
//    
//    function updateUsernames(){
//        io.sockets.emit('get users', users);
//    }
});
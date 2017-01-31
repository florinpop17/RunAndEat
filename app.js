import express from 'express';
import io from 'socket.io';
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

let blobs = [];
let foods = [];
let connections = [];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('index.html');
});

server.listen(PORT, function() {
    console.log('Server running on port',PORT);
})

//io.sockets.on('connection', function(socket){
//    connections.push(socket);
//    console.log('Connected: %s sockets connected.', connections.length);
//    
//    //Disconnect
//    socket.on('disconnect', function(data){
//        users.splice(users.indexOf(socket.username), 1);
//        updateUsernames();
//        connections.splice(connections.indexOf(socket), 1);
//        console.log('Disconnected: %s sockets connected.', connections.length);
//    });
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
//});
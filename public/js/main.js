var user;
var users = [];
var foods = [];
var data = {};
var socket;
var foodColors = ['#ecf0f1', '#3498db', '#2ecc71', '#ff2020'];

var name;

var startGame = false;

var submit = document.getElementById('submit');
var intro = document.getElementById('intro');

submit.addEventListener('click', function(){
    name = document.getElementById('name').value;
    if(name){
        startGame = true;
        intro.style.display = "none";
        user.setName(name);
    } else {
        alert("Please enter your name!");
    }
});

function setup() {
    createCanvas(800, 800);
    socket = io.connect();

    user = new User(name);

    var data = {
        x: user.x,
        y: user.y,
        r: user.r,
        name: user.name,
        speed: user.speed,
        col: user.col
    }
    
    console.log(data);

    socket.emit('start', data);

    socket.on('tick', function(data) {
        console.log(data);
        users = data.users;
        foods = data.foods;
    });
}

function draw() {
        background(0);
        eatFood();

        foods.forEach(food => {
            fill(foodColors[food.val] - 1)
            ellipse(food.x, food.y, food.r * 2, food.r * 2);
        });

        for (var i = 0; i < users.length; i++) {
            var id = users[i].id;

            if (id !== socket.id) {
//                console.log(users[i].col);
                fill(users[i].col);
                ellipse(users[i].x, users[i].y, users[i].r * 2, users[i].r * 2);

                fill(255);
                textAlign(CENTER);
                text(`${users[i].name}(${users[i].speed.toFixed(2)})`, users[i].x, users[i].y - users[i].r*1.5);
            }
        }
        user.show();

        var data = {
            x: user.x,
            y: user.y,
            r: user.r,
            name : user.name,
            speed: user.speed,
            col: user.col
        };

        socket.emit('update', data);
}

function eatFood() {
    foods = foods.filter(food =>{
        var d = dist(user.x, user.y, food.x, food.y);
        if(d < user.r + food.r){
            
            //Food eaten                
            user.speed += food.val / 10;
            
            return false;
        }
        return true;
    });
    
    socket.emit('eaten', foods);
}
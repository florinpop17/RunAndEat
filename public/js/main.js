var user;
var users = [];
var foods = [];
var data = {};
var socket;

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

            if (id !== socket.id) {
                console.log(users[i].col);
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
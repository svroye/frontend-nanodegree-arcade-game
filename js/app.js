
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setPositionAndSpeed();

};

//paragraph on the page that displays the score
var scoreTag = document.querySelector('p');
var score = 0;

//when the user changes difficulty, the score gets reset
var resetScore = function(){
    score = 0;
    scoreTag.innerHTML= "Score: " + score;
}

Enemy.prototype.setPositionAndSpeed = function(){
    //set random position left of the canvas as a start position
    //for the x coordinate
    var xStart = -(Math.random()*500)
    //3 possible y values for the enemies
    var yStart = [83*0.5,83*1.5,83*2.5];
    this.x = xStart;
    this.y = yStart[Math.floor(Math.random()*3)];
    this.speed = Math.random()*200+50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    //when the enemy has crossed the screen, it gets a new position and speed on the left of the screen
    //to start crossing the screen again
    if(this.x > 6* 101){
        this.setPositionAndSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.setStartPosition();
};

//start position of the user;
Player.prototype.setStartPosition = function(){
    this.x = 101*2;
    this.y = 83*4.5;
}

Player.prototype.update = function() {
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



Player.prototype.handleInput = function(keys){
    switch(keys){
        case 'left':
        if(!(this.x < 101)){
            this.x-=101;
        }
        break;
        case 'up':
        if(!(this.y < 83*0.5)){
            this.y-=83;
        }
        break;
        case 'right':
        if(!(this.x >= 101*4)){
            this.x+=101;
        }
        break;
        case 'down':
        if(!(this.y >= 83*4.5)){
            this.y+=83;
        }
        break;
    }
};

Player.prototype.wins = function(){
    if(this.y <83*0.5){
        this.setStartPosition();
        score+=10;
        scoreTag.innerHTML= "Score: " + score;
    }
}

Player.prototype.collide = function(){
    allEnemies.forEach(function(enemy){
        if(enemy.y === player.y){
            if(enemy.x + 70 >= player.x && enemy.x <= player.x + 70){
                player.setStartPosition();
                score-=5;
                scoreTag.innerHTML= "Score: " + score;
            }
        }
    })
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i=0;i<3;i++){
        allEnemies[i] = new Enemy();
}
var player = new Player();

var radioEasy = document.getElementById('radio-easy');
var radioMedium = document.getElementById('radio-medium');
var radioHard = document.getElementById('radio-hard');

//set the easy difficulty with 3 enemies
radioEasy.addEventListener('click',function(){
    resetScore();
    while(allEnemies.length > 0) {
        allEnemies.pop();
    }

    for(var i=0;i<3;i++){
        allEnemies[i] = new Enemy();
    }
    buttonEasy.style.backgroundColor='DarkGrey';
    buttonMedium.style.backgroundColor='LightGrey';
    buttonHard.style.backgroundColor='LightGrey';
})

//set the medium difficulty with 6 enemies
radioMedium.addEventListener('click',function(){
    resetScore();
    while(allEnemies.length > 0) {
        allEnemies.pop();
    }

    for(var i=0;i<6;i++){
        allEnemies[i] = new Enemy();
    }
    buttonEasy.style.backgroundColor='LightGrey';
    buttonMedium.style.backgroundColor='DarkGrey';
    buttonHard.style.backgroundColor='LightGrey';
})

//set the hard difficulty with 12 enemies
radioHard.addEventListener('click',function(){
     resetScore();
    while(allEnemies.length > 0) {
        allEnemies.pop();
    }

    for(var i=0;i<12;i++){
        allEnemies[i] = new Enemy();
    }
    buttonEasy.style.backgroundColor='LightGrey';
    buttonMedium.style.backgroundColor='LightGrey';
    buttonHard.style.backgroundColor='DarkGrey';
})



//change character image depending on user choice
var radioChar1 = document.getElementById('char-1');
var radioChar2 = document.getElementById('char-2');
var radioChar3 = document.getElementById('char-3');
var radioChar4 = document.getElementById('char-4');
var radioChar5 = document.getElementById('char-5');

radioChar1.addEventListener('click',function(){
    player.sprite='images/char-boy.png';
    player = new Player();
});

radioChar2.addEventListener('click',function(){
    player = new Player();
    player.sprite='images/char-cat-girl.png';
});

radioChar3.addEventListener('click',function(){
    player = new Player();
    player.sprite='images/char-horn-girl.png';
});

radioChar4.addEventListener('click',function(){
    player = new Player();
    player.sprite='images/char-pink-girl.png';
});

radioChar5.addEventListener('click',function(){
    player = new Player();
    player.sprite='images/char-princess-girl.png';
});





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



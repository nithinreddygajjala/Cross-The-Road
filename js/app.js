// Enemies our player must avoid

var score=0;

var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 100) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// player function or a constructor.
var Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.high=1;
};
Player.prototype.render = function() {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y);
};
// this function is used to get the player score .
Player.prototype.score=function(x){
document.getElementById('t1').innerHTML=x;
//player.high=x;
if(x>this.high)
{
    player.high++;
}
document.getElementById('t2').innerHTML=player.high;
}
// function to update the score when the player reached the goal or the final row.
Player.prototype.update = function(dt) {
    if (this.y === 0) {
        this.x = 202;
        this.y = 415;
        score++;

        this.score(score);


    }

};


// function to handle the user input.
Player.prototype.handleInput = function(location) {


        if(location=="left")
        {
            this.x -= 101;
            if (this.x <= 0) {
                this.x = 0;
            }
        }
        else if(location=="right")
        {
            this.x += 101;
            if (this.x >= 404) {
                this.x = 404;
            }
        }
        else if(location=="up")
        {
           this.y -= 83;
            if (this.y <= 0) {
                this.y = 0;
            }
        }
        else
        {
             this.y += 83;
            if (this.y >= 416) {
                this.y = 416;
            }
        }


};
// function ot move the enemies horizontally.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x >= 505){
        this.x = 0;
}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y);
};



// creating the player and enemy objects.

var player = new Player(202, 415);
 var enemy1 = new Enemy(0, 65);
var enemy2 = new Enemy(100, 150);
var enemy3 = new Enemy(200, 235);
allEnemies = [enemy1,enemy2,enemy3];


// Updating the score in the DOM.
document.getElementById('t3').addEventListener('click', function () {


document.getElementById('t1').innerHTML=""+0;
score=0;
console.log("clicked");
 player.x = 202;
                player.y = 415;
}, false);

// Binding the events to the Listner.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);

});

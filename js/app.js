// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random() * 100) + 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
const lives = document.querySelector('.lives');
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= 505) {
        this.x = -50;
    }
    if (this.x < player.x + 75 && this.x + 75 > player.x && this.y < player.y + 70 && this.y + 70 > player.y) {
         player.x = 200;
         player.y = 400;
        $('.lives :last-child').remove();
        if (lives.childElementCount === 0) {
          displayLost();
        }
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    if (this.x > 404) this.x = 404;
    if (this.x < 0) this.x = 0;
    if (this.y > 400) this.y = 400;
    if (this.y < -20) this.y = 400;
    if (this.y < 0) {
      this.x = 200;
      this.y = 400;
      displayWon();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    var x = event.keyCode;
    if (x == 37) {
        this.x -= 20;
    } else if (x == 38) {
        this.y -= 20;
    } else if (x == 39) {
        this.x += 20;
    } else if (x == 40) {
        this.y += 20;
    }
    player.update();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
    new Enemy(-50, 60),
    new Enemy(-50, 120),
    new Enemy(-50, 180),
    new Enemy(-50, 240)
];

const player = new Player(200, 400);

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

const won = document.querySelector('.won');
function displayWon() {
  won.style.display = 'block';
}
const lost = document.querySelector('.lost');
function displayLost() {
  lost.style.display = 'block';
}

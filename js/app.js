// Enemy class
const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random() * 150) + 10;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x >= 505) {
        this.x = -50;
    }
    // Handle collision between the player and enemies
    if (this.x < player.x + 75 && this.x + 75 > player.x && this.y < player.y + 70 && this.y + 70 > player.y) {
        resetPlayer();
        // Decrement the number of lives
        $('.lives :last-child').remove();
        // Actions taken when the player lost all lives (game is lost)
        const lives = document.querySelector('.lives');
        if (lives.childElementCount === 0) {
            freezeEnemies();
            displayLost();
            // Disable the ability to move the player while the game is lost and the modal window is displayed
            document.removeEventListener('keyup', playerMove);
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// Player's constructor function
const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // Prevent the player from moving outside the canvas
    if (this.x > 404) this.x = 404;
    if (this.x < 0) this.x = 0;
    if (this.y > 400) this.y = 400;
    if (this.y < -20) this.y = 400;
    // Actions taken when the player reaches water (game is won)
    if (this.y < 20) {
        resetPlayer();
        freezeEnemies();
        displayWon();
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player via keyboard's arrows
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

// Instantiate all objects
const allEnemies = [
    new Enemy(-50, 60),
    new Enemy(-50, 120),
    new Enemy(-50, 180),
    new Enemy(-50, 240)
];

const player = new Player(200, 400);

// This listens for key presses and sends the keys
// Player.handleInput() method
const playerMove = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', playerMove);

// Bring the player to the initial position
function resetPlayer() {
    player.x = 200;
    player.y = 400;
}

// Freeze all enemies' movement
function freezeEnemies() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
    });
}

// Display modal when the player lost
const lost = document.querySelector('.lost');

function displayLost() {
    lost.style.display = 'block';
}

// Actions taken when the Restart button is clicked on the modal (lost case)
const lostRestart = document.querySelector('.lostRestart');

lostRestart.addEventListener('click', function() {
    lost.style.display = 'none';
    resetPlayer();
    restartGame();
});

// Display modal when the player won
const won = document.querySelector('.won');

function displayWon() {
    won.style.display = 'block';
}

// Actions taken when the Restart button is clicked on the modal (won case)
const wonRestart = document.querySelector('.wonRestart');

wonRestart.addEventListener('click', function() {
    won.style.display = 'none';
    resetPlayer();
    restartGame();
});

// Restart number of lives and reload the game
const heart = '<img src="images/Heart.png" alt="heart" height="5%" width="5%"> \n';

function restartGame() {
    lives.innerHTML = heart.repeat(3);
    location.reload();
}

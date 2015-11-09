var rowHeight = 83,
    colWidth = 101,
    bugWidth = 100,
    canvasWidth = 505;

var utils = (function() {
    return {
        randowNum: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        setRow: function(num) {
            return (rowHeight * num) - 20;
        },
        setCol: function(num) {
            return colWidth * num;
        }
    };
})();

// Enemies our player must avoid
var Enemy = function(x, row, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.row = row;
    this.x = x;
    this.y = utils.setRow(this.row);
    this.speed = s;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    this.left = this.x;
    this.right = this.x + bugWidth;
    // reset bug position after one pass and set to new random speed
    if (this.left > canvasWidth) {
        this.x = -bugWidth;
        this.speed = utils.randowNum(100,400);
    }
    // collision detection
    if (this.row === player.row) {
        if ((this.right > player.left && this.right < player.right) || (this.left > player.left && this.left < player.right)) {
            player.reset();
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
var Player = function(col, row) {
    this.setPosition(col, row);
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.col > 0 ? this.col-- : '';
            break;
        case 'right':
            this.col < 4 ? this.col++ : '';
            break;
        case 'up':
            this.row > 1 ? this.row-- : this.reset();
            break;
        case 'down':
            this.row < 5 ? this.row++ : '';
            break;
        default:
            console.log("use arrow keys to move :)");
    }
    this.setPosition(this.col, this.row);
};

Player.prototype.setPosition = function(col, row) {
    this.col = col;
    this.row = row;
    this.x = utils.setCol(col);
    this.y = utils.setRow(row);
    this.left = this.x + 17; // 17 = sprite padding
    this.right = this.x + 85 // 85 = sprite padding
};

Player.prototype.reset = function() {
    this.setPosition(2, 5);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(0, 1, utils.randowNum(100,200));
var bug2 = new Enemy(0, 2, utils.randowNum(50,150));
var bug3 = new Enemy(0, 3, utils.randowNum(150,250));
var allEnemies = [bug1, bug2, bug3];
var player = new Player(2, 5);

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

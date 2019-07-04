'use strict';

function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.obsFrequency = 2000;
  this.initHeight = 150;
  this.obsSpace = 100;
  this.obsVariant = 150;
  this.obsMinHeight = 30;
  this.lives = 5;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.createFirstObstacle();
  var prevHeight = this.initHeight;
  var intervalId = setInterval(() => this.createObstacles(prevHeight), this.obsFrequency);
  var loop = () => {
    this.player.setBoundaryPosition();
    this.update();
    this.clear();
    this.draw();
    if (!this.isGameOver) {
      var animationId = requestAnimationFrame(loop);
    } else {
      this.onGameOver();
    }
    this.checkColisions(intervalId, animationId, animationId);
  };
  loop();
};

Game.prototype.createObstacleHeight = function(prevHeight) {
  var randomVariation = Math.random() * this.obsVariant;
  var direction = 0;
  if (prevHeight > this.canvas.height / 2) {
    direction = -1;
  } else {
    direction = 1;
  }
  return prevHeight + randomVariation * direction;
};

// Game.prototype.createObstacleHeight = function(prevHeight) {
//   var randomVariation = Math.random() * this.obsVariant;
//   var direction = 0;
//   var maxHeight = this.canvas.height - this.obsMinHeight - this.obsSpace;
//   console.log('prevHeight', prevHeight)
//   console.log('randomVariation', randomVariation)
//   console.log('this.obsMinHeight', this.obsMinHeight)
//   console.log('Resta', prevHeight - randomVariation)
//   var newHeight = prevHeight + randomVariation;
//   if (newHeight > maxHeight || newHeight < 0) {
//     direction = -1;
//   } else if (newHeight < this.obsMinHeight) {
//     direction = 1;
//   } else {
//     direction = Math.floor(Math.random() * 2) * 2 - 1;
//   }
//   return prevHeight + randomVariation * direction;
// };

Game.prototype.createFirstObstacle = function() {
  var firstTopObstacle = new Obstacle(this.canvas, this.initHeight, 1);
  var firstBottomObstacle = new Obstacle(
    this.canvas,
    this.initHeight + this.obsSpace,
    2
  );
  this.obstacles.push(firstTopObstacle, firstBottomObstacle);
};

Game.prototype.createObstacles = function(prevHeight) {
  var newHeight = this.createObstacleHeight(prevHeight);
  var topObstacle = new Obstacle(this.canvas, newHeight, 1);
  var bottomObstacle = new Obstacle(
    this.canvas,
    newHeight + this.obsSpace,
    2
  );
  this.obstacles.push(topObstacle, bottomObstacle);
  prevHeight = newHeight;
};

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacles.forEach(obstacle => {
    obstacle.draw();
  });
};

Game.prototype.update = function() {
  this.player.move();
  this.obstacles.forEach((obstacle, index) => {
    obstacle.move();
    if (obstacle.x < -35) {
      this.obstacles.splice(index, 1);
    }
  });
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.checkColisions = function(intervalId, animationId) {
  this.obstacles.forEach(obstacle => {
    var playerRight = this.player.x + this.player.width - 10 > obstacle.x;
    var playerLeft = this.player.x + 10 < obstacle.x + obstacle.width;
    if (obstacle.order === 1) {
      var playerTop = this.player.y + 10 < obstacle.height + obstacle.y;
      var playerBottom = this.player.y + this.player.height - 10 > obstacle.y;
    } else {
      var playerTop = this.player.y + 10 < this.canvas.height;
      var playerBottom = this.player.y + this.player.height - 10 > obstacle.y;
    }
    if (playerTop && playerBottom && playerLeft && playerRight) {
      this.lives--;
      console.log(`${this.lives} lives`);
      this.player.y = 50;
      clearInterval(intervalId);
      cancelAnimationFrame(animationId);
      this.obstacles = [];
      this.startGame();
      if (this.lives === 0) {
        this.isGameOver = true;
      }
    }
  });
};

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
}
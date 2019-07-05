'use strict';

function Game(canvas, stopMusic, thudSound) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.obsFrequency = 1000;
  this.initHeight = 150;
  this.obsSpace = 100;
  this.obsVariation = 175;
  this.minVariation = 50
  this.obsMinHeight = 30;
  this.lives = 3;
  this.animationId = null;
  this.score = 0;
  this.scoreId = null;
  this.stopMusic = stopMusic;
  this.thudSound = thudSound;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.createFirstObstacle();
  var prevHeight = this.initHeight;
  var intervalId = setInterval(
    () => this.createObstacles(prevHeight),
    this.obsFrequency
  );
  var loop = () => {
    this.player.setBoundaryPosition();
    this.update();
    this.clear();
    this.draw();
    this.checkEnemiesInScreen();
    var isNextScreen = this.checkColisions(intervalId);

    if (!this.isGameOver && !isNextScreen) {
      this.animationId = requestAnimationFrame(loop);
    } else if (isNextScreen) {
      this.startGame();
    } else {
      this.onGameOver(this.score);
    }
  };
  loop();
};

Game.prototype.createObstacleHeight = function(prevHeight) {
  var randomVariation = (Math.random() * this.obsVariation) + this.minVariation;
  var direction = 0;
  if (prevHeight < (this.canvas.height - this.obsSpace) / 2) {
    direction = 1;
  } else {
    direction = -1;
  }
  return prevHeight + (randomVariation * direction) - 30;
};

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
  var bottomObstacle = new Obstacle(this.canvas, newHeight + this.obsSpace, 2);
  this.obstacles.push(topObstacle, bottomObstacle);
  prevHeight = newHeight;
};

Game.prototype.updateStatus = function() {
  var lives = document.querySelector('.lives');
  lives.innerHTML = `Lives: ${this.lives}`;
  var score = document.querySelector('.score');
  score.innerHTML = `Score: ${this.score}`;
  if (this.obstacles[0].x > 325) {
    score.innerHTML = `Score: ...`;
  }
  if (this.animationId % 5 === 0 && this.obstacles[0].x < 325) {
    this.score++;
  }
};

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacles.forEach(obstacle => {
    obstacle.draw();
  });
};

Game.prototype.update = function() {
  this.updateStatus();
  this.player.move();
  this.obstacles.forEach((obstacle, index) => {
    obstacle.move();
  });
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.checkColisions = function(intervalId) {
  var nextScreen = false;
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
      // this.thudSound.currentTime = 0.5;
      this.thudSound.play();
      this.lives--;
      this.player.y = 50;
      clearInterval(intervalId);
      cancelAnimationFrame(this.animationId);
      this.obstacles = [];
      if (this.lives === 0) {
        this.stopMusic();
        this.isGameOver = true;
      }
      nextScreen = true;
    }
  });
  return nextScreen;
};

Game.prototype.checkEnemiesInScreen = function() {
  this.obstacles.forEach((obstacle, index) => {
    if (obstacle.x < -35) {
      this.obstacles.splice(index, 1);
    }
  });
}

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
};

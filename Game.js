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
  this.obsVariant = 200;
  this.obsMinHeight = 30;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  var firstTopObstacle = new Obstacle(this.canvas, this.initHeight, 1);
  var firstBottomObstacle = new Obstacle(
    this.canvas,
    this.initHeight + this.obsSpace,
    2
  );
  this.obstacles.push(firstTopObstacle, firstBottomObstacle);
  var prevHeight = this.initHeight;
  setInterval(() => {
    var newHeight = this.createObstacleHeight(prevHeight);
    var topObstacle = new Obstacle(this.canvas, newHeight, 1);
    var bottomObstacle = new Obstacle(
      this.canvas,
      newHeight + this.obsSpace,
      2,
      this.canvas.height
    );
    this.obstacles.push(topObstacle, bottomObstacle);
    prevHeight = newHeight;
  }, this.obsFrequency);
  var loop = () => {
    this.player.setBoundaryPosition();
    this.update();
    this.clear();
    this.draw();
    requestAnimationFrame(loop);
  };
  loop();
};

Game.prototype.createObstacleHeight = function(prevHeight) {
  var minHeight = this.obsMinHeight + this.obsVariant;
  var maxHeight = this.canvas.height - this.obsMinHeight - this.obsVariant;
  var randomVariation = Math.random() * this.obsVariant;
  var direction = 0;

  if (prevHeight < minHeight) {
    direction = 1;
  } else if (prevHeight > maxHeight) {
    direction = -1;
  } else {
    direction = Math.floor(Math.random() * 2) * 2 - 1;
  }

  return prevHeight + randomVariation * direction;
};

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacles.forEach(obstacle => {
    obstacle.draw();
  });
};

Game.prototype.update = function() {
  this.player.move();
  this.obstacles.forEach(obstacle => {
    obstacle.move();
  });
  console.log(this.obstacles.length)
  if (this.obstacles.length > 10) {
    this.obstacles.shift();
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

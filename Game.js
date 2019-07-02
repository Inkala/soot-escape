'use strict';

function Game(canvas) {
  this.player = null;
  this.obstacles = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  setInterval(() => {
    var randomY = Math.random() * (this.canvas.height - 120) + 30;
    var topObstacle = new Obstacle(this.canvas, randomY, 1);
    var bottomObstacle = new Obstacle(this.canvas, (randomY + 100), 2);
    this.obstacles.push(topObstacle, bottomObstacle);
  }, 2000);
  var loop = () => {
    this.player.setBoundaryPosition();
    this.update();
    this.clear();
    this.draw();
    requestAnimationFrame(loop);
  };
  loop();
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
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
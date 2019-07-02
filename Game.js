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
  var randomY = Math.random() * (this.canvas.height - 75) + 15;

  // TODO: Add obstacles at regular intervals
  var topObstacle = new Obstacle(this.canvas, randomY, 1);
  var bottomObstacle = new Obstacle(this.canvas, (randomY + 60), 2);
  this.obstacles.push(topObstacle, bottomObstacle);
  var loop = () => {
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

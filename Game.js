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
  this.obstacle = new Obstacle(this.canvas);
  var loop = () => {
    this.draw();
    requestAnimationFrame(loop);
  }
  loop();
}

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacle.draw();
}
'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.width = 35;
  this.height = 35;
  this.x = 30;
  this.y = this.canvas.height / 2 - this.height / 2;
  // this.url = null;
  this.color = "black";
  this.direction = 1;
  this.speed = 3;
  this.lives = 5;
}

Player.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.move = function() {
}

Player.prototype.setDirection = function() {
}

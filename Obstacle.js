'use strict';

function Obstacle(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.width = 45;
  this.height = 150;
  this.x = this.canvas.width - this.width;
  this.y = 0;
  // this.url = null;
  this.color = "brown";
  this.direction = 1;
  this.speed = 3;
}

Obstacle.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

Obstacle.prototype.move = function() {
}

Obstacle.prototype.setDirection = function() {
}
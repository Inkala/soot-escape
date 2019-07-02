'use strict';

function Obstacle(canvas, randomY, order) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.width = 75;
  this.height = randomY;
  this.x = this.canvas.width
  this.y = 0;
  // this.url = null;
  this.color = '#57381f';
  this.speed = 3;
  this.order = order;
}

Obstacle.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  if (this.order === 1) {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  } else {
    this.ctx.fillRect(
      this.x,
      this.height,
      this.width,
      this.canvas.height - this.height
    );
  }
};

Obstacle.prototype.move = function() {
  this.x = this.x - this.speed / 2; 
};

Obstacle.prototype.setDirection = function() {};

'use strict';

function Obstacle(canvas, height, order) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.width = 25;
  this.height = height;
  this.x = this.canvas.width;
  this.y = 0;
  // this.url = null;
  this.color1 = '#57381f';
  this.color2 = '#362314';
  this.speed = 3;
  this.order = order;
}

Obstacle.prototype.draw = function() {
  if (this.order === 1) {
    this.ctx.fillStyle = this.color1;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  } else {
    this.y = this.height;
    this.ctx.fillStyle = this.color2;
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.canvas.height - this.height
    );
  }
};

Obstacle.prototype.move = function() {
  this.x = this.x - this.speed / 2;
};

Obstacle.prototype.setDirection = function() {};

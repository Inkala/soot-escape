'use strict';

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.width = 35;
  this.height = 45;
  this.x = 50;
  this.y = this.canvas.height / 2 - this.height / 2;
  this.direction = 0;
  this.speed = 3;
  this.img = 'images/soot-sprite.svg';
}

Player.prototype.draw = function() {
  var image = new Image();
  image.src = this.img;
  this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
};

Player.prototype.move = function() {
  this.y = this.y + this.speed * this.direction;
};

Player.prototype.setBoundaryPosition = function() {
  if (this.y < 0) {
    this.y = 0;
  }
  if (this.y > this.canvas.height - this.height) {
    this.y = this.canvas.height - this.height;
  }
};

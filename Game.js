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
  this.obsVariant = 150;
  this.obsMinHeight = 30;
}

Game.prototype.startGame = function() {
  this.player = new Player(this.canvas);
  this.createFirstObstacle();
  var prevHeight = this.initHeight;
  setInterval(() => {
    var newHeight = this.createObstacleHeight(prevHeight);
    var topObstacle = new Obstacle(this.canvas, newHeight, 1);
    var bottomObstacle = new Obstacle(
      this.canvas,
      newHeight + this.obsSpace,
      2
    );
    this.obstacles.push(topObstacle, bottomObstacle);
    prevHeight = newHeight;
  }, this.obsFrequency);
  var loop = () => {
    this.player.setBoundaryPosition();
    this.update();
    this.clear();
    this.draw();
    this.checkColisions();
    requestAnimationFrame(loop);
  };
  loop();
};

Game.prototype.createObstacleHeight = function(prevHeight) {
  var randomVariation = Math.random() * this.obsVariant;
  var direction = 0;
  if (prevHeight > this.canvas.height / 2) {
    direction = -1;
  } else {
    direction = 1;
  }
  return prevHeight + randomVariation * direction;
};

// Game.prototype.createObstacleHeight = function(prevHeight) {
//   var randomVariation = Math.random() * this.obsVariant;
//   var direction = 0;
//   var maxHeight = this.canvas.height - this.obsMinHeight - this.obsSpace;
//   console.log('prevHeight', prevHeight)
//   console.log('randomVariation', randomVariation)
//   console.log('this.obsMinHeight', this.obsMinHeight)
//   console.log('Resta', prevHeight - randomVariation)
//   var newHeight = prevHeight + randomVariation;
//   if (newHeight > maxHeight || newHeight < 0) {
//     direction = -1;
//   } else if (newHeight < this.obsMinHeight) {
//     direction = 1;
//   } else {
//     direction = Math.floor(Math.random() * 2) * 2 - 1;
//   }
//   return prevHeight + randomVariation * direction;
// };

Game.prototype.createFirstObstacle = function() {
  var firstTopObstacle = new Obstacle(this.canvas, this.initHeight, 1);
  var firstBottomObstacle = new Obstacle(
    this.canvas,
    this.initHeight + this.obsSpace,
    2
  );
  this.obstacles.push(firstTopObstacle, firstBottomObstacle);
};

Game.prototype.draw = function() {
  this.player.draw();
  this.obstacles.forEach(obstacle => {
    obstacle.draw();
  });
};

Game.prototype.update = function() {
  this.player.move();
  this.obstacles.forEach((obstacle, index) => {
    obstacle.move();
    if (obstacle.x < -35) {
      this.obstacles.splice(index, 1);
    }
  });
};

Game.prototype.checkColisions = function() {
  this.obstacles.forEach(obstacle => {
    var playerRight = this.player.x + this.player.width - 5 > obstacle.x;
    var playerLeft = this.player.x + 5 < obstacle.x + obstacle.width;
    if (obstacle.order === 1) {
      var playerTop = this.player.y + 5 < obstacle.height + obstacle.y;
      var playerBottom = this.player.y + this.player.height - 5 > obstacle.y;
    } else {
      var playerTop = this.player.y + 5 < this.canvas.height;
      var playerBottom = this.player.y + this.player.height - 5 > obstacle.y;
    }
    if (playerTop && playerBottom && playerLeft && playerRight) {
      console.log('crash!');
    }
  });
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

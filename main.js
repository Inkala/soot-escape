'use strict';

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createGameStartScreen() {
    var gameStartScreen = buildDom(`
      <section id="start-screen">
        <h1>Soot Escape</h1>
        <button>Start!</button>
      </section>
    `);
    var startButton = gameStartScreen.querySelector('button');
    startButton.addEventListener('click', createGameScreen);
  }

  function createGameScreen() {
    var gameScreen = buildDom(`
      <section>
        <h1>Soot Escape</h1>
        <section class="game-status">
          <div class="lives">
          </div>
          <div class="score">
          </div>
        </section>
        <canvas width="640" height="480"></canvas>
      </section>
    `);
    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.startGame();
    game.gameOverCallback(createGameOverScreen);
    
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 32) {
        game.player.direction = -1;
      }
    });
    document.addEventListener('keyup', function(event) {
      if (event.keyCode === 32) {
        game.player.direction = 1;
      }
    });
  }

  createGameScreen();

  function createGameOverScreen() {
    var gameOverScreen = buildDom(`
      <section id="gamover-screen">
        <h1>GAME OVER</h1>
        <button>Retry?</button>
      </section>
    `);
    var overButton = gameOverScreen.querySelector('button');
    overButton.addEventListener('click', createGameScreen);
  }

  // createGameStartScreen();
}

window.addEventListener('load', main);

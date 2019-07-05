'use strict';

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function startOnPress(event) {
    if (event.keyCode === 13) {
      createGameScreen();
      document.removeEventListener('keyup', startOnPress)
    }
  }

  function createGameStartScreen() {
    var gameStartScreen = buildDom(`
      <section id="start-screen">
        <h1>Soot Escape</h1>
        <button>Start!</button>
      </section>
    `);
    document.addEventListener('keyup', startOnPress);
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
    var gameSong = new Audio('sounds/totoro-8bit.mp3');
    gameSong.currentTime = 1.7;
    gameSong.play();
    var thudSound = new Audio('sounds/thud.wav');
    var game = new Game(canvas, stopMusic, thudSound);
    game.startGame();
    game.gameOverCallback(createGameOverScreen);
    function stopMusic() {
      gameSong.currentTime = 0;
      gameSong.pause();
    }
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

  // createGameScreen();

  function createGameOverScreen(score) {
    var gameOverSong = new Audio('sounds/game-over.wav');
    gameOverSong.play();
    var gameOverScreen = buildDom(`
      <section id="gamover-screen">
        <h1>GAME OVER</h1>
        <p class="report"></p>
        <button>Retry?</button>
      </section>
    `);
    var report = document.querySelector('.report');
    report.innerHTML = `Your score was <span>${score}</span>`;
    var overButton = gameOverScreen.querySelector('button');
    document.addEventListener('keyup', startOnPress);
    overButton.addEventListener('click', createGameScreen);
  }

  createGameStartScreen();
}

window.addEventListener('load', main);

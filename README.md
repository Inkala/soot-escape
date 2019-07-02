# Soot Escape

## Description

A dust ball that tries to pass through an old building structure to get out.

## MVP (DOM - CANVAS)

A ball that will keep falling and the player has to lift it up  so it can pass through the wholes in the columns as it advances automatically. If the ball hits a column, it will lose one life until the game is over.

## Backlog

The game will keep score of the player and he will level up, increasing the game’s difficulty.

## Data structure

### Main file

- buildDom
- createGameStartScreen
- createGameScreen
- createGameOverScreen

### Game Constructor

**Properties**
- player
- obstacles
- level
- score

**Methods**
- isGameOver
- startGame
- checkCollision
- checkLives
- updateScore
- changeLevel
- gameOver

### Player Constructor

**Properties**
- x position
- y position
- width
- height
- image
- direction
- speed
- lives

**Methods**
- draw
- move
- updateLives

### Obstacle Constructor

**Properties**
- x position
- y position
- width
- height
- image
- speed

**Methods**
- move
- draw

## States y States Transitions

### gameStartScreen
- Start the game
- Goes to smash game when Start button is clicked

### gameScreen
- Game running
- Lives += 0
- When lives reach 0, goes to Game Over Screen

### gameOverScreen
- Shows Game Over message, score and Retry button
- Goes back to Game Screen when Retry button is clicked

## Task

### To Do
- Create Files
- Connect Files
- Setup git & GitHub
- Create 3 screens
- Create screen transitions
- Create game constructor
- Create loop
- Create player
- Create obstacles
- Move player
- Move obstacles
- Check Collisions
- Check game over condition

### Backlog
- Create score counter
- Add images
- Create level modification
- Pause game and show level change
- Add music

## Links

### Trello


### Slides

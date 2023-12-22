const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'green';
const paddleOneColor = 'aqua';
const paddleTwoColor = 'red';
const paddleBorder = 'black';
const ballColor = 'yellow';
const ballBorder = 'black';
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let paddleOne = {
  with: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddleTwo = {
  with: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100,
};

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddleOneColor;
  ctx.fillRect(paddleOne.x, paddleOne.y, paddleOne.with, paddleOne.height);
  ctx.strokeRect(paddleOne.x, paddleOne.y, paddleOne.with, paddleOne.height);

  ctx.fillStyle = paddleTwoColor;
  ctx.fillRect(paddleTwo.x, paddleTwo.y, paddleTwo.with, paddleTwo.height);
  ctx.strokeRect(paddleTwo.x, paddleTwo.y, paddleTwo.with, paddleTwo.height);
}
function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    playerTwoScore += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    playerOneScore += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX <= paddleOne.x + paddleOne.with + ballRadius) {
    if (ballY > paddleOne.y && ballY < paddleOne.y + paddleOne.height) {
      ballX = paddleOne.x + paddleOne.with + ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }

  if (ballX >= paddleTwo.x - ballRadius) {
    if (ballY > paddleTwo.y && ballY < paddleTwo.y + paddleTwo.height) {
      ballX = paddleTwo.x - ballRadius; // if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
}
function changeDirection() {
  const keyPressed = event.keyCode;
  const paddleOneUp = 87;
  const paddleOneDown = 83;
  const paddleTwoUp = 38;
  const paddleTwoDown = 40;

  switch (keyPressed) {
    case paddleOneUp:
      if (paddleOne.y > 0) {
        paddleOne.y -= paddleSpeed;
      }
      break;
    case paddleOneDown:
      if (paddleOne.y < gameHeight - paddleOne.height) {
        paddleOne.y += paddleSpeed;
      }
      break;

    case paddleTwoUp:
      if (paddleTwo.y > 0) {
        paddleTwo.y -= paddleSpeed;
      }
      break;
    case paddleTwoDown:
      if (paddleTwo.y < gameHeight - paddleTwo.height) {
        paddleTwo.y += paddleSpeed;
      }
      break;
  }
}
function updateScore() {}
function resetGame() {}

const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'green';
const paddleOneColor = 'blue';
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
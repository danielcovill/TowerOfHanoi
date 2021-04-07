import Board from './Board.js';
let iterator = 0;

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

const hanoi = new Board(10, moveCallback);

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', window.requestAnimationFrame(drawCanvas.bind(drawCanvas, hanoi.getState())));
window.addEventListener('load', () => { 
  window.requestAnimationFrame(drawCanvas.bind(drawCanvas, hanoi.getState()));
  hanoi.movePile(hanoi.pinLeft, hanoi.pinRight);
});


function moveCallback(gameState) {
  window.requestAnimationFrame(drawCanvas.bind(drawCanvas, gameState));
}

function drawCanvas(gameState) {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
  const boardStartBottom = canvas.height * .9;
  const boardStartX = canvas.width * .01;
  const boardEndX = canvas.width - (canvas.width * .01);
  const middlePinX = (boardEndX + boardStartX) / 2;
  const leftPinX = (middlePinX + boardStartX) / 2;
  const rightPinX = (boardEndX + middlePinX) / 2;
  const pinHeight = (boardStartBottom - (canvas.height * .7));
  const discMaxWidth = ((boardEndX - boardStartX) / 3) - (canvas.width * .1);

  drawGameBase(boardStartBottom, boardStartX, boardEndX, leftPinX, middlePinX, rightPinX, pinHeight);
  drawDisks(gameState, boardStartBottom, leftPinX, middlePinX, rightPinX, discMaxWidth);
}

function drawDisks(gameState, boardBottom, leftPinX, middlePinX, rightPinX, discMaxWidth) {
  const discHeight = ((canvas.height * .6) / gameState.discCount);
  const discWidthUnit = (discMaxWidth / gameState.discCount) / 2;
  let rowHeight = boardBottom - (canvas.height * .01) - (discHeight / 2);

  for (const discSize of gameState.pinLeft) {
    ctx.beginPath();
    ctx.moveTo(leftPinX - (discWidthUnit * discSize), rowHeight);
    ctx.lineTo(leftPinX + (discWidthUnit * discSize), rowHeight);
    ctx.strokeStyle = '#771111';
    ctx.lineWidth = discHeight;
    ctx.stroke();
    rowHeight -= discHeight * 1.05;
  }
  
  rowHeight = boardBottom - (canvas.height * .01) - (discHeight / 2);
  for (const discSize of gameState.pinCenter) {
    ctx.beginPath();
    ctx.moveTo(middlePinX - (discWidthUnit * discSize), rowHeight);
    ctx.lineTo(middlePinX + (discWidthUnit * discSize), rowHeight);
    ctx.strokeStyle = '#771111';
    ctx.lineWidth = discHeight;
    ctx.stroke();
    rowHeight -= discHeight * 1.05;
  }

  rowHeight = boardBottom - (canvas.height * .01) - (discHeight / 2);
  for (const discSize of gameState.pinRight) {
    ctx.beginPath();
    ctx.moveTo(rightPinX - (discWidthUnit * discSize), rowHeight);
    ctx.lineTo(rightPinX + (discWidthUnit * discSize), rowHeight);
    ctx.strokeStyle = '#771111';
    ctx.lineWidth = discHeight;
    ctx.stroke();
    rowHeight -= discHeight * 1.05;
  }
}

function drawGameBase(boardStartBottom, boardStartX, boardEndX, leftPinX, middlePinX, rightPinX, pinHeight) {
  //draw base
  ctx.beginPath();
  ctx.moveTo(boardStartX, boardStartBottom);
  ctx.lineTo(boardEndX, boardStartBottom);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = canvas.height * .02;
  ctx.stroke();

  //draw pins
  ctx.beginPath();
  ctx.moveTo(leftPinX, boardStartBottom);
  ctx.lineTo(leftPinX, pinHeight);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = canvas.width * .005;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(middlePinX, boardStartBottom);
  ctx.lineTo(middlePinX, pinHeight);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = canvas.width * .005;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rightPinX, boardStartBottom);
  ctx.lineTo(rightPinX, pinHeight);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = canvas.width * .005;
  ctx.stroke();
}
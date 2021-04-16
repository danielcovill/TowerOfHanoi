import Board from './Board.js';

const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

const hanoi = new Board(10, (state) => {
   window.requestAnimationFrame(drawCanvas.bind(drawCanvas, state));
   //the callback only works with the non-reqcursive movements because canvas won't render till 
   //current execution has returned and it's turn in the event loop comes up
   //https://stackoverflow.com/questions/41346772/how-do-i-know-when-html5-canvas-rendering-is-finished
});

// resize the canvas to fill browser window dynamically
window.addEventListener('load', () => { 
  hanoi.setDiscs(() => {
    hanoi.movePileIterative(hanoi.pinLeft, hanoi.pinRight);
  });
});

function drawCanvas(boardState) {
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
  drawDisks(boardState, boardStartBottom, leftPinX, middlePinX, rightPinX, discMaxWidth);
}

function drawDisks(gameState, boardBottom, leftPinX, middlePinX, rightPinX, discMaxWidth) {
  console.log(gameState.pinLeft, gameState.pinCenter, gameState.pinRight);
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
const Board = require('./Board');

// const hanoi = new Board(15);
// console.log(hanoi.toString());
// hanoi.movePile(hanoi.pinLeft, hanoi.pinRight);


const hanoi2 = new Board(3);
console.log(hanoi2.toString());
hanoi2.movePile(hanoi2.pinLeft, hanoi2.pinCenter);
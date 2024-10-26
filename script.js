const player1 = {
  name: 'mike',
  marker: 'x',
}

const player2 = {
  name: 'john',
  marker: '0',
}

const gameBoard = [1,2,3,4,5,6,7,8,9];
const winningPatterns = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]];
let currentPlayer = (player1.marker === 'x') ? player1 : player2;

function placeMarkerAt(position) {
  if (gameBoard[position - 1] !== 'x' && gameBoard[position - 1] !== '0') {
    gameBoard[position - 1] = currentPlayer.marker;
    console.table([gameBoard.slice(0,3), gameBoard.slice(3,6), gameBoard.slice(6)]);
    changeTurns();
  }
}

function changeTurns() {
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
}

function checkGameStatus() {
  if (gameBoard.every((el) => el === 'x' || el === '0')) {
    console.log("it's a tie");
    return;
  }
  for (let pattern of winningPatterns) {
    let cellsUnderTest = [];
    for (let pos of pattern) {
      cellsUnderTest.push(gameBoard[pos - 1]);
    }
    if (cellsUnderTest.every((el) => el === cellsUnderTest[0])) {
      console.log(`${(player1.marker === cellsUnderTest[0]) ? player1.name : player2.name} won!`);
      return;
    }
  }
}

function playRound(position) {
  placeMarkerAt(position);
  checkGameStatus();
}
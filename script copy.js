console.log("Let's start the game between player 1 and player 2. This is how the board looks right now")

const gameBoard = (function () {
  const rows = 3;
  const cols = 3;
  const board = [];
  
  // Make game board structure

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(`row${i + 1}col${j + 1}`);
    }
  }

  return board;
})();

console.table(gameBoard);
const humanPlayer = makePlayer("jai", "x");
const computerPlayer = makePlayer("computer", "0");

const game = (function () {

  let turn = humanPlayer;
  const getMarker = () => turn.marker;

  function checkGameStatus() {
    
  }

  function placeMarkerAt(position) {
    outerLoop: for (let row of gameBoard) {
      for (let col of row) {
        if (col === position) {
          row[row.indexOf(col)] = getMarker();
          (turn === humanPlayer) ? turn = computerPlayer : turn = humanPlayer;
          console.table(gameBoard);
          break outerLoop;
        }
      }
    }

    checkGameStatus();
  }

  return {placeMarkerAt};
})();

function makePlayer(name, marker) {
  return {name, marker}
}
const gameBoard = (function () {
  const board = ['', '', '', '', '', '', '', '', ''];
  const winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  return {board, winningPatterns};
})();

const players = (function () {
  function makePlayer(name, marker) {
    return {name, marker};
  }

  const player1 = makePlayer("Player 1", "x");
  const player2 = makePlayer("Player 2", "o");

  return [player1, player2];
})();

const game = (function () {
  let isStarted = false;
  let isOver = true;
  let currentTurn = (players[0].marker === 'x') ? players[0] : players[1];
  const statusElement = document.querySelector('.status');

  function placeMarker(position, marker) {
    if (!isOver && isStarted && gameBoard.board[position] === '') {
      gameBoard.board[position] = marker;
      displayController.render(position, marker);
      updateStatus();
      changeTurns();
    }
  }

  function updateStatus() {
    for (let pattern of gameBoard.winningPatterns) {
      if (gameBoard.board[pattern[0]] !== '' && gameBoard.board[pattern[0]] === gameBoard.board[pattern[1]] && gameBoard.board[pattern[1]] === gameBoard.board[pattern[2]]) {
        isOver = true;
        isStarted = false;
        for (let pos of pattern) {
          const el = document.querySelector(`[data-position="${pos}"`);
          el.style.color = '#00ff00';
        }
        const winner = (players[0].marker === gameBoard.board[pattern[0]]) ? players[0].name : players[1].name;
        announceResults('over', winner);
        return;
      }
    }
    
    if (gameBoard.board.every((box) => box === 'x' || box === 'o')) {
      isOver = true;
      isStarted = false;
      announceResults('tie');
      return;
    }
  }

  function getCurrentMarker(currentTurn) {
    return currentTurn.marker;
  }

  function changeTurns() {
    if (!isOver) {
      game.currentTurn = (game.currentTurn === players[0]) ? players[1] : players[0];
    }
  }

  function initialize() {
    isStarted = true;
    isOver = false;
    gameBoard.board.fill('');
    container.classList.remove("blur");
    displayController.resetBoard();
    startButton.textContent = 'Reset Game';
    statusElement.textContent = '';
    game.currentTurn = players[0];
    Array.from(container.children).forEach(child => child.removeAttribute('style'));
  }

  function announceResults(status, winner) {
    const str = (status === 'tie') ? "It's a tie!" : `${winner} wins!`;
    statusElement.textContent = str;
  }

  return {placeMarker, initialize, getCurrentMarker, currentTurn};
})();

const displayController = (function () {
  function render(position, marker) {
    const el = document.querySelector(`[data-position="${position}"`);
    el.textContent = marker;
  }

  function resetBoard() {
    const els = document.querySelectorAll('[data-position]');
    els.forEach(el => el.textContent = '');
  }

  return {render, resetBoard};
})();

// event listeners

const container = document.querySelector('.container');
container.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    return;
  } else {
    const position = Number(e.target.dataset.position);
    game.placeMarker(position, game.getCurrentMarker(game.currentTurn));
  }
});

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', game.initialize);
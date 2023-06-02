/* eslint-disable no-plusplus */
// GAME BOARD
const gameBoard = (() => {

    const currentBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    const getCurrentBoard = () => currentBoard;
  
    const checkPlayerMove = (row, col, marker) => {
      if (currentBoard[row][col] === '') {
        currentBoard[row][col] = marker;
        return true;
      }
      return false;
    };
  
    return { getCurrentBoard, checkPlayerMove };
  })();
  
  // PLAYER
  const createPlayer = (name, marker) => ({ name, marker });
  
  const player1 = createPlayer('Player 1', 'O');
  const player2 = createPlayer('Player 2', 'X');
  
// GAME CONTROLLER
const gameController = (() => {
    let currentPlayer = player1;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const checkForWin = (board, marker) => {
      const winningCombinations = [
        // Rows
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        // Columns
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        // Diagonals
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
      ];
  
      return winningCombinations.some(combination =>
        combination.every(square => square === marker)
      );
    };
  
    const checkForDraw = board => board.every(row => row.every(square => square !== ''));
  
    return { switchPlayer, checkForWin, checkForDraw };
  })();

// DISPLAY
const screenController = (() => {
  const boardSquare = document.querySelectorAll('.board--square');
  const playerInfo = document.querySelectorAll('.player__info');
  let currentPlayer = player1;
  const resetButton = document.querySelector('.reset__button');
  const gameStatus = document.querySelector('.game__status');
  let isGameOver = false;

  const getRowCol = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
  };

  const showWinMessage = (playerName) => {
    gameStatus.textContent = `${playerName} wins!`;
    isGameOver = true;
  };

  const showDrawMessage = () => {
    gameStatus.textContent = 'It\'s a draw!';
    isGameOver = true; 
  };

  const updateScreen = () => {
    playerInfo.forEach(info => {
      info.classList.remove('underline');
    });

    const currentPlayerInfo = currentPlayer === player1 ? playerInfo[0] : playerInfo[1];
    currentPlayerInfo.classList.add('underline');

    boardSquare.forEach(square => {
      const squareElement = square;
      squareElement.textContent = '';
    });

    boardSquare.forEach((squareElement, index) => {
      const button = document.createElement('button');
      button.classList.add('board--button');
      button.setAttribute('data-index', index);
      squareElement.appendChild(button);

      const [row, col] = getRowCol(index);
      const marker = gameBoard.getCurrentBoard()[row][col];
      button.textContent = marker;

      button.addEventListener('click', () => {
        if (!isGameOver) {
          const [clickRow, clickCol] = getRowCol(index);

          if (gameBoard.checkPlayerMove(clickRow, clickCol, currentPlayer.marker)) {
            button.textContent = currentPlayer.marker;

            if (gameController.checkForWin(gameBoard.getCurrentBoard(), currentPlayer.marker)) {
              showWinMessage(currentPlayer.name);
            } else if (gameController.checkForDraw(gameBoard.getCurrentBoard())) {
              showDrawMessage();
            } else {
              currentPlayer = currentPlayer === player1 ? player2 : player1;
              updateScreen();
            }
          }
        }
      });
    });

    const resetBoard = () => {
      const board = gameBoard.getCurrentBoard();

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = '';
        }
      }
      currentPlayer = player1;
      isGameOver = false;
      updateScreen();
      gameStatus.textContent = '';
    };

    resetButton.addEventListener('click', () => {
      resetBoard();
    });
  };

  return { updateScreen };
})();

screenController.updateScreen();

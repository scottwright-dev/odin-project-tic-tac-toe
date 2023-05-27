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
  const createPlayer = (name, marker) => {
    const getPlayerMove = () => {
      const playerMove = prompt(`${name}, enter your move:`);
      const [row, col] = playerMove.split(',').map(Number);
      return [row, col];
    };
  
    return { name, marker, getPlayerMove };
  };
  
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
  
    const playRound = () => {
      const board = gameBoard.getCurrentBoard();
  
      while (true) {
        const playerMove = currentPlayer.getPlayerMove();
        const [row, col] = playerMove;
        const isValidMove = gameBoard.checkPlayerMove(row, col, currentPlayer.marker);
  
        if (isValidMove) {
          console.log('Valid move. Updating the board.');
          console.log('Current Board:', gameBoard.getCurrentBoard());
  
          if (checkForWin(board, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} wins! 3 in a row!`);
            break;
          }
  
          if (checkForDraw(board)) {
            console.log('Draw game');
            break;
          }
  
          switchPlayer();
        } else {
          console.log('Invalid move. Try again.');
        }
      }
    };
  
    return { playRound };
  })();
  
  // TESTING LOGS
  
  gameController.playRound();


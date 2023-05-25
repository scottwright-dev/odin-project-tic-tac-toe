// GAME BOARD
const gameBoard = (() => {
    const currentBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  
    const isMoveValid = (row, col) => {
      if (currentBoard[row][col] === '') {
        return true;
      }
      return false;
    };
  
    return { currentBoard, isMoveValid };
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
    const playRound = () => {
      const players = [player1, player2];
      let currentPlayer = players[0];
  
      const playerMove = currentPlayer.getPlayerMove();
      const [row, col] = playerMove;
      const isValidMove = gameBoard.isMoveValid(row, col);
  
      if (isValidMove) {
        gameBoard.currentBoard[row][col] = currentPlayer.marker;
      } else {
        console.log('Invalid move. Try again.');
      }
  
      console.log(gameBoard.currentBoard);
  
      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
  
    return { playRound };
  })();
  
  // TESTING LOGS
  
  gameController.playRound();
  
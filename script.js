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
  
    const playRound = () => {
      const playerMove = currentPlayer.getPlayerMove();
      const [row, col] = playerMove;
      const isValidMove = gameBoard.checkPlayerMove(row, col, currentPlayer.marker);
  
      if (isValidMove) {
        console.log('Valid move. Updating the board.');
        switchPlayer();
      } else {
        console.log('Invalid move. Try again.');
        playRound();
      }
  
      console.log('Current Board:', gameBoard.getCurrentBoard());
  
      playRound();
    };
  
    return { playRound };
  })();
  
  // TESTING LOGS
  
  gameController.playRound();


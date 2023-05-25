// GAME BOARD
const gameBoard = (() => {
    const currentBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
    return { currentBoard } ;
})();

// PLAYER
const createPlayer = (name, marker) => {
    const getPlayerMove = () => {
        const playerMove = prompt(`${name}, enter your move:`);
      return playerMove;
    };
  
    return { name, marker, getPlayerMove };
  };
  
  const player1 = createPlayer('Player 1', 'O');
  const player2 = createPlayer('Player 2', 'X');

// GAME CONTROLLER
const gameController = (() => {
 
})();

// TESTING LOGS

console.log(gameController);


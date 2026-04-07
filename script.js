const gameBoard = (() => {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const getBoard = () =>  board;
    const placePlayerMark = (row, column, player) => {
        if (board[row][column] === ""){
            board[row][column] = player.mark;
            return true;
        };
    };
    const resetBoard = () => {
        board.forEach(row => row.fill(""));
    };
    const checkForWinner = (board, player) => {
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell === player.mark)) return true; //row check
            if (board[0][i] === player.mark &&
                board[1][i] === player.mark &&
                board[2][i] === player.mark
            )return true; //column check
        };
        if (board[1][1] === player.mark){ //checks if middle cell is occupied first
            if (board[0][0] === player.mark && board[2][2] === player.mark) return true;
            if (board[0][2] === player.mark && board[2][0] === player.mark) return true;
        }
        return false;
    };
    return {getBoard, placePlayerMark, resetBoard, checkForWinner};
})();
const playerController = (() => {
    const Players = {
        player1: {name: "player1", mark: "X", score: 0},
        player2: {name: "player2", mark: "O", score: 0}
    };
    const getPlayers = () => Players;
    const increasePlayerScore = (player) => {
        player.score++;
    };
    const getScore = (player) => player.score;
    const resetPlayerScores = () => {
        Players.forEach( player => {
            player.score = 0;
        })
    };
    const changePlayerName =(player, newName) => {
        player.name = newName;
    };
    const changePlayerMarks = () => {
        Players.forEach (player => {
            switch (player.mark){
                case "X":
                    player.mark = "O"
                    break;
                case "O":
                    player.mark = "X"
                    break;
                default:
                    break;
            };
        });
    };
    return {getPlayers,increasePlayerScore, getScore, changePlayerName, changePlayerMarks, resetPlayerScores};
})();

const gameController = (() => {
    let gameOver = false;
    let gameRound = 0;
    let player1 = playerController.getPlayers().player1;
    let player2 = playerController.getPlayers().player2;
    let currentPlayer = player1;
    const getRound = () => gameRound;
    const increaseRound = () => gameRound++;
    const resetRound = () => gameRound = 0;
    const getCurrentPlayer = () => currentPlayer;
    const changeCurrentPlayer = () => {
        currentPlayer === player1 
        ? currentPlayer = player2
        : currentPlayer = player1;
    };
    const changeGameState = () =>{
        gameOver === false 
        ? gameOver = true 
        : gameOver = false;
    };
    return {getRound, increaseRound, resetRound, getCurrentPlayer, changeCurrentPlayer, changeGameState};
})();  
const displayController = (() => {

})();
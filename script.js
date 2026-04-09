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
        }else {
            return false;
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
    const Players = [
        {name: "player1", mark: "X", score: 0, isCurrent: true},
        {name: "player2", mark: "O", score: 0, isCurrent: false}
    ];
    const getPlayers = () => Players;
    const getCurrentPlayer = () => {
        return getPlayers().find(player => player.isCurrent);
    }
    const changeCurrentPlayer = () => {
        if (Players[0].isCurrent) {
            Players[0].isCurrent = false;
            Players[1].isCurrent = true;
        } else {
            Players[0].isCurrent = true;
            Players[1].isCurrent = false;
        };
    };
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
    return {getPlayers,getCurrentPlayer,changeCurrentPlayer, changePlayerName, changePlayerMarks, resetPlayerScores};
})();

const gameController = (() => {
    gameRound = 0;
    turnCount = 0;
    gameOver = false;
    player1 = playerController.getPlayers()[0];
    player2 = playerController.getPlayers()[1];
    function  getRandomInt () {
        return Math.floor(Math.random() * 3);
    }
    const playTenRounds = () => {
        while (!gameOver){
            do {   
                placeMarker = gameBoard.placePlayerMark(getRandomInt(), getRandomInt()
                , playerController.getCurrentPlayer());} 
            while (placeMarker === false);
            console.table(gameBoard.getBoard());
            turnCount++;
            console.log(turnCount);
            if (turnCount > 5 && turnCount < 9) {
                if (gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer())){
                    gameRound++;
                    playerController.getCurrentPlayer().score++;
                    console.log(playerController.getCurrentPlayer().name + " is the winner! Their score is: " 
                        + playerController.getCurrentPlayer().score);
                    turnCount = 0;
                    gameBoard.resetBoard();
                };
            } else if (turnCount == 9) {
                if (gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer())){
                    gameRound++;
                    playerController.getCurrentPlayer().score++;
                    console.log(playerController.getCurrentPlayer().name + " is the winner! Their score is " 
                        + playerController.getCurrentPlayer().score);
                    turnCount = 0;
                    gameBoard.resetBoard();
                } else {
                    console.log("Its a draw!" + " Player1 score: " + player1.score + " Player2 score: " + player2.score);
                    gameRound++;
                    turnCount = 0;
                    gameBoard.resetBoard();
                };
            };
            playerController.changeCurrentPlayer();
            console.log(gameRound);
            if (gameRound == 10) {
                gameOver = true;
            };
        };
    };
    return {playTenRounds};
})();

const displayController = (() => {

})();

gameController.playTenRounds();

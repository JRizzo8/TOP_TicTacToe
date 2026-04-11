const gameBoard = (() => {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const getBoard = () =>  board;
    const placePlayerMark = (row, column, player) => {
        if (board[row][column] === ""){
            board[row][column] = player.mark
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
                board[2][i] === player.mark)
            return true; //column check
        };
        if (board[1][1] === player.mark){ //checks if middle cell is occupied first
            if (board[0][0] === player.mark && board[2][2] === player.mark) return true;
            if (board[0][2] === player.mark && board[2][0] === player.mark) return true;
        }
        return false;
    }
    return {getBoard, placePlayerMark, resetBoard, checkForWinner}
})();
const playerController = (() => {
    const Players = [
        {name: "player1", mark: "X", score: 0, isCurrent: true},
        {name: "player2", mark: "O", score: 0, isCurrent: false}
    ];
    const getPlayers = () => Players
    function  getRandomInt () {
        return Math.floor(Math.random() * 3);
    };
    const getCurrentPlayer = () => {
        return getPlayers().find(player => player.isCurrent);
    };
    const changeCurrentPlayer = () => {
        if (Players[0].isCurrent) {
            Players[0].isCurrent = false;
            Players[1].isCurrent = true;
        } else {
            Players[0].isCurrent = true;
            Players[1].isCurrent = false;
        }
    };
    const resetPlayerScores = () => {
        Players.forEach( player => {
            player.score = 0;
        });
    }
    const changePlayerName =(player, newName) => {
        player.name = newName;
    }
    const resetPlayers = () => {
        Players[0].name = player1;
        Players[1].name = player2;
        Players[0].isCurrent = true;
        Players[1].isCurrent - false;
    }
    return {getPlayers,getCurrentPlayer,changeCurrentPlayer
        , changePlayerName, resetPlayerScores, resetPlayers};
})();

const gameController = (() => {
    gameRound = 0;
    turnCount = 0;
    gameOver = false;
    player1 = playerController.getPlayers()[0];
    player2 = playerController.getPlayers()[1];
    const resetGameRound = () => {
        gameRound = 0;
    }
    const playRound = (row, col) => { 
            attmptTrn = gameBoard.placePlayerMark(row, col, playerController.getCurrentPlayer());
            if (!attmptTrn) {
                console.prompt("Scoundrel! Try Choosing an Empty Square!");
            };
            
            turnCount++;
            if (turnCount > 5 && turnCount < 9) {
                if (gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer())){
                    playerController.getCurrentPlayer().score++
                    turnCount = 0;
                    gameRound++;
                    gameBoard.resetBoard();
                };
            } else if (turnCount == 9) {
                if (gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer())){
                    playerController.getCurrentPlayer().score++;
                    console.log(playerController.getCurrentPlayer().name + " is the winner! Their score is " 
                        + playerController.getCurrentPlayer().score);
                    turnCount = 0;
                    gameRound++;
                    gameBoard.resetBoard();
                } else {
                    console.log("Its a draw!" + " Player1 score: " + player1.score + " Player2 score: " + player2.score);
                    turnCount = 0;
                    gameRound++;
                    gameBoard.resetBoard();
                };
            };
            playerController.changeCurrentPlayer();
        };
    return {playRound, resetGameRound}
})();

const displayController = (() => {
    UIGameBoard = document.querySelector("game-board");
    UIGameboardCells = document.querySelectorAll(".cell");
    UIGameBoard.addEventListener('click', (event) => {
        cell = event.target.closest(".cell");
        if(!cell) return;    
    });
    const resetUiBoard = () => {
        UIGameboardCells.innerHTML = "";
    }

    return {resetUiBoard}
})();
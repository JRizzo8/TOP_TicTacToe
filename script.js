const gameBoard = (() => {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    const getBoard = () =>  board;
    const placePlayerMark = (row, column, player) => {
            board[row][column] = player.mark;
    }
    const resetBoard = () => {
        board.forEach(row => row.fill(""));
    }
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
    return {getBoard, placePlayerMark, resetBoard, checkForWinner};
})()
const playerController = (() => {
    const Players = [
        {name: "player1", mark: "X", score: 0, isCurrent: true},
        {name: "player2", mark: "O", score: 0, isCurrent: false}
    ]
    const getPlayers = () => Players
    function  getRandomInt () {
        return Math.floor(Math.random() * 3);
    }
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
        }
    }
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
        Players.forEach(player => {
            player.score = 0;
        });
    }
    return {getPlayers,getCurrentPlayer,changeCurrentPlayer
        , changePlayerName, resetPlayerScores, resetPlayers};
})()

const gameController = (() => {
    gameRound = 0;
    turnCount = 0;
    const resetGame = () => {
        gameRound = 0;
        turnCount = 0;
        playerController.resetPlayers();
        displayController.resetUiBoard();
        gameBoard.resetBoard();
    };
    const playRound = (row, col) => {
            gameBoard.placePlayerMark(row, col, playerController.getCurrentPlayer());
            turnCount++;
            if (turnCount >= 5 && turnCount < 9) {
                winnerCheck = gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer());
                if (winnerCheck){
                    playerController.getCurrentPlayer().score++
                    gameRound++;
                    turnCount = 0;
                    displayController.declareWinner(playerController.getCurrentPlayer());
                    displayController.toggleEndgameDialog();   
                };
            } else if (turnCount == 9) {
                winnerCheck = gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer());
                if (winnerCheck){
                    playerController.getCurrentPlayer().score++;
                    turnCount = 0;
                    gameRound++;
                    displayController.declareWinner(playerController.getCurrentPlayer());
                    displayController.toggleEndgameDialog();
                } else {
                    turnCount = 0;
                    gameRound++;
                    displayController.declareDraw();
                    displayController.toggleEndgameDialog();
                };

            };
            playerController.changeCurrentPlayer();
    };
    const resetTurnCount = () => {
        turnCount = 0;
    };
    return {playRound, resetGame, resetTurnCount};
})()

const displayController = (() => {
    gameState = false;
    player1 = playerController.getPlayers()[0];
    player2 = playerController.getPlayers()[1];
    UIGameBoard = document.querySelector("game-board");
    UIGameboardCells = document.querySelectorAll(".cell");
    const startDialog = document.querySelector(".gameStartDialog");
    const endGameDialog = Document.querySelector(".endGameDialog");
    const playBtn = document.querySelector(".playBtn");
    const startDialogCloseBtn = document.querySelector("#startDialogCloseBtn");
    const playerNameBoxes = document.querySelectorAll(".playerNameBox");
    const submitPlayersBtn = document.querySelector("#submitPlayerOptions");
    const playAgainBtn = document.querySelector(".playAgainBtn");
    const resetBtns = document.querySelectorAll(".resetBtn");
    const endGameText = document.querySelector(".endGameText"); 
    UIGameBoard.addEventListener('click', (event) => {
        if (gameState) {
            cell = event.target.closest(".cell");
            if (!cell) return;  
            if (cell.value === "") {
                cell.value = playerController.getCurrentPlayer().mark;
                gameController.playRound(cell.dataset.row, cell.dataset.col);
            } else {
                alert("Please Choose an Empty Square");
            };
        };
    });
    startDialogCloseBtn.addEventListener('click', startDialog.close());
    playBtn.addEventListener('click', startDialog.showModal());
    submitPlayersBtn.addEventListener('submit', function() {
       player1NameBox = playerNameBoxes[0];
       player2NameBox = playerNameBoxes[1];
       if (player1NameBox.value.trim() === "") {
        alert("Please Enter a Name for Player 1");
       } else if (player2NameBox.value.trim() === "") {
        alert("Please Enter a Name for Player 2");
       } else {
        gameState = true;
        player1.name = player1NameBox.value;
        player2.name = player2NameBox.value;
        startDialog.close();
       };

    });
    resetBtns.forEach(btn, addEventListener('click', () => {
        gameState = false;
        gameController.resetGame();
    }));
    playAgainBtn.addEventListener('click', () => {
        gameBoard.resetBoard();
        displayController.resetUiBoard();
        gameController.resetTurnCount();
        playerController.changeCurrentPlayer();
    });
    const resetUiBoard = () => {
        UIGameboardCells.innerHTML = "";
    }
    const toggleEndgameDialog = () => {
        if (endGameDialog.open){
            endGameDialog.close();
        } else {
            endGameDialog.showModal();
        }
    }
    const toggleScoundrelDialog = () => {
        if (scoundrelDialog.open) {
            scoundrelDialog.close();
        } else {
            scoundrelDialog.showModal();
        }
    }
    const toggleStartDialog = () => {
        if(startDialog.open) {
            startDialog.close();
        } else {
            startDialog.showModal();
        }
    }
    const declareWinner = (winningPlayer) => {
        endGameText.innerHTML = winningPlayer + " is the winner with a score of " + winningPlayer.score
    }
    const declareDraw = () => {
        endGameText.innerHTML = "Its a Draw!"
    }

    return {resetUiBoard, toggleEndgameDialog, toggleStartDialog, declareWinner, declareDraw};
})()
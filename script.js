const gameBoard = (() => {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    const getBoard = () =>  board;
    const placePlayerMark = (row, column, player) => {
            board[row][column] = player.mark;
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
    };
    return {getBoard, placePlayerMark, resetBoard, checkForWinner};
})();
const playerController = (() => {
    function  getRandomInt () {
        return Math.floor(Math.random() * 3);
    };
    const Players = [
        {name: "player1", mark: "X", score: 0, isCurrent: true, isAi: false},
        {name: "player2", mark: "O", score: 0, isCurrent: false, isAi: false}
    ];
    const getPlayers = () => Players;
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
        };
    };
    const resetPlayerScores = () => {
        Players.forEach( player => {
            player.score = 0;
        });
    };
    const changePlayerName =(player, newName) => {
        player.name = newName;
    };
    const resetPlayers = () => {
        Players[0].name = "player1";
        Players[1].name = "player2";
        Players[0].isCurrent = true;
        Players[1].isCurrent - false;
        Players.forEach(player => {
            player.score = 0;
        });
    };
    return {getPlayers,getCurrentPlayer,changeCurrentPlayer,changePlayerName, resetPlayerScores, resetPlayers};
})();

const gameController = (() => {
    gameRound = 0;
    turnCount = 0;
    function checkTurnCount () {
        if (turnCount < 5){
            playerController.changeCurrentPlayer();
        } else if (turnCount >= 5 && turnCount < 9) {
            winnerCheck = gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer());
            if (winnerCheck){
                playerController.getCurrentPlayer().score++
                gameRound++;
                turnCount = 0;
                displayController.declareWinner(playerController.getCurrentPlayer());
                displayController.updateScoreBoard();
                displayController.toggleEndgameDialog(); 
            }else {
                playerController.changeCurrentPlayer();
            };
        } else if (turnCount == 9) {
            winnerCheck = gameBoard.checkForWinner(gameBoard.getBoard(), playerController.getCurrentPlayer());
            if (winnerCheck){
                playerController.getCurrentPlayer().score++;
                turnCount = 0;
                gameRound++;
                displayController.declareWinner(playerController.getCurrentPlayer());
                displayController.updateScoreBoard();
                displayController.toggleEndgameDialog();
            } else {
                turnCount = 0;
                gameRound++;
                displayController.declareDraw();
                displayController.updateScoreBoard();
                displayController.toggleEndgameDialog();
            };
        };
    }
    const getGameRound = () => gameRound;
    const playRound = (row, col) => {
        gameBoard.placePlayerMark(row, col, playerController.getCurrentPlayer());
        turnCount++;
        checkTurnCount();
    };
        const resetTurnCount = () => {
        turnCount = 0;
    };
        const resetGame = () => {
        gameRound = 0;
        turnCount = 0;
        playerController.resetPlayers();
        displayController.resetUiBoard();
        displayController.updateScoreBoard();
        gameBoard.resetBoard();
    }; 
    return {getGameRound, playRound, resetGame, resetTurnCount};
})()

const displayController = (() => {
    gameState = false;
    let player1 = playerController.getPlayers()[0];
    let player2 = playerController.getPlayers()[1];
    let UIGameBoard = document.querySelector("game-board");
    let UIGameboardCells = document.querySelectorAll(".cell");
    const startDialog = document.querySelector(".gameStartDialog");
    const endGameDialog = document.querySelector(".endGameDialog");
    const playBtn = document.querySelector(".playBtn");
    const startDialogCloseBtn = document.querySelector(".startDialogCloseBtn");
    const player1NameBox = document.querySelector(".player1NameBox");
    const player2NameBox = document.querySelector(".player2NameBox");
    const submitPlayersBtn = document.querySelector(".submitPlayerOptions");
    const playAgainBtn = document.querySelector(".playAgainBtn");
    const resetBtns = document.querySelectorAll(".resetBtn");
    const endGameText = document.querySelector(".endGameText"); 
    const player1UiScore = document.querySelector(".player1UiScore");
    const uiGameRounds = document.querySelector(".uiGameRounds");
    const player2UiScore = document.querySelector(".player2UiScore");
    UIGameBoard.addEventListener('click', (event) => {
        let cell = event.target.closest(".cell");
        if (!cell) return;
        if (gameState) {  
            if (cell.innerHTML === "") {
                cell.innerHTML = playerController.getCurrentPlayer().mark;
                gameController.playRound(cell.dataset.row, cell.dataset.col);
            } else {
                alert("Please Choose an Empty Square");
            };
        };
    });
    startDialogCloseBtn.addEventListener('click', () => {
        playBtn.disabled = false;
        startDialog.close();
    });
    playBtn.addEventListener('click', () => {
        playBtn.disabled = true;
        startDialog.showModal();
    });
    submitPlayersBtn.addEventListener('click', (event) => {
        if (player1NameBox.value.trim() === "") {
            event.preventDefault();
            alert( "Please Enter a Name for Player 1");
        } else if (player2NameBox.value.trim() === "") {
            event.preventDefault();
            alert("Please Enter a Name for Player 2");
        } else {
        event.preventDefault();
        gameState = true;
        player1.name = player1NameBox.value.trim();
        player2.name = player2NameBox.value.trim();
        startDialog.close();
        };
        
    });
    resetBtns.forEach(btn  =>  {
        btn.addEventListener('click', () => {
            gameController.resetGame(); 
            gameState = false;
            playBtn.disabled = false;
            endGameDialog.close();
        });
    });
    playAgainBtn.addEventListener('click', () => {
        playerController.changeCurrentPlayer();
        gameBoard.resetBoard();
        displayController.resetUiBoard();
        gameController.resetTurnCount();
        endGameDialog.close();
    });
    const resetUiBoard = () => {
        UIGameboardCells.forEach(cell => {
            cell.innerHTML = "";
        });
    };
    const updateScoreBoard = () => {
        player1UiScore.innerHTML = player1.score;
        player2UiScore.innerHTML = player2.score;
        uiGameRounds.innerHTML = gameController.getGameRound();
    };
    const toggleEndgameDialog = () => {
        if (endGameDialog.open){
            endGameDialog.close();
        } else {
            endGameDialog.showModal();
        }
    };
    const declareWinner = (winningPlayer) => {
        endGameText.innerHTML = winningPlayer.name + " is the winner with a score of " + winningPlayer.score
    };
    const declareDraw = () => {
        endGameText.innerHTML = "Its a Draw!"
    };
    return {resetUiBoard, updateScoreBoard, toggleEndgameDialog, declareWinner, declareDraw};
})();
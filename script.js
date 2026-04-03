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
    const checkForDraw = () => {
       if (board.every(row => row.every(cell => ""))) return true;
    };
    return {getBoard, placePlayerMark, resetBoard, checkForWinner, checkForDraw};
})();

console.table(gameBoard.getBoard());


const game = (() => {


})();
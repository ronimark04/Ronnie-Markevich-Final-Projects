const statusText = document.getElementById('status');
let gameActive = true;
let currentPlayer = "X";
let cellText = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const noWinnerMessage = () => `No Winner!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusText.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(
    cell => cell.addEventListener('click', handleCellClick)
    );
document.getElementById('restart-button').addEventListener('click', RestartGame);

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('id')
    );

    if (cellText[clickedCellIndex] !== "" || gameActive == false) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    validateResult();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {

    cellText[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function validateResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombinations[i];
        let a = cellText[winCondition[0]];
        let b = cellText[winCondition[1]];
        let c = cellText[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusText.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !cellText.includes("");
    if (roundDraw) {
        statusText.innerHTML = noWinnerMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerHTML = currentPlayerTurn();
}

function RestartGame() {
    gameActive = true;
    currentPlayer = "X";
    cellText = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}    
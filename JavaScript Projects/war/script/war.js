const opponentScore = document.getElementById('opponentScore');
const userScore = document.getElementById('userScore');
const opponentCard = document.getElementById('opponentCard');
const userCard = document.getElementById('userCard');
const drawButton = document.getElementById('drawButton');
const newGameButton = document.getElementById('newGameButton');
const userDeck = document.getElementById('userDeck');
const opponentDeck = document.getElementById('opponentDeck');
let clickCount = 0;

const images = ['2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png'];

document.addEventListener("DOMContentLoaded", newGame());

drawButton.addEventListener('click', function loadCards() {

    clickCount++;

    let randomIndex = Math.floor(Math.random() * images.length);
    let randomIndex2 = Math.floor(Math.random() * images.length);
    while (randomIndex == randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * images.length);
    }

    opponentCard.src = 'images/' + images[randomIndex];
    userCard.src = 'images/' + images[randomIndex2];


    let [opponentValue, userValue] = assignValue(opponentCard.src, userCard.src);

    if (opponentValue > userValue) {
        opponentScore.innerText = parseInt(opponentScore.innerText) + 1;
    } else if (opponentValue < userValue) {
        userScore.innerText = parseInt(userScore.innerText) + 1;
    } else if (opponentValue == userValue) {
        userScore.innerText = parseInt(userScore.innerText) + 1;
        opponentScore.innerText = parseInt(opponentScore.innerText) + 1;
    }

    if (clickCount == 26) {
        setTimeout(() => {
            if (parseInt(opponentScore.innerText) > parseInt(userScore.innerText)) {
                alert("Better luck next time...");
            } else if (parseInt(opponentScore.innerText) < parseInt(userScore.innerText)) {
                alert("You win!");
                newGame();
            } else {
                alert("It's a tie!");
            }
        }, 100);
    }

});

function assignValue(x, y) {
    let a, b;

    switch (x[x.lastIndexOf('/') + 1]) {
        case '2':
            a = 2;
            break;
        case '3':
            a = 3;
            break;
        case '4':
            a = 4;
            break;
        case '5':
            a = 5;
            break;
        case '6':
            a = 6;
            break;
        case '7':
            a = 7;
            break;
        case '8':
            a = 8;
            break;
        case '9':
            a = 9;
            break;
        case '1':
            a = 10;
            break;
        case 'j':
            a = 11;
            break;
        case 'q':
            a = 12;
            break;
        case 'k':
            a = 13;
            break;
        case 'a':
            a = 14;
            break;
    }

    switch (y[y.lastIndexOf('/') + 1]) {
        case '2':
            b = 2;
            break;
        case '3':
            b = 3;
            break;
        case '4':
            b = 4;
            break;
        case '5':
            b = 5;
            break;
        case '6':
            b = 6;
            break;
        case '7':
            b = 7;
            break;
        case '8':
            b = 8;
            break;
        case '9':
            b = 9;
            break;
        case '1':
            b = 10;
            break;
        case 'j':
            b = 11;
            break;
        case 'q':
            b = 12;
            break;
        case 'k':
            b = 13;
            break;
        case 'a':
            b = 14;
            break;
    }

    return [a, b];
};

newGameButton.addEventListener('click', newGame);

function newGame() {
    clickCount = 0;
    opponentScore.innerText = 0;
    userScore.innerText = 0;
    opponentCard.src = 'images/back_of_card.png';
    userCard.src = 'images/back_of_card.png';
}
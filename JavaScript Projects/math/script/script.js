const question_progress = document.getElementById('question_progress');
const score_progress = document.getElementById('score_progress');
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const current_highscore_text = document.getElementById('current_highscore');
const alltime_highscore_text = document.getElementById('alltime_highscore');
const newGameText = document.getElementById('newGameText');
let current_highscore,
    alltime_highscore,
    questionCount,
    scoreCount,
    questionsAsked = [];
let wrongButtonListeners = [];
let correctButtonListener;

// Make start_div the same size as game_div always:
const game_div = document.getElementById('game_div');
const start_div = document.getElementById('start_div');
start_div.style.width = `${game_div.offsetWidth}px`;
start_div.style.height = `${game_div.offsetHeight}px`;
function updateStartDivDimensions() {
    start_div.style.width = `${game_div.offsetWidth}px`;
    start_div.style.height = `${game_div.offsetHeight}px`;
}
updateStartDivDimensions();
window.addEventListener('resize', updateStartDivDimensions);
//

start_div.addEventListener('click', removeStart);


function removeStart() {
    start_div.style.display = 'none';
    NewGame();
}

function NewGame() {
    questionCount = 1;
    scoreCount = 0;
    question_progress.innerText = `Question: ${questionCount}/10`;
    score_progress.innerText = `Score: ${scoreCount}`;
    current_highscore = sessionStorage.getItem('current_highscore') ?? 0;
    alltime_highscore = localStorage.getItem('alltime_highscore') ?? 0;
    current_highscore_text.innerText = `CURRENT HIGHSCORE: ${current_highscore}`;
    alltime_highscore_text.innerText = `ALL-TIME HIGHSCORE: ${alltime_highscore}`;

    wrongButtonListeners.forEach(({ button, listener }) => {
        button.removeEventListener('click', listener);
    });
    if (correctButtonListener) {
        const [correctButton] = wrongButtonListeners.map(({ button }) => button);
        correctButton?.removeEventListener('click', correctButtonListener);
    }

    wrongButtonListeners = [];
    correctButtonListener = null;

    newQuestion();
}

function newQuestion() {
    if (questionCount > 10) {
        question_progress.innerText = `Question: 10/10`;

        setTimeout(() => {
            //
            updateStartDivDimensions();
            start_div.style.display = 'flex';
            if (scoreCount > alltime_highscore) {
                newGameText.innerHTML = `You scored ${scoreCount}!<br>
                New All-Time Highscore!<br> Click here to play again`;
            } else {
                newGameText.innerHTML = `You scored ${scoreCount}!<br><br> Click here to play again`;
            }

            questionsAsked = [];
            handleScores(scoreCount, current_highscore, alltime_highscore);
        }, 300);
        return;
    }


    let num1, num2, correctAnswer, op,
        ops = ['+', '-', '*', '/'];

    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    if (num1 === 0 || num2 === 0) {
        return newQuestion();
    }

    op = ops[Math.floor(Math.random() * 4)];

    if (op === '/') {
        num2 = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
    } else {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    }

    if ((op === '/' && num2 > num1) || (op === '-' && num2 > num1)) {
        question.innerText = `${num2} ${op} ${num1} = ?`;
        correctAnswer = eval(`${num2} ${op} ${num1}`);
    } else {
        question.innerText = `${num1} ${op} ${num2} = ?`;
        correctAnswer = eval(`${num1} ${op} ${num2}`);
    }

    if (questionsAsked.includes(question.innerText)) {
        return newQuestion();
    } else {
        questionsAsked.push(question.innerText);
    }


    const buttons = [answer1, answer2, answer3, answer4];
    let randomIndex = Math.floor(Math.random() * 4);
    let correctButton = buttons[randomIndex];
    correctButton.innerText = correctAnswer;
    buttons.splice(randomIndex, 1);

    buttons.forEach(button => {
        let randomAnswer;
        do {
            randomAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        } while (randomAnswer === correctAnswer || buttons.some(b => b.innerText == randomAnswer));
        button.innerText = randomAnswer;
    });

    function wrongButtonClicked(button) {
        return function () {
            button.style.backgroundColor = '#e35f64';
            setTimeout(() => {
                button.style.backgroundColor = '';
                handleAnswerClick(false);
            }, 300);
        };
    }

    function correctButtonClick(button) {
        return function () {
            correctButton.style.backgroundColor = '#4caf50';
            setTimeout(() => {
                correctButton.style.backgroundColor = '';
                handleAnswerClick(true);
            }, 300);
        };
    }

    wrongButtonListeners = buttons.map(button => {
        const listener = wrongButtonClicked(button);
        button.addEventListener('click', listener);
        return { button, listener };
    });

    correctButtonListener = correctButtonClick(correctButton);
    correctButton.addEventListener('click', correctButtonListener);

    function handleAnswerClick(isCorrect) {
        if (isCorrect) {
            scoreCount++;
            score_progress.innerText = `Score: ${scoreCount}`;
        }
        questionCount++;
        question_progress.innerText = `Question: ${questionCount}/10`;

        // remove listeners from buttons before adding new ones. I later learned a better way to do this when working on the tic tac toe project
        wrongButtonListeners.forEach(({ button, listener }) => {
            button.removeEventListener('click', listener);
        });
        correctButton.removeEventListener('click', correctButtonListener);

        newQuestion();
    }
}

function handleScores(scoreCount) {
    if (scoreCount > current_highscore) {
        current_highscore = scoreCount;
        current_highscore_text.innerText = `CURRENT HIGHSCORE: ${current_highscore}`;
        sessionStorage.setItem('current_highscore', current_highscore);
    }

    if (scoreCount > alltime_highscore) {
        alltime_highscore = scoreCount;
        alltime_highscore_text.innerText = `ALL-TIME HIGHSCORE: ${alltime_highscore}`;
        localStorage.setItem('alltime_highscore', alltime_highscore);
    }
}
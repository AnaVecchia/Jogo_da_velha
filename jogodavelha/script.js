const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'x';
const O_CLASS = 'o';
let isOTurn = false; 
let gameActive = true;

// Combinações vencedoras (índices das células)
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]  
];

// Inicia o jogo
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isOTurn = false;
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Limpa o texto
        cell.removeEventListener('click', handleClick); // Remove ouvintes antigos
        cell.addEventListener('click', handleClick, { once: true }); // Adiciona novo
    });
    setStatusMessage(`Vez do X`);
}

function handleClick(e) {
    if (!gameActive) return;

    const cell = e.target;
    const currentClass = isOTurn ? O_CLASS : X_CLASS;
    const currentPlayer = isOTurn ? 'O' : 'X';

    // 1. Coloca a marca (X ou O)
    placeMark(cell, currentClass, currentPlayer);

    // 2. Verifica por vitória
    if (checkWin(currentClass)) {
        endGame(false); // false = não foi empate
    } 
    // 3. Verifica por empate
    else if (isDraw()) {
        endGame(true); // true = foi empate
    } 
    // 4. Passa a vez
    else {
        swapTurns();
        setStatusMessage(`Vez do ${isOTurn ? 'O' : 'X'}`);
    }
}

function placeMark(cell, currentClass, currentPlayer) {
    cell.classList.add(currentClass);
    cell.textContent = currentPlayer; 
}

function swapTurns() {
    isOTurn = !isOTurn;
}

function setStatusMessage(message) {
    statusMessage.innerText = message;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {

    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        setStatusMessage('Empate!');
    } else {
        setStatusMessage(`"${isOTurn ? 'O' : 'X'}" Venceu!`);
    }
    gameActive = false; // Trava o jogo
}
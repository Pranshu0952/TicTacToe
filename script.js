
console.log("Welcome to Tic Tac Toe");
let turn = "X";
let isgameover = false;
let moves = 0;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            document.querySelector('.imgbox').style.width = "200px";
            document.querySelector('.container').style.pointerEvents = "none";
            drawWinLine(e[0], e[2]);
            return;
        }
    });

    // Check for draw
    if (moves === 9 && !isgameover) {
        document.querySelector('.info').innerText = "Game Draw!";
        isgameover = true;
        document.querySelector('.imgbox').style.width = "200px";
        document.querySelector('.container').style.pointerEvents = "none";
    }
}

// Function to draw winning line
const drawWinLine = (start, end) => {
    const boxes = document.querySelectorAll('.box');
    const line = document.querySelector('.line');

    const startBox = boxes[start].getBoundingClientRect();
    const endBox = boxes[end].getBoundingClientRect();
    const container = document.querySelector('.container').getBoundingClientRect();

    // Calculate line position and angle
    const startX = startBox.left + startBox.width / 2 - container.left;
    const startY = startBox.top + startBox.height / 2 - container.top;
    const endX = endBox.left + endBox.width / 2 - container.left;
    const endY = endBox.top + endBox.height / 2 - container.top;

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    // Set line properties
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = `0 0`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
}

// Game Logic 
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            moves++;
            checkWin();
            if (!isgameover) {
                document.querySelector('.info').innerText = 'Turn for ' + turn;
            }
        }
    });
});

// Reset button
document.getElementById('btn').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = '';
    });
    turn = "X";
    isgameover = false;
    moves = 0;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox').style.width = "0px";
    document.querySelector('.container').style.pointerEvents = "auto";
    document.querySelector('.line').style.width = "0";
});

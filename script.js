
const board = document.querySelector('.board');
const startBtn = document.querySelector('.btn__start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start__game');
const gameOverModal = document.querySelector('.game__over');
const restartBtn = document.querySelector('.btn__restart');

const highScoreElement = document.querySelector('.high-score');
const scoreElement = document.querySelector('.score');
const timeElement = document.querySelector('.time');

const blockHeight = 50;
const blockWidth = 50;


let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let time = `00:00`;

highScoreElement.innerText = highScore;

const cols = Math.floor(board.clientHeight / blockHeight);
const rows = Math.floor(board.clientWidth / blockWidth);

let intervalId = null;
let timerIntervalId = null;

let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};


const blocks = [];
let snake = [
    {
        x: 1,
        y: 3
    }
];

let direction = 'down';

// for(let i=0; i<rows * cols; i++){
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }

for(let col = 0; col < cols; col++){
    for(let row = 0; row < rows; row++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        // block.innerText = (`${col}-${row}`);
        blocks[`${col}-${row}`] = block;
    }
}

function render(){
    let head = null;

    blocks[ `${food.x}-${food.y}` ].classList.add('food');

    if (direction == 'right')
        { head = { x: snake[ 0 ].x, y: snake[ 0 ].y + 1}
    } else if (direction == 'left')
        { head = { x: snake[ 0 ].x, y: snake[ 0 ].y - 1 }
    } else if (direction == 'down')
        { head = { x: snake[ 0 ].x + 1, y: snake[ 0 ].y }
    } else if (direction == 'up')
        { head = { x: snake[ 0 ].x - 1, y: snake[ 0 ].y }
    }

    // -- WALL - COLLISION - LOGIC --
    if(head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows){
        // alert ('Game Over !');
        clearInterval(intervalId);
        score = 0;
        scoreElement.innerText = score;
        time = `00:00`;
        modal.style.display = 'flex';
        startGameModal.style.display = 'none'
        gameOverModal.style.display = 'flex'
        return;
    }

    // -- FOOD - CONSUME - LOGIC --
    if(head.x == food.x && head.y == food.y){
        blocks[ `${food.x}-${food.y}` ].classList.remove('food');
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};
        blocks[ `${food.x}-${food.y}` ].classList.add('food');
        snake.unshift(head);

        score += 1;
        scoreElement.innerText = score;

        if(score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
        }
    }

    snake.forEach( segment => {
        // console.log(blocks[ `${segment.x}-${segment.y}`]);
        blocks[ `${segment.x}-${segment.y}`].classList.remove('fill');
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach( segment => {
        // console.log(blocks[ `${segment.x}-${segment.y}`]);
        blocks[ `${segment.x}-${segment.y}`].classList.add('fill');
    })
}

// intervalId = setInterval(() => {
//     // render();
// }, 250);

startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    intervalId = setInterval( () => {
        render()
    }, 250);
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number);

        if(sec == 59) {
            min += 1;
            sec = 0;
        } else{
            sec += 1;
        }
        time = `${min}:${sec}`;
        timeElement.innerText = time;
    }, 1000);
})

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    blocks[ `${food.x}-${food.y}` ].classList.remove('food');
    snake.forEach(segment => {
        blocks[ `${segment.x}-${segment.y}` ].classList.remove('fill');
    });

    score = 0;
    time = `00:00`;

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;


    modal.style.display = 'none';
    snake = [
        {
            x: 1,
            y: 3
        }
    ];
    direction = 'down';
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};
    intervalId = setInterval( () => {
        render()
    }, 250);
    timerIntervalId
}

addEventListener( 'keydown', (event) => {
    if(event.key == 'ArrowUp'){
        direction = 'up';
    } else if(event.key == 'ArrowDown'){
        direction = 'down';
    } else if(event.key == 'ArrowRight'){
        direction = 'right';
    } else if(event.key == 'ArrowLeft'){
        direction = 'left';
    }
})









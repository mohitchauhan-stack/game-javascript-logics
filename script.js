
const board = document.querySelector('.board');
const startBtn = document.querySelector('.btn__start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start__game');
const gameOverModal = document.querySelector('.game__over');

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientHeight / blockHeight);
const rows = Math.floor(board.clientWidth / blockWidth);

let intervalId = null;
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};


const blocks = [];
const snake = [
    {
        x: 1,
        y: 3
    },
    // {
    //     x: 1,
    //     y: 4
    // },
    // {
    //     x: 1,
    //     y: 5
    // },
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

    if(head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows){
        alert ('Game Over !');
        clearInterval(intervalId)
    }

    if(head.x == food.x && head.y == food.y){
        blocks[ `${food.x}-${food.y}` ].classList.remove('food');
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};
        blocks[ `${food.x}-${food.y}` ].classList.add('food');
        snake.unshift(head);
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

intervalId = setInterval(() => {
    // render();
}, 300);

startBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    intervalId = setInterval( () => {
        render();
    }, 250);
})

function restartGame() {
     
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









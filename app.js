const board = document.querySelector(".board");

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);


// DIRECTION
let direction = "right";

// CREATE-SNAKE
const blocks = [];
let snake = [
    {
        x: 0,
        y: 0
    }
];


// BLOCKS-CREATION
for(let row=0; row < rows; row++){
    for(let col=0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = (`${row}-${col}`);
        blocks[`${row}-${col}`] = block;
    }
}

// MOVEMENT-ON-EACH-DIRECTION
setInterval( () => {
    let head = null;
    if(direction == "right"){
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y + 1}
    } else if(direction == "left"){
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y - 1}
    } else if(direction == "up"){
        head = { x: snake[ 0 ].x - 1, y: snake[ 0 ].y}
    } else if (direction == "down"){
        head = { x: snake[ 0 ].x + 1, y: snake[ 0 ].y}
    }
    snake.forEach((eachBlock) => {
        blocks[`${eachBlock.x}-${eachBlock.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    renderSnake();
}, 500);


// RENDER-SNAKE
function renderSnake() {
    snake.forEach((eachBlock) => {
        blocks[`${eachBlock.x}-${eachBlock.y}`].classList.add("fill");
    })
};

// KEY-CONTROLS
addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight" && direction != "left"){
        direction = "right";
    } else if(event.key == "ArrowLeft" && direction != "right"){
        direction = "left";
    } else if (event.key === 'ArrowUp' && direction !== 'down'){
        direction = 'up';
    } else if(event.key == "ArrowDown" && direction != "up"){
        direction = "down";
    }
})




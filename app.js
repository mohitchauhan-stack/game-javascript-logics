const board = document.querySelector(".board");

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

// INTERVAL
let intervalId = null;
// RANDOM - FOOD
let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

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
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        // block.innerText = (`${row}-${col}`);
        blocks[`${row}-${col}`] = block;
    }
}


// RENDER-SNAKE
function renderSnake() {
    // HEAD-CALCULATION
    let head = null;
    // FOOD-RENDER
    blocks[`${food.x}-${food.y}`].classList.add("food");
    // HEAD-MOVEMENT-ON-EACH-DIRECTION
    if(direction == "right"){
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y + 1}
    } else if(direction == "left"){
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y - 1}
    } else if(direction == "up"){
        head = { x: snake[ 0 ].x - 1, y: snake[ 0 ].y}
    } else if (direction == "down"){
        head = { x: snake[ 0 ].x + 1, y: snake[ 0 ].y}
    }
    // GAME-OVER
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        alert("GAME OVER !");
        clearInterval(intervalId);
    }
    // // FOOD-HEAD-CONTACT
    // if(head.x == food.x && head.y == food.y){
    //     // FOOD-REMOVE-REGENERATE-&-ADD
    //     blocks[`${food.x}-${food.y}`].classList.remove("food");
    //     food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
    //     blocks[`${food.x}-${food.y}`].classList.add("food");
    //     // INCREASE-SNAKE
    //     snake.unshift(head);
    // }
    // REMOVE-FILL-BLOCK
    snake.forEach((eachBlock) => {
        blocks[`${eachBlock.x}-${eachBlock.y}`].classList.remove("fill");
    })
    // VISIBILITY-OF-REMOVING-&-MOVING-SNAKE
    snake.unshift(head);
    snake.pop();
    // ADD-FILL-BLOCK
    snake.forEach((eachBlock) => {
        blocks[`${eachBlock.x}-${eachBlock.y}`].classList.add("fill");
    })
};

// CLEAN-INTERVAL
intervalId = setInterval( () => {
    renderSnake();
}, 300);



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

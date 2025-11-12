const board = document.querySelector(".board");
const blockHeight = 80;
const blockWidth = 80;

const columns = Math.floor(board.clientHeight / blockHeight);
const rows = Math.floor(board.clientWidth / blockWidth);
// console.log(columns);
// console.log(rows);

const blocks = [];

const snake = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    }
];

let direction = 'right';

// for (let i = 0; i < col * row; i++) {
//     const block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }

for ( let row = 0; row < rows; row++) {
    for( let col = 0; col < columns; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerHTML = `<h4> ${row}-${col} </h4>`;
        blocks [ `${row}-${col}` ] = block;
    }
}
// console.log(blocks);


function render() {
    snake.forEach( (segment) => {
        // console.log(segment);
        // console.log(blocks [ `${segment.x}-${segment.y}` ]);
        blocks [ `${segment.x}-${segment.y}` ].classList.add("fill")
    })
}

setInterval( () => {
    render();
}, 300);
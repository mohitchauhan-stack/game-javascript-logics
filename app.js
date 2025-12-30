const board = document.querySelector(".board");

const blockHeight = 90;
const blockWidth = 90;

const columns = Math.floor(board.clientHeight / blockHeight);
const rows = Math.floor(board.clientWidth / blockWidth);


for(let i=0; i < columns; i++){
    for(let j=0; j < rows; j++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = (`${j}-${i}`);
    }
}

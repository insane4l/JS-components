const board = document.querySelector('#board');
const cursorRider = document.querySelector('#cursor-rider');
const cursorFinish = document.querySelector('#cursor-finish');


function createBoard(container, itemsCount) {
    for (let i = 0; i < itemsCount; i++) {
        const item = document.createElement('div');
        item.classList.add('board__item');

        item.addEventListener('mouseover', setColor);
        item.addEventListener('mouseleave', clearColor);

        container.append(item);
    }

    function setColor(e) {
        const item = e.target;
        const color = getRandomColor();
        item.style.backgroundColor = color;
        item.style.boxShadow = `0 0 2px ${color}, 0 0 2px ${color}, 0 0 10px ${color}`;
        item.style.border = 'none';
        
    }

    function clearColor(e) {
        const item = e.target;
        item.style.backgroundColor = 'transparent';
        item.style.boxShadow = '';
    }

    function getRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

createBoard(board, 400);


board.addEventListener('mouseover', showCustomCursor);
// board.addEventListener('mouseleave', hideCustomCursor);
board.addEventListener('mousemove', moveCustomCursor);

function showCustomCursor() {
    cursorRider.style.display = 'block';
    cursorFinish.style.display = 'block';
};
// function hideCustomCursor() {
//     cursorRider.style.display = 'none';
//     cursorFinish.style.display = 'none';
// };
function moveCustomCursor(e) {
    cursorRider.style.left = `${e.clientX}px`;
    cursorRider.style.top = `${e.clientY}px`;

    cursorFinish.style.left = `${e.clientX}px`;
    cursorFinish.style.top = `${e.clientY}px`;
};
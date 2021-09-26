const board = document.querySelector('#board');
const cursorRider = document.querySelector('#cursor-rider');
const cursorFinish = document.querySelector('#cursor-finish');

const colors = ['#7df48a', '#e771fb', '#f4ab4b', '#76f9fb', '#e93f33', '#faf879'];
const BOARD_ITEMS = 400;

for (let i = 0; i < BOARD_ITEMS; i++) {
    const item = document.createElement('div');
    item.classList.add('board__item');

    item.addEventListener('mouseover', () => {
        setColor(item);
    });

    item.addEventListener('mouseleave', () => {
        clearColor(item)
    });

    board.append(item);
}

function setColor(item) {
    const color = getRandomColor();
    item.style.backgroundColor = color;
    item.style.boxShadow = `0 0 2px ${color}, 0 0 2px ${color}, 0 0 10px ${color}`;
}

function clearColor(item) {
    item.style.backgroundColor = '#222';
    item.style.boxShadow = '0 0 2px #111';
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}



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
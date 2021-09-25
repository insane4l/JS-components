const riders = document.querySelectorAll('.rider__item');
const placeholders = document.querySelectorAll('.rider__placeholder');
const pedestalPlaceholders = document.querySelectorAll('.pedestal__block .rider__placeholder');

let selectedRider;
let startingPlace;

function clearResults(ridersCount = 3) {
    for (let i = 0; i <= (ridersCount - 1); i++) {
        placeholders[i].append(riders[i]);
        placeholders[i].classList.add('contains-item');
        if (pedestalPlaceholders[i]) {
            pedestalPlaceholders[i].classList.remove('contains-item');
        }
    }
}
document.querySelector('.start__block-image').addEventListener('click', () => {
    document.querySelector('.start__block-image').classList.add('spin');
    clearResults();
    setTimeout(() => {
        document.querySelector('.start__block-image').classList.remove('spin');
    }, 3000)
    
});

function checkIfDropIsAllowed(target) {
    if (target.classList.contains('rider__placeholder') && target.children.length === 0) {
        return true
    }
}


for (const item of riders) {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
}

function dragstart(e) {
    setTimeout( () => {
        e.target.classList.add('hide')
    }, 0);
    e.target.classList.add('dragging');
    selectedRider = e.target;
    startingPlace = e.target.closest('.rider__placeholder');
}
function dragend(e) {
    e.target.classList.remove('hide', 'dragging');
}



for (const item of placeholders) {
    item.addEventListener('dragenter', dragenter, false);
    item.addEventListener('dragleave', dragleave, false);
    item.addEventListener('drop', drop, false);
    item.addEventListener('dragover', dragover, false);
}


function dragenter(e) {
    let isDropAllowed = checkIfDropIsAllowed(e.target);
    if (isDropAllowed) {
        e.target.classList.add('draghovered');
    }
    
}
function dragleave(e) {
    e.target.classList.remove('draghovered')
}
function drop(e) {
    let isDropAllowed = checkIfDropIsAllowed(e.target);
    if (isDropAllowed) {
        e.target.append(selectedRider);
        e.target.classList.add('contains-item');
        startingPlace.classList.remove('contains-item');
        e.target.classList.remove('draghovered');
    }
}


function dragover(e) {
    e.preventDefault();
}


// document.addEventListener("drag", function(event) {
//     setTimeout( () => {
//         event.target.style.display = 'none'
//     }, 0)
//     // 
//     event.target.classList.add('drag');
//     console.log("drag");
// });
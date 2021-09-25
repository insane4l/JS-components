const riders = document.querySelectorAll('.rider__item'),
      placeholders = document.querySelectorAll('.rider__placeholder'),
      pedestalPlaceholders = document.querySelectorAll('.pedestal__block .rider__placeholder'),
      restartBtn = document.querySelector('#restart-btn');

let selectedRider, startingPlace;



// restart button returns riders to start position 
//(+add contains-item class to start position placeholders and remove from pedestal placeholders)
restartBtn.addEventListener('click', () => {
    restartBtn.classList.add('spin');
    clearResults();
    setTimeout(() => {
        restartBtn.classList.remove('spin');
    }, 3000)
});

function clearResults(ridersCount = 3) {
    for (let i = 0; i <= (ridersCount - 1); i++) {
        placeholders[i].append(riders[i]);
        placeholders[i].classList.add('contains-item');
        if (pedestalPlaceholders[i]) {
            pedestalPlaceholders[i].classList.remove('contains-item');
        }
    }
}



// drag rider-items styles manipulation
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




// rider-placeholders(start-placeholders and pedestal-placeholders)
// drag options, styles manipulation
for (const item of placeholders) {
    item.addEventListener('dragenter', dragenter, false);
    item.addEventListener('dragleave', dragleave, false);
    item.addEventListener('drop', drop, false);
    item.addEventListener('dragover', dragover, false);
}

function checkIfDropIsAllowed(target) {
    if (target.classList.contains('rider__placeholder') && target.children.length === 0) {
        return true
    }
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
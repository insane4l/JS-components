const gameWrapper = document.querySelector('#game-wrapper');
const sections = gameWrapper.querySelectorAll('.section');
const startBtn = document.getElementById('start');
const durationList = document.getElementById('duration-list');
const gameTimer = document.getElementById('timer');
const gameBoard = document.getElementById('board');


const RIDER_STYLES = ['rider1', 'rider2', 'rider3', 'rider4', 'rider5']; // todo: create more riders + animations
let gameDuration, score;

setInterval( () => {
    if (startBtn.classList.contains('move_left') ) {
        startBtn.classList.remove('move_left')
        startBtn.classList.add('move_right')
    } else {
        startBtn.classList.remove('move_right')
        startBtn.classList.add('move_left')
    }
}, 2000)
// todo: startHorizontalMov(element, startPosition, finishPosition, speed(interval) ) 
// set element.style.left
//
//calc from speed(interval) and set transition duration for this startPosition finishPosition points
// return timerId

setInterval( () => {
    startBtn.classList.toggle('flashed');
}, 600)


startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(2);
} )

durationList.addEventListener('click', (e) => {
    if ( e.target.classList.contains('game-duration__button') ) {
        showSection(3);
        startGame( +e.target.getAttribute('data-duration') );
    }
})


gameBoard.addEventListener('click', (e) => {
    if ( e.target.classList.contains('rider-jump') ) {
        return
    }
    if ( e.target.classList.contains('rider') ) {
        successfulTarget(e.target);
    }
})

function startGame(duration) {
    score = 0;
    setGameDuration(duration);
    startTimer(duration);
    createRider();
}

function finishGame() {
    console.log(`Your result is ${score} points in ${gameDuration} seconds`); // todo: clear childrens, create element with results, timer button textContent "Restart"
}

// todo: timer button click event, start new game

const successfulTarget = (target) => {
    score++;
    target.classList.add('active');
    setTimeout( () => {
        target.remove();
    }, 800);
    createRider();
}

function createRider() {
    const rider = document.createElement('div');
    const riderStyle = getRandomRider();
    const shadowColor = getRandomColor();
    const {width, height} = gameBoard.getBoundingClientRect()
    const x = getRandomNumber(60, width - 60); // 60px rider width, height (+ animation but its normal)
    const y = getRandomNumber(60, height - 60);

    rider.classList.add('rider');
    rider.classList.add(riderStyle);
    rider.style.top = `${y}px`;
    rider.style.left = `${x}px`;
    gameBoard.append(rider);
    gameBoard.style.boxShadow = `0 0 10px ${shadowColor}, 0 0 20px ${shadowColor}, 0 0 30px ${shadowColor}`; // todo: change event that changes shadow (mb create new interval)

}


function getRandomRider() {
    const index = getRandomNumber(0, RIDER_STYLES.length - 1);
    return RIDER_STYLES[index];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}






const showSection = (sectionNumber) => {
    const index = sectionNumber - 1;
    if (sections[index]) {
        const sectionHeight = sections[index].clientHeight;
        gameWrapper.style.transform = `translateY(-${index *sectionHeight}px)`;
    }
}

function setGameDuration (duration = 30) {
    gameDuration = duration;
}

function showTime(time) {
    gameTimer.textContent = `00:${time}`
}

function startTimer(timeLeft) {
    showTime(timeLeft);

    const timerId = setInterval( () => {
        if (timeLeft === 0) {
            finishGame();
            clearInterval(timerId);
        } else {
            let currentTime = --timeLeft;
            if (currentTime < 10) {
                currentTime = `0${currentTime}`;
            }
            showTime(currentTime)
        }
    }, 1000)
}


function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
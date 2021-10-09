document.addEventListener('DOMContentLoaded', function() {

    const ridersListItems = document.querySelectorAll('.start__section .rider__placeholder');
    const placeholderInputs = document.querySelectorAll('.rider__placeholder-input');

    const gameWrapper = document.querySelector('#game-wrapper');
    const raceTrack = document.querySelector('#race-track');
    const startRaceBtn = document.querySelector('#start-btn');

    let selectedRiders;

    // SELECT RIDERS AND SET RIDERS NAMES
    for (item of ridersListItems) {
        item.addEventListener('click', toggleRiderSelection)
    }

    for (item of placeholderInputs) {
        item.addEventListener('change', setRiderName);
        item.addEventListener('blur', setRiderName);
    }

    function toggleRiderSelection(e) {
        if ( e.target.classList.contains('rider__placeholder-input') 
            || e.target.classList.contains('rider__placeholder-name')) return

        const riderPlaceholder = e.target.closest('.rider__placeholder');

        if ( riderPlaceholder.classList.contains('rider-selected') ) {
            riderPlaceholder.classList.remove('rider-selected');
        } else {
            const placeholderInput = riderPlaceholder.querySelector('.rider__placeholder-input')
            riderPlaceholder.classList.add('edit-name-mode');
            placeholderInput.focus();
        }
    }

    function setRiderName(e) {
        const targetPlaceholder = e.target.closest('.rider__placeholder');

        if ( e.target.value.length <= 0 && targetPlaceholder.classList.contains('edit-name-mode') ) { // onChange and onBlur
            targetPlaceholder.classList.remove('edit-name-mode');
            return
        }

        if ( targetPlaceholder.classList.contains('edit-name-mode') ) { // onChange (the event will happen before onBlur)
            const riderName = targetPlaceholder.querySelector('.rider__placeholder-name');
            riderName.textContent = e.target.value;
            targetPlaceholder.classList.remove('edit-name-mode');
            e.target.value = '';
            targetPlaceholder.classList.add('rider-selected');
        } {/* else {
            // onBlur WILL ALWAYS BE AFTER onChange)
            // happens when the task of the function has already been completed
        } */}
    }




    // START RACE
    startRaceBtn.addEventListener('click', startGame);

    function startGame() {
        selectedRiders = getSelectedRiders();
        showSection(2);
        readyToRace();
        startRace();
    }

    function readyToRace() {
        const ridersCount = selectedRiders.length;
        for (let i = 0; i < ridersCount; i++) {
            createRiderRow(selectedRiders[i]);
        }
        setRidersSpeed(5, 15)
    }

    function createRiderRow(rider) {
        const riderRow = document.createElement('div');
        riderRow.classList.add('race__track-row');
        riderRow.append(rider);
        raceTrack.appendChild(riderRow);
    }

    function startRace() {
        setTimeout( () => {
            selectedRiders.forEach( (rider) => {
                rider.style.transform = `translateX(${888}px)`
            })
        }, 0)
        // setTimeout( () => {
        //     setRidersSpeed(12, 13)
        //     rider.style.transform = `translateX(${600}px)`;
        // }, 3000) // not working
        // setTimeout( () => {}, 200)
        // setTimeout( () => {}, 200)
        // setTimeout( () => {}, 200)
        // setTimeout( () => {}, 200)
        // setTimeout( () => {}, 200)
    }

    function setRidersSpeed(min, max) {
        selectedRiders.forEach( (rider) => {
            const randomSpeed = getRandomNumber(min, max);
            rider.style.transition = `all ${randomSpeed}s linear`
        })
    }




    // FINISH PEDESTAL




    // COMMON
    function getSelectedRiders() {
        return document.querySelectorAll('.rider__placeholder.rider-selected');
    }

    function showSection(sectionNum) {
        const sectionHeight = gameWrapper.clientHeight;
        gameWrapper.style.transform = `translateY(-${sectionHeight * (sectionNum - 1)}px)`
    }

    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min )
    }
})
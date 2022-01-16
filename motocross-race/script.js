document.addEventListener('DOMContentLoaded', function() {

    const gameWrapper = document.querySelector('#game-wrapper');
    const startRaceBtn = document.querySelector('#start-btn');
    const raceTrack = document.querySelector('#race-track');
    const winnersRow = document.querySelector('#pedestal-places');
    const ridersListItems = document.querySelectorAll('.start__section .rider__placeholder');
    const placeholderInputs = document.querySelectorAll('.rider__placeholder-input');


    let selectedRiders, raceDuration;
    let raceResults = []; // all riders speed
    let winners = []; // main 3 places (speed)



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

            if (e.target.value.replace(/\s/g, '').length === 0 || e.target.value.replace(/\s/g, '').length > 8) {
                showError('Please enter 1-8 characters');
                const riderPlaceholder = e.target.closest('.rider__placeholder');
                const placeholderInput = riderPlaceholder.querySelector('.rider__placeholder-input')
                placeholderInput.focus();
                return
            }

            const riderName = targetPlaceholder.querySelector('.rider__placeholder-name');
            riderName.textContent = e.target.value.trim();
            targetPlaceholder.classList.remove('edit-name-mode');
            e.target.value = '';
            targetPlaceholder.classList.add('rider-selected');
        } {/* else {
            // onBlur WILL ALWAYS BE AFTER onChange)
            // happens when the task of the function has already been completed
        } */}
    }




    // START RACE
    startRaceBtn.addEventListener('click', (e) => {
        let riders = getSelectedRiders();

        if (riders.length < 3) {
            showError('Please select 3+ riders');
        } else {
            startGame(e);
        }
    });

    function startGame(e) {
        e.currentTarget.classList.add('spin');
        setTimeout( () => e.target.classList.remove('spin'), 1000);
        selectedRiders = getSelectedRiders();
        showSection(2);
        readyToRace();
        startRace();
        finishRace();
    }

    function readyToRace() {
        const ridersCount = selectedRiders.length;
        for (let i = 0; i < ridersCount; i++) {
            createRiderRow(selectedRiders[i]);
        }
        raceResults = setRidersSpeed(selectedRiders, 5, 15)
    }

    function createRiderRow(rider) {
        const riderRow = document.createElement('div');
        riderRow.classList.add('race__track-row');
        riderRow.append(rider);
        raceTrack.appendChild(riderRow);
    }

    function startRace() {
        const trackLength = raceTrack.clientWidth;
        const riderWidth = selectedRiders[0].clientWidth;
        setTimeout( () => {
            selectedRiders.forEach( (rider) => {
                rider.style.transform = `translateX(${trackLength - riderWidth}px)`
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

    function setRidersSpeed(riders, min, max) { // TODO: 1 speed value can be used only by one rider (cannot be repeated)

        let ridersSpeed = [];
        while (ridersSpeed.length < riders.length) {
            const speed = getRandomNumber(min, max);
            if (ridersSpeed.indexOf(speed) == -1) {
                ridersSpeed.push(speed);
            } 
        }

        for (let i = 0; i < riders.length; i++) {
            riders[i].style.transition = `all ${ridersSpeed[i]}s linear`;
        }

        return ridersSpeed

        // selectedRiders.forEach( (rider) => {
        //     const randomSpeed = getRandomNumber(min, max);
        //     raceResults.push(randomSpeed);
        //     rider.style.transition = `all ${randomSpeed}s linear`
        // })
    }




    // FINISH

    function finishRace() {
        winners = getWinners(raceResults, selectedRiders);
        raceDuration = getRaceDuration(raceResults) * 1000

        setTimeout( () => {
            showWinners(winners);
        }, raceDuration);
    }


    // function getWinners(arr) {
        
    //     console.log(raceResults);
    //     const firstPlaceRiderIndex = arr.indexOf( Math.min.apply(Math, arr) );
    //     winners.push(firstPlaceRiderIndex);
    //     arr[firstPlaceRiderIndex] = 999;

    //     const secondPlaceRiderIndex = arr.indexOf( Math.min.apply(Math, arr) );
    //     winners.push(secondPlaceRiderIndex);
    //     arr[secondPlaceRiderIndex] = 999;

    //     const thirdPlaceRiderIndex = arr.indexOf( Math.min.apply(Math, arr) );
    //     winners.push(thirdPlaceRiderIndex);
        
    //     console.log(winners);
    // }

    function getWinners(results, riders) {
        let sorted = [...results].sort( function(a, b) {return a - b} );

        const firstPlace = results.indexOf(sorted[0]);
        const secondPlace = results.indexOf(sorted[1]);
        const thirdPlace = results.indexOf(sorted[2]);

        return [ riders[secondPlace], riders[firstPlace], riders[thirdPlace] ];
    }

    function getRaceDuration(results) {
        const sortedResults = [...results].sort( function(a, b) {return b - a} );
        return sortedResults[0]; // min rider speed
    }

    function showWinners(riders) {
        showSection(3);
 
        let pedestalWrapper = winnersRow.closest('.finish__pedestal-wrapper');
        let pedestal = winnersRow.closest('.finish__pedestal');
        let finishTitle = document.querySelector('.finish__section-title');
        pedestalWrapper.classList.add('enlarge-pedestal');
        finishTitle.classList.add('enlarge-pedestal');
        pedestal.classList.add('winners-lighting');

        riders.forEach( (el) => {
            el.style.transition = 'all 3s linear'; // todo: riders animation when winners pedestal will show
            el.style.transform = `translateX(0)`;
        })

        winnersRow.appendChild(riders[0]);
        winnersRow.appendChild(riders[1]);
        winnersRow.appendChild(riders[2]);
    }




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

    function showError(message = 'Error', seconds = 3) {
        let modal = document.createElement('div');
        modal.classList.add('error-modal', 'fade-in-out');
        modal.textContent = message;

        document.body.appendChild(modal);
        setTimeout(() => {
            modal.remove();
        }, seconds * 1000);
    }
})
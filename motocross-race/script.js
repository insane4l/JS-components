document.addEventListener('DOMContentLoaded', function() {

    const ridersListItems = document.querySelectorAll('.start__block .rider__placeholder');
    const placeholderInputs = document.querySelectorAll('.rider__placeholder-input');
    const selectedRiders = document.querySelectorAll('.start__block .rider__placeholder.rider-selected');

    for (item of ridersListItems) {
        item.addEventListener('click', toggleRiderSelection)
    }

    for (item of placeholderInputs) {
        item.addEventListener('change', setRiderName)
    }

    function toggleRiderSelection(e) {
        if ( e.target.classList.contains('rider__placeholder-input') 
            || e.target.classList.contains('rider__placeholder-name')) return

        const riderPlaceholder = e.target.closest('.rider__placeholder');

        if ( riderPlaceholder.classList.contains('rider-selected') ) {
            riderPlaceholder.classList.remove('rider-selected');
        } else {
            riderPlaceholder.classList.add('edit-name-mode')
        }
    }

    function setRiderName(e) {
        const targetPlaceholder = e.target.closest('.rider__placeholder');

        if (e.target.value.length > 0) {
            const riderName = targetPlaceholder.querySelector('.rider__placeholder-name');

            riderName.textContent = e.target.value;
            e.target.value = '';
            targetPlaceholder.classList.add('rider-selected');
            targetPlaceholder.classList.remove('edit-name-mode');
        } else {
            // targetPlaceholder.classList.remove('edit-name-mode');
            // console.log('the name must contain at least 1 character'); // todo: change event not working when 0 symbols
        }
    }
})
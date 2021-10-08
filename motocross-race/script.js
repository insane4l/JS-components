document.addEventListener('DOMContentLoaded', function() {

    const ridersListItems = document.querySelectorAll('.start__block .rider__placeholder');
    const placeholderInputs = document.querySelectorAll('.rider__placeholder-input');
    const selectedRiders = document.querySelectorAll('.start__block .rider__placeholder.rider-selected');

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
})
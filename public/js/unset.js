const successContainer = document.querySelector('#success-container');
const errorContainer = document.querySelector('#error-container');

// Check if the error message is present and then schedule it to disappear after 5 seconds
if (errorContainer) {
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
    
}
    
// Check if the success message is present and then schedule it to disappear after 5 seconds
if (successContainer) {
    setTimeout(() => {
        successContainer.style.display = 'none';
    }, 4000);
}

// Add JavaScript to remove the 'show' class after 5 seconds
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const toastContainer = document.querySelector('.toast--state-warning');
        if (toastContainer) {
            toastContainer.classList.remove('show');
        }
    }, 5000);
});
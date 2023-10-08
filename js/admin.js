    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const submit = document.querySelector('#submit');

    // Add a click event listener to the submit button
    submit.addEventListener('click', (event) => {
        if (username.value.trim() === '' && password.value.trim() === '') {
            error(username);
            error(password);
            displayError('الرجاء إدخال اسم المستخدم و كلمة المرور');
            event.preventDefault(); // Prevent form submission
        }
    });

    function displayError(message) {
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
      }

    // Add input event listeners to reset border color
    username.addEventListener('input', () => {
        resetError(username);
    });

    password.addEventListener('input', () => {
        resetError(password);
    });

    function error(element) {
        element.style.border = '2px solid red';
    }

    function resetError(element) {
        element.style.border = '';
    }



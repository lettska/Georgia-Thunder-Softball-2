document.addEventListener('DOMContentLoaded', function() {
    const tryoutForm = document.getElementById('tryoutForm');

    if (tryoutForm) {
        tryoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(tryoutForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            showSuccessMessage();
        });
    }

    // Add input validation
    const inputs = document.querySelectorAll('.tryout-form input, .tryout-form select, .tryout-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    // Add phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,3}', 'g')).join('-');
            }
            e.target.value = value;
        });
    }
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (input.id) {
        case 'playerName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid name';
            }
            break;
        case 'age':
            if (value < 7 || value > 18) {
                isValid = false;
                errorMessage = 'Age must be between 7 and 18';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number (XXX-XXX-XXXX)';
            }
            break;
    }

    // Update input styling and show error message
    if (!isValid) {
        input.classList.add('error');
        showErrorMessage(input, errorMessage);
    } else {
        input.classList.remove('error');
        removeErrorMessage(input);
    }

    return isValid;
}

function showErrorMessage(input, message) {
    removeErrorMessage(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showSuccessMessage() {
    const form = document.getElementById('tryoutForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Thank You!</h3>
        <p>Your tryout request has been submitted successfully. We'll contact you soon with more information.</p>
    `;
    form.innerHTML = '';
    form.appendChild(successMessage);

    // Reset form after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 5000);
} 
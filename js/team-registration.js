document.addEventListener('DOMContentLoaded', function() {
    const teamRegistrationForm = document.getElementById('teamRegistrationForm');

    if (teamRegistrationForm) {
        teamRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(teamRegistrationForm);
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
    const inputs = document.querySelectorAll('.team-registration-form input, .team-registration-form select, .team-registration-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    // Add phone number formatting
    const phoneInput = document.getElementById('coachPhone');
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
        case 'coachName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid name';
            }
            break;
        case 'coachEmail':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'coachPhone':
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number (XXX-XXX-XXXX)';
            }
            break;
        case 'coachExperience':
            if (value < 0) {
                isValid = false;
                errorMessage = 'Experience cannot be negative';
            }
            break;
        case 'teamName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter a valid team name';
            }
            break;
        case 'teamSize':
            if (value < 10 || value > 15) {
                isValid = false;
                errorMessage = 'Team size must be between 10 and 15 players';
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
    const form = document.getElementById('teamRegistrationForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Thank You!</h3>
        <p>Your team registration has been submitted successfully. We'll review your application and contact you soon.</p>
    `;
    form.innerHTML = '';
    form.appendChild(successMessage);

    // Reset form after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 5000);
} 
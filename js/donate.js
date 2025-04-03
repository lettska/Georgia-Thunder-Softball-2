document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donationForm');
    const donationAmount = document.getElementById('donationAmount');
    const donateButtons = document.querySelectorAll('.donate-button');

    // Handle preset donation amount buttons
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                donationAmount.value = '';
                donationAmount.focus();
            } else {
                const amount = this.dataset.amount;
                donationAmount.value = amount;
                donationForm.submit();
            }
        });
    });

    // Handle form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate donation amount
        const amount = parseFloat(donationAmount.value);
        if (isNaN(amount) || amount <= 0) {
            showError('Please enter a valid donation amount');
            return;
        }

        // Here you would typically integrate with a payment processor
        // For now, we'll just show a success message
        showSuccessMessage();
    });

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove any existing error message
        const existingError = donationForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        donationForm.insertBefore(errorDiv, donationForm.firstChild);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your donation of $${donationAmount.value} has been received.</p>
            <p>We appreciate your support!</p>
        `;
        
        // Remove any existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Insert success message before the form
        donationForm.parentNode.insertBefore(successDiv, donationForm);
        
        // Clear the form
        donationForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Add smooth scrolling for sponsor buttons
    document.querySelectorAll('.sponsor-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 
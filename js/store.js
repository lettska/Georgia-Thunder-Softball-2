document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const sortSelect = document.querySelector('.sort-options select');
    const categoryLinks = document.querySelectorAll('.category-filter a');
    const sizeCheckboxes = document.querySelectorAll('.size-options input[type="checkbox"]');
    const priceSlider = document.querySelector('.price-slider input[type="range"]');
    const priceRangeValues = document.querySelector('.price-range-values');
    const productGrid = document.querySelector('.product-grid');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const paginationButtons = document.querySelectorAll('.pagination button, .page-numbers span');

    // Initialize price range display
    if (priceSlider && priceRangeValues) {
        const minPrice = priceSlider.min;
        const maxPrice = priceSlider.max;
        priceRangeValues.innerHTML = `$${minPrice} - $${maxPrice}`;
    }

    // Handle search
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchBar.value.trim();
            if (searchTerm) {
                // Implement search functionality
                console.log('Searching for:', searchTerm);
            }
        });

        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Handle sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            // Implement sorting functionality
            console.log('Sorting by:', sortValue);
        });
    }

    // Handle category filtering
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            // Implement category filtering
            console.log('Filtering by category:', this.textContent);
        });
    });

    // Handle size filtering
    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedSizes = Array.from(sizeCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            // Implement size filtering
            console.log('Filtering by sizes:', selectedSizes);
        });
    });

    // Handle price range filtering
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const minPrice = this.min;
            const maxPrice = this.value;
            priceRangeValues.innerHTML = `$${minPrice} - $${maxPrice}`;
            // Implement price filtering
            console.log('Filtering by price range:', minPrice, '-', maxPrice);
        });
    }

    // Handle quick view
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Create and show quick view modal
            showQuickViewModal({
                name: productName,
                price: productPrice,
                image: productImage
            });
        });
    });

    // Handle add to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const selectedSize = productCard.querySelector('.size-select').value;
            
            // Add to cart functionality
            addToCart({
                name: productName,
                price: productPrice,
                size: selectedSize
            });
        });
    });

    // Handle pagination
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Implement pagination
            const page = this.textContent;
            console.log('Navigating to page:', page);
        });
    });
});

// Quick view modal functionality
function showQuickViewModal(product) {
    // Create modal HTML
    const modalHTML = `
        <div class="quick-view-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <select class="size-select">
                            <option value="">Select Size</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">X-Large</option>
                        </select>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.querySelector('.quick-view-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const addToCartBtn = modal.querySelector('.add-to-cart');

    // Close modal functionality
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Add to cart from modal
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = modal.querySelector('.size-select').value;
        addToCart({
            name: product.name,
            price: product.price,
            size: selectedSize
        });
        modal.remove();
    });
}

// Add to cart functionality
function addToCart(product) {
    // Get existing cart items or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Add new item to cart
    cartItems.push(product);
    
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success message
    showMessage('Product added to cart successfully!', 'success');
}

// Show message functionality
function showMessage(message, type = 'success') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add message to body
    document.body.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
} 
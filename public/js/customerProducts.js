// Filter by name

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[type="search"]');
    const productCards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector('.card-title').textContent.toLowerCase();
            const cardContainer = card.parentElement; // this refers to the col div

            if (productName.includes(query)) {
                cardContainer.classList.remove('d-none');
            } else {
                cardContainer.classList.add('d-none');
            }
        });
    });
});


// Filter by price
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[type="search"]');
    const minPriceInput = document.querySelector('#minPrice');
    const maxPriceInput = document.querySelector('#maxPrice');
    const productCards = document.querySelectorAll('.card');

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const minPrice = parseFloat(minPriceInput.value) || 0;  // default to 0 if empty or invalid
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;  // default to Infinity if empty or invalid

        productCards.forEach(card => {
            const productName = card.querySelector('.card-title').textContent.toLowerCase();
            const productPrice = parseFloat(card.querySelector('.display-5').textContent.replace('$', ''));
            const cardContainer = card.parentElement;

            if (productName.includes(query) && productPrice >= minPrice && productPrice <= maxPrice) {
                cardContainer.classList.remove('d-none');
            } else {
                cardContainer.classList.add('d-none');
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);
    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);
});


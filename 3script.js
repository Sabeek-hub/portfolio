document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const productList = document.getElementById('productList');
    const submitProductBtn = document.getElementById('submitProductBtn');
    const paymentSection = document.getElementById('paymentSection');
    const payBtn = document.getElementById('payBtn');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    const cashDetails = document.getElementById('cashDetails');
    const productImageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');

    let currentProduct = null;

    // Open the modal to add a new product
    addProductBtn.onclick = () => {
        modal.style.display = 'block';
    };

    // Close the modal when the 'x' is clicked
    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    // Close the modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Handle payment method change
    paymentMethod.onchange = () => {
        const method = paymentMethod.value;
        cardDetails.classList.add('hidden');
        paypalDetails.classList.add('hidden');
        cashDetails.classList.add('hidden');

        if (method === 'creditCard') {
            cardDetails.classList.remove('hidden');
        } else if (method === 'paypal') {
            paypalDetails.classList.remove('hidden');
        } else if (method === 'cash') {
            cashDetails.classList.remove('hidden');
        }
    };

    // Preview images when files are selected
    productImageInput.onchange = () => {
        const files = productImageInput.files;
        const fileArray = Array.from(files);
        const imageUrls = fileArray.map(file => URL.createObjectURL(file));
        displayImagePreview(imageUrls);
    };

    function displayImagePreview(imageUrls) {
        imagePreview.innerHTML = ''; // Clear previous previews
        imageUrls.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.className = 'hidden';
            imagePreview.appendChild(img);
        });
        if (imagePreview.firstChild) {
            imagePreview.firstChild.classList.remove('hidden'); // Show the first image
        }
    }

    // Submit the product details
    submitProductBtn.onclick = () => {
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;

        // Validate inputs
        if (productName && productPrice && productDescription && productImageInput.files.length > 0) {
            const imageUrls = Array.from(productImageInput.files).map(file => URL.createObjectURL(file));
            addProductToList(productName, productPrice, productDescription, imageUrls);
            modal.style.display = 'none';

            // Clear inputs
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productDescription').value = '';
            productImageInput.value = '';
            imagePreview.innerHTML = ''; // Clear preview
        } else {
            alert('Please fill out all fields.');
        }
    };

    // Function to add the product to the list
    function addProductToList(name, price, description, imageUrls) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="carousel">
                ${imageUrls.map(url => `<img src="${url}" alt="${name}">`).join('')}
                <button class="prev">❮</button>
                <button class="next">❯</button>
            </div>
            <strong>${name}</strong><br>
            Price: $${price}<br>
            Description: ${description}
            <button class="buyBtn">Buy</button>
            <button class="deleteBtn">Delete</button>
        `;
        productList.appendChild(productDiv);

        // Initialize carousel
        initCarousel(productDiv.querySelector('.carousel'));

        // Buy button functionality
        productDiv.querySelector('.buyBtn').onclick = () => {
            currentProduct = { name, price };
            paymentSection.classList.remove('hidden');
        };

        // Delete functionality
        productDiv.querySelector('.deleteBtn').onclick = () => {
            productList.removeChild(productDiv);
        };
    }

    // Carousel functionality
    function initCarousel(carousel) {
        const images = carousel.querySelectorAll('img');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, idx) => {
                img.classList.toggle('hidden', idx !== index);
            });
        }

        prevButton.onclick = () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        };

        nextButton.onclick = () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        };

        showImage(currentIndex); // Show the first image initially
    }

    // Payment functionality
    payBtn.onclick = () => {
        const method = paymentMethod.value;

        if (method === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;

            if (currentProduct && cardNumber && cardName) {
                alert(`Payment of $${currentProduct.price} for ${currentProduct.name} processed with Card!`);
                resetPayment();
            } else {
                alert('Please complete your card details.');
            }
        } else if (method === 'paypal') {
            const paypalEmail = document.getElementById('paypalEmail').value;

            if (currentProduct && paypalEmail) {
                alert(`Payment of $${currentProduct.price} for ${currentProduct.name} processed with PayPal!`);
                resetPayment();
            } else {
                alert('Please enter your PayPal email.');
            }
        } else {
            alert(`Payment of $${currentProduct.price} for ${currentProduct.name} will be done in cash upon delivery!`);
            resetPayment();
        }
    };

    function resetPayment() {
        paymentSection.classList.add('hidden');
        currentProduct = null;
        paymentMethod.value = 'creditCard';
        cardDetails.classList.add('hidden');
        paypalDetails.classList.add('hidden');
        cashDetails.classList.add('hidden');
    }
});

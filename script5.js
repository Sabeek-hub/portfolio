const orderList = document.getElementById('orderList');
const totalPriceElement = document.getElementById('totalPrice');
let totalPrice = 0;

function addToCart(foodItem, price) {
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.textContent = `${foodItem} - $${price.toFixed(2)}`;
    orderList.appendChild(listItem);

    // Update total price
    totalPrice += price;
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;

    if (orderList.children.length === 0) {
        alert('Your cart is empty! Please add items to your cart before placing an order.');
        return;
    }

    alert(`Your order has been placed! Delivery will be at: ${location}. Contact: ${phone}`);
    orderList.innerHTML = ''; // Clear the order list
    totalPrice = 0; // Reset total price
    totalPriceElement.textContent = `Total: $0.00`; // Reset total price display
    document.getElementById('location').value = ''; // Clear the location input
    document.getElementById('phone').value = ''; // Clear the phone input
});

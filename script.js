const restaurants = [
    { id: 1, name: "Pizza Place", menu: ["Cheese Pizza", "Pepperoni Pizza", "Veggie Pizza"] },
    { id: 2, name: "Burger Joint", menu: ["Classic Burger", "Cheese Burger", "Veggie Burger"] },
    { id: 3, name: "Sushi Spot", menu: ["California Roll", "Spicy Tuna Roll", "Veggie Roll"] }
];

let order = [];

document.addEventListener("DOMContentLoaded", () => {
    loadRestaurants();
    document.getElementById('place-order').addEventListener('click', placeOrder);
});

function loadRestaurants() {
    const restaurantList = document.getElementById('restaurant-list');
    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.className = 'restaurant';
        restaurantDiv.innerHTML = `
            <h3>${restaurant.name}</h3>
            <ul>
                ${restaurant.menu.map(item => `<li><button onclick="addToOrder('${item}')">${item}</button></li>`).join('')}
            </ul>
        `;
        restaurantList.appendChild(restaurantDiv);
    });
}

function addToOrder(item) {
    order.push(item);
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    order.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        orderList.appendChild(li);
    });
}

function placeOrder() {
    if (order.length === 0) {
        alert("Your order is empty!");
    } else {
        alert(`Order placed: ${order.join(', ')}`);
        order = [];  // Clear order after placing
        updateOrderSummary();
    }
}

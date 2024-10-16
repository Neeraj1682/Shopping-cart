let cart = [];

const cartItemsContainer = document.getElementById('cartItems');
const totalPriceContainer = document.getElementById('totalPrice');

document.getElementById('addItem').addEventListener('click', () => {
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);

    if (name && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
        addItemToCart(name, price, quantity);
        updateCartDisplay();
        clearInputs();
    } else {
        alert("Please enter valid item details.");
    }
});

function addItemToCart(name, price, quantity) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
}

function removeItemFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

function updateItemQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeItemFromCart(name);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeItemFromCart('${item.name}')">Remove</button>
            <input type="number" value="${item.quantity}" onchange="updateItemQuantity('${item.name}', parseInt(this.value))" />
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceContainer.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function clearInputs() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '';
}

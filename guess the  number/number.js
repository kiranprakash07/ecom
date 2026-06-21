// 1. DYNAMIC ARRAY WITH ALL 20 PRODUCTS
const products = [
    { id: 1, name: "Premium White Tee", price: 29.99, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { id: 2, name: "Raw Denim Jacket", price: 89.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
    { id: 3, name: "Classic Leather Watch", price: 149.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 4, name: "Suede Desert Boots", price: 119.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
    { id: 5, name: "Minimalist Backpack", price: 65.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
    { id: 6, name: "Polarized Sunglasses", price: 45.00, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" },
    { id: 7, name: "Slim Fit Chino Pant", price: 49.99, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500" },
    { id: 8, name: "Knit Wool Sweater", price: 75.00, image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=500" },
    { id: 9, name: "Leather Travel Wallet", price: 34.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500" },
    { id: 10, name: "Sport Corduroy Cap", price: 24.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" },
    { id: 11, name: "Linen Summer Shirt", price: 54.99, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
    { id: 12, name: "Waterproof Parka Coat", price: 180.00, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500" },
    { id: 13, name: "Minimalist Sneakers", price: 95.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 14, name: "Silk Neck Scarf", price: 22.50, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: 15, name: "Casual Denim Jeans", price: 69.99, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
    { id: 16, name: "Canvas Duffel Bag", price: 85.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
    { id: 17, name: "Stainless Water Bottle", price: 28.00, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500" },
    { id: 18, name: "Chelsea Suede Boots", price: 135.00, image: "https://images.unsplash.com/photo-1638247025967-b4e38f68917a?w=500" },
    { id: 19, name: "Tailored Lounge Shorts", price: 39.99, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
    { id: 20, name: "Anorak Windbreaker", price: 110.00, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500" }
];

let cart = [];

// 2. RENDER THE 20 PRODUCTS DYNAMICALLY 
function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                <div class="card-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <h6 class="card-title fw-bold text-dark mb-1">${product.name}</h6>
                    <p class="text-muted small mb-3">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-outline-dark btn-sm mt-auto py-2 fw-semibold w-100">
                        <i class="fa-solid fa-plus me-1"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. UI ANIMATION LOGIC FOR THE SIDEBAR CART
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('d-none');
}

// 4. BUSINESS LOGIC (ADD, REMOVE, UPDATE QUANTITY)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    updateCartUI();
}

// 5. UPDATE CART CONTENT AND BADGES REALTIME
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const emptyMsg = document.getElementById('empty-cart-msg');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartCount.innerText = totalItems;
        cartCount.classList.remove('d-none');
        emptyMsg.classList.add('d-none');
    } else {
        cartCount.classList.add('d-none');
        emptyMsg.classList.remove('d-none');
    }

    // Keep the empty message placeholder structure, clean rest
    cartItemsContainer.innerHTML = emptyMsg.outerHTML + cart.map(item => `
        <div class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
            <img src="${item.image}" class="rounded object-fit-cover" style="width: 60px; height: 60px;">
            <div class="flex-grow-1 ms-3">
                <h6 class="mb-0 fw-bold small text-dark" style="max-width: 180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</h6>
                <span class="text-muted small">$${item.price.toFixed(2)}</span>
                <div class="d-flex align-items-center gap-2 mt-1">
                    <button onclick="changeQuantity(${item.id}, -1)" class="btn btn-light btn-sm px-2 py-0 border">-</button>
                    <span class="small font-weight-bold">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="btn btn-light btn-sm px-2 py-0 border">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="btn btn-link text-danger p-0 ms-2">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order successful! Processing your payment profile mock...");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Boot up app on system ready
displayProducts();
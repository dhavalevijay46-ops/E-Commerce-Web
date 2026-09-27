
let cart = [];

// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

// =========================
// UPDATE CART COUNT
// =========================

function updateCart() {
    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;
}

// =========================
// SHOW CART
// =========================

function showCart() {
    const modal = document.getElementById("cartModal");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");

    modal.classList.add("show");
}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {
    cart.splice(index, 1);

    updateCart();
    showCart();
}

// =========================
// CLOSE CART
// =========================

function closeCart() {
    document.getElementById("cartModal")
        .classList.remove("show");
}

// Close cart when clicking outside the modal

document.getElementById("cartModal")
    .addEventListener("click", function(event) {
        if (event.target === this) {
            closeCart();
        }
    });

// =========================
// CHECKOUT
// =========================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Checkout demo only. Connect a payment gateway " +
        "to accept real payments."
    );
}

// =========================
// WISHLIST
// =========================

function toggleWishlist(button) {
    button.classList.toggle("liked");

    const icon = button.querySelector("i");

    if (button.classList.contains("liked")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    }
}

// =========================
// CATEGORY FILTER
// =========================

function filterCategory(category) {
    const products = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {
        button.classList.remove("active");

        if (button.textContent.trim() === category) {
            button.classList.add("active");
        }
    });

    let visibleCount = 0;

    products.forEach(product => {
        const productCategory = product.dataset.category;

        if (category === "All" || productCategory === category) {
            product.style.display = "";
            visibleCount++;
        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("noProducts").hidden = visibleCount > 0;
}

// =========================
// SEARCH PRODUCTS
// =========================

function toggleSearch() {
    const searchBox = document.getElementById("searchBox");

    searchBox.classList.toggle("show");

    if (searchBox.classList.contains("show")) {
        document.getElementById("searchInput").focus();
    }
}

function searchProducts() {
    const searchText = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    let visibleCount = 0;

    products.forEach(product => {
        const productName = product.querySelector("h3")
            .textContent.toLowerCase();

        const category = product.dataset.category.toLowerCase();

        if (productName.includes(searchText) ||
            category.includes(searchText)) {

            product.style.display = "";
            visibleCount++;

        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("noProducts").hidden = visibleCount > 0;

    document.querySelectorAll(".filter-btn")
        .forEach(button => button.classList.remove("active"));
}

// =========================
// MOBILE MENU
// =========================

function toggleMenu() {
    document.getElementById("navLinks")
        .classList.toggle("show");
}

// Close mobile menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("navLinks")
            .classList.remove("show");
    });
});

// =========================
// NEWSLETTER
// =========================

function subscribe(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    alert("Thank you for subscribing: " + email);

    document.getElementById("email").value = "";
}
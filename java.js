
        // Product data
        const products = [
            // Shoes
            {
                id: 1,
                name: "Men's Running Shoes",
                price: 89.99,
                category: "shoes",
                description: "Comfortable running shoes for men",
                icon: "👟"
            },
            {
                id: 2,
                name: "Women's High Heels",
                price: 79.99,
                category: "shoes",
                description: "Elegant high heels for women",
                icon: "👠"
            },
            {
                id: 3,
                name: "Kids' Sneakers",
                price: 49.99,
                category: "shoes",
                description: "Fun and colorful sneakers for kids",
                icon: "👟"
            },
            {
                id: 4,
                name: "Men's Formal Shoes",
                price: 129.99,
                category: "shoes",
                description: "Professional formal shoes for men",
                icon: "👞"
            },
            {
                id: 5,
                name: "Women's Boots",
                price: 99.99,
                category: "shoes",
                description: "Stylish boots for women",
                icon: "👢"
            },
            
            // Electronics
            {
                id: 6,
                name: "Smartphone",
                price: 699.99,
                category: "electronics",
                description: "Latest smartphone with advanced features",
                icon: "📱"
            },
            {
                id: 7,
                name: "Laptop",
                price: 999.99,
                category: "electronics",
                description: "High-performance laptop for work and gaming",
                icon: "💻"
            },
            {
                id: 8,
                name: "Wireless Headphones",
                price: 149.99,
                category: "electronics",
                description: "Premium wireless headphones",
                icon: "🎧"
            },
            {
                id: 9,
                name: "Smart Watch",
                price: 299.99,
                category: "electronics",
                description: "Fitness tracking smart watch",
                icon: "⌚"
            },
            {
                id: 10,
                name: "Bluetooth Speaker",
                price: 79.99,
                category: "electronics",
                description: "Portable Bluetooth speaker",
                icon: "🔊"
            },
            
            // Groceries
            {
                id: 11,
                name: "Fresh Apples",
                price: 4.99,
                category: "groceries",
                description: "Organic red apples - 2lbs",
                icon: "🍎"
            },
            {
                id: 12,
                name: "Whole Wheat Bread",
                price: 3.49,
                category: "groceries",
                description: "Fresh whole wheat bread",
                icon: "🍞"
            },
            {
                id: 13,
                name: "Milk",
                price: 3.99,
                category: "groceries",
                description: "Fresh whole milk - 1 gallon",
                icon: "🥛"
            },
            {
                id: 14,
                name: "Bananas",
                price: 2.99,
                category: "groceries",
                description: "Fresh bananas - 3lbs",
                icon: "🍌"
            },
            {
                id: 15,
                name: "Eggs",
                price: 4.49,
                category: "groceries",
                description: "Fresh eggs - dozen",
                icon: "🥚"
            },
            
            // Football Jerseys
            {
                id: 16,
                name: "Manchester United Jersey",
                price: 89.99,
                category: "jerseys",
                description: "Official Manchester United home jersey",
                icon: "👕"
            },
            {
                id: 17,
                name: "Barcelona Jersey",
                price: 89.99,
                category: "jerseys",
                description: "Official Barcelona home jersey",
                icon: "👕"
            },
            {
                id: 18,
                name: "Real Madrid Jersey",
                price: 89.99,
                category: "jerseys",
                description: "Official Real Madrid home jersey",
                icon: "👕"
            },
            {
                id: 19,
                name: "Liverpool Jersey",
                price: 89.99,
                category: "jerseys",
                description: "Official Liverpool home jersey",
                icon: "👕"
            },
            {
                id: 20,
                name: "Bayern Munich Jersey",
                price: 89.99,
                category: "jerseys",
                description: "Official Bayern Munich home jersey",
                icon: "👕"
            }
        ];

        // Shopping cart
        let cart = [];

        // DOM elements
        const productsGrid = document.getElementById('products-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        const cartModal = document.getElementById('cart-modal');
        const closeModal = document.querySelector('.close');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            setupEventListeners();
        });

        // Display products
        function displayProducts(productsToShow) {
            productsGrid.innerHTML = '';
            
            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        <span style="font-size: 4rem;">${product.icon}</span>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <p class="product-description">${product.description}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Filter products
        function filterProducts(category) {
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            updateCartCount();
            showNotification('Product added to cart!');
        }

        // Update cart count
        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Show cart modal
        function showCart() {
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                `;
                
                cartItem.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div>
                        <button onclick="removeFromCart(${item.id})" style="
                            background: #e74c3c;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 3px;
                            cursor: pointer;
                        ">Remove</button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            cartTotal.textContent = total.toFixed(2);
            cartModal.style.display = 'block';
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            showCart();
        }
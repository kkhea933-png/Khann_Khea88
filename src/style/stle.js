\ function getBadgeHTML(badge) {
            if (badge === 'New') return '<span class="badge-new">New</span>';
            if (badge === 'Best Seller') return '<span class="badge-best">Best Seller</span>';
            if (badge === 'Eco-Friendly') return '<span class="badge-eco">Eco-Friendly</span>';
            return '';
        }

        // Search Functionality
        function filterProducts(query) {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.desc.toLowerCase().includes(query.toLowerCase())
            );
            renderProducts(filtered);
            
            if (query.length > 0 && document.activeElement.id === 'heroSearchInput') {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        }

        function syncSearch(val) {
            document.getElementById('navSearchInput').value = val;
            filterProducts(val);
        }

        function clearSearch() {
            document.getElementById('navSearchInput').value = '';
            document.getElementById('heroSearchInput').value = '';
            renderProducts(products);
        }

        // View Details
        function viewDetails(id) {
            currentProduct = products.find(p => p.id === id);
            document.getElementById('modalProductName').innerText = currentProduct.name;
            document.getElementById('modalProductTitle').innerText = currentProduct.name;
            document.getElementById('modalProductPrice').innerText = `$${currentProduct.price.toFixed(2)}`;
            document.getElementById('modalProductDesc').innerText = currentProduct.desc;
            document.getElementById('modalProductImg').src = currentProduct.img;
            document.getElementById('productQty').value = 1;
            new bootstrap.Modal(document.getElementById('productModal')).show();
        }

        function updateQty(val) {
            const input = document.getElementById('productQty');
            let current = parseInt(input.value);
            if (current + val >= 1) input.value = current + val;
        }

        function showPayment() {
            const qty = parseInt(document.getElementById('productQty').value);
            document.getElementById('paymentTotal').innerText = `$${(currentProduct.price * qty).toFixed(2)}`;
            bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
            document.getElementById('payment-step-1').classList.remove('d-none');
            document.getElementById('payment-step-2').classList.add('d-none');
            new bootstrap.Modal(document.getElementById('paymentModal')).show();
        }

        function confirmPayment() {
            document.getElementById('payment-step-1').classList.add('d-none');
            document.getElementById('payment-step-2').classList.remove('d-none');
            cartCount += parseInt(document.getElementById('productQty').value);
            document.getElementById('cart-count').innerText = cartCount;
        }

        // Category pill active state
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', function() {
                document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });

        document.addEventListener('DOMContentLoaded', () => renderProducts());
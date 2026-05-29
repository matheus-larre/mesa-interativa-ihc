/* ==========================================
   MESA INTERATIVA — APP LOGIC
   Premium Restaurant Tablet UI
   ========================================== */

(function() {
    'use strict';

    // ==========================================
    // DATA
    // ==========================================

    const menuItems = [
        {
            id: 1, name: 'Bruschetta Italiana', category: 'entradas',
            desc: 'Pão artesanal com tomates frescos, manjericão e azeite extra-virgem',
            price: 28.90, tag: 'Popular',
            img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop'
        },
        {
            id: 2, name: 'Carpaccio de Salmão', category: 'entradas',
            desc: 'Lâminas finas de salmão fresco com alcaparras e limão siciliano',
            price: 42.90, tag: '',
            img: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop'
        },
        {
            id: 3, name: 'Risoto de Funghi', category: 'principais',
            desc: 'Arroz arbóreo com mix de cogumelos, parmesão e trufa negra',
            price: 68.90, tag: 'Chef',
            img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop'
        },
        {
            id: 4, name: 'Filé ao Molho Madeira', category: 'principais',
            desc: 'Filé mignon grelhado com molho madeira, arroz e legumes salteados',
            price: 79.90, tag: 'Popular',
            img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop'
        },
        {
            id: 5, name: 'Salmão Grelhado', category: 'principais',
            desc: 'Filé de salmão com crosta de ervas, purê de batata e aspargos',
            price: 74.90, tag: '',
            img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
        },
        {
            id: 6, name: 'Tiramisù', category: 'sobremesas',
            desc: 'Clássico italiano com mascarpone, café e cacau belga',
            price: 32.90, tag: '',
            img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
        },
        {
            id: 7, name: 'Petit Gâteau', category: 'sobremesas',
            desc: 'Bolinho quente de chocolate belga com sorvete de baunilha',
            price: 34.90, tag: 'Popular',
            img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop'
        },
        {
            id: 8, name: 'Cheesecake de Frutas', category: 'sobremesas',
            desc: 'Base crocante com cream cheese e calda de frutas vermelhas',
            price: 29.90, tag: '',
            img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop'
        },
        {
            id: 9, name: 'Suco Natural', category: 'bebidas',
            desc: 'Suco fresco — laranja, abacaxi, maracujá ou morango (500ml)',
            price: 14.90, tag: '',
            img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop'
        },
        {
            id: 10, name: 'Caipirinha Artesanal', category: 'bebidas',
            desc: 'Cachaça premium com fruta fresca da estação',
            price: 26.90, tag: 'Popular',
            img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop'
        },
        {
            id: 11, name: 'Vinho Tinto Reserva', category: 'bebidas',
            desc: 'Taça de vinho tinto Malbec argentino selecionado',
            price: 38.90, tag: '',
            img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop'
        },
        {
            id: 12, name: 'Água com Gás', category: 'bebidas',
            desc: 'Água mineral com gás natural (500ml)',
            price: 8.90, tag: '',
            img: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&h=300&fit=crop'
        }
    ];

    const extrasItems = [
        { id: 'agua', name: 'Água', icon: '💧' },
        { id: 'gelo', name: 'Gelo', icon: '🧊' },
        { id: 'guardanapo', name: 'Guardanapo', icon: '🧻' },
        { id: 'talheres', name: 'Talheres', icon: '🍴' },
        { id: 'ketchup', name: 'Ketchup', icon: '🍅' },
        { id: 'maionese', name: 'Maionese', icon: '🫙' },
        { id: 'mostarda', name: 'Mostarda', icon: '🟡' },
        { id: 'pimenta', name: 'Pimenta', icon: '🌶️' },
        { id: 'azeite', name: 'Azeite', icon: '🫒' },
        { id: 'pao', name: 'Pão Extra', icon: '🍞' },
        { id: 'bebida', name: 'Reposição Bebida', icon: '🥤' },
        { id: 'cadeira', name: 'Cadeira Extra', icon: '🪑' }
    ];

    // ==========================================
    // STATE
    // ==========================================

    let cart = [];
    let ratings = { atendimento: 0, comida: 0, ambiente: 0 };
    let selectedEmoji = null;
    let selectedPayment = null;
    let splitCount = 1;
    let extrasSelected = {};
    let currentScreen = 'screenHome';

    // ==========================================
    // DOM REFS
    // ==========================================

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // ==========================================
    // CLOCK
    // ==========================================

    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        $('#headerClock').textContent = `${h}:${m}`;
    }

    updateClock();
    setInterval(updateClock, 10000);

    // ==========================================
    // SCREEN NAVIGATION
    // ==========================================

    function navigateTo(screenId) {
        if (screenId === currentScreen) return;

        const currentEl = $(`#${currentScreen}`);
        const targetEl = $(`#${screenId}`);

        // Leave current
        currentEl.classList.remove('active');
        currentEl.classList.add('leaving');

        setTimeout(() => {
            currentEl.classList.remove('leaving');
            currentEl.style.display = 'none';

            // Enter target
            targetEl.style.display = 'block';
            targetEl.classList.add('entering');

            setTimeout(() => {
                targetEl.classList.remove('entering');
                targetEl.classList.add('active');
            }, 550);

            currentScreen = screenId;

            // Trigger screen-specific animations
            if (screenId === 'screenHome') animateHomeButtons();
            if (screenId === 'screenMenu') animateMenuItems();
            if (screenId === 'screenExtras') animateExtrasItems();
        }, 350);
    }

    // Navigation from home buttons
    $$('.home-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
            const target = this.dataset.screen;
            setTimeout(() => navigateTo(target), 200);
        });
    });

    // Back buttons
    $$('.back-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.screen;
            navigateTo(target);
        });
    });

    // ==========================================
    // RIPPLE EFFECT
    // ==========================================

    function createRipple(e, el) {
        const ripple = el.querySelector('.btn-ripple');
        if (!ripple) return;

        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.remove('rippling');
        void ripple.offsetWidth;
        ripple.classList.add('rippling');

        setTimeout(() => ripple.classList.remove('rippling'), 600);
    }

    // ==========================================
    // HOME SCREEN ANIMATIONS
    // ==========================================

    function animateHomeButtons() {
        const buttons = $$('.home-btn');
        buttons.forEach((btn, i) => {
            btn.classList.remove('visible');
            setTimeout(() => {
                btn.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s`;
                btn.classList.add('visible');
            }, 50);
        });
    }

    // Initial animation
    setTimeout(animateHomeButtons, 200);

    // ==========================================
    // WAITER SCREEN
    // ==========================================

    const waiterCallBtn = $('#waiterCallBtn');
    const waiterPulse = $('#waiterPulse');
    const waiterTitle = $('#waiterTitle');
    const waiterSubtitle = $('#waiterSubtitle');
    const waiterStatus = $('#waiterStatus');

    waiterCallBtn.addEventListener('click', function() {
        this.classList.add('calling');
        waiterPulse.classList.add('calling');
        waiterTitle.textContent = 'Chamando...';
        waiterSubtitle.textContent = 'Um garçom foi notificado';

        // Simulate response
        setTimeout(() => {
            waiterStatus.textContent = '✓ Garçom a caminho — tempo estimado: 1 min';
            waiterStatus.classList.add('visible');

            setTimeout(() => {
                this.classList.remove('calling');
                waiterPulse.classList.remove('calling');
                waiterTitle.textContent = 'Garçom Notificado';
                waiterSubtitle.textContent = 'Carlos está vindo à sua mesa';

                setTimeout(() => {
                    // Reset
                    waiterTitle.textContent = 'Chamar Garçom';
                    waiterSubtitle.textContent = 'Toque para chamar um garçom à sua mesa';
                    waiterStatus.classList.remove('visible');
                    waiterStatus.textContent = '';
                }, 5000);
            }, 2500);
        }, 1500);
    });

    // ==========================================
    // MENU SCREEN
    // ==========================================

    function renderMenu(filter = 'todos', searchTerm = '') {
        const grid = $('#menuGrid');
        let filtered = menuItems;

        if (filter !== 'todos') {
            filtered = filtered.filter(item => item.category === filter);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(term) ||
                item.desc.toLowerCase().includes(term)
            );
        }

        grid.innerHTML = filtered.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-item-image" style="background-image: url('${item.img}')">
                    ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
                </div>
                <div class="menu-item-info">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-desc">${item.desc}</div>
                    <div class="menu-item-bottom">
                        <span class="menu-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                        <button class="menu-add-btn" data-id="${item.id}" aria-label="Adicionar ao pedido">+</button>
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(animateMenuItems, 50);
    }

    function animateMenuItems() {
        $$('.menu-item').forEach((item, i) => {
            item.classList.remove('visible');
            setTimeout(() => item.classList.add('visible'), i * 60);
        });
    }

    // Filter chips
    $('#menuFilters').addEventListener('click', function(e) {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;

        $$('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderMenu(chip.dataset.filter, $('#menuSearchInput').value);
    });

    // Search
    $('#menuSearchInput').addEventListener('input', function() {
        const activeFilter = $('.filter-chip.active')?.dataset.filter || 'todos';
        renderMenu(activeFilter, this.value);
    });

    // Add to cart from menu
    $('#menuGrid').addEventListener('click', function(e) {
        const addBtn = e.target.closest('.menu-add-btn');
        if (!addBtn) return;

        const id = parseInt(addBtn.dataset.id);
        addToCart(id);

        addBtn.classList.add('added');
        addBtn.textContent = '✓';
        setTimeout(() => {
            addBtn.classList.remove('added');
            addBtn.textContent = '+';
        }, 1200);
    });

    // Initial render
    renderMenu();

    // ==========================================
    // CART / ORDER LOGIC
    // ==========================================

    function addToCart(itemId) {
        const item = menuItems.find(m => m.id === itemId);
        if (!item) return;

        const existing = cart.find(c => c.id === itemId);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }

        updateCartUI();
        showToast(`${item.name} adicionado!`);
    }

    function removeFromCart(itemId) {
        cart = cart.filter(c => c.id !== itemId);
        updateCartUI();
    }

    function changeQty(itemId, delta) {
        const item = cart.find(c => c.id === itemId);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(itemId);
            return;
        }
        updateCartUI();
    }

    function getCartTotal() {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    function updateCartUI() {
        const badge = $('#cartBadge');
        const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
        badge.textContent = totalQty;
        badge.classList.remove('bump');
        void badge.offsetWidth;
        badge.classList.add('bump');

        const list = $('#orderItemsList');
        const summary = $('#orderSummary');

        if (cart.length === 0) {
            list.innerHTML = `
                <div class="empty-cart">
                    <svg viewBox="0 0 64 64" fill="none" class="empty-cart-icon">
                        <path d="M18 12h32l-4 24H18L12 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.3"/>
                        <circle cx="22" cy="44" r="4" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                        <circle cx="42" cy="44" r="4" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
                    </svg>
                    <p>Seu pedido está vazio</p>
                    <span>Adicione itens pelo cardápio</span>
                </div>
            `;
            summary.style.display = 'none';
            return;
        }

        list.innerHTML = cart.map(item => `
            <div class="order-item" data-id="${item.id}">
                <div class="order-item-img" style="background-image: url('${item.img}')"></div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="order-item-qty">
                    <button class="qty-btn" onclick="window._changeQty(${item.id}, -1)">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="window._changeQty(${item.id}, 1)">+</button>
                </div>
                <button class="order-item-remove" onclick="window._removeFromCart(${item.id})">✕</button>
            </div>
        `).join('');

        const total = getCartTotal();
        $('#orderSubtotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        summary.style.display = 'block';

        // Update bill
        updateBillTotal();
    }

    // Expose to inline handlers
    window._changeQty = changeQty;
    window._removeFromCart = removeFromCart;

    // Send order
    $('#sendOrderBtn').addEventListener('click', function() {
        if (cart.length === 0) return;

        this.style.pointerEvents = 'none';
        this.innerHTML = `
            <div style="width:20px;height:20px;border:2px solid transparent;border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <span>Enviando...</span>
        `;

        setTimeout(() => {
            showToast('Pedido enviado para a cozinha! 🎉');
            this.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                <span>Enviar para Cozinha</span>
            `;
            this.style.pointerEvents = 'auto';
            // Keep cart for bill purposes but show confirmation
        }, 1800);
    });

    // ==========================================
    // BILL SCREEN
    // ==========================================

    function updateBillTotal() {
        const total = getCartTotal();
        const amount = $('#billAmount');
        amount.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        updateSplitValue();
    }

    function updateSplitValue() {
        const total = getCartTotal();
        const perPerson = total / splitCount;
        $('#splitValue').textContent = `R$ ${perPerson.toFixed(2).replace('.', ',')}`;
    }

    $('#splitPlus').addEventListener('click', () => {
        splitCount = Math.min(splitCount + 1, 12);
        $('#splitCount').textContent = splitCount;
        $('#splitCount').style.animation = 'none';
        void $('#splitCount').offsetWidth;
        $('#splitCount').style.animation = 'bounceIn 0.3s var(--ease-spring)';
        updateSplitValue();
    });

    $('#splitMinus').addEventListener('click', () => {
        splitCount = Math.max(splitCount - 1, 1);
        $('#splitCount').textContent = splitCount;
        $('#splitCount').style.animation = 'none';
        void $('#splitCount').offsetWidth;
        $('#splitCount').style.animation = 'bounceIn 0.3s var(--ease-spring)';
        updateSplitValue();
    });

    // Payment method selection
    $$('.payment-opt').forEach(opt => {
        opt.addEventListener('click', function() {
            $$('.payment-opt').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedPayment = this.dataset.method;
        });
    });

    // Request bill
    $('#requestBillBtn').addEventListener('click', function() {
        if (!selectedPayment) {
            // Shake the payment section
            const paymentSection = $('.payment-methods');
            paymentSection.style.animation = 'shakeX 0.5s ease';
            setTimeout(() => paymentSection.style.animation = '', 500);
            return;
        }
        showToast('Conta solicitada! Um atendente trará em breve.');
    });

    // ==========================================
    // RATING SCREEN
    // ==========================================

    // Stars
    $$('.stars-row').forEach(row => {
        row.addEventListener('click', function(e) {
            const star = e.target.closest('.star-btn');
            if (!star) return;

            const value = parseInt(star.dataset.value);
            const category = this.dataset.category;
            ratings[category] = value;

            this.querySelectorAll('.star-btn').forEach((s, i) => {
                if (i < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Emojis
    $$('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            $$('.emoji-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedEmoji = this.dataset.emoji;
        });
    });

    // Submit rating
    $('#submitRateBtn').addEventListener('click', function() {
        const hasRating = ratings.atendimento > 0 || ratings.comida > 0 || ratings.ambiente > 0;
        if (!hasRating) {
            showToast('Selecione ao menos uma avaliação');
            return;
        }

        launchConfetti();
        showToast('Obrigado pela sua avaliação! 🌟');

        // Reset after delay
        setTimeout(() => {
            $$('.star-btn').forEach(s => s.classList.remove('active'));
            $$('.emoji-btn').forEach(b => b.classList.remove('active'));
            $('#rateComment').value = '';
            ratings = { atendimento: 0, comida: 0, ambiente: 0 };
            selectedEmoji = null;
        }, 2000);
    });

    // ==========================================
    // EXTRAS SCREEN
    // ==========================================

    function renderExtras() {
        const grid = $('#extrasGrid');
        grid.innerHTML = extrasItems.map(item => `
            <div class="extra-item" data-id="${item.id}">
                <span class="extra-icon">${item.icon}</span>
                <span class="extra-name">${item.name}</span>
                <span class="extra-qty-badge">1</span>
            </div>
        `).join('');
    }

    function animateExtrasItems() {
        $$('.extra-item').forEach((item, i) => {
            item.classList.remove('visible');
            setTimeout(() => item.classList.add('visible'), i * 50);
        });
    }

    renderExtras();

    // Toggle extras
    $('#extrasGrid').addEventListener('click', function(e) {
        const item = e.target.closest('.extra-item');
        if (!item) return;

        const id = item.dataset.id;

        if (extrasSelected[id]) {
            extrasSelected[id]++;
            const badge = item.querySelector('.extra-qty-badge');
            badge.textContent = extrasSelected[id];
            badge.style.animation = 'none';
            void badge.offsetWidth;
            badge.style.animation = 'bounceIn 0.3s var(--ease-spring)';
        } else {
            extrasSelected[id] = 1;
            item.classList.add('selected');
        }

        // Show/hide send button
        const hasExtras = Object.keys(extrasSelected).length > 0;
        const sendBtn = $('#sendExtrasBtn');
        sendBtn.style.display = hasExtras ? 'flex' : 'none';
    });

    // Long press to deselect
    let longPressTimer;
    $('#extrasGrid').addEventListener('pointerdown', function(e) {
        const item = e.target.closest('.extra-item');
        if (!item) return;

        longPressTimer = setTimeout(() => {
            const id = item.dataset.id;
            delete extrasSelected[id];
            item.classList.remove('selected');

            const hasExtras = Object.keys(extrasSelected).length > 0;
            $('#sendExtrasBtn').style.display = hasExtras ? 'flex' : 'none';
        }, 600);
    });

    document.addEventListener('pointerup', () => clearTimeout(longPressTimer));
    document.addEventListener('pointercancel', () => clearTimeout(longPressTimer));

    // Send extras
    $('#sendExtrasBtn').addEventListener('click', function() {
        const items = Object.keys(extrasSelected).map(id => {
            const item = extrasItems.find(e => e.id === id);
            return `${item.icon} ${item.name} ×${extrasSelected[id]}`;
        });

        showToast(`Solicitação enviada! ${items.length} item(ns)`);

        // Reset
        setTimeout(() => {
            extrasSelected = {};
            $$('.extra-item').forEach(el => el.classList.remove('selected'));
            this.style.display = 'none';
        }, 500);
    });

    // ==========================================
    // TOAST
    // ==========================================

    function showToast(message, duration = 3000) {
        const toast = $('#toast');
        const text = $('#toastText');
        text.textContent = message;
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
        }, duration);
    }

    // ==========================================
    // CONFETTI
    // ==========================================

    function launchConfetti() {
        const canvas = $('#confettiCanvas');
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        const particles = [];
        const colors = ['#e8a838', '#e85d75', '#34c77b', '#5ba4e8', '#9b6ee8', '#38c9b4', '#f5c518'];

        for (let i = 0; i < 120; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height * 0.5,
                vx: (Math.random() - 0.5) * 12,
                vy: -Math.random() * 14 - 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 3,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.25,
                opacity: 1,
                decay: 0.008 + Math.random() * 0.008
            });
        }

        let frame;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let alive = false;
            particles.forEach(p => {
                if (p.opacity <= 0) return;
                alive = true;

                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.rotation += p.rotSpeed;
                p.opacity -= p.decay;
                p.vx *= 0.99;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
            });

            if (alive) {
                frame = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(frame);
            }
        }

        animate();
    }

    // ==========================================
    // AMBIENT ANIMATIONS (subtle floating dots)
    // ==========================================

    // Auto-focus initial state
    updateBillTotal();

})();

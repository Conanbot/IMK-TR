// ==================== DATA ====================
let cart = [];
let wishlist = [];

const allGames = [
    { id: 1, title: "Subnautica 2", price: 350999, discount: 10, img: "https://picsum.photos/id/1015/800/450", genre: "Survival", desc: "An underwater survival adventure on an alien world." },
    { id: 2, title: "Grand Theft Auto VI", price: 1130500, discount: 5, img: "https://picsum.photos/id/237/800/450", genre: "Action", desc: "Return to Vice City in the most massive open world yet." },
    { id: 3, title: "Elden Ring", price: 239990, discount: 30, img: "https://picsum.photos/id/180/800/450", genre: "RPG", desc: "Action RPG from FromSoftware." },
    { id: 4, title: "Forza Horizon 6", price: 719200, discount: 30, img: "https://picsum.photos/id/201/800/450", genre: "Racing", desc: "Open world driving in Japan." },
    { id: 5, title: "Resident Evil Requiem", price: 728000, discount: 20, img: "https://picsum.photos/id/133/800/450", genre: "Horror", desc: "Survival horror at its finest." }
];

// ==================== NAVIGATION ====================
function navigateTo(page, gameId = null) {
    const content = document.getElementById('main-content');
    content.innerHTML = '';

    switch (page) {
        case 'store': renderStore(content); break;
        case 'game-detail': renderGameDetail(content, gameId); break;
        case 'cart': renderCart(content); break;
        case 'wishlist': renderWishlist(content); break;
        case 'friends': renderFriends(content); break;
        default: renderStore(content);
    }
}

// ==================== STORE PAGE ====================
function renderStore(container) {
    container.innerHTML = `
        <div class="row">
            <!-- Sidebar Filter -->
            <div class="col-lg-3 border-end vh-100 overflow-auto p-4">
                <h5>Genre</h5>
                <div class="mb-4">
                    <div class="form-check"><input class="form-check-input" type="checkbox" checked> Survival</div>
                    <div class="form-check"><input class="form-check-input" type="checkbox"> Action</div>
                    <div class="form-check"><input class="form-check-input" type="checkbox"> RPG</div>
                    <div class="form-check"><input class="form-check-input" type="checkbox"> Racing</div>
                    <div class="form-check"><input class="form-check-input" type="checkbox"> Horror</div>
                </div>
                <h5>Price Range</h5>
                <input type="range" class="form-range" min="0" max="2000000" value="800000">
            </div>

            <!-- Main Content -->
            <div class="col-lg-9 p-4">
                <!-- Hero -->
                <div class="position-relative rounded-4 overflow-hidden mb-5" style="height: 460px; background: url('https://picsum.photos/id/1015/1920/1080') center/cover;">
                    <div class="position-absolute bottom-0 start-0 end-0 p-5" style="background: linear-gradient(transparent, #0f0f1e);">
                        <h1 class="display-3 fw-bold">SUBNAUTICA 2</h1>
                        <button onclick="addToCart(allGames[0])" class="btn btn-purple btn-lg px-5">Buy Now - IDR 350.999</button>
                    </div>
                </div>

                <h4 class="mb-4">You might like</h4>
                <div class="row g-4" id="store-grid"></div>
            </div>
        </div>
    `;

    const grid = document.getElementById('store-grid');
    allGames.forEach(game => {
        const card = document.createElement('div');
        card.className = "col-md-4 col-lg-3";
        card.innerHTML = `
            <div class="game-card card h-100 border-0 rounded-3 overflow-hidden" onclick="navigateTo('game-detail', ${game.id})">
                <img src="${game.img}" class="card-img-top" style="height:260px; object-fit:cover">
                <div class="card-body">
                    <h6>${game.title}</h6>
                    <small class="text-muted">${game.genre}</small>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-success">${game.discount}% OFF</span>
                        <strong>IDR ${(game.price / 1000).toFixed(0)}K</strong>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==================== GAME DETAIL PAGE ====================
function renderGameDetail(container, id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;

    container.innerHTML = `
        <div class="row g-4 p-4">
            <div class="col-lg-8">
                <img src="${game.img}" class="img-fluid rounded-4 mb-4" style="width:100%; max-height:520px; object-fit:cover;">
                <h2>${game.title}</h2>
                <p class="text-success fs-5">${game.genre} • Very Positive (94%)</p>
                <p class="lead">${game.desc}</p>
            </div>

            <div class="col-lg-4">
                <div class="bg-dark p-4 rounded-4 sticky-top" style="top: 90px;">
                    <h3 class="text-success">IDR ${(game.price / 1000).toFixed(0)}K</h3>
                    <div class="d-grid gap-2 mt-4">
                        <button class="btn btn-purple btn-lg" onclick="addToCart(allGames.find(g=>g.id===${id}))">
                            Add to Cart
                        </button>
                        <button class="btn btn-outline-light btn-lg" onclick="addToWishlist(${id});">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==================== SHOPPING CART ====================
function renderCart(container) {
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    let html = `<div class="p-4"><h2>Shopping Cart (${cart.length})</h2>`;

    if (cart.length === 0) {
        html += `<p class="text-center py-5">Your cart is empty</p>`;
    } else {
        html += `<div class="list-group">`;
        cart.forEach((item, i) => {
            html += `
                <div class="list-group-item bg-dark d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${item.img}" width="70" class="me-3 rounded">
                        <div>
                            <h6>${item.title}</h6>
                            <small>IDR ${(item.price / 1000).toFixed(0)}K</small>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${i})">Remove</button>
                </div>`;
        });
        html += `</div>`;
        html += `<div class="mt-4 text-end">
            <h4>Total: IDR ${(total / 1000).toFixed(0)}K</h4>
            <button class="btn btn-purple btn-lg px-5 mt-3" onclick="checkout()">Proceed to Checkout</button>
        </div>`;
    }
    html += `</div>`;
    container.innerHTML = html;
}

function addToCart(game) {
    cart.push(game);
    updateCartCount();
    showToast(`✅ ${game.title} added to cart`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart(document.getElementById('main-content'));
}

function checkout() {
    if (cart.length === 0) return;
    showToast("🎉 Payment successful! (Demo)", "success");
    cart = [];
    updateCartCount();
    setTimeout(() => navigateTo('store'), 1500);
}

// ==================== WISHLIST ====================
function addToWishlist(id) {
    const game = allGames.find(g => g.id === id);
    if (!wishlist.find(g => g.id === id)) {
        wishlist.push(game);
        showToast(`❤️ ${game.title} added to Wishlist`);
    }
}

function renderWishlist(container) {
    let html = `<div class="p-4"><h2>Wishlist (${wishlist.length})</h2><div class="row g-4">`;
    wishlist.forEach(game => {
        html += `
            <div class="col-md-4">
                <div class="card bg-dark border-0">
                    <img src="${game.img}" class="card-img-top" style="height:220px;object-fit:cover">
                    <div class="card-body">
                        <h6>${game.title}</h6>
                        <button class="btn btn-purple w-100 mt-2" onclick="addToCart(allGames.find(g=>g.id===${game.id}))">Add to Cart</button>
                    </div>
                </div>
            </div>`;
    });
    html += `</div></div>`;
    container.innerHTML = html;
}

// ==================== FRIENDS PAGE ====================
function renderFriends(container) {
    container.innerHTML = `
        <div class="p-4">
            <h2>Friends</h2>
            <div class="row">
                <div class="col-md-8">
                    <h5>Online Friends</h5>
                    <div class="list-group">
                        <div class="list-group-item bg-dark d-flex align-items-center">
                            <div class="bg-success rounded-circle" style="width:12px;height:12px;margin-right:12px"></div>
                            Zicho L. - Playing Valorant
                        </div>
                        <div class="list-group-item bg-dark d-flex align-items-center">
                            <div class="bg-success rounded-circle" style="width:12px;height:12px;margin-right:12px"></div>
                            Novina - Playing CS2
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-purple w-100" onclick="showToast('Friend request sent!')">Add Friend</button>
                </div>
            </div>
        </div>
    `;
}

// ==================== UTILITIES ====================
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
}

function showToast(msg, type = "info") {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:30px;right:30px;background:#1f2937;color:white;padding:16px 24px;border-radius:12px;border-left:6px solid ${type === 'success' ? '#22c55e' : '#a855f7'};z-index:99999;`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== INIT ====================
window.onload = () => {
    navigateTo('store');
};
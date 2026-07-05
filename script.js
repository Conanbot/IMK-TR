// Data Games
const featuredGames = [
    { id: 1, title: "Subnautica 2", price: 350999, discount: 10, img: "https://picsum.photos/id/1015/800/450", genre: "Survival" },
    { id: 2, title: "Grand Theft Auto VI", price: 1130500, discount: 5, img: "https://picsum.photos/id/237/300/400", genre: "Action" },
    { id: 3, title: "Elden Ring", price: 239990, discount: 30, img: "https://picsum.photos/id/180/300/400", genre: "RPG" },
    { id: 4, title: "Forza Horizon 6", price: 719200, discount: 30, img: "https://picsum.photos/id/201/300/400", genre: "Racing" },
    { id: 5, title: "PRAGMATA", price: 545300, discount: 30, img: "https://picsum.photos/id/133/300/400", genre: "Sci-Fi" },
];

let cart = [];

// Render Store Page (Sesuai Gambar)
function renderStore(container) {
    container.innerHTML = `
        <div class="row">
            <!-- LEFT SIDEBAR FILTER -->
            <div class="col-lg-3 border-end" style="height: calc(100vh - 80px); overflow-y: auto;">
                <div class="p-4">
                    <h5 class="mb-3">Genre</h5>
                    <div class="mb-4">
                        <div class="form-check"><input class="form-check-input" type="checkbox" checked> Action RPGs</div>
                        <div class="form-check"><input class="form-check-input" type="checkbox"> Strategy</div>
                        <div class="form-check"><input class="form-check-input" type="checkbox"> Shooter</div>
                        <div class="form-check"><input class="form-check-input" type="checkbox"> Adventure</div>
                        <div class="form-check"><input class="form-check-input" type="checkbox"> Horror</div>
                    </div>

                    <h5 class="mb-3">Price Range</h5>
                    <input type="range" class="form-range" min="0" max="2000000" value="500000">

                    <h5 class="mt-4 mb-3">Tags</h5>
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-secondary">Multiplayer</span>
                        <span class="badge bg-secondary">Open World</span>
                        <span class="badge bg-secondary">Co-op</span>
                        <span class="badge bg-secondary">Survival</span>
                    </div>

                    <h5 class="mt-4 mb-3">Platform</h5>
                    <div class="form-check"><input class="form-check-input" type="checkbox" checked> Windows</div>
                    <div class="form-check"><input class="form-check-input" type="checkbox"> macOS</div>
                </div>
            </div>

            <!-- MAIN CONTENT -->
            <div class="col-lg-9 p-4">
                <!-- HERO BANNER -->
                <div class="position-relative rounded-4 overflow-hidden mb-5" style="height: 460px; background: url('https://picsum.photos/id/1015/1920/1080') center/cover;">
                    <div class="position-absolute bottom-0 start-0 end-0 p-5 bg-gradient">
                        <span class="badge bg-info">OUT NOW</span>
                        <h1 class="display-3 fw-bold text-white">SUBNAUTICA 2</h1>
                        <p class="lead text-white">Immerse yourself in a new underwater adventure.</p>
                        <div class="d-flex gap-3">
                            <button onclick="addToCart(featuredGames[0])" class="btn btn-purple btn-lg px-5">Buy Now - IDR 350.999</button>
                            <button class="btn btn-outline-light btn-lg">Add to Wishlist</button>
                        </div>
                    </div>
                </div>

                <!-- YOU MIGHT LIKE -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4>You might like</h4>
                    <a href="#" class="text-purple">See all</a>
                </div>

                <div class="row g-4" id="recommended-grid"></div>
            </div>
        </div>
    `;

    // Render Recommended Games
    const grid = document.getElementById('recommended-grid');
    featuredGames.forEach(game => {
        const div = document.createElement('div');
        div.className = "col-md-6 col-lg-3";
        div.innerHTML = `
            <div class="game-card card h-100 border-0 rounded-3 overflow-hidden shadow-sm" onclick="showGameDetail(${game.id})">
                <img src="${game.img}" class="card-img-top" style="height: 260px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${game.title}</h6>
                    <small class="text-muted">${game.genre}</small>
                    <div class="mt-auto d-flex justify-content-between align-items-end">
                        <div>
                            <span class="text-success fw-bold">${game.discount}% OFF</span><br>
                            <strong>IDR ${(game.price / 1000).toFixed(0)}K</strong>
                        </div>
                        <button class="btn btn-sm btn-purple" onclick="event.stopImmediatePropagation(); addToCart(featuredGames.find(g => g.id === ${game.id}))">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });

    // Anime.js Animation
    anime({
        targets: '#recommended-grid .game-card',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: anime.stagger(100, { start: 200 })
    });
}

// Fungsi pendukung
function addToCart(game) {
    cart.push(game);
    document.getElementById('cart-count').textContent = cart.length;
    showToast(`✅ ${game.title} added to cart!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; 
        background: #1f2937; color: white; padding: 14px 20px; 
        border-radius: 10px; border-left: 5px solid #8b5cf6;
        z-index: 10000; box-shadow: 0 10px 15px rgba(0,0,0,0.3);
    `;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}

function showGameDetail(id) {
    const game = featuredGames.find(g => g.id === id);
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="p-5 text-center">
            <h2>${game.title}</h2>
            <img src="${game.img}" class="img-fluid rounded-4 my-4" style="max-height: 500px;">
            <p>Full game page would appear here (like the screenshots you gave).</p>
            <button class="btn btn-purple btn-lg" onclick="addToCart(featuredGames.find(g=>g.id===${id}))">Add to Cart</button>
        </div>
    `;
}

// Inisialisasi
window.onload = () => {
    const content = document.getElementById('main-content');
    renderStore(content);
};
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
    updateCartBadge();
    showToast(`✅ ${game.title} added to cart`);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart(document.getElementById('main-content'));
}


function checkout() {
    if (cart.length === 0) return;

    // If this is the full-page cart (non-SPA), navigate to payment confirmation
    // Detect by presence of the server-rendered cart panel or by URL
    const isFullCartPage = !!document.getElementById('cart-panel') || (window.location.pathname || '').toLowerCase().endsWith('/cart.html');
    if (isFullCartPage) {
        // persist cart for the payment flow to read
        try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
        // redirect to payment method step (intermediate page)
        window.location.href = 'payment-method.html';
        return;
    }

    // SPA fallback behavior: demo success, clear cart and return to store
    showToast("🎉 Payment successful! (Demo)", "success");
    cart = [];
    updateCartBadge();
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
// Reusable cart badge updater for all pages
function updateCartBadge() {
    const countEl = document.getElementById('cart-count');
    if (!countEl) return;

    let count = cart.length;
    try {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (Array.isArray(storedCart)) {
            count = storedCart.length;
        }
    } catch (error) {
        // ignore invalid localStorage contents
    }

    countEl.textContent = count;
}

// Backward compatible alias (existing code might call updateCartCount)
function updateCartCount() {
    updateCartBadge();
}

function showToast(msg, type = "info") {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:30px;right:30px;background:#1f2937;color:white;padding:16px 24px;border-radius:12px;border-left:6px solid ${type === 'success' ? '#22c55e' : '#a855f7'};z-index:99999;`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== VIDEO PREVIEW (shared utility) ====================
// Ensure a single modal exists on the page; if not, inject it.
function ensureVideoModal() {
    if (document.getElementById('video-preview-modal')) return;
    const container = document.createElement('div');
    container.id = 'video-preview-modal';
    container.className = 'video-preview-modal';
    container.hidden = true;
    container.innerHTML = `
        <div class="video-overlay" id="video-overlay"></div>
        <div class="video-wrapper">
            <button class="video-close-btn" id="video-close-btn" aria-label="Close preview">&times;</button>
            <video id="preview-video" controls playsinline></video>
        </div>
    `;
    document.body.appendChild(container);
}

// Create modal early so shared handlers can rely on its presence
ensureVideoModal();
function slugify(title) {
    return title.toString().toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

const detailPreviewMap = {
    'pragmata': '7Nh9nP4xCXQ',
    'grand-theft-auto-vi': 'QdBZY2fkU-0',
    'resident-evil-requiem': '9lrThxCoznw',
    'forza-horizon-6': 'oYhaW-Vr4wg'
};

function getYouTubePreviewId(title) {
    return detailPreviewMap[slugify(title || '')] || null;
}

function createYouTubeEmbed(id) {
    const iframe = document.createElement('iframe');
    iframe.id = 'detail-preview-iframe';
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.objectFit = 'cover';
    iframe.loading = 'lazy';
    return iframe;
}

function openVideoPreview(title) {
    const modal = document.getElementById('video-preview-modal');
    const video = document.getElementById('preview-video');
    if (!modal || !video) return;
    const slug = slugify(title || 'preview');
    // remove any previous placeholder
    removePreviewPlaceholder(modal);
    // store title for placeholder fallback
    modal.dataset.previewTitle = title || '';
    video.src = `img/games/${slug}-preview.mp4`;
    video.currentTime = 0;
    // show modal immediately; if video fails, placeholder will show from error handler
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    video.play().catch(() => {});
}

function closeVideoPreview() {
    const modal = document.getElementById('video-preview-modal');
    const video = document.getElementById('preview-video');
    if (!modal || !video) return;
    video.pause();
    video.removeAttribute('src');
    removePreviewPlaceholder(modal);
    modal.hidden = true;
    // clear stored preview title
    try { delete modal.dataset.previewTitle; } catch (e) { modal.dataset.previewTitle = ''; }
    document.body.style.overflow = '';
}

// Global event delegation for preview buttons and modal controls
document.addEventListener('click', function (e) {
    const playBtn = e.target.closest('.preview-play-btn');
    if (playBtn) {
        e.preventDefault();
        e.stopPropagation();
        // find title source: card data-title or img alt or inner text
        const col = playBtn.closest('.game-card-col') || playBtn.closest('.card') || playBtn.closest('.game-card-col');
        let title = null;
        if (col && col.getAttribute) title = col.getAttribute('data-title') || col.dataset.title;
        if (!title) {
            const img = playBtn.closest('.card-img-wrapper') ? playBtn.closest('.card-img-wrapper').querySelector('img') : null;
            if (img) title = img.alt || img.getAttribute('alt');
        }
        if (title) {
            // redirect to game detail page instead of opening modal
            const slug = slugify(title);
            window.location.href = `gamedetail.html?key=${encodeURIComponent(slug)}`;
        }
        return;
    }

    const watchBtn = e.target.closest('#watch-preview-btn');
    if (watchBtn) {
        e.preventDefault();
        // attempt to play inside detail page media area if present
        const titleEl = document.getElementById('detail-title') || document.querySelector('h2') || document.querySelector('.display-3');
        const title = titleEl ? titleEl.textContent.trim() : 'preview';
        // if we are on a game detail page with media container, play inline there
        if (document.getElementById('main-player-container') || document.getElementById('main-preview-img')) {
            playPreviewInDetail(title);
        } else {
            const slug = slugify(title);
            window.location.href = `gamedetail.html?key=${encodeURIComponent(slug)}`;
        }
        return;
    }

    const closeBtn = e.target.closest('.video-close-btn');
    if (closeBtn) { e.preventDefault(); closeVideoPreview(); return; }

    const overlay = e.target.closest('.video-overlay');
    if (overlay) { closeVideoPreview(); return; }
});

document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeVideoPreview(); });

// ==================== HOVER-MUTED PREVIEW + FALLBACK ====================
let hoverEnabled = true;
function startHoverPreview(wrapper) {
    if (!hoverEnabled) return;
    if (!window.location.pathname.toLowerCase().includes('gamedetail.html')) return;
    if (wrapper._hovering) return;
    wrapper._hovering = true;
    const img = wrapper.querySelector('img');
    let title = null;
    const col = wrapper.closest('.game-card-col');
    if (col) title = col.getAttribute('data-title') || col.dataset.title;
    if (!title && img) title = img.alt || img.getAttribute('alt');
    if (!title) return;
    const slug = slugify(title);
    const video = document.createElement('video');
    video.className = 'hover-preview-video';
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    // try small preview first, fallback to full preview
    video.src = `img/games/${slug}-preview-small.mp4`;
    video.onerror = function () {
        if (video.src && video.src.includes('-preview-small.mp4')) {
            video.src = `img/games/${slug}-preview.mp4`;
            video.play().catch(() => {});
            return;
        }
        // both small and full previews failed — show a small hover placeholder
        video.remove();
        wrapper._hoverVideo = null;
        wrapper._hovering = false;
        showHoverPlaceholder(wrapper);
    };
    wrapper.appendChild(video);
    video.play().catch(() => {});
    wrapper._hoverVideo = video;
}

function stopHoverPreview(wrapper) {
    if (!wrapper._hovering) return;
    wrapper._hovering = false;
    const v = wrapper._hoverVideo;
    if (v) { try { v.pause(); } catch (e) {} v.remove(); wrapper._hoverVideo = null; }
    removeHoverPlaceholder(wrapper);
}

function showHoverPlaceholder(wrapper) {
    // Do not show hover placeholder on listing/store pages (index)
    const path = (window.location.pathname || '').toLowerCase();
    if (path.endsWith('/index.html') || path === '/' || path === '') return;
    removeHoverPlaceholder(wrapper);
    const ph = document.createElement('div');
    ph.className = 'hover-placeholder';
    ph.textContent = 'Preview not available';
    wrapper.appendChild(ph);
    wrapper._hoverPlaceholder = ph;
}

function removeHoverPlaceholder(wrapper) {
    if (!wrapper) return;
    if (wrapper._hoverPlaceholder) { wrapper._hoverPlaceholder.remove(); wrapper._hoverPlaceholder = null; }
}

// Delegated hover handling (mouseover/mouseout bubbles)
document.addEventListener('mouseover', function (e) {
    const wrapper = e.target.closest('.card-img-wrapper');
    if (!wrapper) return;
    // avoid triggering when moving within same wrapper
    const related = e.relatedTarget;
    if (related && wrapper.contains(related)) return;
    startHoverPreview(wrapper);
});

document.addEventListener('mouseout', function (e) {
    const wrapper = e.target.closest('.card-img-wrapper');
    if (!wrapper) return;
    const related = e.relatedTarget;
    if (related && wrapper.contains(related)) return;
    stopHoverPreview(wrapper);
});

// Modal error handling for large preview
(function attachModalErrorHandler(){
    // modal is injected by ensureVideoModal(); find it
    const check = () => {
        const vid = document.getElementById('preview-video');
        if (!vid) return setTimeout(check, 200);
        vid.addEventListener('error', function () {
            // Instead of closing modal, show a friendly placeholder so UX stays consistent
            const modal = document.getElementById('video-preview-modal');
            showPreviewPlaceholder(modal, vid);
        });
    };
    check();
})();

// Show a visual placeholder inside the modal when no video is available
function showPreviewPlaceholder(modal, videoEl) {
    if (!modal) return;
    removePreviewPlaceholder(modal);
    const placeholder = document.createElement('div');
    placeholder.className = 'preview-placeholder';

    // Attempt to show a poster image based on slug if available
    const titleText = modal.dataset.previewTitle || (document.getElementById('detail-title') || document.querySelector('h2') || {}).textContent || '';
    const slug = slugify(titleText || 'preview');
    const imgPath = `img/games/${slug}.jpg`;

    // Build inner content (SVG animation + optional image)
    placeholder.innerHTML = `
        <div class="preview-placeholder-inner">
            <div class="preview-anim"></div>
            <div class="preview-text">Preview not available — showing demo placeholder</div>
        </div>
    `;

    // insert before/after video element
    if (videoEl && videoEl.parentNode) {
        videoEl.style.display = 'none';
        videoEl.parentNode.appendChild(placeholder);
    } else {
        modal.appendChild(placeholder);
    }
}

function removePreviewPlaceholder(modal) {
    if (!modal) return;
    const existing = modal.querySelector('.preview-placeholder');
    if (existing) existing.remove();
    const vid = modal.querySelector('video');
    if (vid) vid.style.display = '';
}

// Play preview inside game detail media area (replaces main-preview-img)
function playPreviewInDetail(title) {
    const slug = slugify(title || 'preview');
    const container = document.getElementById('main-player-container');
    const img = document.getElementById('main-preview-img');
    if (!container || !img) {
        // fallback to modal if detail area missing
        openVideoPreview(title);
        return;
    }

    // remove any existing embed/video playback before creating new preview
    const oldVideo = container.querySelector('video#detail-preview-video');
    const oldFrame = container.querySelector('iframe#detail-preview-iframe');
    if (oldVideo) oldVideo.remove();
    if (oldFrame) oldFrame.remove();

    const previewOverlay = container.querySelector('.video-controls-bar');
    const pegiScreen = container.querySelector('.pegi-screen-sim');
    if (previewOverlay) previewOverlay.style.display = 'none';
    if (pegiScreen) pegiScreen.style.display = 'none';

    const youtubeId = getYouTubePreviewId(title);
    if (youtubeId) {
        img.style.display = 'none';
        const iframe = createYouTubeEmbed(youtubeId);
        container.appendChild(iframe);
        return;
    }

    // If no YouTube preview is available for this title, keep the existing image and restore overlay UI.
    if (previewOverlay) previewOverlay.style.display = '';
    if (pegiScreen) pegiScreen.style.display = '';
    showToast('Preview is only available on selected game detail pages.', 'info');
}

// ==================== INIT ====================
// Use load event listener to avoid overwriting other page handlers
window.addEventListener('load', () => {
    if (document.getElementById('cart-count')) updateCartBadge();
    // Only initialize SPA store view when a `main-content` container exists
    if (document.getElementById('main-content')) {
        try { navigateTo('store'); } catch (e) { console.error(e); }
    }
});
// Main Application Logic

class Create2EarnApp {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        this.allProducts = window.mockData.products;
        this.isLoggedIn = false; // auth status mockup
        this.init();
    }

    init() {
        this.setupNavigation();
        this.renderHome();
        this.setupEventListeners();
    }

    setupNavigation() {
        // Mock User Profile Snippet in Nav
        const userNav = document.getElementById('current-user-nav');
        const currentUser = window.mockData.users[1]; // Simulate logged in as Maria (Rising)
        userNav.innerHTML = `
            <div class="user-snippet" onclick="location.hash='#dashboard'">
                <img src="${currentUser.avatar}" class="user-avatar" alt="User">
                <div style="display:flex; flex-direction:column; align-items:flex-start;">
                    <span style="font-size:0.85rem; font-weight:600;">Rp 2.405.000</span>
                    <span class="creator-level-badge level-${currentUser.level.toLowerCase()}" style="font-size:0.6rem;">${currentUser.level}</span>
                </div>
            </div>
        `;
    }

    // THE FAIR EXPOSURE ALGORITHM CORE IMPLEMENTATION
    getFairExposureProducts() {
        /*
            Algorithm ensures fair distribution:
            Instead of sorting by pure rank or pure sales, we interleave creators.
            Sequence logic: [Top, New/Rising, Pro, New/Rising, Top, ...]
        */
        const newRising = this.allProducts.filter(p => ['New', 'Rising'].includes(p.creator.level));
        const pro = this.allProducts.filter(p => p.creator.level === 'Pro');
        const top = this.allProducts.filter(p => p.creator.level === 'Top');

        const mixed = [];
        let rIndex = 0, pIndex = 0, tIndex = 0;
        
        // We iterate and weave them together to ensure visibility
        while (rIndex < newRising.length || pIndex < pro.length || tIndex < top.length) {
            if (tIndex < top.length) mixed.push(top[tIndex++]);
            if (rIndex < newRising.length) mixed.push(newRising[rIndex++]);
            if (pIndex < pro.length) mixed.push(pro[pIndex++]);
            if (rIndex < newRising.length) mixed.push(newRising[rIndex++]); // Give New/Rising an extra bump
        }
        
        return mixed;
    }

    getHiddenGems() {
        // Only return New or Rising creators with rating > 4.5
        return this.allProducts
            .filter(p => ['New', 'Rising'].includes(p.creator.level) && p.rating >= 4.5)
            .slice(0, 4); // Limit to top 4 gems
    }

    renderHome() {
        this.appRoot.innerHTML = ''; // clear

        // 1. Hero
        this.appRoot.innerHTML += window.Components.Hero();

        // 2. Hidden Gems Section
        const gems = this.getHiddenGems();
        this.appRoot.innerHTML += window.Components.HiddenGems(gems);

        // 3. Fair Exposure Main Grid
        const fairMix = this.getFairExposureProducts();
        this.appRoot.innerHTML += window.Components.ExploreGrid(fairMix);
        
        // Setup fade-in
        this.appRoot.className = 'view active';
    }

    renderUploadFlow() {
        if (!this.isLoggedIn) {
            this.appRoot.innerHTML = window.Components.AuthView();
            this.appRoot.className = 'view active';
        } else {
            this.appRoot.innerHTML = window.Components.UploadProductView();
            this.appRoot.className = 'view active';

            setTimeout(() => {
                const uploadInput = document.getElementById('upload-image');
                if (uploadInput) {
                    uploadInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                window.uploadedImageBase64 = event.target.result;
                                document.getElementById('drop-zone-display').innerHTML = `<img src="${event.target.result}" style="max-height:150px; max-width:100%; border-radius:8px; object-fit:contain; margin-bottom:12px;"> <br> <span style="font-size:0.85rem; color:var(--text-main);">Gambar berhasil dipilih</span>`;
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }
            }, 50);
        }
        window.scrollTo(0, 0);
    }

    login() {
        this.isLoggedIn = true;
        this.renderUploadFlow();
    }

    uploadProduct() {
        const title = document.getElementById('upload-title')?.value || 'Produk Kreator Baru';
        const category = document.getElementById('upload-category')?.value || 'Desain';
        const priceStr = document.getElementById('upload-price')?.value;
        const price = priceStr ? parseInt(priceStr) : 50000;
        const description = document.getElementById('upload-desc')?.value || 'Produk ini tidak memiliki deskripsi spesifik.';
        
        const currentUser = window.mockData.users[1]; // Maria Garcia

        const customImage = window.uploadedImageBase64;
        if (window.uploadedImageBase64) {
            window.uploadedImageBase64 = null; // reset for next upload
        }

        const newProduct = {
            id: 'p_new_' + Math.floor(Math.random() * 10000),
            title: title,
            price: price,
            image: customImage ? customImage : (category === 'Akademik' ? 'images/study_module.png' : 'images/design_template.png'),
            rating: 0,
            reviews: 0,
            creatorId: currentUser.id,
            badge: 'Baru Upload!',
            category: category,
            creator: currentUser,
            description: description
        };

        // Tambah ke struktur data awal app (ke Array depan)
        this.allProducts.unshift(newProduct);
        window.mockData.products.unshift(newProduct);

        alert('✅ Hore! Produk "' + title + '" berhasil diunggah.');
        window.location.hash = '#home';
    }

    renderCategoryView(categoryName = 'Semua Kategori') {
        this.appRoot.innerHTML = window.Components.CategoryView(this.allProducts, categoryName);
        this.appRoot.className = 'view active';
        window.scrollTo(0, 0);
    }

    setupEventListeners() {
        // Optional: Hash routing listener would go here, currently just an SPA mockup of Home.
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash === '#home' || hash === '') {
                this.renderHome();
            } else if (hash.startsWith('#product-')) {
                const productId = hash.split('#product-')[1];
                const product = this.allProducts.find(p => p.id === productId);
                if (product) {
                    this.appRoot.innerHTML = window.Components.ProductDetailView(product);
                    this.appRoot.className = 'view active';
                    window.scrollTo(0, 0); // Scroll to top for new page
                } else {
                    this.renderHome();
                }
            } else if (hash.startsWith('#checkout-')) {
                const productId = hash.replace('#checkout-', '');
                const product = this.allProducts.find(p => p.id === productId);
                if (product) {
                    this.appRoot.innerHTML = window.Components.CheckoutView(product);
                    this.appRoot.className = 'view active';
                    window.scrollTo(0, 0);
                } else {
                    this.renderHome();
                }
            } else if (hash.startsWith('#review-')) {
                const productId = hash.replace('#review-', '');
                const product = this.allProducts.find(p => p.id === productId);
                if (product) {
                    this.appRoot.innerHTML = window.Components.ReviewView(product);
                    this.appRoot.className = 'view active';
                    window.scrollTo(0, 0);
                } else {
                    this.renderHome();
                }
            } else if (hash === '#dashboard') {
                const currentUser = window.mockData.users[1];
                const dashboardData = window.mockData.dashboard;
                const userProducts = this.allProducts.filter(p => p.creatorId === currentUser.id);
                this.appRoot.innerHTML = window.Components.DashboardView(currentUser, dashboardData, userProducts);
                this.appRoot.className = 'view active';
                window.scrollTo(0, 0);
            } else if (hash.startsWith('#categories')) {
                let cat = 'Semua Kategori';
                if (hash.includes('-')) {
                    cat = decodeURIComponent(hash.split('-')[1]);
                }
                this.renderCategoryView(cat);
            } else if (hash === '#upload') {
                this.renderUploadFlow();
            } else if (hash.startsWith('#search-')) {
                const query = decodeURIComponent(hash.substring(8)).toLowerCase();
                const results = this.allProducts.filter(p => 
                    p.title.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query) ||
                    (p.creator && p.creator.name.toLowerCase().includes(query))
                );
                this.appRoot.innerHTML = window.Components.SearchView(results, decodeURIComponent(hash.substring(8)));
                this.appRoot.className = 'view active';
                window.scrollTo(0, 0);
            } else if (hash === '#search') {
                const searchInput = document.getElementById('global-search');
                if (searchInput) searchInput.focus();
            }
        });

        // Search bar listener implementation
        const searchInput = document.getElementById('global-search');
        if(searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        window.location.hash = '#search-' + encodeURIComponent(query);
                    } else {
                        window.location.hash = '#home';
                    }
                }
            });
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new Create2EarnApp();
});

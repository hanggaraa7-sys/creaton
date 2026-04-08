// Main Application Logic

class Create2EarnApp {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        this.allProducts = window.mockData.products;
        this.isLoggedIn = false; 
        this.userRole = 'customer'; 
        this.currentUser = null;
        this.purchasedProducts = [];
        this.init();
    }

    completePurchase(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (product && !this.purchasedProducts.find(p => p.id === productId)) {
            this.purchasedProducts.unshift(product);
        }
        alert('✅ Pembayaran dikonfirmasi! Anda dapat langsung mengunduh file.');
        window.location.hash = '#review-' + productId;
    }

    init() {
        this.setupNavigation();
        this.setupEventListeners();
        
        if (!this.isLoggedIn) {
            this.renderAuth();
        } else {
            this.renderHome();
        }
    }

    renderAuth() {
        this.appRoot.innerHTML = window.Components.AuthView();
        this.appRoot.className = 'view active';
    }

    setupNavigation() {
        const nav = document.getElementById('main-nav');
        const footer = document.querySelector('.footer');
        
        if (!this.isLoggedIn) {
            if(nav) nav.style.display = 'none';
            if(footer) footer.style.display = 'none';
            return;
        } else {
            if(nav) nav.style.display = 'flex';
            if(footer) footer.style.display = 'block';
        }

        // Dynamic navigation based on role
        const userNav = document.getElementById('current-user-nav');
        const currentUser = this.currentUser || window.mockData.users[1]; // Simulate logged in as Maria
        
        const uploadBtn = document.querySelector('a[href="#upload"], a[href="#dashboard"].btn-primary-outline');

        if (this.userRole === 'creator') {
            if (uploadBtn) {
                uploadBtn.href = '#upload';
                uploadBtn.innerHTML = "<i class='bx bx-upload'></i> Unggah Karya";
            }
            userNav.innerHTML = `
                <div class="user-snippet" onclick="location.hash='#dashboard'">
                    <img src="${currentUser.avatar}" class="user-avatar" alt="User">
                    <div style="display:flex; flex-direction:column; align-items:flex-start;">
                        <span style="font-size:0.85rem; font-weight:600;">Rp ${window.mockData.dashboard.overview.totalPendapatan.toLocaleString('id-ID')}</span>
                        <span class="creator-level-badge level-${currentUser.level.toLowerCase()}" style="font-size:0.6rem;">${currentUser.level}</span>
                    </div>
                </div>
            `;
        } else {
            if (uploadBtn) {
                uploadBtn.href = '#dashboard';
                uploadBtn.innerHTML = "<i class='bx bx-package'></i> Pembelian Saya";
            }
            userNav.innerHTML = `
                <div class="user-snippet" onclick="location.hash='#dashboard'">
                    <img src="${currentUser.avatar}" class="user-avatar" alt="User">
                    <div style="display:flex; flex-direction:column; align-items:flex-start;">
                        <span style="font-size:0.9rem; font-weight:600;">${currentUser.name}</span>
                        <span style="font-size:0.75rem; color: var(--text-muted);">Akun Pembeli</span>
                    </div>
                </div>
            `;
        }
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
            window.location.hash = ''; // back to login
        } else if (this.userRole === 'customer') {
            window.location.hash = '#upgrade';
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
                                document.getElementById('drop-zone-display').innerHTML = `<img src="${event.target.result}" style="max-height:100px; max-width:100%; border-radius:8px; object-fit:contain; margin-bottom:12px;"> <br> <span style="font-size:0.85rem; color:var(--text-main);">Gambar dipilih</span>`;
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }

                const uploadFile = document.getElementById('upload-file');
                if (uploadFile) {
                    uploadFile.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            document.getElementById('drop-zone-file').innerHTML = `<i class='bx bxs-check-circle' style="color:#22C55E; font-size: 3rem; margin-bottom:8px;"></i> <br> <span style="font-size:0.85rem; color:var(--text-main); font-weight:600;">${file.name}</span><br><span style="font-size:0.75rem; color:var(--text-muted)">Siap diuji-download</span>`;
                            
                            const reader = new FileReader();
                            reader.onload = function(evt) {
                                window.uploadedZipFile = {
                                    name: file.name,
                                    dataUri: evt.target.result
                                };
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }

                // Add 10% fee calculation listener dynamically
                const priceInput = document.getElementById('upload-price');
                const feeCalc = document.getElementById('fee-calculator');
                const feeAmt = document.getElementById('fee-amount');
                const netInc = document.getElementById('net-income');

                if (priceInput) {
                    priceInput.addEventListener('input', (e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1000) {
                            feeCalc.style.display = 'block';
                            const fee = Math.floor(val * 0.10);
                            const net = val - fee;
                            feeAmt.innerText = '-Rp ' + fee.toLocaleString('id-ID');
                            netInc.innerText = 'Rp ' + net.toLocaleString('id-ID');
                        } else {
                            feeCalc.style.display = 'none';
                        }
                    });
                }
            }, 50);
        }
        window.scrollTo(0, 0);
    }

    login() {
        const nameInput = document.getElementById('auth-name');
        const emailInput = document.getElementById('auth-email');
        const pwInput = document.getElementById('auth-password');

        if (nameInput && emailInput && pwInput) {
            if (!nameInput.value.trim() || !emailInput.value.trim() || !pwInput.value.trim()) {
                alert('Peringatan: Semua kolom (Nama, Email, dan Password) wajib diisi untuk bisa masuk!');
                return;
            }
            this.currentUser = {
                id: 'u_dynamic',
                name: nameInput.value.trim(),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameInput.value.trim())}&background=38BDF8&color=fff`,
                level: 'New',
                rating: 0,
                sales: 0,
                bio: 'Pengguna baru di Creaton.'
            };
        }

        this.isLoggedIn = true;
        this.userRole = 'customer'; // Default on fresh login
        this.setupNavigation();
        
        if (window.location.hash !== '#home') {
            window.location.hash = '#home'; // Trigger home re-render
        } else {
            this.renderHome(); // Manual render if hash is already #home
        }
        window.scrollTo(0, 0);
    }

    withdrawBalance(amount) {
        if (amount < 50000) {
            alert(`⚠️ Upps! Saldo Anda saat ini (Rp ${amount.toLocaleString('id-ID')}) belum melampaui batas minimal penarikan (Rp 50.000). Terus tingkatkan penjualan Anda agar cuan mengalir!`);
        } else {
            window.mockData.dashboard.overview.totalPendapatan = 0; 
            alert('✅ Penarikan Berhasil!\nPermintaan transfer dana sebesar Rp ' + amount.toLocaleString('id-ID') + ' telah disetujui dan sedang dalam antrean pengiriman ke bank Anda (Estimasi 1x24 jam kerja).');
            
            // Render ulang isi dasbor dan navbar secara dinamis
            const currentUser = this.currentUser || window.mockData.users[1];
            const dashboardData = window.mockData.dashboard;
            const userProducts = this.allProducts.filter(p => p.creatorId === currentUser.id);
            
            this.appRoot.innerHTML = window.Components.DashboardView(currentUser, dashboardData, userProducts);
            this.setupNavigation();
        }
    }

    upgradeToCreator() {
        this.userRole = 'creator';
        this.setupNavigation();
        alert('🎉 Yay! Akunmu telah ditingkatkan. Selamat datang di Dasbor Kreator!');
        window.location.hash = '#dashboard';
    }

    uploadProduct() {
        const title = document.getElementById('upload-title')?.value || 'Produk Kreator Baru';
        const category = document.getElementById('upload-category')?.value || 'Desain';
        const priceStr = document.getElementById('upload-price')?.value;
        const price = priceStr ? parseInt(priceStr) : 50000;
        const description = document.getElementById('upload-desc')?.value || 'Produk ini tidak memiliki deskripsi spesifik.';
        
        const currentUser = this.currentUser || window.mockData.users[1];

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
            creator: {
                name: currentUser.name,
                avatar: currentUser.avatar
            },
            description: description,
            zipDataUri: window.uploadedZipFile ? window.uploadedZipFile.dataUri : null,
            zipFileName: window.uploadedZipFile ? window.uploadedZipFile.name : null
        };

        // Tambah ke struktur data awal app (ke Array depan)
        window.uploadedZipFile = null; // Reset after submit
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
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;

            // Authentication Guard
            if (!this.isLoggedIn && hash !== '') {
                window.location.hash = ''; // Force to login view
                return;
            }

            if (hash === '#home' || hash === '') {
                if (!this.isLoggedIn) {
                    this.renderAuth();
                } else {
                    this.renderHome();
                }
            } else if (hash === '#upgrade') {
                 this.appRoot.innerHTML = window.Components.CreatorUpgradeView();
                 this.appRoot.className = 'view active';
                 window.scrollTo(0, 0);
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
                const currentUser = this.currentUser || window.mockData.users[1];
                if (this.userRole === 'creator') {
                    const dashboardData = window.mockData.dashboard;
                    const userProducts = this.allProducts.filter(p => p.creatorId === currentUser.id);
                    this.appRoot.innerHTML = window.Components.DashboardView(currentUser, dashboardData, userProducts);
                } else {
                    this.appRoot.innerHTML = window.Components.CustomerDashboardView(currentUser);
                }
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

// Reusable UI Component Generators

const Components = {
    ProductCard: (product) => {
        const badgeHTML = product.badge
            ? `<div class="tag-overlay">${product.badge}</div>`
            : '';

        const levelClass = product.creator.level.toLowerCase();

        return `
            <div class="product-card" data-id="${product.id}" onclick="location.hash='#product-${product.id}'">
                <div class="product-image-container">
                    ${badgeHTML}
                    <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-content">
                    <div class="creator-info">
                        <img src="${product.creator.avatar}" alt="${product.creator.name}" class="creator-avatar-sm">
                        <span class="creator-name">${product.creator.name}</span>
                        <span class="creator-level-badge level-${levelClass}">${product.creator.level}</span>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-footer">
                        <div class="product-rating">
                            <i class='bx bxs-star'></i>
                            ${product.rating.toFixed(1)} <span>(${product.reviews})</span>
                        </div>
                        <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                    </div>
                </div>
            </div>
        `;
    },

    Hero: () => `
        <section class="hero">
            <div class="hero-content">
                <h1>Monetize Your Skills.<br><span>Empower Your Future.</span></h1>
                <p>Buy, sell, and discover high-quality digital products made by students, for students. From study notes to design templates—turn your hard work into passive income.</p>
                <div class="hero-actions">
                    <button class="btn btn-primary" style="padding: 14px 32px; font-size: 1.1rem;" onclick="location.hash='#upload'">Mulai Berjualan</button>
                    <button class="btn btn-primary-outline" style="padding: 14px 32px; font-size: 1.1rem; margin-left:12px;" onclick="location.hash='#search'">Jelajahi Pasar</button>
                </div>
                
                <div class="category-pills">
                    <div class="pill" onclick="location.hash='#categories-Desain'">Template Desain</div>
                    <div class="pill" onclick="location.hash='#categories-Akademik'">Modul Belajar</div>
                    <div class="pill" onclick="location.hash='#categories-Teknologi'">Snippet Kode</div>
                    <div class="pill" onclick="location.hash='#categories-Tulisan'">Karya Tulis</div>
                    <div class="pill" onclick="location.hash='#categories-Desain'">Presentasi</div>
                </div>
            </div>
        </section>
    `,

    HiddenGems: (products) => `
        <section class="hidden-gems-section">
            <div class="gems-bg-decoration"></div>
            <div class="container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">💎 Hidden Gems</h2>
                        <p class="section-subtitle">Temukan produk luar biasa dari kreator mahasiswa yang sedang naik daun.</p>
                    </div>
                </div>
                <div class="grid-products">
                    ${products.map(p => Components.ProductCard(p)).join('')}
                </div>
            </div>
        </section>
    `,

    ExploreGrid: (products) => `
        <section class="section container">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Jelajahi Marketplace</h2>
                    <p class="section-subtitle">Menampilkan kombinasi adil dari kreator New, Rising, Pro, dan Top.</p>
                </div>
            </div>
            <div class="grid-products" id="explore-grid">
                ${products.map(p => Components.ProductCard(p)).join('')}
            </div>
        </section>
    `,

    ProductDetailView: (product) => `
        <section class="section container product-detail-section">
            <button class="btn btn-primary-outline" style="margin-bottom: 24px;" onclick="history.back()"><i class='bx bx-arrow-back'></i> Kembali ke Jelajahi</button>
            <div class="product-detail-grid">
                <div class="product-detail-img-wrapper">
                    <img src="${product.image}" alt="${product.title}" class="product-detail-img">
                </div>
                <div class="product-detail-info">
                    <h1>${product.title}</h1>
                    <div class="product-detail-meta">
                        <span class="product-rating">
                            <i class='bx bxs-star'></i> ${product.rating.toFixed(1)} (${product.reviews} ulasan)
                        </span>
                        <span>•</span>
                        <span>Kategori: ${product.category}</span>
                    </div>
                    <div class="product-detail-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                    
                    <p class="product-detail-desc">${product.description}</p>
                    
                    <button class="btn btn-primary btn-buy" onclick="location.hash='#checkout-${product.id}'">
                        <i class='bx bx-cart-add'></i> Beli produk ini
                    </button>

                    <div class="creator-box">
                        <img src="${product.creator.avatar}" alt="${product.creator.name}" class="creator-box-avatar">
                        <div class="creator-box-info">
                            <h3>${product.creator.name} <span class="creator-level-badge level-${product.creator.level.toLowerCase()}" style="font-size:0.65rem; margin-left: 8px; vertical-align: middle;">${product.creator.level}</span></h3>
                            <div class="product-rating" style="font-size: 0.85rem;">
                                <i class='bx bxs-star'></i> ${product.creator.rating.toFixed(1)} Rating Kreator • ${product.creator.sales} Penjualan
                            </div>
                            <p class="creator-box-bio">${product.creator.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,

    AuthView: () => `
        <section class="section container" style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div class="form-container" style="width: 100%; border:none; box-shadow:var(--shadow-md);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <div class="logo-icon" style="margin: 0 auto 12px; transform: scale(1.5);"><i class='bx bxs-zap'></i></div>
                    <h2 class="form-title">Masuk / Daftar</h2>
                    <p class="form-subtitle" style="margin-bottom:16px;">Platform marketplace karya digital mahasiswa terkemuka.</p>
                </div>
                <div class="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" id="auth-name" class="form-control" placeholder="Nama Anda">
                </div>
                <div class="form-group">
                    <label>Email Kampus / Pribadi</label>
                    <input type="email" id="auth-email" class="form-control" placeholder="kamu@domain.com">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="auth-password" class="form-control" placeholder="••••••••">
                </div>
                <button class="btn btn-primary" style="width:100%; padding:14px; margin-top:8px; font-weight:700;" onclick="window.app.login()">Masuk ke Marketplace</button>
            </div>
        </section>
    `,

    CreatorUpgradeView: () => `
        <section class="section container">
            <div class="form-container">
                <h2 class="form-title">Upgrade ke Kreator 🚀</h2>
                <p class="form-subtitle">Satu langkah lagi untuk mulai menghasilkan passive income. Harap lengkapi pengaturan pembayaran Anda untuk pencairan dana.</p>
                
                <div style="background: var(--primary-light); padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid var(--primary);">
                    <p style="font-size: 0.85rem; color: var(--secondary); margin:0;"><strong>Penting:</strong> Sistem otomatis memotong 10% (biaya platform) dari setiap penjualan. Pendapatan bersih (90%) Anda dapat <strong>ditarik (withdraw) kapan saja</strong> dengan batas minimum saldo <strong>Rp 50.000</strong>.</p>
                </div>

                <div class="form-group">
                    <label>Bank Tujuan</label>
                    <select class="form-control">
                        <option>BCA</option>
                        <option>Bank Mandiri</option>
                        <option>BNI</option>
                        <option>BRI</option>
                        <option>Gopay / OVO / Dana</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Nomor Rekening / E-Wallet</label>
                    <input type="text" class="form-control" placeholder="Contoh: 1234567890">
                </div>

                <div class="form-group">
                    <label>Atas Nama (Sesuai Buku Tabungan)</label>
                    <input type="text" class="form-control" placeholder="Nama Lengkap">
                </div>

                <button class="btn btn-primary" style="width:100%; padding:14px; margin-top:16px; font-weight:700;" onclick="window.app.upgradeToCreator()">Selesai & Buka Toko</button>
                <button class="btn btn-primary-outline" style="width:100%; padding:14px; margin-top:12px; border:none;" onclick="history.back()">Batal</button>
            </div>
        </section>
    `,

    UploadProductView: () => `
        <section class="section container">
            <div style="max-width: 600px; margin: 0 auto;">
                <h2 class="form-title" style="text-align:left;">Unggah Karya Baru</h2>
                <p class="form-subtitle" style="text-align:left;">Beri tahu dunia tentang produk digital hebatmu.</p>
                
                <div class="form-container" style="margin: 0; max-width: 100%;">
                    <div class="form-group">
                        <label>Judul Produk</label>
                        <input type="text" id="upload-title" class="form-control" placeholder="Contoh: Template Pitch Deck Startup">
                    </div>
                    
                    <div class="form-group">
                        <label>Kategori</label>
                        <select id="upload-category" class="form-control">
                            <option value="Desain">Desain / Template</option>
                            <option value="Akademik">Akademik / Modul Belajar</option>
                            <option value="Teknologi">Teknologi / Snippet Kode</option>
                            <option value="Tulisan">Karya Tulis / Jurnal</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Harga Jual Dasar (Rp)</label>
                        <input type="number" id="upload-price" class="form-control" placeholder="Contoh: 50000">
                        <div id="fee-calculator" style="margin-top: 12px; padding: 12px; border-radius: 6px; background-color: var(--bg-light); border: 1px dashed var(--border-color); display: none;">
                            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:4px;">
                                <span>Biaya Operasional Platform (10%)</span>
                                <span id="fee-amount" style="color: #EF4444;">-Rp 0</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:0.95rem; font-weight:600; color:var(--secondary); border-top:1px solid var(--border-color); padding-top:6px; margin-top:4px;">
                                <span>Estimasi Pemasukan Bersihmu</span>
                                <span id="net-income" style="color: #22C55E;">Rp 0</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Deskripsi Produk</label>
                        <textarea id="upload-desc" class="form-control" rows="4" placeholder="Jelaskan apa saja yang didapatkan pembeli dari produk ini..."></textarea>
                    </div>

                    <div class="two-col-grid">
                        <div class="form-group">
                            <label>File Produk Utama (ZIP)</label>
                            <div class="file-drop-zone" onclick="document.getElementById('upload-file').click()" id="drop-zone-file" style="padding: 30px;">
                                <i class='bx bxs-file-archive'></i>
                                <h4 style="font-size: 0.95rem;">Pilih File Karya</h4>
                                <p style="font-size: 0.75rem; margin-top: 8px;">Maksimal 50MB</p>
                            </div>
                            <input type="file" id="upload-file" accept=".zip,.rar,.rar4,.tar" style="display:none;">
                        </div>

                        <div class="form-group">
                            <label>Thumbnail / Preview</label>
                            <div class="file-drop-zone" onclick="document.getElementById('upload-image').click()" id="drop-zone-display" style="padding: 30px;">
                                <i class='bx bx-image-add'></i>
                                <h4 style="font-size: 0.95rem;">Foto Produk</h4>
                                <p style="font-size: 0.75rem; margin-top: 8px;">JPG/PNG mak. 2MB</p>
                            </div>
                            <input type="file" id="upload-image" accept="image/*" style="display:none;">
                        </div>
                    </div>

                    <button class="btn btn-primary" style="width:100%; padding: 14px;" onclick="window.app.uploadProduct()">Terbitkan Produk</button>
                </div>
            </div>
        </section>
    `,

    DashboardView: (user, data, userProducts) => {
        // 1. Overview
        const overviewHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Ringkasan Performa</div>
                <div class="stat-cards-grid">
                    <div class="stat-card">
                        <div class="stat-card-label">Pendapatan Bersih</div>
                        <div class="stat-card-value">Rp ${data.overview.totalPendapatan.toLocaleString('id-ID')}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">Jumlah Penjualan</div>
                        <div class="stat-card-value">${data.overview.jumlahPenjualan}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">Jumlah Produk</div>
                        <div class="stat-card-value">${data.overview.jumlahProduk}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-label">Rating Rata-rata</div>
                        <div class="stat-card-value"><i class='bx bxs-star' style="color:var(--primary); font-size:1.1rem;"></i> ${data.overview.ratingRataRata}</div>
                    </div>
                </div>
            </div>
        `;

        // 2. Analytics Chart
        const chartHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Analytics Penjualan (7 Hari) <i class='bx bx-trending-up'></i></div>
                <div class="chart-container">
                    ${data.analytics.map(a => `
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar" style="height: ${a.height};" data-tooltip="${a.tooltip}"></div>
                            <div class="chart-label">${a.day}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 3. Earnings & Withdrawal
        const earningsHtml = `
            <div class="dashboard-card" style="background: var(--secondary); color: white;">
                <div class="dashboard-card-title" style="color: white;">Keuangan & Pemasukan</div>
                <div style="font-size: 0.9rem; color: #94A3B8;">Saldo Tersedia (Netto)</div>
                <div style="font-size: 2.2rem; font-weight: 700; margin-bottom: 12px;">Rp ${data.overview.totalPendapatan.toLocaleString('id-ID')}</div>
                <button class="btn" style="background: white; color: var(--secondary); font-weight: 600; width: 100%; border: none; padding: 10px;" onclick="window.app.withdrawBalance(${data.overview.totalPendapatan})">Tarik Saldo (Withdraw)</button>
                <div style="font-size: 0.75rem; color: #cbd5e1; text-align:center; margin-top:8px;">Min. Penarikan: Rp 50.000</div>
            </div>
        `;

        // 4. Level & Progress
        const progressHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Level & Progress</div>
                <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 12px;">
                    <img src="${user.avatar}" style="width:48px; height:48px; border-radius:50%; border:2px solid var(--primary);">
                    <div>
                        <div style="font-weight:700;">Level Saat Ini: <span class="creator-level-badge level-${user.level.toLowerCase()}">${user.level}</span></div>
                        <div style="font-size: 0.85rem; color: var(--text-muted);">Progres menuju otomatis Pro (65%)</div>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: 65%;"></div>
                </div>
                <div class="level-info">
                    <span>${user.sales} Penjualan</span>
                    <span>Butuh 35% lagi</span>
                </div>
            </div>
        `;

        // 5. Product Management Table
        const tableHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Manajemen Produk</div>
                <div class="table-responsive">
                    <table class="product-table">
                        <thead>
                            <tr>
                                <th>Produk</th>
                                <th>Harga</th>
                                <th>Terjual</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userProducts.map(p => `
                                <tr>
                                    <td><div style="font-weight:600; font-size:0.9rem;">${p.title.substring(0,30)}...</div></td>
                                    <td>Rp ${p.price.toLocaleString('id-ID')}</td>
                                    <td>${p.reviews}</td>
                                    <td><span class="status-badge">Aktif</span></td>
                                    <td>
                                        <button class="action-btn" title="Edit"><i class='bx bx-edit'></i></button>
                                        <button class="action-btn" title="Hapus"><i class='bx bx-trash'></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // 6. Upload Shortcut
        const uploadShortcutHtml = `
            <div class="dashboard-card" style="text-align: center; border: 2px dashed var(--primary); background: var(--primary-light);">
                <i class='bx bx-plus-circle' style="font-size: 3rem; color: var(--secondary); margin-bottom: 12px;"></i>
                <h3 style="color: var(--secondary); margin-bottom: 8px;">Punya Produk Baru?</h3>
                <p style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 16px;">Tingkatkan penghasilanmu.</p>
                <button class="btn btn-primary" onclick="location.hash='#upload'">Upload Produk</button>
            </div>
        `;

        // 7. Ratings & Reviews
        const reviewsHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Review Pembeli Terakhir</div>
                <div>
                    ${data.reviews.map(r => `
                        <div class="list-item">
                            <div class="list-icon"><i class='bx bxs-star'></i></div>
                            <div class="list-content">
                                <h5>${r.user} <span style="font-weight:400; font-size:0.8rem;">memberikan ${r.rating} bintang</span></h5>
                                <p>"${r.comment}"</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // 8. Notifications
        const notifHtml = `
            <div class="dashboard-card">
                <div class="dashboard-card-title">Aktivitas Terbaru</div>
                <div>
                    ${data.activities.map(a => {
                        let icon = 'bx-bell';
                        if(a.type==='sale') icon='bx-cart';
                        else if(a.type==='level') icon='bx-up-arrow-circle';
                        else if(a.type==='review') icon='bx-star';
                        return `
                        <div class="list-item">
                            <div class="list-icon" style="background:#F1F5F9;"><i class='bx ${icon}'></i></div>
                            <div class="list-content">
                                <h5>${a.text}</h5>
                                <div class="list-time">${a.time}</div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;

        return `
            <section class="section">
                <div class="container" style="padding-top: 0; padding-bottom: 0;">
                    <h1 class="section-title">Dashboard Kreator</h1>
                    <p class="section-subtitle">Selamat kembali, ${user.name}. Berikut ringkasan performamu.</p>
                </div>
                <div class="dashboard-container">
                    <div class="dashboard-main-col">
                        ${overviewHtml}
                        ${chartHtml}
                        ${tableHtml}
                        ${reviewsHtml}
                    </div>
                    <div class="dashboard-sidebar-col">
                        ${progressHtml}
                        ${earningsHtml}
                        ${uploadShortcutHtml}
                        ${notifHtml}
                    </div>
                </div>
            </section>
        `;
    },

    CategoryView: (products, activeCategory) => {
        const categories = ['Semua Kategori', 'Desain', 'Akademik', 'Teknologi', 'Tulisan'];
        
        let filteredProducts = products;
        if (activeCategory && activeCategory !== 'Semua Kategori') {
            filteredProducts = products.filter(p => p.category === activeCategory);
        }
        
        return `
            <section class="section container" style="padding-top: 80px; min-height: 80vh;">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Jelajahi Kategori</h2>
                        <p class="section-subtitle">Temukan kreasi mahasiswa terbaik dari berbagai bidang studi.</p>
                    </div>
                </div>
                
                <div class="category-tabs" style="display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap;">
                    ${categories.map(cat => `
                        <button class="btn ${activeCategory === cat || (!activeCategory && cat === 'Semua Kategori') ? 'btn-primary' : 'btn-primary-outline'}" 
                                onclick="location.hash='#categories-${cat}'" style="border-radius: 100px;">
                            ${cat}
                        </button>
                    `).join('')}
                </div>

                <div class="grid-products">
                    ${filteredProducts.length > 0 ? 
                        filteredProducts.map(p => window.Components.ProductCard(p)).join('') 
                        : '<div style="color:var(--text-muted); text-align:center; width:100%; grid-column:1/-1; padding: 40px 0;"><i class=\\\'bx bx-ghost\\\' style="font-size: 3rem; margin-bottom: 16px;"></i><br>Belum ada produk di kategori ini.</div>'}
                </div>
            </section>
        `;
    },
    
    SearchView: (products, query) => `
        <section class="section container" style="padding-top: 80px; min-height: 80vh;">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Hasil Pencarian: "${query}"</h2>
                    <p class="section-subtitle">Ditemukan ${products.length} produk.</p>
                </div>
            </div>
            <div class="grid-products">
                ${products.length > 0 ? 
                    products.map(p => window.Components.ProductCard(p)).join('') 
                    : '<div style="color:var(--text-muted); text-align:center; width:100%; grid-column:1/-1; padding: 40px 0;"><i class=\'bx bx-search-alt\' style="font-size: 3rem; margin-bottom: 16px;"></i><br>Tidak ada produk yang sesuai dengan pencarian Anda.</div>'}
            </div>
        </section>
    `,

    CustomerDashboardView: (user) => {
        const purchasedItems = window.app.purchasedProducts || [];

        return `
            <section class="section container" style="padding-top: 80px; min-height: 80vh;">
                <div class="section-header" style="margin-bottom: 24px;">
                    <div>
                        <h2 class="section-title">Koleksi Pembelian Saya</h2>
                        <p class="section-subtitle">Halo ${user.name}, berikut adalah karya-karya yang telah kamu beli dan bisa kamu unduh.</p>
                    </div>
                </div>
                
                <div class="dashboard-card" style="margin-bottom: 32px; background: linear-gradient(135deg, var(--primary-light), white); border: 1px solid var(--primary);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                        <div>
                            <h3 style="color: var(--secondary); font-size: 1.2rem; margin-bottom: 4px;">Punya keahlian menarik?</h3>
                            <p style="color: var(--text-muted); font-size: 0.95rem;">Ubah tugas kuliah dan template-mu menjadi sumber pemasukan pasif bulanan.</p>
                        </div>
                        <button class="btn btn-primary" onclick="window.location.hash='#upgrade';">Jadilah Kreator Sekarang</button>
                    </div>
                </div>

                <div class="grid-products">
                    ${purchasedItems.length > 0 ? purchasedItems.map(p => `
                        <div class="product-card" style="box-shadow: none; border: 2px solid var(--border-color);">
                            <div class="product-image-container">
                                <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy">
                            </div>
                            <div class="product-content">
                                <h3 class="product-title" style="margin-bottom:8px;">${p.title}</h3>
                                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Kreator: <strong>${p.creator.name}</strong></p>
                                <a href="${p.zipDataUri || 'data:application/octet-stream;charset=utf-8,File%20Karya%20Mockup'}" download="${p.zipFileName || p.title.replace(/[^a-zA-Z0-9]/g, '_') + '_Asli.zip'}" class="btn btn-primary-outline" style="width: 100%; display:inline-flex; align-items:center; justify-content:center;"><i class='bx bx-cloud-download' style="margin-right:4px;"></i> Unduh File</a>
                            </div>
                        </div>
                    `).join('') : '<p style="text-align:center; color:var(--text-muted); grid-column:1/-1;">Belum ada file karya di katalog pembelanjaanmu.</p>'}
                </div>
            </section>
        `;
    },

    CheckoutView: (product) => `
        <section class="section container" style="padding-top: 80px; min-height: 80vh; display: flex; align-items: center; justify-content: center;">
            <div class="form-container" style="width: 100%; text-align: center; margin: 0;">
                <i class='bx bx-wallet' style="font-size: 4rem; color: var(--primary); margin-bottom: 16px;"></i>
                <h2 class="form-title">Pembayaran</h2>
                <p class="form-subtitle">Silakan transfer sesuai nominal di bawah untuk melanjutkan pembelian produk digital: <br><strong>${product.title}</strong></p>
                
                <div style="background: var(--bg-light); border: 2px dashed var(--border-color); padding: 24px; border-radius: var(--radius-md); margin-bottom: 24px;">
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px;">Transfer ke Rekening Bersama Creaton:</p>
                    <h3 style="font-size: 1.8rem; letter-spacing: 2px; color: var(--secondary); margin-bottom: 4px;">1234 5678 9012 (BCA)</h3>
                    <p style="font-size: 1rem; color: var(--secondary); margin-bottom: 16px;">a.n. PT Creaton Digital Nusan</p>
                    
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">Total Tagihan:</p>
                    <h2 style="font-size: 2.2rem; color: var(--primary); margin: 0;">Rp ${product.price.toLocaleString('id-ID')}</h2>
                </div>

                <button class="btn btn-primary" style="width:100%; padding: 14px; margin-bottom: 12px; font-weight: 600;" onclick="window.app.completePurchase('${product.id}')">Saya Sudah Transfer</button>
                <button class="btn btn-primary-outline" style="width:100%; padding: 14px;" onclick="history.back()">Batal</button>
            </div>
        </section>
    `,

    ReviewView: (product) => `
        <section class="section container" style="padding-top: 80px; min-height: 80vh; display: flex; align-items: center; justify-content: center;">
            <div class="form-container" style="width: 100%; max-width: 500px; text-align: center; margin: 0;">
                <i class='bx bxs-check-circle' style="font-size: 4rem; color: #22C55E; margin-bottom: 16px;"></i>
                <h2 class="form-title">Pembayaran Berhasil!</h2>
                <p class="form-subtitle">Kamu resmi memiliki karya <strong>${product.title}</strong> dari kreator <strong>${product.creator.name}</strong>.</p>
                
                <a href="${product.zipDataUri || 'data:application/octet-stream;charset=utf-8,Aplikasi%20Prototiipe%20Data'}" download="${product.zipFileName || product.title.replace(/[^a-zA-Z0-9]/g, '_') + '_Asli.zip'}" class="btn btn-primary" style="width:100%; padding: 16px; font-size: 1.1rem; margin-bottom: 24px; display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                    <i class='bx bxs-file-archive' style="font-size:1.3rem;"></i> Unduh File ZIP Sekarang
                </a>

                <hr style="border: 0; height: 1px; background: var(--border-color); margin: 0 0 24px 0;">
                
                <h3 style="font-size: 1.1rem; color: var(--secondary); margin-bottom: 16px;">Beri Rating Kreator</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px;">Pendapatmu akan langsung memengaruhi sistem level sang kreator!</p>
                
                <div class="form-group" style="text-align: left;">
                    <label>Rating Kepuasan (Bintang)</label>
                    <select class="form-control" style="font-size: 1.1rem;">
                        <option>⭐⭐⭐⭐⭐ (5/5) Sangat Bagus</option>
                        <option>⭐⭐⭐⭐ (4/5) Bagus</option>
                        <option>⭐⭐⭐ (3/5) Cukup</option>
                        <option>⭐⭐ (2/5) Kurang</option>
                        <option>⭐ (1/5) Mengecewakan</option>
                    </select>
                </div>

                <div class="form-group" style="text-align: left;">
                    <label>Review Singkat</label>
                    <textarea class="form-control" rows="3" placeholder="Tuliskan pendapatmu tentang kualitas produk dan repson kreator ini..."></textarea>
                </div>

                <button class="btn btn-primary" style="width:100%; padding: 14px; font-weight: 600;" onclick="alert('Terima kasih atas ulasanmu! Profil kreator telah diperbarui.'); location.hash='#home';">Kirim Ulasan</button>
                <button class="btn btn-primary-outline" style="width:100%; padding: 14px; margin-top: 12px; border:none;" onclick="location.hash='#home'">Nanti Saja</button>
            </div>
        </section>
    `
};

window.Components = Components;

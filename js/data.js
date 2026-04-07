// mockData.js represents our database

const users = [
    { id: 'u1', name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=FEF08A&color=1E293B', level: 'Top', rating: 4.9, sales: 1240, bio: 'Desainer Grafis Senior yang membantu mahasiswa bikin presentasi keren.' },
    { id: 'u2', name: 'Maria Garcia', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=38BDF8&color=fff', level: 'Rising', rating: 4.8, sales: 150, bio: 'Mahasiswa CS & Web Developer. Membangun alat dan panduan yang saya harap saya miliki saat maba.' },
    { id: 'u3', name: 'David Lee', avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=94A3B8&color=fff', level: 'New', rating: 5.0, sales: 12, bio: 'Mahasiswa berprestasi yang membagikan catatan belajar andalan.' },
    { id: 'u4', name: 'Sarah Miller', avatar: 'https://ui-avatars.com/api/?name=Sarah+Miller&background=A855F7&color=fff', level: 'Pro', rating: 4.7, sales: 650, bio: 'Desainer UI/UX. Membagikan komponen kit premium dan sumber daya freelance.' },
    { id: 'u5', name: 'James Kim', avatar: 'https://ui-avatars.com/api/?name=James+Kim&background=94A3B8&color=fff', level: 'New', rating: 4.6, sales: 5, bio: 'Mahasiswa Biologi. Membuat sains jadi gampang dipahami.' }
];

const products = [
    {
        id: 'p1',
        title: 'Template Presentasi Ultimate - Pitch Deck Modern',
        price: 150000,
        image: 'images/design_template.png',
        rating: 4.9,
        reviews: 320,
        creatorId: 'u1',
        badge: 'Paling Laris',
        category: 'Desain'
    },
    {
        id: 'p2',
        title: 'Catatan Lengkap Pengantar Ilmu Komputer + Diagram',
        price: 85000,
        image: 'images/study_module.png',
        rating: 5.0,
        reviews: 14,
        creatorId: 'u3',
        badge: 'Paling Untung',
        category: 'Akademik'
    },
    {
        id: 'p3',
        title: 'Panduan Advanced React Patterns & Web Dev 2026',
        price: 240000,
        image: 'images/CARD 1 B.png',
        rating: 4.8,
        reviews: 89,
        creatorId: 'u2',
        badge: 'Sedang Tren',
        category: 'Teknologi'
    },
    {
        id: 'p4',
        title: 'Component Kit UX/UI Minimalis untuk Figma',
        price: 120000,
        image: 'images/design_template.png', // reusing image for mockup
        rating: 4.7,
        reviews: 412,
        creatorId: 'u4',
        badge: '',
        category: 'Desain'
    },
    {
        id: 'p5',
        title: 'Biologi 101: Ringkasan Lengkap Struktur Sel',
        price: 50000,
        image: 'images/study_module.png',
        rating: 4.6,
        reviews: 4,
        creatorId: 'u5',
        badge: 'Terjangkau',
        category: 'Akademik'
    },
    {
        id: 'p6',
        title: 'E-book + Slide Masterclass Pitch Startup',
        price: 199000,
        image: 'images/tech_guide.png',
        rating: 4.9,
        reviews: 880,
        creatorId: 'u1',
        badge: '',
        category: 'Tulisan'
    }
];

// Helper to expand product with creator info
const getProductsWithCreators = () => {
    return products.map(p => {
        const creator = users.find(u => u.id === p.creatorId);
        const description = `Ini adalah produk digital komprehensif berkualitas tinggi yang dirancang untuk membantumu unggul di kategori ${p.category}. Dibuat secara profesional oleh ${creator.name}, item ini mencakup semua file lengkap, aset, dan dokumentasi yang kamu perlukan. Baik kamu seorang pemula atau mahasiswa mahir, produk ini memberikan nilai luar biasa langsung untuk memudahkan tugasmu.`;
        return { ...p, creator, description };
    });
};

window.mockData = {
    users,
    products: getProductsWithCreators(),
    dashboard: {
        overview: {
            totalPendapatan: 2405000,
            jumlahPenjualan: 84,
            jumlahProduk: 4,
            ratingRataRata: 4.8
        },
        analytics: [
            { day: 'Sen', height: '30%', tooltip: 'Rp 120.000' },
            { day: 'Sel', height: '60%', tooltip: 'Rp 300.000' },
            { day: 'Rab', height: '20%', tooltip: 'Rp 50.000' },
            { day: 'Kam', height: '80%', tooltip: 'Rp 450.000' },
            { day: 'Jum', height: '40%', tooltip: 'Rp 200.000' },
            { day: 'Sab', height: '90%', tooltip: 'Rp 600.000' },
            { day: 'Min', height: '50%', tooltip: 'Rp 400.000' }
        ],
        reviews: [
            { id: 1, user: 'John Doe', rating: 5, comment: 'Bagus banget, sangat membantu tugas kuliah saya!' },
            { id: 2, user: 'Budi S.', rating: 4, comment: 'UI Kit nya rapi, tapi tolong tambah varian dark mode.' }
        ],
        activities: [
            { id: 1, text: 'Produk "Template Presentasi" terjual', time: '10 menit lalu', type: 'sale' },
            { id: 2, text: 'Kamu berhasil naik ke level Rising!', time: '1 hari lalu', type: 'level' },
            { id: 3, text: 'Review 5-bintang baru masuk', time: '2 hari lalu', type: 'review' }
        ]
    }
};

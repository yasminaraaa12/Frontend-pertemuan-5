const cardContainer = document.getElementById('cardContainer');

// Fungsi mengambil data dari localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Format harga ke Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
}

// Render Cards
function renderCards() {
    const products = getProducts();
    cardContainer.innerHTML = '';

    if (products.length === 0) {
        cardContainer.innerHTML = `<div class="empty-text">Belum ada produk untuk ditampilkan. Silakan tambahkan data di halaman Input Produk.</div>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div>
                <span class="badge">${product.kategori}</span>
                <h3 class="card-title">${product.nama}</h3>
                <div class="card-price">${formatRupiah(product.harga)}</div>
            </div>
            <div class="card-stock">
                Stok Tersedia: <strong>${product.stok} pcs</strong>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Jalankan render saat halaman dimuat
renderCards();
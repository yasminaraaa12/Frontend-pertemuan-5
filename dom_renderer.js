// Ambil elemen DOM
const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');
const emptyMessage = document.getElementById('emptyMessage');

// Elemen Modal Edit
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editProductForm');
const editIndex = document.getElementById('editIndex');
const editNamaProduk = document.getElementById('editNamaProduk');
const editKategori = document.getElementById('editKategori');
const editHarga = document.getElementById('editHarga');
const editStok = document.getElementById('editStok');

const cardContainer = document.getElementById('cardContainer');

// Fungsi mengambil data dari localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Fungsi menyimpan data ke localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Format harga ke Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
}

// Render tabel
function renderTable() {
    const products = getProducts();
    tableBody.innerHTML = '';

    if (products.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    products.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${product.nama}</strong></td>
            <td>${product.kategori}</td>
            <td>${formatRupiah(product.harga)}</td>
            <td>${product.stok} pcs</td>
            <td>
                <button class="btn-edit" onclick="openEditModal(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${index})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Submit Form Tambah Produk
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('namaProduk').value;
    const kategori = document.getElementById('kategori').value;
    const harga = parseFloat(document.getElementById('harga').value);
    const stok = parseInt(document.getElementById('stok').value);

    const newProduct = { nama, kategori, harga, stok };

    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    form.reset();
    renderTable();
});

// Buka Modal Edit dan Isi Data
function openEditModal(index) {
    const products = getProducts();
    const product = products[index];

    editIndex.value = index;
    editNamaProduk.value = product.nama;
    editKategori.value = product.kategori;
    editHarga.value = product.harga;
    editStok.value = product.stok;

    editModal.style.display = 'flex';
}

// Tutup Modal Edit
function closeEditModal() {
    editModal.style.display = 'none';
}

// Simpan Perubahan Edit Form
editForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const index = parseInt(editIndex.value);
    const products = getProducts();

    products[index] = {
        nama: editNamaProduk.value,
        kategori: editKategori.value,
        harga: parseFloat(editHarga.value),
        stok: parseInt(editStok.value)
    };

    saveProducts(products);
    closeEditModal();
    renderTable();
});

// Hapus Produk
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderTable();
}

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

// Jalankan render saat halaman pertama dimuat
renderTable();
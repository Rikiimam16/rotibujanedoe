// Ganti nomor dan alamat berikut dengan informasi toko yang sebenarnya.
const WHATSAPP_NUMBER = '628XXXXXXXXXX';
const STORE_ADDRESS = '[Ganti dengan alamat toko Bu Jane]';

// Data produk bisa ditambah atau diubah langsung dari daftar ini.
const products = [
  {
    name: 'Croissant Butter',
    price: 18000,
    category: 'Roti Manis',
    description: 'Renyah berlapis, lembut di dalam.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    alt: 'Croissant butter berlapis dengan warna keemasan'
  },
  {
    name: 'Roti Sourdough',
    price: 32000,
    category: 'Roti Tawar',
    description: 'Fermentasi alami dengan kulit renyah.',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=700&q=80',
    alt: 'Roti sourdough artisan dengan kulit renyah'
  },
  {
    name: 'Roti Cokelat',
    price: 12000,
    category: 'Roti Isi',
    description: 'Isian cokelat lumer kesukaan semua.',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484f2?auto=format&fit=crop&w=700&q=80',
    alt: 'Roti manis isi cokelat yang baru dipanggang'
  },
  {
    name: 'Cinnamon Roll',
    price: 16000,
    category: 'Roti Manis',
    description: 'Kayu manis hangat dengan glaze lembut.',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=700&q=80',
    alt: 'Cinnamon roll dengan lapisan gula lembut'
  },
  {
    name: 'Roti Tawar Susu',
    price: 22000,
    category: 'Roti Tawar',
    description: 'Empuk, wangi susu, cocok untuk sarapan.',
    image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=700&q=80',
    alt: 'Roti tawar susu putih yang lembut'
  },
  {
    name: 'Donat Gula',
    price: 10000,
    category: 'Roti Manis',
    description: 'Donat klasik bertabur gula halus.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80',
    alt: 'Donat gula manis dengan taburan gula halus'
  },
  {
    name: 'Pastel Ayam',
    price: 9000,
    category: 'Roti Isi',
    description: 'Kulit renyah dengan isi ayam gurih.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    alt: 'Pastel goreng renyah berisi ayam'
  },
  {
    name: 'Banana Cake',
    price: 28000,
    category: 'Kue',
    description: 'Kue pisang lembut untuk teman minum teh.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    alt: 'Potongan banana cake rumahan yang lembut'
  }
];

const productGrid = document.querySelector('#product-grid');
const categoryList = document.querySelector('#category-list');
const searchInput = document.querySelector('#search-input');
const emptyState = document.querySelector('#empty-state');
const resultCount = document.querySelector('#result-count');
const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});
let selectedCategory = 'Semua';

// Gunakan gambar fallback jika foto produk dari internet tidak tersedia.
const fallbackImage = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80';

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderCategories() {
  const categories = ['Semua', ...new Set(products.map((product) => product.category))];

  categoryList.innerHTML = categories.map((category) => `
    <button class="category-button${category === selectedCategory ? ' active' : ''}"
      type="button" data-category="${category}" aria-pressed="${category === selectedCategory}">
      ${category}
    </button>
  `).join('');
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase('id-ID');
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLocaleLowerCase('id-ID').includes(searchTerm);
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  productGrid.innerHTML = filteredProducts.map((product, index) => {
    const message = `Halo Bu Jane Doe, saya ingin memesan ${product.name} dengan harga ${currency.format(product.price)}. Apakah produknya masih tersedia?`;
    return `
      <article class="product-card" style="animation-delay: ${index * 45}ms">
        <div class="product-image">
          <img src="${product.image}" alt="${product.alt}" loading="lazy" data-fallback="${fallbackImage}">
          <span class="product-category">${product.category}</span>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-bottom">
            <span class="product-price">${currency.format(product.price)}</span>
            <a class="order-button" href="${createWhatsAppLink(message)}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z"></path><path d="M8.2 8.1c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.1.5-.5.7-.5.2-1.1.3-1.7.2-1.2-.2-2.5-.9-3.7-2.1-1.2-1.2-1.9-2.5-2.1-3.7-.1-.6 0-1.2.2-1.7Z"></path></svg>
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  emptyState.hidden = filteredProducts.length > 0;
  resultCount.textContent = `${filteredProducts.length} produk tersedia`;
  productGrid.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => {
      image.src = image.dataset.fallback;
      image.onerror = null;
    }, { once: true });
  });
}

categoryList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

searchInput.addEventListener('input', renderProducts);
document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#contact-whatsapp').href = createWhatsAppLink('Halo Bu Jane Doe, saya ingin bertanya tentang produk roti yang tersedia.');

// Buka Google Maps hanya setelah alamat toko diganti dari placeholder.
const mapLink = document.querySelector('#map-link');
const addressElement = document.querySelector('#store-address');
addressElement.textContent = STORE_ADDRESS;
if (!STORE_ADDRESS.startsWith('[')) {
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_ADDRESS)}`;
} else {
  mapLink.addEventListener('click', (event) => event.preventDefault());
  mapLink.setAttribute('aria-disabled', 'true');
  mapLink.title = 'Ganti STORE_ADDRESS di script.js untuk membuka lokasi';
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#main-menu');
menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Buka menu' : 'Tutup menu');
  navLinks.classList.toggle('open', !isExpanded);
});
navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
    navLinks.classList.remove('open');
  }
});

renderCategories();
renderProducts();

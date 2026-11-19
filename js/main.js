/**
 * LUMIÈRE PARIS — Core JavaScript Store Engine
 * Handles State, Navigation, Shopping Cart, Wishlist, and UI Interactions
 */

// Global Products Database
const LUMIERE_PRODUCTS = [
  {
    id: 1,
    name: "Rouge Lumière Satin Hydrating",
    category: "lipstick",
    categoryName: "أحمر شفاه",
    price: 165,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 328,
    isBestseller: true,
    tag: "الأكثر مبيعاً ★",
    shade: "04 - روز فيلفيت (Rose Velours)",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrD54FzMwu6pHGFpFtMYD3lrsrMkJQb-IjqqilgX5z_5xRIk8M2WxynxBywkeYfmQFLiTwOBoPatSvQLOyalHbH9RP3cmq5ze2C6y2bUG9O9mY-GAPChZAJC_WvUJNwSDj65gBT3OpWFl8TL_naEPLb4LiyZjHNUVPPMiYoQJVTzI1HPvkKkUWnjZ9jOaWU4VsG-ljS-Go1ULqbIxb3ab5os9i60ZSj3LY3z-x2JOOmvwcG4T4aVA43oXQ8LZRzx9jk",
    description: "أحمر شفاه بلمسة ساتانية تدوم حتى 12 ساعة، غني بزيت بذور الورد وحمض الهيالورونيك.",
    url: "product-detail.html"
  },
  {
    id: 2,
    name: "محدد الشفاه المخملي الدقيق (Velvet Touch)",
    category: "lipstick",
    categoryName: "أحمر شفاه",
    price: 68,
    originalPrice: 85,
    rating: 4.8,
    reviewsCount: 142,
    isBestseller: false,
    tag: "موصى به",
    shade: "04 - روز فيلفيت",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrBrB_MC4VjDB6x-GEx7HdlyWCEcAY1KIwu4cuGpCas8dC_nMt0DafK4KhLkKrbDePLrmEHEBmvHd9x9wksOr9iWd0QeJUN67kTHMj8qBJime9J6THSiusyiFU1VjJV_uEI08MK_vqW-sbE_cOlw9QRFFH3A_EJpJRfy0YMINluT9sQLe0NDN6loXTCRkxDXEpxK1W0qifTW3r2moxsyofLp6pt-MDaYR1Hn7GDU00ap5W9O5-r5kDuNo8k5LzwJCMc",
    description: "قلم تحديد شفاه غني وسهل الانسياب يمنحك خطاً محدداً يدوم طويلاً دون تشقق.",
    url: "product-detail.html"
  },
  {
    id: 3,
    name: "سيروم النضارة والإشراق (Hydra-Glow Plumping)",
    category: "skincare",
    categoryName: "عناية بالبشرة",
    price: 190,
    originalPrice: 220,
    rating: 5.0,
    reviewsCount: 215,
    isBestseller: true,
    tag: "جديد فاخر",
    shade: "تركيبة موحدة",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    description: "جرعة مركزة من فيتامين C النقي والنياسيناميد لإشراقة طبيعية وملمس حريري.",
    url: "products.html"
  },
  {
    id: 4,
    name: "كريم الأساس الحريري (Pure Silk Radiant)",
    category: "face",
    categoryName: "مكياج الوجه",
    price: 240,
    originalPrice: 275,
    rating: 4.9,
    reviewsCount: 409,
    isBestseller: true,
    tag: "تغطية كاملة",
    shade: "درجة 02 عاجي دافئ",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    description: "تغطية طبيعية تدوم 24 ساعة بلمسة غير لامعة، خفيف كالحرير ومقاوم للتعرق.",
    url: "products.html"
  },
  {
    id: 5,
    name: "باليت ظلال العيون الإمبراطورية (Imperial Rose)",
    category: "eyes",
    categoryName: "مكياج عيون",
    price: 280,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 188,
    isBestseller: false,
    tag: "إصدار حصري",
    shade: "12 لون متنوع",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    description: "تشكيلة من 12 لوناً فخماً بين المخملي المات والميتاليك المتلألئ بأصباغ غنية.",
    url: "products.html"
  },
  {
    id: 6,
    name: "عطر الوردة المخملية (Velvet Rose Extrait)",
    category: "perfumes",
    categoryName: "عطور فاخرة",
    price: 340,
    originalPrice: 390,
    rating: 5.0,
    reviewsCount: 97,
    isBestseller: true,
    tag: "عطر أيقوني",
    shade: "100 مل مركز",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "عبير آسر من ورود غراس الفرنسية مع نفحات خشب الصندل والعنبر الدافئ.",
    url: "products.html"
  }
];

// Centralized Cart Engine
const Cart = {
  STORAGE_KEY: 'lumiere_cart_v1',

  get() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart', e);
      return [];
    }
  },

  save(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      this.updateBadge();
    } catch (e) {
      console.error('Error saving cart', e);
    }
  },

  add(product) {
    const items = this.get();
    const shadeKey = product.shade || 'default';
    const existingIndex = items.findIndex(item => item.id === product.id && (item.shade || 'default') === shadeKey);

    if (existingIndex > -1) {
      items[existingIndex].quantity = (items[existingIndex].quantity || 1) + (product.quantity || 1);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        shade: product.shade || '',
        quantity: product.quantity || 1
      });
    }

    this.save(items);
    showToast(`تمت إضافة "${product.name}" إلى حقيبة التسوق`, 'shopping_bag');
    return items;
  },

  updateQty(id, shade, delta) {
    let items = this.get();
    const item = items.find(i => i.id === id && (i.shade || 'default') === (shade || 'default'));
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        items = items.filter(i => !(i.id === id && (i.shade || 'default') === (shade || 'default')));
      }
      this.save(items);
    }
    return items;
  },

  remove(id, shade) {
    let items = this.get();
    items = items.filter(i => !(i.id === id && (i.shade || 'default') === (shade || 'default')));
    this.save(items);
    showToast('تم حذف المنتج من الحقيبة', 'delete_outline');
    return items;
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateBadge();
  },

  count() {
    const items = this.get();
    return items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  },

  subtotal() {
    const items = this.get();
    return items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  },

  updateBadge() {
    const count = this.count();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });
  }
};

// Wishlist Engine
const Wishlist = {
  STORAGE_KEY: 'lumiere_wishlist_v1',

  get() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  save(ids) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    this.updateBadge();
  },

  has(id) {
    return this.get().includes(Number(id));
  },

  toggle(id) {
    const numericId = Number(id);
    let ids = this.get();
    let isAdded = false;
    if (ids.includes(numericId)) {
      ids = ids.filter(item => item !== numericId);
      showToast('تمت الإزالة من قائمة الرغبات', 'favorite_border');
    } else {
      ids.push(numericId);
      isAdded = true;
      showToast('تمت الإضافة إلى قائمة الرغبات', 'favorite');
    }
    this.save(ids);
    return isAdded;
  },

  updateBadge() {
    const count = this.get().length;
    const badges = document.querySelectorAll('.wishlist-count');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });
  }
};

// Toast Notification Utility
function showToast(message, icon = 'check_circle', type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] text-[#C68B77]">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2800);
}

// Global UI Setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Update Live Badges
  Cart.updateBadge();
  Wishlist.updateBadge();

  // Mobile Menu Drawer Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });
  }

  if (mobileMenuCloseBtn && mobileMenu) {
    mobileMenuCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  }

  // Quick Add To Cart Buttons across cards
  document.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = Number(btn.getAttribute('data-quick-add'));
      const product = LUMIERE_PRODUCTS.find(p => p.id === productId);
      if (product) {
        Cart.add(product);
      }
    });
  });

  // Global Wishlist Buttons
  document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
    const id = Number(btn.getAttribute('data-wishlist-toggle'));
    if (Wishlist.has(id)) {
      btn.classList.add('text-[#C68B77]');
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = 'favorite';
        icon.style.fontVariationSettings = "'FILL' 1";
      }
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isAdded = Wishlist.toggle(id);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isAdded ? 'favorite' : 'favorite_border';
        icon.style.fontVariationSettings = isAdded ? "'FILL' 1" : "'FILL' 0";
      }
      btn.classList.toggle('text-[#C68B77]', isAdded);
    });
  });
});

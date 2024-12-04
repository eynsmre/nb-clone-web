<template>
  <nav class="navbar">
    <div class="logo-container">
      <img src="/static/images/logo.png" alt="Logo" class="logo">
    </div>
    <ul class="menu">
      <!-- Yeniler Menüsü -->
      <li 
        class="menu-item category-item" 
        @mouseover="toggleDropdown('yeniler', true)" 
        @mouseleave="toggleDropdown('yeniler', false)"
      >
        <a href="#">Yeniler</a>
        <Category 
          :isOpen="menuStates.yeniler"
          :class="{ 'is-visible': menuStates.yeniler }"
        />
      </li>
      
      <!-- Erkek Menüsü -->
      <li 
        class="menu-item category-item" 
        @mouseover="toggleDropdown('erkek', true)" 
        @mouseleave="toggleDropdown('erkek', false)"
      >
        <a href="#">Erkek</a>
        <Category 
          :isOpen="menuStates.erkek"
          :class="{ 'is-visible': menuStates.erkek }"
        />
      </li>

      <!-- Kadın Menüsü -->
      <li 
        class="menu-item category-item" 
        @mouseover="toggleDropdown('kadin', true)" 
        @mouseleave="toggleDropdown('kadin', false)"
      >
        <a href="#">Kadın</a>
        <Category 
          :isOpen="menuStates.kadin"
          :class="{ 'is-visible': menuStates.kadin }"
        />
      </li>

      <!-- Çocuk Menüsü -->
      <li 
        class="menu-item category-item" 
        @mouseover="toggleDropdown('cocuk', true)" 
        @mouseleave="toggleDropdown('cocuk', false)"
      >
        <a href="#">Çocuk</a>
        <Category 
          :isOpen="menuStates.cocuk"
          :class="{ 'is-visible': menuStates.cocuk }"
        />
      </li>
      
      <li><a href="#" class="discount">İndirim</a></li>
      <li><a href="#">Blog</a></li>
    </ul>

    <div class="nav-actions">
      <!-- Arama kısmı -->
      <div @click="toggleDropdown('search', !menuStates.search)" class="search">
        <input type="text" placeholder="Ara" />
        <button>
          <i class="fas fa-search"></i>
        </button>
      </div>
      <SearchDropdown
        :isOpen="menuStates.search"
        @close="toggleDropdown('search', false)"
        :class="{ 'is-visible': menuStates.search }"
      />
      
      <!-- Kullanıcı ve Sepet Butonları -->
      <div class="user-actions">
        <button class="sign-in">
          <i class="fas fa-user"></i>
          <img src="/static/images/sign-in.jpg" alt="" class="sign-in img">
          <span>Giriş | Üyelik</span>
        </button>
        <button class="basket" @click="toggleDropdown('cart', !menuStates.cart)">
          <i class="fas fa-shopping-basket"></i>
          <img src="/static/images/sepet-icon.png" alt="" class="basket img">
        </button>
      </div>
    </div>

    <!-- Sepet Dropdown Kartı -->
    <CartDropdown 
      :isOpen="menuStates.cart" 
      @close="toggleDropdown('cart', false)" 
    />
  </nav>
</template>

<script>
import SearchDropdown from './SearchDropdown.vue';
import CartDropdown from './CartDropdown.vue'; // Sepet kartı komponenti

export default {
  name: "Navbar",
  components: {
    SearchDropdown,
    CartDropdown, // Komponenti kaydediyoruz
  },
  data() {
    return {
      menuStates: {
        yeniler: false,
        erkek: false,
        kadin: false,
        cocuk: false,
        search: false,
        cart: false, // Sepet kartı için durum
      },
    };
  },
  methods: {
    toggleDropdown(menuKey, state) {
      this.menuStates[menuKey] = state;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.logo {
  width: 90px;
  height: auto;
  object-fit: contain;
}

.menu {
  display: flex;
  gap: 15px;
  margin-right: auto;
  list-style-type: none;
}

.menu li a {
  text-decoration: none;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.menu li a:hover {
  color: #666;
  border-bottom: 2px solid red;
}

/* İndirim yazısına özel stil */
.menu li a.discount {
  color: red;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.search {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 0;
  background-color: #f0f0f0;
  overflow: hidden;
}

.search input {
  border: none;
  padding: 5px 10px;
  outline: none;
  background-color: #f0f0f0;
}

.search button {
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f0f0f0;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.sign-in, .basket {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
}

.sign-in i, .basket i {
  font-size: 16px;
  color: #333;
}

.sign-in img, .basket img {
  width: 25px;
  height: 25px;
  object-fit: contain;
  margin-right: 3px;
}

.menu-item {
  position: relative;
}

.category-item  {
  display: block;
}

/* Category dropdown */
.is-visible {
  display: block; /* Görünür hale getirir */
}

.category-item .Category {
  display: none; /* Başlangıçta gizli */
}

/* Dropdown için stil */
.menu-item:hover .Category {
  display: block; /* Hover ile açılır */
}

/* Sepet Dropdown Kartı */
.cart-dropdown {
  position: absolute;
  top: 130px;
  right: 25px;
  width: 650px;
  height: 350px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 10;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.cart-body {
  margin-top: 10px;
}

.cart-body p {
  color: #666;
}

.close {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>

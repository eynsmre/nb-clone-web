<template>
  <nav class="navbar">
    <div class="logo-container">
      <a href="/"> <img src="/static/images/logo.png" alt="Logo" class="logo" /> </a>
    </div>
    <ul class="menu">
      <!-- Yeniler Menüsü -->
      <li class="menu-item">
        <a href="#">Yeniler</a>
      </li>
      <!-- Erkek Menüsü -->
      <li class="menu-item">
        <nuxt-link to="/erkek" class="sign-in">
          <a href="#">Erkek</a>
        </nuxt-link>
      </li>

      <!-- Kadın Menüsü -->
      <li class="menu-item">
        <a href="#">Kadın</a>
      </li>

      <!-- Çocuk Menüsü -->
      <li class="menu-item">
        <a href="#">Çocuk</a>
      </li>

      <li><a href="#" class="discount">İndirim</a></li>
      <li><nuxt-link to="/blog">Blog</nuxt-link></li>
    </ul>

    <div class="nav-actions">
      <!-- Arama kısmı -->
      <div
        @click="toggleDropdown('search', !menuStates.search)"
        class="search"
      >
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
        <div
          v-if="user"
          class="logged-in-user"
          @mouseover="showAccountDropdown = true"
          @mouseleave="showAccountDropdown = false"
        >
          <span>Merhaba, {{ user.displayName || user.email?.split('@')[0] }}</span>
          <div v-show="showAccountDropdown" class="account-dropdown">
            <a>Hesap Bilgileri</a>
            <a>Adres Bilgileri</a>
            <a>Siparişlerim</a>
            <a>Kuponlarım</a>
            <a>Favorilerim</a>
            <a>Stok Habercim</a>
            <button @click="signOut">Çıkış Yap</button>
          </div>
        </div>
        <nuxt-link v-else to="/login" class="sign-in">
          <i class="fas fa-user"></i>
          <img src="/static/images/sign-in.jpg" alt="" class="sign-in img" />
          <span>Giriş | Üyelik</span>
        </nuxt-link>
        <button class="basket" @click="toggleDropdown('cart', !menuStates.cart)">
          <i class="fas fa-shopping-basket"></i>
          <img src="/static/images/sepet-icon.png" alt="" class="basket img" />
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

<script setup lang="ts">
import CartDropdown from "./CartDropdown.vue";
import SearchDropdown from "./SearchDropdown.vue";
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { useAuth } from "C:/Users/yunus/Desktop/24-25 Ders/Web Programlama/web/demo-nb-clone-web/composables/useAuth";

const { $auth } = useNuxtApp();

const menuStates = ref<Record<string, boolean>>({
  yeniler: false,
  erkek: false,
  kadin: false,
  cocuk: false,
  search: false,
  cart: false,
});
const toggleDropdown = (menuKey: string, state: boolean) => {
  menuStates.value[menuKey] = state;
};
const { user, signOutUser } = useAuth();
const showAccountDropdown = ref(false);
const signOut = async () => {
  try {
    await signOutUser();
    navigateTo("/login");
    console.log("Çıkış başarılı"); // Bu satır eklendi.
  } catch (error) {
    console.error("Çıkış yaparken bir hata oluştu:", error);
  }
};
</script>
<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
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
  font-family: "Montserrat", sans-serif;
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

.sign-in,
.basket {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}
.logged-in-user {
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  color: #333;
}

.logged-in-user span {
  padding: 8px;
}

.logged-in-user:hover {
  background-color: #f0f0f0;
}

.account-dropdown {
  position: absolute;
  top: 45px;
  right: 100px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 150px;
}

.account-dropdown a,
.account-dropdown button {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}

.account-dropdown a:hover,
.account-dropdown button:hover {
  background-color: #f0f0f0;
}

.sign-in i,
.basket i {
  font-size: 16px;
  color: #333;
}

.sign-in img,
.basket img {
  width: 25px;
  height: 25px;
  object-fit: contain;
  margin-right: 3px;
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
<template>
  <div>
    <nav class="navbar">
      <ul class="navbar-list">
        <li>
          <NuxtLink 
            to="/" 
            exact-active-class="active-link"
            @click.native="setActive('blog')"
            :class="{'active': activeComponent === 'blog'}"
          >Blog</NuxtLink>
        </li>
        <li>
          <a 
            @click="setActive('news')"
            :class="{'active': activeComponent === 'news'}"
          >Son Haberler</a>
        </li>
        <li>
          <a 
            @click="setActive('brand')"
            :class="{'active': activeComponent === 'brand'}"
          >Markamız</a>
        </li>
      <li>
          Ürünlerimiz
      </li>
      <li>
          Spor Haberleri
      </li>
      <li>
          Özel Koleksiyonlar
      </li>
      <li>
          Teknik Bilgiler
      </li>
      <li>
          Koşu Ayakkabıları
      </li>
      </ul>

      <!-- Arama kısmı -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Ara"
          class="search-input"
        />
        <button @click="handleSearch" class="search-button">Ara</button>
      </div>
    </nav>

    <!-- Dinamik olarak componentleri göstermek -->
    <div>
      <News v-if="activeComponent === 'blog' || activeComponent === 'news'" />
      <Brand v-if="activeComponent === 'blog' || activeComponent === 'brand'" />
    </div>
  </div>
</template>

<script>
import News from './News.vue';
import Brand from './Brand.vue';

export default {
  components: {
    News,
    Brand,
  },
  name: "Navbar",
  data() {
    return {
      searchQuery: "", // Arama kutusundaki veri
      activeComponent: "blog", // Başlangıçta blog componenti aktif
    };
  },
  methods: {
    setActive(component) {
      this.activeComponent = component; // Aktif componenti değiştir
    },
    handleSearch() {
      if (this.searchQuery.trim() !== "") {
        console.log("Arama yapılacak: ", this.searchQuery);
      } else {
        alert("Lütfen arama terimi girin.");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #f5f5f5; /* Navbar rengi */
  padding: 0.2rem 0.7rem; /* Navbar yüksekliğini yarıya indir */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  text-decoration: none;
  outline: none;
}

.navbar-list {
  list-style-type: none;
  display: flex;
  gap: 20px;
}

.navbar-list li {
  font-size: 18px;
}

.navbar-list li a {
  color: #000; /* Yazı rengi siyah */
  text-decoration: none;
  position: relative;
  cursor: pointer;
}

.navbar-list li a:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* Aktif kategoriye mavi bar ekleme */
.navbar-list li a.active {
  color: #000; /* Yazı rengi siyah */
  cursor: pointer;
}

.navbar-list li a.active::after {
  content: '';
  display: block;
  height: 3px;
  background-color: #007bff; /* Mavi bar */
  position: absolute;
  bottom: -5px; /* Alt tarafta yerleşim */
  left: 0;
  width: 100%;
  margin: auto;
  cursor: pointer;
}

/* Arama kutucuğu ve buton */
.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 0;
}

.search-button {
  padding: 8px 12px;
  font-size: 12px;
  background-color: white; /* Buton rengi beyaz */
  color: green; /* Buton yazı rengi mavi */
  border: 2px solid green; /* Buton sınırları mavi */
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: green; /* Buton hover rengi */
  color: white; /* Buton hover yazı rengi beyaz */
}
</style>

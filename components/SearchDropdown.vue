<template>
  <div v-if="isOpen" class="dropdown-overlay" @click.self="close">
    <div class="dropdown-container">
      <!-- Önerilen Ürünler -->
      <div class="suggestions">
        <h3>Sizin İçin Seçtiklerimiz</h3>
        <div class="suggestion-grid">
          <div class="item" v-for="(item, index) in suggestions" :key="index">
            <div class="item-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <span>{{ item.price }}</span>
            </div>
            <img :src="item.image" alt="Product Image" />
          </div>
        </div>
      </div>

      <!-- Popüler Aramalar -->
      <div class="popular-searches">
        <h3>Popüler Aramalar</h3>
        <ul>
          <li v-for="(search, index) in popularSearches" :key="index">
            {{ search }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDropdown",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      suggestions: [
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RRA_1.jpg", // Resim yer tutucu
          title: "New Balance 2002R Siyah Unisex Ayakkabı",
          category: "Ayakkabı",
          price: "6.499,00 ₺",
        },
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM1906REM_1.jpg",
          title: "New Balance 1906R Beyaz Unisex Ayakkabı",
          category: "Günlük Giyim",
          price: "7.999,00 ₺",
        },
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNC3328-IND_10.jpg",
          title: "New Balance 574 Klasik Spor Ayakkabı",
          category: "Spor Giyim",
          price: "4.499,00 ₺",
        },
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBUNT3409-AVI_10.jpg",
          title: "New Balance X-Racer Unisex Sneaker",
          category: "Koşu Ayakkabısı",
          price: "5.999,00 ₺",
        },
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBUNJ3429-WT_10.jpg",
          title: "New Balance 327 Vintage Spor Ayakkabı",
          category: "Vintage",
          price: "3.999,00 ₺",
        },
        {
          image: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBWNC3404-ASU_10.jpg",
          title: "New Balance 1080v12 Koşu Ayakkabısı",
          category: "Performans Ayakkabısı",
          price: "8.499,00 ₺",
        },
      ],
      popularSearches: [
        "Yeni Gelenler",
        "Spor Giyim",
        "Koşu ve Antrenman",
        "Unisex",
        "Aksesuar",
        "Classic 1906",
      ],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Google Fonts üzerinden Montserrat yazı tipini dahil et */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

/* Genel Yazı Tipi */
body {
  font-family: 'Montserrat', sans-serif;
}

/* Arka plan */
.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

/* Ana pencere */
.dropdown-container {
  position: absolute;
  top: 108px;
  left: 400px;
  width: 65%;
  height: calc(100% - 140px);
  background: white;
  display: flex; /* Flexbox düzeni */
  gap: 150px; /* Ürünler ile popüler aramalar arasındaki boşluk */
  padding-left: 100px; /* Sol taraftan 100px boşluk */
  padding-top: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #ddd;
  overflow-y: auto;
}

/* Önerilen Ürünler */
.suggestions {
  flex: 3; /* Sol sütun genişliği */
}

.suggestions h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* İki sütun */
  gap: 10px; /* Fotoğraflar arasındaki boşluk */
}

/* Ürün kutuları için stil */
.item {
  display: flex; /* Flexbox düzeni */
  align-items: center; /* Dikeyde ortala */
  border: none; /* Sınırları kaldırıyoruz */
  border-radius: 5px;
  padding: 10px;
  text-align: left; /* Yazılar sola hizalı */
  width: 100%; /* Kutuların genişliği tamamen kapsasın */
  flex-direction: row-reverse; /* Fotoğraf sağda, yazı solda */
  gap: 20px; /* Fotoğraf ile yazılar arasına boşluk ekledik */
}

/* Ürün resimleri için stil */
.item img {
  max-width: 150px; /* Resimlerin genişliğini artırdık */
  height: auto; /* Yüksekliği otomatik olarak koruyalım */
}

/* Ürün bilgi kısmı için stil */
.item-info {
  flex: 1; /* Yazı kısmını genişletiyoruz */
}

.item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-info p {
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
}

.item-info span {
  font-size: 14px;
  font-weight: bold;
}

/* Popüler Aramalar */
.popular-searches {
  flex: 1; /* Sağ sütun genişliği */
  padding-right: 100px; /* Sağ taraftan 100px boşluk */
}

.popular-searches h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.popular-searches ul {
  list-style: none;
  padding: 0;
}

.popular-searches ul li {
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
}
</style>

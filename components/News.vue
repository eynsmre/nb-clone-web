<template>
    <h1 style="padding: 20px;">Son Haberler</h1>
    <div class="container">
      <div class="products">
        <div v-for="(product, index) in products" :key="index" class="product">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-description">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            title: 'Made in USA Fall / Winter',
            description: 'New Balance’ın Made in USA koleksiyonu, sonbahar/kış sezonu için tasarlandı.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/NB_MIU_SS24_StillLife_Drop1_U990TG6_U990TG4_U998GB_U996TG-min.jpg'
          },
          {
            title: 'New Balance 1906 Antrenman Ayakkabıları',
            description: 'New Balance 1906, klasik ve ultra rahat bir ayakkabıdır.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/1906RER_desktop.jpg'
          },
          {
            title: 'New Balance ve Kadınlar Ulusal Basketbol Ligi (WNBA)',
            description: 'New Balance, kadın sporlarını yüceltmeyi ve yeni nesil taraftarlarla sporculara ilham vermeyi hedefleyen çok yıllık bir anlaşma duyurdu.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/cameron_blog3.jpg'
          },
          {
            title: 'KAWHI IV',
            description: 'New Balance, iki kez NBA Şampiyonu olan Kawhi Leonard’ın imza ayakkabısı KAWHI IV modelinin son versiyonunu tanıttı.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/KAWHI_BLOG.jpeg'
          },
          // Yeni ürünler ekleniyor
          {
            title: 'We Got Now',
            description: 'New Balance 2024 Global WE GOT NOW Kampanyasını Yayınladı',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/WGN_banner_2.jpg'
          },
          {
            title: 'En uygun koşu ayakkabısı nasıl seçilir?',
            description: 'İyi bir koşu ayakkabısı bulmak, sadece güzel görünmek ve ayağınızı rahat hissettirmek bir ayakkabı seçmenin değil, her seferinde daha iyi bir koşu ortaya çıkarmanızı sağlayacaktır.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/Resim1%20(1).jpg'
          },
          {
            title: 'Koşu Ayakkabısı Nasıl Seçilir',
            description: 'Koşarken ayaklarınızın dayandığı 800 ile 1000 kez yere çarpığını biliyor musunuz?',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/Resim1.jpg'
          },
          {
            title: 'New Balance, Mayıs boyunca Grey Days Kutlaması Yapıyor',
            description: 'Zamansız İmza Renginle Marka Mirasını Onurlandırıyor',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/greyday-week1-desktop.jpg'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap; /* Ürünlerin birden fazla satıra yayılmasını sağlar */
}

.products {
  display: flex;
  flex-wrap: wrap; /* Ürünleri satırlara yaymak için */
  gap: 10px; /* Ürünler arasındaki boşluk */
  justify-content: space-between; /* Her satırda 4 ürün arasında eşit boşluk */
  width: 100%; /* Container'ı tamamen kullanabilmesi için */
}

.product {
  width: 23%; /* Ürün genişliği, 4 ürün yan yana gelmesi için */
  border: 1px solid #ddd;
  border-radius: 0; /* Köşeleri köşeli yapmak için */
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.product-description {
  font-size: 14px;
  color: #666;
}
  </style>
  
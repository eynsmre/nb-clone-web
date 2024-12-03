<template>
    <h1 style="padding: 20px;">Markamız</h1>

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
            title: 'Şimdi Değilse Ne Zaman',
            description: 'Cesur bir iklim hareketi hiç bu kadar acil olmamıştı. Daha sağlıklı ve yaşanabilir bir gezegen yaratmak için harekete geçiyoruz.',
            image: 'https://img1-newbalance.mncdn.com/newbalance/products/uploads/blog/S223_Fuelcell_SC_Elite_v3_MRCELCT3_WRCELCT3__Waist_Down_Onfigure_1-square-min.jpeg'
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
  
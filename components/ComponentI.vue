<template>
  <div class="product-list row items-start gap-4 p-4">
    <!-- Product Card -->
    <div class="product-card" v-for="(product, index) in products" :key="index">
      <div class="product-image-wrapper">
        <div class="tooltip top">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
            />
          </svg>
        </div>
        <a :href="product.link">
          <img class="product-image" :src="product.image" :alt="product.name" />
        </a>
      </div>
      <div class="product-details">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <h5 class="product-price">{{ product.price }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const products = [
      {
        name: "New Balance 650 R",
        category: "Günlük Giyim",
        price: "4.424,25₺",
        image:
          "https://8f08a8.cdn.akinoncloud.com/products/2023/05/08/3006322/33b8eef9-bd8e-412a-82a0-5aecefd4b20a_size2010x2010_cropCenter.jpg",
        link: "#",
      },
      {
        name: "New Balance 650 B",
        category: "Günlük Giyim",
        price: "5.424,25₺",
        image:
          "https://8f08a8.cdn.akinoncloud.com/products/2023/05/08/3005477/3767b845-33be-4a22-8c13-acb2a9494441_size2010x2010_cropCenter.jpg",
        link: "#",
      },
      {
        name: "New Balance 650",
        category: "Günlük Giyim",
        price: "2.754,25₺",
        image:
          "https://8f08a8.cdn.akinoncloud.com/products/2023/11/21/16990426/5c53b4db-4a7d-4e4f-87ba-6691dd3a3315_size2010x2010_cropCenter.jpg",
        link: "#",
      },
    ];

    return {
      products,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.product-card {
  width: 100%;
  max-width: 450px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.product-image-wrapper {
  position: relative;
  background: black;
}

.product-image {
  width: 100%;
  height: auto;
}

.tooltip {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #eee;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.product-details {
  padding: 16px;
}

.product-name {
  font-size: 18px;
  margin: 0 0 8px;
}

.product-category {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}
</style>

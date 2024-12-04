<template>
  <div v-if="isOpen" class="cart-dropdown">
    <div class="cart-content">
      <!-- Sepet İkonu -->
      <img src="/static/images/sepet-icon.png" alt="Sepet" class="cart-icon" />

      <!-- Sepet Mesajı -->
      <p class="cart-message" v-if="cartItems.length === 0">Sepetiniz henüz boş</p>
      <p v-else class="cart-message">Sepetinizde {{ cartItems.length }} ürün var</p>

      <!-- Sepet Ürünleri -->
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          <img :src="item.image" alt="Ürün Resmi" class="item-image" />
          <div class="item-details">
            <p>{{ item.title }}</p>
            <p>{{ item.price }}</p>
            <button class="remove-item" @click="removeItem(index)">Sil</button>
          </div>
        </li>
      </ul>

      <!-- Alışverişe Devam Et Butonu -->
      <button class="continue-shopping" @click="redirectToShopping">
        Alışverişe devam et
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    initialCartItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cartItems: [...this.initialCartItems],
    };
  },
  methods: {
    removeItem(index) {
      this.cartItems.splice(index, 1); // Ürün çıkar
      this.$emit("update-cart", this.cartItems); // Üst bileşeni güncelle
    },
  },
};
</script>


<style scoped>
.cart-dropdown {
  position: absolute;
  top: 50px;
  right: 25px;
  width: 350px;
  height: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
}
.cart-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.cart-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}
.cart-message {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
}
.item-image {
  width: 100px;
  height: auto;
  display: block;
  margin-bottom: 5px;
}
.item-details {
  text-align: center;
  position: relative;
}
.remove-item {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  position: absolute;
  top: 5px;
  right: 5px;
}
.remove-item:hover {
  background-color: #c0392b;
}
.continue-shopping {
  background-color: #c60c30;
  color: white;
  border: none;
  border-radius: none;
  padding: 25px 15px;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.continue-shopping:hover {
  background-color: #a00a28;
}
</style>

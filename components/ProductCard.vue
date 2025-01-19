<template>
    <div v-if="isOpen" class="cart-dropdown" ref="cartDropdown" :style="{ maxHeight: dynamicMaxHeight }">
        <div class="cart-content">
            <div v-if="cartItems.length === 0" class="empty-cart">
                <img src="/static/images/sepet-icon.png" alt="Sepet" class="cart-icon" />
                <p class="cart-message">Sepetiniz henüz boş</p>
                <button class="continue-shopping" @click="redirectToShopping">
                    Alışverişe devam et
                </button>
            </div>
            <div v-else class="filled-cart">
                <div class="cart-header">
                    <p class="cart-title">Sepet ({{ cartItems.length }})</p>
                </div>
                <ul class="cart-items-list">
                    <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
                        <div class="item-image-container">
                            <img :src="item.image" alt="Ürün Resmi" class="item-image" />
                        </div>
                        <div class="item-details">
                            <div class="item-title">
                                <span>{{ truncatedTitle(item.title) }}</span>
                                <span class="item-price">{{ item.price }}</span>
                            </div>
                            <div class="item-info-group">
                                <div class="item-quantity">
                                    <p>Adet: </p>
                                    <div class="quantity-controls">
                                        <button class="quantity-button" @click="decreaseQuantity(index)">-</button>
                                        <input type="number" class="quantity-input" :value="item.quantity" readonly>
                                        <button class="quantity-button" @click="increaseQuantity(index)">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="item-bottom-group">
                                <p class="item-size" v-if="item.size">Beden: {{ item.size }} </p>
                                <button class="remove-item" @click="removeItem(index)">Sil</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="cartItems.length > 0" class="cart-footer">
            <p class="total-price">Toplam Tutar: {{ totalPrice }}</p>
            <div class="action-buttons">
                <button class="continue-shopping" @click="redirectToShopping">
                    Alışverişe Devam Et
                </button>
                <button class="view-cart" @click="viewCart">
                    Sepeti Görüntüle
                </button>
            </div>
        </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useCart } from '~/composables/useCart';
  import { type Ref, computed, ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    initialCartItems: {
        type: Array,
        default: () => [],
    },
  });
  
  const { cartItems, removeFromCart } = useCart(); // <-- useCart'ı burada çağır
  const cartDropdown = ref<HTMLElement | null>(null);
  const emit = defineEmits(["close"]);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (cartDropdown.value && !cartDropdown.value.contains(event.target as Node)) {
        emit("close");
    }
  };
  
  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
  
  const removeItem = (index: number) => {
    removeFromCart(index);
  };
  const increaseQuantity = (index: number) => {
    cartItems.value[index].quantity++;
  };
  const decreaseQuantity = (index: number) => {
    if (cartItems.value[index].quantity > 1) cartItems.value[index].quantity--;
  };
  const redirectToShopping = () => {
    emit("close");
  };
  const viewCart = () => {
    // Sepeti görüntüle butonuna tıklandığında yapılacak işlemleri burada tanımlayabilirsiniz
  };
  const totalPrice = computed(() => {
    let total = 0;
    cartItems.value.forEach((item) => {
        const price = parseFloat(item.price.replace(/\./g, '').replace(',', '.').replace(' ₺', ''));
        total += price * item.quantity;
    });
    return total.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₺';
  });
  const truncatedTitle = (title: string) => {
    if (title.length > 18) {
        return title.substring(0, 18) + "...";
    }
    return title;
  };
  const dynamicMaxHeight = computed(() => {
    const itemCount = cartItems.value.length;
    if (itemCount === 1) {
        return "350px";
    } else if (itemCount === 2) {
        return "500px";
    } else if (itemCount === 3) {
        return "700px";
    } else if (itemCount > 3) {
        return "700px";
    } else {
        return "auto";
    }
  });
  </script>
  <style scoped>
  .cart-dropdown {
    position: absolute;
    top: 50px;
    right: 25px;
    width: 400px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 10;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
  }
  .cart-content {
    padding: 15px;
    flex: 1;
    overflow-y: auto;
    position: relative;
  }
  .cart-items-list {
    margin-bottom: 10px;
    overflow-y: hidden;
  }
  .cart-footer {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #eee;
    padding: 10px 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: white;
  }
  .cart-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  
  .cart-message {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .filled-cart {
    display: flex;
    flex-direction: column;
  }
  
  .cart-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  
  .cart-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    margin-left: 0;
  }
  .cart-item {
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    gap: 10px;
    position: relative;
  }
  .item-image-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .item-image {
    width: 80px;
    height: auto;
    display: block;
  }
  .item-details {
    flex: 1;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
  }
  .item-info-group{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .item-bottom-group{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item-title {
    font-size: 0.9rem;
    color: #333;
    font-weight: 600;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-title .item-price{
    margin-bottom: 0;
  }
  .remove-item {
    background-color: transparent;
    color: #888;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 11px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  
  .remove-item:hover {
    background-color: #eee;
  }
  .continue-shopping,
  .view-cart {
    background-color: #c60c30;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 12px;
    font-size: 12px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    transition: background-color 0.3s ease;
    margin-right: 5px;
    white-space: nowrap;
  }
  .continue-shopping:hover,
  .view-cart:hover {
    background-color: #a00a28;
  }
  
  .total-price {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 10px;
    text-align: right;
    margin-right: 0;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 2px;
  }
  
  .item-quantity > p {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    color: #333;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  
  .quantity-button {
    background-color: #eee;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  .quantity-button:hover {
    background-color: #ddd;
  }
  
  .quantity-input {
    width: 30px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 2px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #333;
    outline: none;
  }
  .item-size{
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.7rem;
    color: #333;
    margin-bottom: 2px;
  }
  </style>
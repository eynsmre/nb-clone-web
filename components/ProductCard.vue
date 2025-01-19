<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <div
          v-for="(card, index) in visibleCards"
          :key="index"
          class="relative bg-white shadow-lg rounded-lg overflow-hidden group"
      >
          <div
              class="relative"
              @mouseover="changeImage(card)"
              @mouseleave="resetImage(card)"
          >
              <img
                  :src="card.currentImage"
                  alt="Product Image"
                  class="w-full h-full object-cover transition-transform duration-300"
              />
              <div
                    class="absolute bottom-0 left-0 right-0 bg-gray-50 bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <span class="text-sm text-black font-semibold">Hızlı İncele</span>
                </div>

                <button
                    class="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-lg group-hover:opacity-100 opacity-0 transition"
                    @click="openViewModal(card)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 text-gray-600"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0l-.6.6-.59-.59a5.5 5.5 0 00-7.78 7.78l8.38 8.39 8.39-8.38a5.5 5.5 0 000-7.78z"
                        />
                    </svg>
                </button>
            </div>

            <div class="flex space-x-2 mt-2">
                <img
                    v-for="(thumbnail, idx) in card.thumbnails"
                    :key="idx"
                    :src="thumbnail"
                    alt="Thumbnail"
                    class="w-10 h-10 object-cover border border-gray-300 rounded cursor-pointer hover:border-gray-500"
                    @mouseover="card.currentImage = thumbnail"
                   @mouseleave="resetImage(card)"
                />
            </div>

            <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-800">{{ card.title }}</h2>
                <p class="text-sm text-gray-500 mt-2">{{ card.category }}</p>
                <p class="text-sm text-gray-500">{{ card.type }}</p>
                <p class="text-lg font-bold text-gray-800 mt-4">{{ card.price }}</p>
            </div>
        </div>
    </div>

    <View v-if="showComponent && selectedProduct" :product="selectedProduct" @close="showComponent = false" />
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import View from './View.vue';
interface ProductCardProps {
    currentImage: string;
    originalImage: string;
    hoverImage: string;
    thumbnails: string[];
    title: string;
    category: string;
    type: string;
    price: string;
    detailsUrl: string;
    id: number;
}
const originalCards = [
    {
        id: 1,
        currentImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBU998TI_1.jpg",
        originalImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBU998TI_1.jpg",
        hoverImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBU998TI_2.jpg",
        thumbnails: ["https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBU998TI_1.jpg"],
        title: "New Balance 998 Beyaz Unisex Ayakkabı",
        category: "Ayakkabı",
        type: "Ayakkabı",
        price: "9.990,00 ₺",
        detailsUrl: '/product-details/998-beyaz'
    },
    {
        id: 2,
        currentImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXU_1.jpg",
        originalImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXU_1.jpg",
        hoverImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXU_2.jpg",
        thumbnails: ["https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXU_1.jpg", "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXT_1.jpg"],
        title: "New Balance 2002RX Gore Tex ® Haki Unisex",
        category: "Günlük Giyim",
        type: "Günlük Giyim",
        price: "9.990,00 ₺",
         detailsUrl: '/product-details/2002rx-haki'
    },
    {
        id: 3,
         
        currentImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXT_1.jpg",
         originalImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXT_1.jpg",
        hoverImage: "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXT_2.jpg",
        thumbnails: ["https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXT_1.jpg", "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBM2002RXU_1.jpg"],
        title: "New Balance 2002RX Gore Tex ® Siyah Unisex",
        category: "Günlük Giyim",
        type: "Günlük Giyim",
        price: "9.990,00 ₺",
        detailsUrl: '/product-details/2002rx-siyah'
    },
];
const visibleCards = ref<ProductCardProps[]>([]);
const cardsPerPage = ref(9);
const showComponent = ref(false);
const selectedProduct = ref<ProductCardProps | null>(null);
const isLoading = ref(false);
onMounted(() => {
    loadMoreCards();
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
const loadMoreCards = () => {
    isLoading.value = true;
    setTimeout(() => {
        const startIndex = visibleCards.value.length;
        const endIndex = startIndex + cardsPerPage.value;
        const newCards: ProductCardProps[] = [];
        for (let i = startIndex; i < endIndex; i++) {
            newCards.push({ ...originalCards[i % originalCards.length] });
        }
        visibleCards.value.push(...newCards);
        isLoading.value = false;
    }, 300)
};
const handleScroll = () => {
    if (isLoading.value) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (windowHeight + scrollTop >= documentHeight - 100) {
        loadMoreCards();
    }
};
const changeImage = (card: ProductCardProps) => {
    card.currentImage = card.hoverImage;
};
const resetImage = (card: ProductCardProps) => {
     card.currentImage = card.originalImage;
};
const openViewModal = (card: ProductCardProps) => {
    selectedProduct.value = card;
    showComponent.value = true;
}
</script>
<style scoped>
</style>
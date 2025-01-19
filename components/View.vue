<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click="closeModal">
        <div class="bg-white shadow-lg w-full max-w-3xl overflow-hidden p-6" @click.stop>
            <div class="bg-gray-200 p-4 flex gap-4">
                <div class="flex-1 flex items-center gap-4 columns-6">
                    <div class="w-[75px] h-[75px] relative">
                        <!-- Doğru image kaynağını kullan -->
                        <img
                            :src="product.image"
                            :alt="product.title"
                            class="w-full h-full object-cover absolute inset-0"
                        />
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold">{{ product.title }}</h3>
                        <p class="text-gray-600 text-sm">{{ product.category }}</p>
                        <p class="text-red-600 font-semibold">{{ product.price }}</p>
                    </div>
                </div>
                <div v-if="product.colors && product.colors.length" class="flex gap-2">
                    <img v-for="color in product.colors" :key="color" :src="color" alt="Color Option" class="w-[50px] h-[50px] object-cover border border-gray-300" />
                </div>
            </div>
            <div class="bg-gray-100 p-6 mt-2">
                <div class="mb-4">
                    <p class="text-gray-800 font-semibold mb-2">Beden Seçiniz:</p>
                    <div class="flex gap-2">
                        <button v-for="size in sizes" :key="size" :class="{ 'bg-gray-300': selectedSize === size }" @click="selectSize(size)" class="px-4 py-2 bg-white border text-sm hover:border-black hover:border-2">
                            {{ size }}
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-6">
                    <div class="flex gap-2">
                        <button @click="goBack" class="px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
                            Geri Dön
                        </button>
                        <button @click="goToDetails" class="px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
                            Ürün Detaya Git
                        </button>
                    </div>
                    <button @click="addToCartButton" :class="{ 'bg-green-600': addedToCart }" class="px-32 py-3 bg-red-600 text-white hover:bg-red-700 transition">
                        <span v-if="!addedToCart">Sepete Ekle</span>
                        <span v-else>Eklendi!</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCart } from '~/composables/useCart';
import { ref } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const emit = defineEmits(['close']);
const addedToCart = ref(false);
const { addToCart } = useCart();
const selectedSize = ref('');

const selectSize = (size: string) => {
    selectedSize.value = size;
};

const closeModal = () => {
    emit("close");
};

const goBack = () => {
    emit('close');
};

const goToDetails = () => {
    window.location.href = props.product.detailsUrl;
};

const addToCartButton = async () => {
    if(!selectedSize.value) {
         console.error("Beden seçimi yapılmadı!");
         return;
    }
     try {
           await addToCart(props.product, selectedSize.value);
           addedToCart.value = true;
           console.log("Ürün sepete eklendi");
     } catch (error) {
       console.error("Ürün sepete eklenirken hata oluştu:", error);
    }

};

</script>
<style scoped>
.modal-container {
    max-width: 800px;
    margin: auto;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click="closeModal"
  >
    <div
      class="bg-white shadow-lg w-full max-w-3xl overflow-hidden p-6"
      @click.stop
    >
      <!-- Üst Kısım -->
      <div class="bg-gray-200 p-4 flex gap-4">
        <!-- Sol Kısım -->
        <div class="flex-1 flex items-center gap-4 columns-6">
          <img
            :src="product.image"
            alt="Product Image"
            class="w-[75px] h-[75px] object-cover"
          />
          <div>
            <h3 class="text-sm font-semibold">{{ product.title }}</h3>
            <p class="text-gray-600 text-sm">{{ product.category }}</p>
            <p class="text-red-600 font-semibold">{{ product.price }}</p>
          </div>
        </div>

        <!-- Sağ Kısım -->
        <div v-if="product.colors && product.colors.length" class="flex gap-2">
          <img
            v-for="color in product.colors"
            :key="color"
            :src="color"
            alt="Color Option"
            class="w-[50px] h-[50px] object-cover border border-gray-300"
          />
        </div>
      </div>

      <!-- Alt Kısım -->
      <div class="bg-gray-100 p-6 mt-2">
        <!-- Beden Seçimi -->
        <div class="mb-4">
          <p class="text-gray-800 font-semibold mb-2">Beden Seçiniz:</p>
          <div class="flex gap-2">
            <button
              v-for="size in sizes"
              :key="size"
              class="px-4 py-2 bg-white border text-sm hover:border-black hover:border-2"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Butonlar -->
        <div class="flex items-center justify-between mt-6">
          <!-- Sol Butonlar -->
          <div class="flex gap-2">
            <button
              @click="goBack"
              class="px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Geri Dön
            </button>
            <button
              @click="goToDetails"
              class="px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Ürün Detaya Git
            </button>
          </div>

          <!-- Sepete Ekle Butonu -->
          <button
            @click="addToCart"
            class="px-32 py-3 bg-red-600 text-white hover:bg-red-700 transition"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"], // Beden seçenekleri
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    goBack() {
      this.$emit("close");
    },
    goToDetails() {
      window.location.href = this.product.detailsUrl;
    },
    addToCart() {
      alert(`${this.product.title} sepete eklendi!`);
    },
  },
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

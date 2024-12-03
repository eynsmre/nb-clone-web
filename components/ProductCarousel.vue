<template>
  <div class="carousel-container overflow-hidden relative">

    <div
      class="carousel flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
      ref="carousel"
    >

      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item w-1/4 p-2 flex-shrink-0"
      >
        <div class="border rounded-lg overflow-hidden group relative">

          <img
            :src="item.image"
            :alt="item.title"
            class="object-cover w-full h-64"
          />

          <button
            class="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-500 hover:text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.23 6.23 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>


          <div
            class="absolute bottom-2 left-0 right-0 bg-gray-50 bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              class="text-sm text-black font-semibold"
              @click.stop="openQuickView(item)"
            >
              Hızlı İncele
            </button>
          </div>
        </div>

        <div class="p-4 text-left bg-white">
          <span class="text-orange-500 text-sm font-bold">Yeni</span>
          <h3 class="text-sm font-bold">{{ item.title }}</h3>
          <p class="text-sm text-gray-500">{{ item.category }}</p>
          <p class="text-lg font-semibold">{{ item.price }}</p>
        </div>
      </div>
    </div>


    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      @click="prevSlide"
    >
      ‹
    </button>
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      @click="nextSlide"
    >
      ›
    </button>
  </div>

  <View
    v-if="showComponent"
    :product="selectedProduct"
    @close="showComponent = false"
  />
</template>

<script>
export default {
  data() {
    return {
      showComponent: false,
      selectedProduct: null,
      currentSlide: 0,
      slideWidth: 0,
      items: [
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBWNV3432-SST_1.jpg",
          title: "New Balance WNV3432 Beyaz Kadın Mont & Yelek",
          price: "3.999,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBWNJ3435-BK_1.jpg",
          title: "New Balance WNJ3435 Siyah Kadın Mont & Yelek",
          price: "5.299,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBUNJ3436-TPG_1.jpg",
          title: "New Balance MNJ3436 Yeşil Erkek Mont & Yelek",
          price: "6.299,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-GRY_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-BKW_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-BKW_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-BKW_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-BKW_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
        {
          image:
            "https://img1-newbalance.mncdn.com/mnpadding/480/480/FFFFFF/newbalance/products/NBMNP1403-BKW_3.jpg",
          title: "New Balance MNP1403 Gri Eşofman Altı",
          price: "1.686,00 ₺",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(this.calculateSlideWidth);
    window.addEventListener("resize", this.calculateSlideWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateSlideWidth);
  },
  methods: {
    openQuickView(item) {
      this.selectedProduct = item;
      this.showComponent = true;
    },

    calculateSlideWidth() {
      const carousel = this.$refs.carousel;
      if (carousel && carousel.children.length > 0) {
        this.slideWidth = carousel.children[0].offsetWidth;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.items.length - 4) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    closeComponent() {
      this.showComponent = false;
    },
  },
};
</script>

<style>
.carousel-container {
  width: 100%;
  height: auto;
}
.carousel-item img {
  height: 100%;
  object-fit: cover;
}
.carousel-item {
  background-color: transparent;
}
</style>

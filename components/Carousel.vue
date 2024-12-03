<template>
  <div class="relative w-full overflow-hidden">
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div class="w-full flex-shrink-0 relative" v-for="(image, index) in images" :key="index">
        <div class="absolute inset-0 flex items-center justify-start px-8 z-10">
          <div v-if="texts[index]" class="mx-24 text-white max-w-md space-y-4">
            <h1 class="text-4xl font-bold">{{ texts[index].title }}</h1>
            <p class="text-lg">{{ texts[index].description }}</p>
            <div v-if="texts[index].buttons" class="flex space-x-4">
              <button
                v-for="(button, idx) in texts[index].buttons"
                :key="idx"
                class=" bg-red-700 text-white py-4 px-16 hover:bg-red-800 transition"
              >
                {{ button }}
              </button>
            </div>
          </div>
        </div>
        <img :src="image" :alt="'Slide ' + (index + 1)" class="w-full object-cover" />
      </div>
    </div>
    <button
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      @click="prevSlide"
    >
      ‹
    </button>
    <button
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      @click="nextSlide"
    >
      ›
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        "https://img1-newbalance.mncdn.com/mnresize/1920/-/newbnewbalance/products/uploads/banner/mainslider/kınd_desktop.jpg",
        "https://img1-newbalance.mncdn.com/mnresize/1920/-/newbalance/products/uploads/banner/mainslider/M1080N14_desktop.jpg",
        "https://img1-newbalance.mncdn.com/mnresize/1920/-/newbalance/products/uploads/banner/mainslider/NB780_Desktop.jpg",
      ],
      texts: [
        {
          title: "İndirim",
          description: "İndirimin favorileriyle stilini yenilemenin tam zamanı.",
        },
        {
          title: "Fresh Foam X 1080v14",
          description: "Rahat, nefes alabilir, çok yönlü.",
          buttons: ["Erkek", "Kadın"],
        },
        {
          title: "Yeni Koleksiyon",
          description: "Her adımda yeni bir his.",
        },
      ],
    };
  },
  methods: {
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>


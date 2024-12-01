<template>
  <div class="carousel">
    <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="carousel-slide" v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="'Slide ' + (index + 1)">
      </div>
    </div>
    <button class="carousel-button prev" @click="prevSlide">‹</button>
    <button class="carousel-button next" @click="nextSlide">›</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        'https://img1-newbalance.mncdn.com/mnresize/1920/-/newbnewbalance/products/uploads/banner/mainslider/kınd_desktop.jpg',
        'https://img1-newbalance.mncdn.com/mnresize/1920/-/newbalance/products/uploads/banner/mainslider/NB780_Desktop.jpg',
        'https://img1-newbalance.mncdn.com/mnresize/1920/-/newbalance/products/uploads/banner/mainslider/M1080N14_desktop.jpg' // Replace with the actual path of your uploaded image
      ]
    }
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
    }
  }
}
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-slide img {
  width: 100%;
  display: block;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}
</style>

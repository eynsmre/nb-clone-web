<template>
  <div>
    <div>
      <button
        class=""
        v-for="component in components"
        :key="component.name"
        @click="showComponent(component.name)"
      >
        {{ component.label }}
      </button>
    </div>

    <div>
      <ComponentA v-if="currentComponent === 'ComponentA'" />
      <ComponentC v-if="currentComponent === 'ComponentC'" />
      <ComponentD v-if="currentComponent === 'ComponentD'" />
      <ComponentE v-if="currentComponent === 'ComponentE'" />
      <ProductCarousel v-if="currentComponent === 'ProductCarousel'" />
      <ProductCard v-if="currentComponent === 'ProductCard'" />
      <TheFooter v-if="currentComponent === 'TheFooter'"/>
      <Carousel v-if="currentComponent === 'Carousel'" />
    </div>
  </div>
</template>

<script>
import ComponentA from "~/components/ComponentA.vue";
import ComponentC from "~/components/ComponentC.vue";
import ComponentD from "~/components/ComponentD.vue";
import ComponentE from "~/components/ComponentE.vue";
import ProductCarousel from "~/components/ProductCarousel.vue";
import ProductCard from "~/components/ProductCard.vue";
import TheFooter from "~/components/TheFooter.vue";
import Carousel from "~/components/Carousel.vue";

export default {
  components: {
    ComponentA,
    ComponentC,
    ComponentD,
    ComponentE,
    ProductCarousel,
    ProductCard,
    TheFooter,
    Carousel,
  },
  data() {
    return {
      currentComponent: "",
      components: [
        { name: "ComponentA", label: "Component 1-2" },
        { name: "ComponentC", label: "Component 3" },
        { name: "ComponentD", label: "Component 4" },
        { name: "ComponentE", label: "Component 5" },
        { name: "Carousel", label: "Component 6" },
        { name: "ProductCard", label: "Component 7" },
        { name: "ProductCarousel", label: "Component 8-9" },
        { name: "TheFooter", label: "Component 10" },
      ],
    };
  },
  methods: {
    showComponent(componentName) {
      this.currentComponent = componentName;
    },
  },
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>

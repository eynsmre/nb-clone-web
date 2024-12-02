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
      <ComponentF v-if="currentComponent === 'ComponentF'" />
      <ComponentH v-if="currentComponent === 'ComponentH'" />
      <ComponentI v-if="currentComponent === 'ComponentI'" />
      <ComponentJ v-if="currentComponent === 'ComponentJ'" />
    </div>
  </div>
</template>

<script>
import ComponentA from "~/components/ComponentA.vue";
import ComponentC from "~/components/ComponentC.vue";
import ComponentD from "~/components/ComponentD.vue";
import ComponentE from "~/components/ComponentE.vue";
import ComponentF from "~/components/ComponentF.vue";
import ComponentH from "~/components/ComponentH.vue";
import ComponentI from "~/components/ComponentI.vue";
import ComponentJ from "~/components/ComponentJ.vue";

export default {
  components: {
    ComponentA,
    ComponentC,
    ComponentD,
    ComponentE,
    ComponentF,
    ComponentH,
    ComponentI,
    ComponentJ,
  },
  data() {
    return {
      currentComponent: "",
      components: [
        { name: "ComponentA", label: "Buton1" },
        { name: "ComponentC", label: "Buton3" },
        { name: "ComponentD", label: "Buton4" },
        { name: "ComponentE", label: "Buton5" },
        { name: "ComponentF", label: "Buton6" },
        { name: "ComponentH", label: "Buton8" },
        { name: "ComponentI", label: "Buton9" },
        { name: "ComponentJ", label: "Buton10" },
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
/* İsteğinize göre stil ekleyebilirsiniz */
button {
  margin: 5px;
}
</style>

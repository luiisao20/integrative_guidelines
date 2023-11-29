<template>
  <Navbar
    v-if="route.name !== 'Login'"
  />
  <main @click="show = false" class="bg-background w-1/2 mx-auto">
    <RouterView />
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import Navbar from './general_components/Navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <main class="bg-background w-1/2 mx-auto">
    <RouterView />
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

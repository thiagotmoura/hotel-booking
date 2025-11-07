<script setup lang="ts">
import { onMounted } from 'vue'
import { navigateTo } from 'nuxt/app'

onMounted(() => {
  navigateTo('/')
})
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto text-center">
    <h1 class="text-2xl font-bold mb-2">Página removida</h1>
    <p class="text-gray-600">A área administrativa não está mais disponível. Você será redirecionado para a página inicial.</p>
  </div>
</template>

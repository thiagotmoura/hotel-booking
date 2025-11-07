<template>
  <BaseCard as="article" padding="lg" class="text-center">
    <div class="text-5xl mb-4"><slot name="icon">🏷️</slot></div>
    <h3 class="text-xl font-bold text-gray-800 mb-2">
      <slot name="title" />
    </h3>
    <p class="text-gray-600"><slot /></p>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue'
</script>

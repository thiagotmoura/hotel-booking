<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
    :class="colorClass"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'ghost'
}>(), {
  type: 'button',
  color: 'primary'
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300'
    case 'ghost':
      return 'px-3 py-2 text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
    default:
      return 'px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.01] focus:ring-blue-400'
  }
})
</script>

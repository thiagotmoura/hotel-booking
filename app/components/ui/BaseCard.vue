<template>
  <component
    :is="as"
    class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
    :class="[paddingClass]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  as?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  as: 'div',
  padding: 'md'
})

const paddingClass = computed(() => ({
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}[props.padding]))
</script>

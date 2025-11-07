<template>
  <section :aria-label="ariaLabel" class="w-full" :class="[container ? 'max-w-7xl mx-auto px-4' : '', marginClass]">
    <header v-if="$slots.title || title" class="mb-6 text-center">
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900">
        <slot name="title">{{ title }}</slot>
      </h2>
      <p v-if="$slots.subtitle || subtitle" class="text-gray-600 mt-2">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  ariaLabel?: string
  container?: boolean
  margin?: 'none' | 'sm' | 'md' | 'lg'
}>(), {
  container: true,
  margin: 'md'
})

const marginClass = computed(() => ({
  none: '', sm: 'my-4', md: 'my-8', lg: 'my-12'
}[props.margin]))
</script>

<template>
  <div class="relative w-full">
    <img :src="images[current]" alt="image" class="w-full h-48 object-cover rounded" v-if="images && images.length" />
    <div v-if="images && images.length > 1" class="absolute inset-0 flex items-center justify-between px-2">
      <button @click="prev" class="bg-white/60 rounded-full p-1">◀</button>
      <button @click="next" class="bg-white/60 rounded-full p-1">▶</button>
    </div>
    <div v-if="images && images.length > 1" class="flex gap-1 mt-2">
      <button v-for="(img, idx) in images" :key="idx" @click="go(idx)" :class="['w-10 h-10 rounded bg-gray-200 overflow-hidden', { 'ring-2 ring-blue-500': idx === current }]">
        <img :src="img" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
const props = defineProps<{ images: string[] }>()
const current = ref(0)

function prev() {
  current.value = (current.value - 1 + (props.images?.length || 1)) % (props.images?.length || 1)
}
function next() {
  current.value = (current.value + 1) % (props.images?.length || 1)
}
function go(i: number) {
  current.value = i
}

watch(() => props.images, () => { current.value = 0 })

let timer: any
onMounted(() => {
  timer = setInterval(() => {
    if (props.images && props.images.length > 1) next()
  }, 5000)
})
</script>

<style scoped>
.ring-2 { box-shadow: 0 0 0 2px rgba(59,130,246,0.5); }
</style>

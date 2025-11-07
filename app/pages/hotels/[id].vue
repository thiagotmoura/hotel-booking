<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useFetch } from 'nuxt/app'

interface Hotel {
  id: number
  name: string
  price: number
  rating: number
}

const route = useRoute()
const id = route.params.id
const reserved = ref(false)

console.log('ID do hotel:', id)

const { data: hotel, pending } = await useFetch<Hotel>('/api/hotels/' + id)

function reserveHotel() {
  reserved.value = true
}
</script>

<template>
  <div v-if="pending" class="p-8 max-w-xl mx-auto text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
    <p class="mt-4 text-gray-600">Carregando detalhes do hotel...</p>
  </div>

  <div v-else-if="hotel" class="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-green-100 mt-10">
    <h1 class="text-4xl font-extrabold mb-4 text-green-700 drop-shadow text-center">{{ hotel.name }}</h1>
    <div class="flex items-center justify-between mb-4">
      <span class="text-gray-700">Preço:</span>
      <span class="font-semibold text-green-600 text-lg">R$ {{ hotel.price }}</span>
    </div>
    <div class="flex items-center justify-between mb-8">
      <span class="text-gray-700">Nota:</span>
      <span class="text-yellow-500 text-xl">{{ hotel.rating }} <span aria-label="star" role="img">⭐</span></span>
    </div>
    <button @click="reserveHotel" class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow transition-all duration-200" :disabled="reserved">
      {{ reserved ? 'Reservado!' : 'Reservar agora' }}
    </button>
  </div>

  <div v-else class="p-8 max-w-xl mx-auto text-center">
    <p class="text-red-500 font-semibold">Hotel não encontrado</p>
  </div>
</template>

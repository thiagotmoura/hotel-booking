<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useHead } from 'nuxt/app'
import HotelCard from '../../components/HotelCard.vue'
import HotelSearch from '../../components/HotelSearch.vue'
import Section from '../../components/ui/Section.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue'
import { useSearchStore } from '../../stores/search'
import { useHotels } from '../../../composables/useHotels'

const searchStore = useSearchStore()

const results = ref<any[]>([])
const loading = ref(false)
const error = ref('')

useHead({
  title: 'Buscar Hotéis - Hotel Booking',
  meta: [
    { name: 'description', content: 'Busque e compare hotéis com filtros avançados. Encontre a hospedagem ideal com as melhores tarifas e comodidades.' },
    { name: 'robots', content: 'index, follow' }
  ]
})

const route = useRoute()
onMounted(() => {
  const q = route.query || {}
  if (q.destination) searchStore.setSearch({ destination: String(q.destination) })
  if (q.destinationId) searchStore.setSearch({ destinationId: Number(q.destinationId) })
  if (q.guests) searchStore.setSearch({ guests: Number(q.guests) })
  if (q.startDate) searchStore.setSearch({ checkIn: String(q.startDate) })
  if (q.endDate) searchStore.setSearch({ checkOut: String(q.endDate) })
  if (q.rooms) searchStore.setSearch({ rooms: Number(q.rooms) })

  if (searchStore.search.destination && searchStore.search.checkIn && searchStore.search.checkOut && searchStore.search.guests) {
    setTimeout(() => search(), 50)
  }
})

function handleInlineSearch(payload: any) {
  searchStore.setSearch(payload)
  search()
}

const sortBy = ref<'price' | 'name' | 'rating'>('name')
const sortDir = ref<'asc' | 'desc'>('asc')

async function search() {
  error.value = ''
  const { destination, checkIn: startDate, checkOut: endDate, guests } = searchStore.search
  
  if (!destination || !startDate || !endDate || !guests) {
    error.value = 'Preencha destino, datas e número de hóspedes (datas obrigatórias).'
    return
  }
  
  loading.value = true
  try {
    const api = useHotels()
    const { data, error: fetchError } = await api.search({
      destination,
      guests,
      startDate,
      endDate,
      sortBy: sortBy.value,
      sortDir: sortDir.value
    })
    if (fetchError?.value) throw fetchError.value
    results.value = data
  } catch (e: any) {
    error.value = e?.message || 'Erro ao buscar hotéis'
  } finally {
    loading.value = false
  }
}

function changeSort(by: typeof sortBy.value) {
  if (sortBy.value === by) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = by
    sortDir.value = 'asc'
  }
  if (results.value.length) search()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <Section :container="false" margin="sm" aria-label="Cabeçalho da página">
      <header class="mb-6">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Buscar Hotéis</h1>
        <p class="text-lg text-gray-600">Encontre a hospedagem perfeita para sua viagem</p>
      </header>
    </Section>

    <section aria-label="Formulário de busca" class="mb-8">
      <HotelSearch mode="inline" @search="handleInlineSearch" />
      
      <div v-if="results.length > 0" class="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 bg-white rounded-lg shadow-sm">
        <div class="text-sm text-gray-600">
          <strong>{{ results.length }}</strong> {{ results.length === 1 ? 'hotel encontrado' : 'hotéis encontrados' }}
        </div>
        <div class="flex items-center gap-3">
          <label for="sortBy" class="text-sm font-medium text-gray-700">Ordenar por:</label>
          <select 
            id="sortBy"
            v-model="sortBy" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            @change="search"
          >
            <option value="name">Nome</option>
            <option value="price">Preço (mínimo)</option>
            <option value="rating">Avaliação</option>
          </select>
          <button 
            @click="() => { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; search() }" 
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            :aria-label="`Ordenar ${sortDir === 'asc' ? 'decrescente' : 'crescente'}`"
          >
            {{ sortDir === 'asc' ? '↑ Crescente' : '↓ Decrescente' }}
          </button>
        </div>
      </div>
    </section>

    <div v-if="error" role="alert" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
      <p class="text-red-700 font-medium">{{ error }}</p>
    </div>

    <LoadingSpinner v-if="loading">Buscando hotéis...</LoadingSpinner>

    <EmptyState v-if="!loading && results.length === 0">
      <template #icon>🏨</template>
      <template #title>Nenhum resultado encontrado</template>
      Tente ajustar seus filtros de busca para encontrar mais opções
    </EmptyState>

    <section v-if="results.length > 0" aria-label="Resultados da busca">
      <div class="grid grid-cols-1 gap-8">
        <HotelCard
          v-for="hotel in results"
          :key="hotel.id"
          :hotel="hotel"
          :startDate="searchStore.search.checkIn"
          :endDate="searchStore.search.checkOut"
          :guests="searchStore.search.guests"
        />
      </div>
    </section>
  </div>
</template>
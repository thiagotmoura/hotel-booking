<template>
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
    <form @submit.prevent="handleSearch" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div class="lg:col-span-2 relative">
          <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destino</label>
          <input
            id="destination"
            v-model="search.destination"
            type="text"
            placeholder="Digite a cidade ou aeroporto"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autocomplete="off"
            @focus="showDestinations = true"
            required
          />
          
          <div
            v-if="showDestinations && (destinations.length > 0 || isSearching)"
            class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            <div v-if="isSearching" class="p-4 text-center text-gray-500">
              <div class="animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
              Buscando...
            </div>
            <template v-else>
              <button
                v-for="dest in destinations"
                :key="dest.id"
                type="button"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                @click="selectDestination(dest)"
              >
                {{ dest.label }}
                <span class="text-gray-400 text-sm ml-2">({{ dest.airports.join(', ') }})</span>
              </button>
            </template>
          </div>
        </div>

        <div>
          <label for="checkIn" class="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input
            id="checkIn"
            v-model="search.checkIn"
            type="date"
            :min="today"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label for="checkOut" class="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input
            id="checkOut"
            v-model="search.checkOut"
            type="date"
            :min="search.checkIn || today"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label for="rooms" class="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
          <select
            id="rooms"
            v-model="search.rooms"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} {{ n === 1 ? 'quarto' : 'quartos' }}</option>
          </select>
        </div>

        <div>
          <label for="guests" class="block text-sm font-medium text-gray-700 mb-1">Hóspedes</label>
          <select
            id="guests"
            v-model="search.guests"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ n === 1 ? 'hóspede' : 'hóspedes' }}</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Buscar Hotéis
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '../stores/search'
import { navigateTo } from 'nuxt/app'
import type { SearchState } from '../stores/search'

interface Destination {
  id: number
  label: string
  city: string
  state: string
  country: string
  airports: string[]
}

const props = defineProps<{ mode?: 'navigate' | 'inline' }>()

const searchStore = useSearchStore()
const { search } = storeToRefs(searchStore) as unknown as { search: Ref<SearchState> }

const destinations = ref<Destination[]>([])
const isSearching = ref(false)
const showDestinations = ref(false)

function debounceFn<T extends (...args: any[]) => any>(fn: T, wait = 300) {
  let t: any
  return (...args: Parameters<T>) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

const searchDestinations = debounceFn(async (query: string) => {
  if (query.length < 3) {
    destinations.value = []
    return
  }

  isSearching.value = true
  try {
    const response = await fetch(`/api/destinations/search?q=${encodeURIComponent(query)}`)
    destinations.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar destinos:', error)
    destinations.value = []
  } finally {
    isSearching.value = false
  }
}, 300)

watch(() => search.value?.destination || '', (newQuery) => {
  if (newQuery) {
    searchDestinations(newQuery)
    showDestinations.value = true
  } else {
    destinations.value = []
    showDestinations.value = false
  }
})

function selectDestination(destination: Destination) {
  search.value.destination = destination.label
  search.value.destinationId = destination.id
  showDestinations.value = false
}

import { markRaw } from 'vue'

const emit = defineEmits<{
  (e: 'search', payload: typeof search.value): void
}>()

function handleSearch() {
  if (!search.value.destination || search.value.destination.trim().length < 2) {
    alert('Informe um destino')
    return
  }

  if (props.mode === 'inline') {
    emit('search', markRaw(search.value))
    return
  }

  const params = new URLSearchParams()
  params.set('destination', search.value.destination)
  if (search.value.destinationId) params.set('destinationId', String(search.value.destinationId))
  params.set('guests', String(search.value.guests))
  params.set('startDate', search.value.checkIn)
  params.set('endDate', search.value.checkOut)
  params.set('rooms', String(search.value.rooms))

  navigateTo(`/hotels?${params.toString()}`)
}

const today = new Date().toISOString().split('T')[0]
</script>
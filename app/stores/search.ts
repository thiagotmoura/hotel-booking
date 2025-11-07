import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SearchState {
  destination: string
  destinationId: number | null
  checkIn: string
  checkOut: string
  rooms: number
  guests: number
}

export const useSearchStore = defineStore('search', () => {
  const search = ref<SearchState>({
    destination: '',
    destinationId: null,
    checkIn: '',
    checkOut: '',
    rooms: 1,
    guests: 1
  })

  function setSearch(params: Partial<SearchState>) {
    search.value = { ...search.value, ...params }
  }

  function clearSearch() {
    search.value = {
      destination: '',
      destinationId: null,
      checkIn: '',
      checkOut: '',
      rooms: 1,
      guests: 1
    }
  }

  return {
    search,
    setSearch,
    clearSearch
  }
})
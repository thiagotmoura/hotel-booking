import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface RoomForComparison {
  roomId: number
  roomName: string
  hotelId: number
  hotelName: string
  category: string
  price: number
  capacity: number
  beds: { type: string; quantity: number }[]
  amenities: { icon: string; name: string }[]
  images: string[]
  description: string
}

export const useComparisonStore = defineStore('comparison', () => {
  const rooms = ref<RoomForComparison[]>([])
  const maxRooms = 3

  const canAddMore = computed(() => rooms.value.length < maxRooms)
  const count = computed(() => rooms.value.length)

  function addRoom(room: RoomForComparison) {
    const exists = rooms.value.some(r => r.roomId === room.roomId && r.hotelId === room.hotelId)
    if (exists) return false

    if (!canAddMore.value) return false

    rooms.value.push(room)
    return true
  }

  function removeRoom(roomId: number, hotelId: number) {
    rooms.value = rooms.value.filter(r => !(r.roomId === roomId && r.hotelId === hotelId))
  }

  function clearAll() {
    rooms.value = []
  }

  function isInComparison(roomId: number, hotelId: number) {
    return rooms.value.some(r => r.roomId === roomId && r.hotelId === hotelId)
  }

  return {
    rooms,
    maxRooms,
    canAddMore,
    count,
    addRoom,
    removeRoom,
    clearAll,
    isInComparison
  }
})

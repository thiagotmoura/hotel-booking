<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-blue-700">Comparação de Quartos</h1>
        <p class="text-gray-600 mt-2">Compare até {{ comparisonStore.maxRooms }} quartos lado a lado</p>
      </div>
      <div class="flex gap-3">
        <button
          @click="comparisonStore.clearAll()"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Limpar Tudo
        </button>
        <button
          @click="navigateTo('/hotels')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar para Busca
        </button>
      </div>
    </div>

    <div v-if="comparisonStore.count === 0" class="text-center py-16">
      <div class="text-6xl mb-4">🏨</div>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Nenhum quarto selecionado</h2>
      <p class="text-gray-600 mb-6">Adicione quartos à comparação para visualizá-los lado a lado</p>
      <button
        @click="navigateTo('/hotels')"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Buscar Quartos
      </button>
    </div>

    <div v-else>
      <div class="grid gap-6" :class="`grid-cols-${comparisonStore.count}`">
        <div v-for="room in comparisonStore.rooms" :key="`${room.hotelId}-${room.roomId}`" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="relative h-48">
            <img
              v-if="room.images && room.images[0]"
              :src="room.images[0]"
              :alt="room.roomName"
              class="w-full h-full object-cover"
            />
            <button
              @click="comparisonStore.removeRoom(room.roomId, room.hotelId)"
              class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-1">{{ room.roomName }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ room.hotelName }}</p>
            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
              {{ room.category }}
            </span>
            <p class="text-2xl font-bold text-blue-600 mb-4">R$ {{ room.price }}</p>

            <div class="space-y-3 border-t pt-4">
              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Descrição</h4>
                <p class="text-sm text-gray-700">{{ room.description }}</p>
              </div>

              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Capacidade</h4>
                <p class="text-sm text-gray-700">{{ room.capacity }} hóspedes</p>
              </div>

              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Camas</h4>
                <div class="space-y-1">
                  <p v-for="(bed, idx) in room.beds" :key="idx" class="text-sm text-gray-700">
                    {{ bed.quantity }}x {{ formatBedType(bed.type) }}
                  </p>
                </div>
              </div>

              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase mb-2">Comodidades</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(amenity, idx) in room.amenities"
                    :key="idx"
                    class="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <span>{{ amenity.icon }}</span>
                    <span>{{ amenity.name }}</span>
                  </span>
                </div>
              </div>

              <div>
                <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Preço/Benefícios</h4>
                <div class="space-y-1">
                  <p class="text-sm text-gray-700">R$ {{ (room.price / room.capacity).toFixed(2) }} por hóspede</p>
                  <p class="text-sm text-gray-700">{{ room.amenities.length }} comodidades</p>
                </div>
              </div>
            </div>

            <button
              @click="reserve(room)"
              class="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Reservar este quarto
            </button>
          </div>
        </div>
      </div>

      <div v-if="comparisonStore.count > 1" class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4">Resumo Comparativo</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded">
            <div class="text-sm text-gray-600 mb-1">Melhor Preço</div>
            <div class="text-lg font-bold text-blue-600">R$ {{ minPrice }}</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded">
            <div class="text-sm text-gray-600 mb-1">Maior Capacidade</div>
            <div class="text-lg font-bold text-green-600">{{ maxCapacity }} hóspedes</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded">
            <div class="text-sm text-gray-600 mb-1">Mais Comodidades</div>
            <div class="text-lg font-bold text-purple-600">{{ maxAmenities }} itens</div>
          </div>
          <div class="text-center p-4 bg-orange-50 rounded">
            <div class="text-sm text-gray-600 mb-1">Melhor Custo/Hóspede</div>
            <div class="text-lg font-bold text-orange-600">R$ {{ bestValuePerGuest }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useComparisonStore } from '../stores/comparison'
import { useBookingStore } from '../stores/booking'
import { useSearchStore } from '../stores/search'

const comparisonStore = useComparisonStore()
const bookingStore = useBookingStore()
const searchStore = useSearchStore()

const minPrice = computed(() => {
  if (comparisonStore.rooms.length === 0) return 0
  return Math.min(...comparisonStore.rooms.map((r: any) => r.price))
})

const maxCapacity = computed(() => {
  if (comparisonStore.rooms.length === 0) return 0
  return Math.max(...comparisonStore.rooms.map((r: any) => r.capacity))
})

const maxAmenities = computed(() => {
  if (comparisonStore.rooms.length === 0) return 0
  return Math.max(...comparisonStore.rooms.map((r: any) => r.amenities.length))
})

const bestValuePerGuest = computed(() => {
  if (comparisonStore.rooms.length === 0) return 0
  const values = comparisonStore.rooms.map((r: any) => r.price / r.capacity)
  return Math.min(...values).toFixed(2)
})

function formatBedType(type: string): string {
  const types: Record<string, string> = {
    'king': 'King',
    'queen': 'Queen',
    'single': 'Solteiro',
    'double': 'Casal',
    'sofa_bed': 'Sofá-cama'
  }
  return types[type] || type
}

function calculateNights() {
  if (!searchStore.search.checkIn || !searchStore.search.checkOut) return 1
  const start = new Date(searchStore.search.checkIn)
  const end = new Date(searchStore.search.checkOut)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function reserve(room: any) {
  const nights = calculateNights()
  const totalPrice = room.price * nights

  bookingStore.setCurrentBooking({
    hotelId: room.hotelId,
    hotelName: room.hotelName,
    roomId: room.roomId,
    roomName: room.roomName,
    roomPrice: room.price,
    checkIn: searchStore.search.checkIn || '',
    checkOut: searchStore.search.checkOut || '',
    guests: searchStore.search.guests || 1,
    totalPrice: totalPrice
  })

  navigateTo('/booking')
}
</script>

<style scoped>
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

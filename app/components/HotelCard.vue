<template>
  <BaseCard as="article" padding="none" class="hover:shadow-2xl overflow-hidden">
    <div class="relative">
      <ImageCarousel :images="hotel.images || [hotel.mainImage]" />
      <div class="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1">
        <span>⭐</span>
        <span>{{ hotel.rating }}</span>
      </div>
    </div>

    <div class="p-6">
      <header>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ hotel.name }}</h2>
        <p class="text-gray-600 mb-4">{{ hotel.description }}</p>
        
        <address class="not-italic text-sm text-gray-500 mb-4" v-if="hotel.address">
          📍 {{ hotel.address.neighborhood }}, {{ hotel.address.city }} - {{ hotel.address.state }}
        </address>
      </header>

      <section class="mt-6" v-if="hotel.availableRooms && hotel.availableRooms.length > 0">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          Quartos Disponíveis ({{ hotel.availableRooms.length }})
        </h3>
        
        <div class="space-y-4">
          <article 
            v-for="room in hotel.availableRooms" 
            :key="room.id" 
            class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full md:w-48 flex-shrink-0">
                <ImageCarousel :images="room.images || []" />
              </div>
              
              <div class="flex-1 min-w-0">
                <header class="mb-3">
                  <h4 class="text-xl font-bold text-gray-900 mb-1">{{ room.name }}</h4>
                  <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {{ room.category }}
                  </span>
                </header>
                
                <p class="text-gray-600 text-sm mb-3">{{ room.description }}</p>
                
                <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div class="flex items-center gap-2 text-gray-700">
                    <span>👥</span>
                    <span>{{ room.capacity }} hóspedes</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-700">
                    <span>🛏️</span>
                    <span v-for="(b, idx) in room.beds" :key="idx" class="mr-1">
                      {{ b.quantity }}x {{ formatBedType(b.type) }}
                    </span>
                  </div>
                </div>
                
                <div class="flex flex-wrap gap-2 mb-3">
                  <span 
                    v-for="(a, i) in room.amenities.slice(0, 6)" 
                    :key="i" 
                    class="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
                    :title="a.description"
                  >
                    <span>{{ a.icon }}</span>
                    <span>{{ a.name }}</span>
                  </span>
                  <span 
                    v-if="room.amenities.length > 6" 
                    class="text-xs text-gray-500 px-2 py-1"
                  >
                    +{{ room.amenities.length - 6 }} comodidades
                  </span>
                </div>
                
                <div class="mt-4">
                  <div class="text-3xl font-bold text-blue-600">R$ {{ room.price }}</div>
                  <div class="text-sm text-gray-500">por noite</div>
                </div>
              </div>
              
              <div class="w-full md:w-44 flex flex-col gap-2 flex-shrink-0">
                <button
                  @click="toggleComparison(room)"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all text-sm font-semibold',
                    isInComparison(room.id) 
                      ? 'bg-green-50 border-green-500 text-green-700 hover:bg-green-100' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                  ]"
                  :disabled="!canAddToComparison(room.id)"
                  :aria-label="`${isInComparison(room.id) ? 'Remover da' : 'Adicionar à'} comparação`"
                >
                  {{ isInComparison(room.id) ? '✓ Comparando' : '+ Comparar' }}
                </button>
                <button 
                  @click="reserve(room)" 
                  class="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full font-semibold shadow-md hover:shadow-lg"
                  :aria-label="`Reservar ${room.name}`"
                >
                  Reservar
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </BaseCard>
</template>
<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import ImageCarousel from './ImageCarousel.vue'
import BaseCard from './ui/BaseCard.vue'
import { useComparisonStore } from '../stores/comparison'
import { useBookingStore } from '../stores/booking'
import type { RoomForComparison } from '../stores/comparison'

const props = defineProps<{ hotel: any; startDate?: string; endDate?: string; guests?: number }>()
const comparisonStore = useComparisonStore()
const bookingStore = useBookingStore()

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
  if (!props.startDate || !props.endDate) return 1
  const start = new Date(props.startDate)
  const end = new Date(props.endDate)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function reserve(room: any) {
  const nights = calculateNights()
  const totalPrice = room.price * nights

  bookingStore.setCurrentBooking({
    hotelId: props.hotel.id,
    hotelName: props.hotel.name,
    roomId: room.id,
    roomName: room.name,
    roomPrice: room.price,
    checkIn: props.startDate || '',
    checkOut: props.endDate || '',
    guests: props.guests || 1,
    totalPrice: totalPrice
  })

  navigateTo('/booking')
}

function isInComparison(roomId: number) {
  return comparisonStore.isInComparison(roomId, props.hotel.id)
}

function canAddToComparison(roomId: number) {
  return isInComparison(roomId) || comparisonStore.canAddMore
}

function toggleComparison(room: any) {
  if (isInComparison(room.id)) {
    comparisonStore.removeRoom(room.id, props.hotel.id)
  } else {
    const roomData: RoomForComparison = {
      roomId: room.id,
      roomName: room.name,
      hotelId: props.hotel.id,
      hotelName: props.hotel.name,
      category: room.category,
      price: room.price,
      capacity: room.capacity,
      beds: room.beds,
      amenities: room.amenities,
      images: room.images,
      description: room.description
    }
    
    const added = comparisonStore.addRoom(roomData)
    if (!added) {
      alert(`Você já atingiu o limite de ${comparisonStore.maxRooms} quartos para comparação`)
    }
  }
}
</script>

<style scoped>
.object-cover { object-fit: cover; }
</style>

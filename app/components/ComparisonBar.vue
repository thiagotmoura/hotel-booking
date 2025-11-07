<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div v-if="comparisonStore.count > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50">
        <div class="max-w-6xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <h3 class="font-bold text-lg">Comparar Quartos</h3>
              <span class="text-sm text-gray-600">{{ comparisonStore.count }} de {{ comparisonStore.maxRooms }} selecionados</span>
            </div>
            <div class="flex gap-2">
              <button
                @click="navigateTo('/compare')"
                :disabled="comparisonStore.count < 2"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
              >
                Comparar ({{ comparisonStore.count }})
              </button>
              <button
                @click="comparisonStore.clearAll()"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="room in comparisonStore.rooms"
              :key="`${room.hotelId}-${room.roomId}`"
              class="bg-gray-50 rounded-lg p-3 flex items-start gap-3 relative"
            >
              <img
                v-if="room.images && room.images[0]"
                :src="room.images[0]"
                :alt="room.roomName"
                class="w-20 h-20 object-cover rounded"
              />
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-sm truncate">{{ room.roomName }}</h4>
                <p class="text-xs text-gray-600 truncate">{{ room.hotelName }}</p>
                <p class="text-sm font-bold text-blue-600 mt-1">R$ {{ room.price }}</p>
              </div>
              <button
                @click="comparisonStore.removeRoom(room.roomId, room.hotelId)"
                class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            
            <div
              v-for="i in (comparisonStore.maxRooms - comparisonStore.count)"
              :key="`empty-${i}`"
              class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center text-gray-400 text-sm"
            >
              Selecione mais quartos
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useComparisonStore } from '../stores/comparison'
import { navigateTo } from 'nuxt/app'

const comparisonStore = useComparisonStore()
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>

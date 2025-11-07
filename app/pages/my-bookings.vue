<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Minhas Reservas</h1>
      <p class="text-gray-600">Gerencie todas as suas reservas de hotel</p>
    </header>

    <div v-if="bookingStore.bookings.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">📋</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Nenhuma reserva encontrada</h2>
      <p class="text-gray-600 mb-6">Você ainda não fez nenhuma reserva</p>
      <NuxtLink
        to="/hotels"
        class="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
      >
        Buscar Hotéis
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <article
        v-for="booking in sortedBookings"
        :key="booking.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <div class="flex flex-col md:flex-row">
          <div :class="[
            'md:w-2 flex-shrink-0',
            booking.status === 'confirmed' ? 'bg-green-500' : booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
          ]"></div>

          <div class="flex-1 p-6">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-bold uppercase',
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ statusText[booking.status] }}
                  </span>
                  <span class="text-sm text-gray-500">#{{ booking.id }}</span>
                </div>

                <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ booking.hotelName }}</h2>
                <p class="text-gray-600 mb-4">{{ booking.roomName }}</p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div class="text-gray-500 mb-1">Check-in</div>
                    <div class="font-medium">{{ formatDate(booking.checkIn) }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500 mb-1">Check-out</div>
                    <div class="font-medium">{{ formatDate(booking.checkOut) }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500 mb-1">Hóspedes</div>
                    <div class="font-medium">{{ booking.guests }}</div>
                  </div>
                  <div>
                    <div class="text-gray-500 mb-1">Total</div>
                    <div class="font-bold text-blue-600">R$ {{ booking.totalPrice }}</div>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t">
                  <div class="text-sm text-gray-600">
                    <p><strong>Hóspede:</strong> {{ booking.customerName }}</p>
                    <p><strong>E-mail:</strong> {{ booking.customerEmail }}</p>
                    <p><strong>Telefone:</strong> {{ booking.customerPhone }}</p>
                  </div>
                </div>
              </div>

              <div class="flex md:flex-col gap-2">
                <button
                  v-if="booking.status === 'confirmed'"
                  @click="handleCancel(booking.id!)"
                  class="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm"
                >
                  Cancelar
                </button>
                <button
                  class="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm"
                >
                  Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from 'nuxt/app'
import { useBookingStore } from '../stores/booking'
import { useNotificationStore } from '../stores/notification'
import type { BookingData } from '../stores/booking'

const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

useHead({
  title: 'Minhas Reservas - Hotel Booking',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

const statusText: Record<BookingData['status'], string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada'
}

const sortedBookings = computed(() => {
  return [...bookingStore.bookings].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

function handleCancel(bookingId: number) {
  if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
    bookingStore.cancelBooking(bookingId)
    notificationStore.warning(
      'Reserva Cancelada',
      'Sua reserva foi cancelada com sucesso.'
    )
  }
}
</script>

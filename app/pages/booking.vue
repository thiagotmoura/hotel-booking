<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div v-if="!bookingStore.currentBooking" class="text-center py-20">
      <div class="text-6xl mb-4">📋</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Nenhuma reserva selecionada</h2>
      <NuxtLink to="/hotels" class="text-blue-600 hover:text-blue-700 font-medium">
        Voltar para busca de hotéis →
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <header>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Reserva</h1>
          <p class="text-gray-600">Preencha seus dados para confirmar a reserva</p>
        </header>

        <form @submit.prevent="submitBooking" class="space-y-6">
          <section class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👤</span>
              Dados Pessoais
            </h2>
            
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  id="name"
                  v-model="formData.customerName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  id="email"
                  v-model="formData.customerEmail"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="joao@email.com"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  id="phone"
                  v-model="formData.customerPhone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💳</span>
              Dados de Pagamento
            </h2>
            
            <div class="space-y-4">
              <div>
                <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">
                  Número do Cartão *
                </label>
                <input
                  id="cardNumber"
                  v-model="formData.cardNumber"
                  type="text"
                  required
                  maxlength="19"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0000 0000 0000 0000"
                  @input="formatCardNumber"
                />
              </div>

              <div>
                <label for="cardHolder" class="block text-sm font-medium text-gray-700 mb-1">
                  Nome no Cartão *
                </label>
                <input
                  id="cardHolder"
                  v-model="formData.cardHolder"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="JOÃO SILVA"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="cardExpiry" class="block text-sm font-medium text-gray-700 mb-1">
                    Validade *
                  </label>
                  <input
                    id="cardExpiry"
                    v-model="formData.cardExpiry"
                    type="text"
                    required
                    maxlength="5"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/AA"
                    @input="formatExpiry"
                  />
                </div>

                <div>
                  <label for="cardCVV" class="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    id="cardCVV"
                    v-model="formData.cardCVV"
                    type="text"
                    required
                    maxlength="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl shadow-lg p-6">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="termsAccepted"
                type="checkbox"
                required
                class="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-gray-700">
                Aceito os <a href="#" class="text-blue-600 hover:underline">termos e condições</a> 
                e a <a href="#" class="text-blue-600 hover:underline">política de cancelamento</a>
              </span>
            </label>
          </section>

          <div class="flex gap-4">
            <button
              type="button"
              @click="$router.back()"
              class="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Voltar
            </button>
            <button
              type="submit"
              :disabled="!termsAccepted || isProcessing"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isProcessing ? 'Processando...' : 'Confirmar Reserva' }}
            </button>
          </div>
        </form>
      </div>

      <aside class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Resumo da Reserva</h2>
          
          <div class="space-y-4">
            <div class="border-b pb-4">
              <h3 class="font-bold text-gray-900">{{ bookingStore.currentBooking.hotelName }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ bookingStore.currentBooking.roomName }}</p>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Check-in:</span>
                <span class="font-medium">{{ formatDate(bookingStore.currentBooking.checkIn) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Check-out:</span>
                <span class="font-medium">{{ formatDate(bookingStore.currentBooking.checkOut) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Hóspedes:</span>
                <span class="font-medium">{{ bookingStore.currentBooking.guests }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Noites:</span>
                <span class="font-medium">{{ calculateNights() }}</span>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">{{ bookingStore.currentBooking.roomPrice }} x {{ calculateNights() }} noites</span>
                <span class="font-medium">R$ {{ bookingStore.currentBooking.totalPrice }}</span>
              </div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">Taxa de serviço</span>
                <span class="font-medium">R$ 0,00</span>
              </div>
              <div class="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t">
                <span>Total</span>
                <span class="text-blue-600">R$ {{ bookingStore.currentBooking.totalPrice }}</span>
              </div>
            </div>

            <div class="bg-green-50 rounded-lg p-3 text-sm text-green-800 flex items-start gap-2">
              <span class="text-lg">🔒</span>
              <span>Pagamento seguro e protegido</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from 'nuxt/app'
import { useBookingStore } from '../stores/booking'
import { useNotificationStore } from '../stores/notification'

const router = useRouter()
const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

useHead({
  title: 'Finalizar Reserva - Hotel Booking',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

const formData = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  cardNumber: '',
  cardHolder: '',
  cardExpiry: '',
  cardCVV: ''
})

const termsAccepted = ref(false)
const isProcessing = ref(false)

function formatDate(dateString: string | undefined) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function calculateNights() {
  if (!bookingStore.currentBooking?.checkIn || !bookingStore.currentBooking?.checkOut) return 0
  const start = new Date(bookingStore.currentBooking.checkIn)
  const end = new Date(bookingStore.currentBooking.checkOut)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function formatCardNumber(event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '')
  let formatted = value.match(/.{1,4}/g)?.join(' ') || value
  formData.value.cardNumber = formatted
}

function formatExpiry(event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  formData.value.cardExpiry = value
}

async function submitBooking() {
  isProcessing.value = true

  await new Promise(resolve => setTimeout(resolve, 2000))

  try {
    const booking = bookingStore.createBooking({
      hotelId: bookingStore.currentBooking!.hotelId!,
      hotelName: bookingStore.currentBooking!.hotelName!,
      roomId: bookingStore.currentBooking!.roomId!,
      roomName: bookingStore.currentBooking!.roomName!,
      roomPrice: bookingStore.currentBooking!.roomPrice!,
      checkIn: bookingStore.currentBooking!.checkIn!,
      checkOut: bookingStore.currentBooking!.checkOut!,
      guests: bookingStore.currentBooking!.guests!,
      totalPrice: bookingStore.currentBooking!.totalPrice!,
      customerName: formData.value.customerName,
      customerEmail: formData.value.customerEmail,
      customerPhone: formData.value.customerPhone
    })

    bookingStore.confirmBooking(booking.id!)

    notificationStore.success(
      'Reserva Confirmada!',
      `Sua reserva #${booking.id} foi confirmada com sucesso. Enviamos um e-mail de confirmação.`
    )

    router.push('/my-bookings')
  } catch (error) {
    notificationStore.error(
      'Erro ao processar',
      'Não foi possível processar sua reserva. Tente novamente.'
    )
  } finally {
    isProcessing.value = false
  }
}
</script>

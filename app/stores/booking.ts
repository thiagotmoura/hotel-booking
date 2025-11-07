import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BookingData {
  id?: number
  hotelId: number
  hotelName: string
  roomId: number
  roomName: string
  roomPrice: number
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  cardNumber?: string
  cardHolder?: string
  cardExpiry?: string
}

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref<BookingData[]>([])
  const currentBooking = ref<Partial<BookingData> | null>(null)

  const loadBookings = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bookings')
      if (stored) {
        bookings.value = JSON.parse(stored)
      }
    }
  }

  const saveBookings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(bookings.value))
    }
  }

  const setCurrentBooking = (booking: Partial<BookingData>) => {
    currentBooking.value = booking
  }

  const createBooking = (bookingData: Omit<BookingData, 'id' | 'status' | 'createdAt'>) => {
    const newBooking: BookingData = {
      ...bookingData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    bookings.value.push(newBooking)
    saveBookings()
    return newBooking
  }

  const confirmBooking = (id: number) => {
    const booking = bookings.value.find(b => b.id === id)
    if (booking) {
      booking.status = 'confirmed'
      saveBookings()
    }
  }

  const cancelBooking = (id: number) => {
    const booking = bookings.value.find(b => b.id === id)
    if (booking) {
      booking.status = 'cancelled'
      saveBookings()
    }
  }

  const getBookingById = (id: number) => {
    return bookings.value.find(b => b.id === id)
  }

  const getUserBookings = () => {
    return bookings.value
  }

  loadBookings()

  return {
    bookings,
    currentBooking,
    setCurrentBooking,
    createBooking,
    confirmBooking,
    cancelBooking,
    getBookingById,
    getUserBookings
  }
})

<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200" role="navigation" aria-label="Navegação principal">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 group"
          aria-label="Voltar para página inicial"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow">
            🏨
          </div>
          <div class="hidden md:block">
            <div class="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HotelBooking
            </div>
            <div class="text-xs text-gray-500">Encontre seu hotel ideal</div>
          </div>
        </NuxtLink>
        
        <div class="flex items-center gap-2">
          <NuxtLink 
            to="/hotels" 
            class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium flex items-center gap-2 group"
          >
            <span class="text-xl group-hover:scale-110 transition-transform">🔍</span>
            <span class="hidden md:inline">Buscar</span>
          </NuxtLink>
          
          <NuxtLink 
            v-if="comparisonStore.count > 0"
            to="/compare" 
            class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium flex items-center gap-2 relative group"
          >
            <span class="text-xl group-hover:scale-110 transition-transform">⚖️</span>
            <span class="hidden md:inline">Comparar</span>
            <span class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
              {{ comparisonStore.count }}
            </span>
          </NuxtLink>

          <NuxtLink 
            to="/my-bookings" 
            class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium flex items-center gap-2 group"
          >
            <span class="text-xl group-hover:scale-110 transition-transform">📋</span>
            <span class="hidden md:inline">Reservas</span>
          </NuxtLink>
          
          <button 
            v-if="auth.user" 
            @click="logout"
            class="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Sair
          </button>

          <NuxtLink 
            v-else
            to="/login"
            class="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Entrar
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useComparisonStore } from '../stores/comparison'

const auth = useAuthStore()
const comparisonStore = useComparisonStore()
const logout = () => auth.logout()
</script>

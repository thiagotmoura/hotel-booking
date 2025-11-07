<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'

const auth = useAuthStore()

const username = ref('')
const password = ref('')

function handleLogin() {
  auth.login(username.value, password.value)
  navigateTo('/')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
    <h1 class="text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">Login</h1>
    <div class="mb-4 flex flex-col gap-2">
      <div class="relative">
        <span class="absolute left-3 top-2.5 text-gray-400"><i class="fas fa-user"></i></span>
        <input v-model="username" placeholder="Usuário" class="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-300" />
      </div>
      <div class="relative">
        <span class="absolute left-3 top-2.5 text-gray-400"><i class="fas fa-lock"></i></span>
        <input v-model="password" type="password" placeholder="Senha" class="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-300" />
      </div>
    </div>
  <button @click="handleLogin" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow transition-all duration-200">Entrar</button>
  </div>
</template>

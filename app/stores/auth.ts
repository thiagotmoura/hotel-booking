import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthStore = defineStore('auth', () => {
  type User = { name: string; token: string }
  const user = ref<User | null>(null)

  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('hb:user')
    if (raw) {
      try { user.value = JSON.parse(raw) as User } catch {}
    }
  }

  watch(user, (val) => {
    if (typeof window === 'undefined') return
    if (val) localStorage.setItem('hb:user', JSON.stringify(val))
    else localStorage.removeItem('hb:user')
  }, { deep: true })

  function login(username: string, _password: string) {
    const displayName = username?.trim() || 'Hóspede'
    user.value = { name: displayName, token: `token-${Date.now()}` }
  }

  function logout() {
    user.value = null
  }

  const isAuthenticated = () => !!user.value

  return { user, login, logout, isAuthenticated }
})

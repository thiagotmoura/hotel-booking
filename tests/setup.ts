import { vi } from 'vitest'
import { config } from '@vue/test-utils'

vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn(),
  useHead: () => {},
  useRoute: () => ({ query: {} }),
  useFetch: vi.fn(async () => ({ data: { value: [] } })),
  useRuntimeConfig: () => ({ public: {} })
}))

config.global.stubs = {
  NuxtLink: {
    template: '<a><slot /></a>'
  },
  Teleport: {
    template: '<div><slot /></div>'
  }
}

config.global.renderStubDefaultSlot = true

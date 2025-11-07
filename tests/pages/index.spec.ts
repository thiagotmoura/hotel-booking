import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomePage from '../../app/pages/index.vue'

describe('pages/index', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders hero and search', () => {
    const wrapper = mount(HomePage, { global: { stubs: { HotelSearch: true } } })
    expect(wrapper.text()).toContain('Encontre o Hotel Perfeito')

    expect(wrapper.findComponent({ name: 'HotelSearch' }).exists()).toBe(true)
  })
})

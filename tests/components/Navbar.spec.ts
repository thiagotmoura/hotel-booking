import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Navbar from '../../app/components/Navbar.vue'

describe('Navbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders and shows Entrar when logged out', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.text()).toContain('Buscar')
    expect(wrapper.text()).toContain('Entrar')
  })
})

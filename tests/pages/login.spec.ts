import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginPage from '../../app/pages/login.vue'
import { navigateTo } from 'nuxt/app'

describe('pages/login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders and navigates on login', async () => {
    const wrapper = mount(LoginPage)
    await wrapper.get('button').trigger('click')
    expect(navigateTo).toHaveBeenCalledWith('/')
  })
})

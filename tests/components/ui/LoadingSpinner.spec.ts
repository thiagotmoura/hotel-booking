import { mount } from '@vue/test-utils'
import LoadingSpinner from '../../../app/components/ui/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders default slot text', () => {
    const wrapper = mount(LoadingSpinner, { slots: { default: 'Carregando...' } })
    expect(wrapper.text()).toContain('Carregando...')
  })
})

import { mount } from '@vue/test-utils'
import EmptyState from '../../../app/components/ui/EmptyState.vue'

describe('EmptyState', () => {
  it('renders slots', () => {
    const wrapper = mount(EmptyState, {
      slots: {
        icon: '🧪',
        title: '<h3>Sem dados</h3>',
        default: '<p>Tente outra busca</p>'
      }
    })
    expect(wrapper.html()).toContain('Sem dados')
    expect(wrapper.html()).toContain('Tente outra busca')
  })
})

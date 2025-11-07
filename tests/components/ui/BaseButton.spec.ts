import { mount } from '@vue/test-utils'
import BaseButton from '../../../app/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary styles by default', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Primary' } })
    expect(wrapper.classes().join(' ')).toContain('from-blue-600')
  })
})

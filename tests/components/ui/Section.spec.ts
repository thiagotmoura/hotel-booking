import { mount } from '@vue/test-utils'
import Section from '../../../app/components/ui/Section.vue'

describe('Section', () => {
  it('renders title and default slot', () => {
    const wrapper = mount(Section, {
      props: { container: true, margin: 'md' },
      slots: {
        title: '<h2>Título</h2>',
        default: '<p>Conteúdo</p>'
      }
    })
    expect(wrapper.html()).toContain('Título')
    expect(wrapper.html()).toContain('Conteúdo')
  })
})

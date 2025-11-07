import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ComparePage from '../../app/pages/compare.vue'
import { useComparisonStore } from '../../app/stores/comparison'

describe('pages/compare', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows empty state when no rooms', () => {
    const wrapper = mount(ComparePage)
    expect(wrapper.text()).toContain('Nenhum quarto selecionado')
  })

  it('renders summary when rooms present', async () => {
    const wrapper = mount(ComparePage)
    const store = useComparisonStore()
    store.addRoom({
      roomId: 1,
      roomName: 'A',
      hotelId: 1,
      hotelName: 'H1',
      category: 'standard',
      price: 100,
      capacity: 2,
      beds: [],
      amenities: [],
      images: [],
      description: ''
    })
    store.addRoom({
      roomId: 2,
      roomName: 'B',
      hotelId: 2,
      hotelName: 'H2',
      category: 'standard',
      price: 150,
      capacity: 3,
      beds: [],
      amenities: [],
      images: [],
      description: ''
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Resumo Comparativo')
  })
})

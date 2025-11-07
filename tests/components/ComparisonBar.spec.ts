import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ComparisonBar from '../../app/components/ComparisonBar.vue'
import { useComparisonStore } from '../../app/stores/comparison'

describe('ComparisonBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('enables compare when >= 2 rooms', async () => {
    const wrapper = mount(ComparisonBar)
    const store = useComparisonStore()

    expect(wrapper.html()).not.toContain('Comparar Quartos')

    store.addRoom({
      roomId: 1,
      roomName: 'Quarto 1',
      hotelId: 1,
      hotelName: 'Hotel',
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
      roomName: 'Quarto 2',
      hotelId: 1,
      hotelName: 'Hotel',
      category: 'standard',
      price: 120,
      capacity: 2,
      beds: [],
      amenities: [],
      images: [],
      description: ''
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Comparar Quartos')
    const button = wrapper.get('button')
    expect(button.attributes('disabled')).toBeUndefined()
  })
})

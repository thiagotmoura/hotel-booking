import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HotelCard from '../../app/components/HotelCard.vue'

describe('HotelCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders hotel and room info', () => {
    const wrapper = mount(HotelCard, {
      props: {
        hotel: {
          id: 1,
          name: 'Hotel Teste',
          rating: 4.2,
          description: 'Desc',
          address: { neighborhood: 'Centro', city: 'Manaus', state: 'AM' },
          availableRooms: [
            { id: 1, name: 'Standard', category: 'standard', price: 100, capacity: 2, beds: [{ type: 'queen', quantity: 1 }], amenities: [], images: [], description: '' }
          ]
        }
      },
      global: {
        stubs: {
          ImageCarousel: true
        }
      }
    })

    expect(wrapper.text()).toContain('Hotel Teste')
    expect(wrapper.text()).toContain('Standard')
  })
})

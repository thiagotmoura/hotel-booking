import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HotelsPage from '../../app/pages/hotels/index.vue'

vi.mock('../../composables/useHotels', () => {
  return {
    useHotels: () => ({
      async search() {
        return {
          data: [
            {
              id: 1,
              name: 'Hotel Teste',
              description: 'Um ótimo hotel',
              rating: 4.5,
              address: { neighborhood: 'Centro', city: 'Manaus', state: 'AM' },
              availableRooms: [
                { id: 101, name: 'Standard', category: 'standard', price: 200, capacity: 2, beds: [], amenities: [], images: [], description: '' }
              ]
            }
          ],
          error: { value: null }
        }
      }
    })
  }
})

describe('pages/hotels/index', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders and can accept inline search', async () => {
    const wrapper = mount(HotelsPage, {
      global: {
        stubs: {
          HotelCard: true
        }
      }
    })

    // trigger inline search by emitting from the child component
    const searchComp = wrapper.findComponent({ name: 'HotelSearch' })
    expect(searchComp.exists()).toBe(true)
    await searchComp.vm.$emit('search', {
      destination: 'Manaus, AM',
      checkIn: '2025-01-10',
      checkOut: '2025-01-12',
      guests: 2,
      rooms: 1
    })

    // wait for next tick and fetch
    await Promise.resolve()

    // should render sort controls block since results length > 0
    expect(wrapper.text()).toContain('hotel encontrado')
  })
})

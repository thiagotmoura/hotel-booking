import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HotelSearch from '../../app/components/HotelSearch.vue'

describe('HotelSearch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // @ts-ignore
    global.fetch = vi.fn(async () => ({
      json: async () => [
        { id: 1, label: 'Manaus, AM', airports: ['MAO'] },
        { id: 2, label: 'São Paulo, SP', airports: ['GRU', 'CGH'] }
      ]
    }))
  })

  it('emits search payload in inline mode', async () => {
    const wrapper = mount(HotelSearch, { props: { mode: 'inline' } })

    const today = new Date().toISOString().split('T')[0]
    await wrapper.get('#destination').setValue('Manaus, AM')
    await wrapper.get('#checkIn').setValue(today)
    await wrapper.get('#checkOut').setValue(today)
    await wrapper.find('form').trigger('submit.prevent')

    const events = wrapper.emitted('search')
    expect(events).toBeTruthy()
    expect(events![0][0].destination).toBe('Manaus, AM')
  })
})

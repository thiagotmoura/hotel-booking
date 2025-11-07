import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NotificationToast from '../../app/components/NotificationToast.vue'
import { useNotificationStore } from '../../app/stores/notification'

describe('NotificationToast', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows and removes a notification', async () => {
    const wrapper = mount(NotificationToast)
    const store = useNotificationStore()
    const id = store.addNotification({
      title: 'Sucesso',
      message: 'Tudo certo',
      type: 'success'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Sucesso')
    store.removeNotification(id)
    await wrapper.vm.$nextTick()

    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.text()).not.toContain('Sucesso')
  })
})

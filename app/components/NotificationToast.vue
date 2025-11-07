<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] space-y-3 max-w-md">
      <TransitionGroup name="notification">
        <div
          v-for="notification in notificationStore.notifications"
          :key="notification.id"
          :class="[
            'rounded-lg shadow-2xl p-4 flex items-start gap-3 backdrop-blur-sm',
            notificationClasses[notification.type]
          ]"
          role="alert"
        >
          <div class="text-2xl flex-shrink-0">
            {{ notificationIcons[notification.type] }}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-sm mb-1">{{ notification.title }}</h4>
            <p class="text-sm opacity-90">{{ notification.message }}</p>
          </div>
          <button
            @click="notificationStore.removeNotification(notification.id)"
            class="flex-shrink-0 w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center transition-colors"
            aria-label="Fechar notificação"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useNotificationStore } from '../stores/notification'

const notificationStore = useNotificationStore()

type NotifType = 'success' | 'error' | 'warning' | 'info'

const notificationClasses: Record<NotifType, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-gray-900',
  info: 'bg-blue-500 text-white'
}

const notificationIcons: Record<NotifType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>

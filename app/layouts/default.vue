<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <Navbar />
    <main class="flex-1 container mx-auto px-4 py-6">
      <slot />
    </main>
    <Footer />
    <ComparisonBar />
    <NotificationToast />
    <StructuredData />
  </div>
</template>

<script setup lang="ts">
import ComparisonBar from '../components/ComparisonBar.vue'
import NotificationToast from '../components/NotificationToast.vue'
import StructuredData from '../components/StructuredData.vue'
</script>
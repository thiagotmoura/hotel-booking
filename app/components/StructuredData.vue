<script setup lang="ts">
import { useHead, useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hotel Booking',
        description: 'Plataforma de busca e reserva de hotéis no Brasil',
        url: config.public.apiBase || 'http://localhost:3000',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${config.public.apiBase || 'http://localhost:3000'}/hotels?destination={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>

<template>
  <div></div>
</template>

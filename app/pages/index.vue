<template>
  <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
    <Section :container="true" margin="md" aria-label="Hero">
      <template #title>
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight">
          Encontre o Hotel Perfeito
        </h1>
      </template>
      <p class="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-center max-w-4xl mx-auto">
        Compare preços, comodidades e avaliações dos melhores hotéis do Brasil. 
        Reserve com confiança e economize tempo.
      </p>
    </Section>

    <Section :container="true" margin="md" aria-label="Formulário de busca de hotéis">
      <div class="max-w-5xl mx-auto">
        <HotelSearch mode="navigate" />
      </div>
    </Section>

    <Section :container="true" margin="lg" aria-label="Principais recursos">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard>
          <template #icon>🔍</template>
          <template #title>Busca Inteligente</template>
          Encontre hotéis por cidade, bairro ou pontos turísticos com nossa busca avançada
        </FeatureCard>
        <FeatureCard>
          <template #icon>⚖️</template>
          <template #title>Compare Quartos</template>
          Compare até 3 quartos lado a lado para tomar a melhor decisão
        </FeatureCard>
        <FeatureCard>
          <template #icon>💰</template>
          <template #title>Melhores Preços</template>
          Preços transparentes e sem taxas ocultas. Garantia de melhor tarifa
        </FeatureCard>
      </div>
    </Section>

    <Section :container="true" margin="md" aria-label="Explorar hotéis">
      <div class="text-center">
        <NuxtLink to="/hotels">
          <BaseButton color="primary">Explorar Todos os Hotéis →</BaseButton>
        </NuxtLink>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import { useSearchStore } from '../stores/search'
import Section from '../components/ui/Section.vue'
import FeatureCard from '../components/ui/FeatureCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'

useHead({
  title: 'Hotel Booking - Encontre e Reserve os Melhores Hotéis do Brasil',
  meta: [
    { name: 'description', content: 'Compare e reserve hotéis com os melhores preços. Busca inteligente, comparação de quartos e avaliações verificadas. Encontre o hotel perfeito para sua viagem.' },
    { name: 'keywords', content: 'hotéis, reserva de hotel, hospedagem, pousadas, resorts, brasil, comparação de preços' },
    { property: 'og:title', content: 'Hotel Booking - Reserve os Melhores Hotéis' },
    { property: 'og:description', content: 'Compare e reserve hotéis com os melhores preços do Brasil' },
    { property: 'og:type', content: 'website' }
  ]
})

const searchStore = useSearchStore()
searchStore.clearSearch()
</script>

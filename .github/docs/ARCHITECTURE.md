# 🏛️ Arquitetura do Projeto Hotel Booking

## Visão Geral

Este documento detalha as decisões arquiteturais, padrões de design e a estrutura técnica do projeto Hotel Booking.

## Índice

- [Pilares Arquiteturais](#pilares-arquiteturais)
- [Camadas da Aplicação](#camadas-da-aplicação)
- [Fluxo de Dados](#fluxo-de-dados)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Sistema de Componentes](#sistema-de-componentes)
- [API e SSR](#api-e-ssr)
- [Decisões Técnicas](#decisões-técnicas)

---

## Pilares Arquiteturais

### 1. **Server-Side Rendering (SSR)**
O projeto utiliza Nuxt 3 para renderização server-side, garantindo:

- **SEO Otimizado**: Motores de busca podem indexar todo o conteúdo
- **Performance**: First Contentful Paint mais rápido
- **Hydration Eficiente**: Vue hidrata o HTML renderizado no servidor

```typescript
// Nuxt automaticamente renderiza as páginas no servidor
// e envia HTML pronto para o cliente
export default defineNuxtConfig({
  ssr: true, // Habilitado por padrão
  // ...
})
```

### 2. **Composition API First**
Toda a lógica de componentes utiliza a Composition API do Vue 3:

```typescript
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Estado reativo
const count = ref(0)

// Computed properties
const doubled = computed(() => count.value * 2)

// Watchers
watch(count, (newValue) => {
  console.log(`Count mudou para ${newValue}`)
})
</script>
```

**Vantagens:**
- Melhor organização de código
- Reuso de lógica via composables
- Tree-shaking mais eficiente
- Type inference superior com TypeScript

### 3. **Type Safety com TypeScript**
TypeScript em todos os arquivos para garantir type safety:

```typescript
// Interfaces explícitas
interface Hotel {
  id: number
  name: string
  rating: number
  availableRooms: Room[]
}

interface Room {
  id: number
  name: string
  price: number
  capacity: number
  amenities: Amenity[]
}

// Props tipadas
defineProps<{
  hotel: Hotel
  startDate?: string
  endDate?: string
}>()
```

---

## Camadas da Aplicação

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│   (Components, Pages, Layouts)          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Application Layer               │
│   (Composables, Stores, Business Logic) │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Data Layer                      │
│   (API Endpoints, Server Utils)         │
└─────────────────────────────────────────┘
```

### Presentation Layer

**Responsabilidade**: Renderizar UI e capturar eventos do usuário.

```
app/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas (rotas automáticas)
└── layouts/        # Layouts de página
```

**Princípios:**
- Componentes tontos (dumb) quando possível
- Props para entrada, eventos para saída
- Sem lógica de negócio complexa

```vue
<template>
  <BaseButton @click="handleClick">
    {{ label }}
  </BaseButton>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
const emit = defineEmits<{ (e: 'click'): void }>()

function handleClick() {
  emit('click')
}
</script>
```

### Application Layer

**Responsabilidade**: Lógica de negócio, estado global e orquestração.

```
├── composables/    # Lógica reutilizável
└── stores/         # Estado global (Pinia)
```

**Composables:**
```typescript
// composables/useHotels.ts
export const useHotels = () => {
  const api = useApi()
  
  async function search(params: SearchParams) {
    const { data, error } = await api.post('/api/hotels/search', params)
    return { data, error }
  }
  
  return { search }
}
```

**Stores:**
```typescript
// stores/search.ts
export const useSearchStore = defineStore('search', () => {
  const search = ref<SearchState>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  })
  
  function setSearch(partial: Partial<SearchState>) {
    Object.assign(search.value, partial)
  }
  
  return { search, setSearch }
})
```

### Data Layer

**Responsabilidade**: Buscar e persistir dados.

```
server/
└── api/           # Endpoints SSR
    ├── hotels.ts
    ├── hotels/
    │   └── search.ts
    └── destinations/
        └── search.ts
```

**Endpoints:**
```typescript
// server/api/hotels/search.ts
export default defineEventHandler(async (event) => {
  // Lê dados do request
  const body = await readBody(event).catch(() => null)
  const query = getQuery(event)
  
  // Processa no servidor
  const results = await searchHotels(body || query)
  
  // Retorna JSON
  return results
})
```

---

## Fluxo de Dados

### Fluxo Unidirecional

```
User Action
    ↓
Component Event
    ↓
Store Action / Composable
    ↓
API Call (server/api)
    ↓
Server Processing
    ↓
Response
    ↓
Store Update
    ↓
Component Re-render
```

### Exemplo: Busca de Hotéis

```typescript
// 1. User preenche formulário e clica em "Buscar"
<HotelSearch @search="handleSearch" />

// 2. Componente pai recebe evento
async function handleSearch(payload) {
  // 3. Atualiza store
  searchStore.setSearch(payload)
  
  // 4. Chama composable
  const { data, error } = await useHotels().search(payload)
  
  // 5. Atualiza estado local
  results.value = data
}

// 6. API endpoint processa no servidor
// server/api/hotels/search.ts
export default defineEventHandler(async (event) => {
  const params = await readBody(event)
  return filteredHotels // Retorna dados processados
})

// 7. Vue re-renderiza com novos dados
<HotelCard v-for="hotel in results" :hotel="hotel" />
```

---

## Gerenciamento de Estado

### Estratégia de Estado

O projeto usa **múltiplas stores especializadas** ao invés de uma store monolítica:

```
stores/
├── auth.ts         # Autenticação e usuário
├── search.ts       # Parâmetros de busca
├── comparison.ts   # Quartos selecionados
├── booking.ts      # Reservas
└── notification.ts # Notificações toast
```

### Quando Usar Cada Tipo de Estado

| Tipo | Quando Usar | Exemplo |
|------|-------------|---------|
| **Local State** (`ref`) | Estado usado apenas em um componente | `const isOpen = ref(false)` |
| **Props** | Passar dados de pai para filho | `<Child :data="parentData" />` |
| **Store** (Pinia) | Estado compartilhado entre múltiplos componentes | `useSearchStore()` |
| **Provide/Inject** | Evitar prop drilling em árvores profundas | Raramente necessário com Pinia |
| **URL Query Params** | Estado que deve ser compartilhável via URL | `?destination=Manaus&guests=2` |

### Anatomia de uma Store

```typescript
// stores/comparison.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useComparisonStore = defineStore('comparison', () => {
  // Estado
  const rooms = ref<RoomForComparison[]>([])
  const maxRooms = 3
  
  // Getters (computed)
  const canAddMore = computed(() => rooms.value.length < maxRooms)
  const count = computed(() => rooms.value.length)
  
  // Actions (functions)
  function addRoom(room: RoomForComparison) {
    if (canAddMore.value) {
      rooms.value.push(room)
      return true
    }
    return false
  }
  
  function removeRoom(roomId: number, hotelId: number) {
    rooms.value = rooms.value.filter(
      r => !(r.roomId === roomId && r.hotelId === hotelId)
    )
  }
  
  // Retorna API pública
  return {
    rooms,
    maxRooms,
    canAddMore,
    count,
    addRoom,
    removeRoom
  }
})
```

### Persistência de Estado

```typescript
// Exemplo: store com localStorage
export const useBookingStore = defineStore('booking', () => {
  const bookings = ref<Booking[]>([])
  
  // Carrega do localStorage ao inicializar
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('bookings')
    if (stored) bookings.value = JSON.parse(stored)
  }
  
  // Salva sempre que muda
  watch(bookings, (newBookings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(newBookings))
    }
  }, { deep: true })
  
  return { bookings }
})
```

---

## Sistema de Componentes

### Design System

```
app/components/ui/
├── BaseButton.vue      # Botão com variantes
├── BaseCard.vue        # Container de conteúdo
├── Section.vue         # Seção de página
├── FeatureCard.vue     # Card de features
├── EmptyState.vue      # Estado vazio
└── LoadingSpinner.vue  # Loading indicator
```

### Hierarquia de Componentes

```
Atomic Design (adaptado):

Atoms (Base):
└── BaseButton, BaseCard

Molecules (Features):
└── FeatureCard, EmptyState, LoadingSpinner

Organisms (Business):
└── HotelSearch, HotelCard, ComparisonBar

Templates (Layouts):
└── default.vue

Pages:
└── index.vue, hotels/index.vue
```

### Padrão de Componente Base

```vue
<!-- BaseButton.vue -->
<template>
  <button
    :type="type"
    :class="['base-button', colorClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'ghost'
}>(), {
  type: 'button',
  color: 'primary'
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'secondary': return 'bg-gray-100'
    case 'ghost': return 'text-gray-700'
    default: return 'bg-gradient-to-r from-blue-600 to-purple-600'
  }
})
</script>

<style scoped>
.base-button {
  @apply inline-flex items-center justify-center gap-2 
         font-semibold rounded-lg transition-all 
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}
</style>
```

### Slots e Composição

```vue
<!-- Section.vue -->
<template>
  <section :class="containerClass">
    <div v-if="$slots.title" class="mb-4">
      <slot name="title" />
    </div>
    <slot /> <!-- default slot -->
  </section>
</template>

<!-- Uso -->
<Section>
  <template #title>
    <h1>Título da Seção</h1>
  </template>
  <p>Conteúdo da seção</p>
</Section>
```

---

## API e SSR

### Endpoints do Nuxt

```
server/api/
├── hotels.ts              # GET /api/hotels (lista todos)
├── hotels/
│   └── search.ts          # GET/POST /api/hotels/search
└── destinations/
    └── search.ts          # GET /api/destinations/search
```

### Padrão de Endpoint

```typescript
// server/api/hotels/search.ts
export default defineEventHandler(async (event) => {
  // 1. Ler dados do request (body ou query)
  const body = await readBody(event).catch(() => null)
  const query = getQuery(event)
  const params = body || query
  
  // 2. Validar e normalizar
  const destination = params.destination?.toString() || ''
  const guests = Number(params.guests) || 2
  
  // 3. Processar (filtrar, ordenar, etc.)
  const hotels = await searchHotels(destination, guests)
  
  // 4. Retornar resposta
  return hotels
})
```

### Composable para API

```typescript
// composables/useApi.ts
export const useApi = () => {
  return {
    async get(url: string, params?: Record<string, any>) {
      return useFetch(url, {
        method: 'GET',
        params,
        server: true // SSR
      })
    },
    async post(url: string, body?: any) {
      return useFetch(url, {
        method: 'POST',
        body,
        server: true
      })
    }
  }
}

// composables/useHotels.ts
export const useHotels = () => {
  const api = useApi()
  
  async function search(params: SearchParams) {
    const { data, error } = await api.post('/api/hotels/search', params)
    return { data: data.value || [], error }
  }
  
  return { search }
}
```

### Normalização e Filtros

```typescript
// Função de normalização (remove acentos)
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Parser de destino (suporta "Cidade, UF" ou "Cidade UF")
function parseDestination(destination: string) {
  const parts = destination.split(/[,\s]+/).filter(Boolean)
  if (parts.length >= 2) {
    const uf = parts[parts.length - 1]
    const city = parts.slice(0, -1).join(' ')
    return { city, uf }
  }
  return { city: destination, uf: null }
}

// Uso no endpoint
const hotels = mockHotels.filter(hotel => {
  const normalizedSearch = normalize(destination)
  const parsed = parseDestination(destination)
  
  // Match exato por cidade + UF
  if (parsed.uf) {
    const cityMatch = normalize(hotel.address.city).includes(normalize(parsed.city))
    const ufMatch = normalize(hotel.address.state) === normalize(parsed.uf)
    return cityMatch && ufMatch
  }
  
  // Match parcial sem UF
  return normalize(hotel.address.city).includes(normalizedSearch)
})
```

---

## Decisões Técnicas

### 1. Por que Nuxt 3?

**Escolhido por:**
- SSR out-of-the-box
- File-based routing (convenção sobre configuração)
- Auto-imports de componentes e composables
- Server endpoints integrados
- Excelente DX (Developer Experience)

**Alternativas consideradas:**
- Next.js (React) - Descartado por preferência ao Vue
- Vite + Vue Router - Mais trabalho manual, menos features

### 2. Por que Pinia?

**Escolhido por:**
- Store oficial do Vue 3
- Composition API first
- Melhor type inference que Vuex
- DevTools integration
- Modular e tree-shakeable

**Alternativas consideradas:**
- Vuex - API mais verbosa, menor type safety
- Plain composables - Sem DevTools, sem persistência fácil

### 3. Por que Tailwind CSS?

**Escolhido por:**
- Produtividade: utility-first é rápido
- Consistência: design system via config
- Performance: purge CSS não utilizado
- Mobile-first por padrão

**Alternativas consideradas:**
- CSS Modules - Mais boilerplate
- Styled Components - Runtime overhead
- Bootstrap - Menos flexível

### 4. Por que Vitest?

**Escolhido por:**
- Compatibilidade nativa com Vite
- Extremamente rápido (usa Vite transform)
- API compatível com Jest
- Watch mode eficiente

**Alternativas consideradas:**
- Jest - Mais lento, configuração complexa com ESM
- Cypress Component Testing - Overhead do browser

### 5. Estrutura de Pastas

```
app/              # Todo código fonte Vue/Nuxt
  components/     # Auto-importados globalmente
  pages/          # File-based routing
  layouts/        # Templates de página
  stores/         # Pinia stores
  
composables/      # Lógica reutilizável (auto-importada)

server/           # Código server-side
  api/            # Endpoints (/api/*)
  
tests/            # Testes (Vitest)

public/           # Arquivos estáticos (servidos na raiz)
```

**Vantagens:**
- Separação clara de responsabilidades
- Convenções do Nuxt (auto-imports)
- Escalável

---

## Padrões de Performance

### 1. Code Splitting Automático

Nuxt automaticamente faz code splitting por rota:

```typescript
// Cada página é um chunk separado
pages/
  index.vue           → index.[hash].js
  hotels/index.vue    → hotels-index.[hash].js
  compare.vue         → compare.[hash].js
```

### 2. Lazy Loading de Componentes

```vue
<!-- Carrega apenas quando renderizado -->
<LazyComparisonBar v-if="showBar" />
```

### 3. Computed Properties Cachadas

```typescript
// Recalcula apenas quando dependências mudam
const filteredHotels = computed(() => {
  return hotels.value.filter(h => h.rating >= minRating.value)
})
```

### 4. Debounce em Inputs

```typescript
const searchDestinations = debounceFn(async (query: string) => {
  // Evita requisições excessivas
  await fetch(`/api/destinations/search?q=${query}`)
}, 300) // 300ms delay
```

---

## Segurança

### 1. XSS Protection

Vue automaticamente escapa HTML:

```vue
<!-- Seguro: Vue escapa automaticamente -->
<div>{{ userInput }}</div>

<!-- PERIGOSO: v-html permite HTML arbitrário -->
<div v-html="userInput"></div> <!-- Evite! -->
```

### 2. CSRF Protection

Para requisições POST em produção, considere tokens CSRF:

```typescript
// Nuxt pode adicionar CSRF middleware
// Ver: https://nuxt.com/modules/security
```

### 3. Validação Server-Side

```typescript
// SEMPRE valide no servidor, não confie no cliente
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Valide tipos e ranges
  if (typeof body.guests !== 'number' || body.guests < 1) {
    throw createError({
      statusCode: 400,
      message: 'Guests must be a positive number'
    })
  }
  
  return processRequest(body)
})
```

---

## Otimizações Futuras

### Potenciais Melhorias

1. **Cache de API**
   - Implementar cache de resultados de busca (Redis/Memory)
   - Invalidação inteligente

2. **Paginação**
   - Adicionar paginação nos resultados de busca
   - Infinite scroll ou numbered pagination

3. **Imagens Otimizadas**
   - Usar `@nuxt/image` para otimização automática
   - Lazy loading com intersection observer

4. **PWA**
   - Adicionar `@vite-pwa/nuxt` para offline support
   - Service worker para cache

5. **Analytics**
   - Integrar Google Analytics ou Plausible
   - Tracking de conversões

6. **Backend Real**
   - Conectar a API real de hotéis
   - Implementar autenticação JWT
   - Payment gateway integration

---

## Conclusão

A arquitetura do Hotel Booking foi projetada para ser:

✅ **Escalável** - Fácil adicionar novas features  
✅ **Manutenível** - Código organizado e testado  
✅ **Performática** - SSR, code splitting, caching  
✅ **Type-Safe** - TypeScript em toda a aplicação  
✅ **Moderna** - Vue 3, Composition API, Nuxt 3  

A estrutura modular permite que o projeto cresça sem se tornar um monolito ingerenciável.

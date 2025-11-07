# 🎯 Decisões de Design e Padrões

Este documento explica as escolhas de design, padrões de código e convenções usadas no projeto Hotel Booking.

## Índice

- [Filosofia de Design](#filosofia-de-design)
- [Padrões de Componentes](#padrões-de-componentes)
- [Padrões de Estado](#padrões-de-estado)
- [Padrões de API](#padrões-de-api)
- [Padrões de Estilo](#padrões-de-estilo)
- [Padrões de Testes](#padrões-de-testes)
- [Anti-Padrões](#anti-padrões)

---

## Filosofia de Design

### 1. **Composition over Inheritance**

❌ **Evite:** Hierarquias complexas de componentes

```vue
<!-- Ruim: Herança profunda -->
BaseButton → PrimaryButton → LargePrimaryButton
```

✅ **Prefira:** Composição via props e slots

```vue
<!-- Bom: Composição flexível -->
<BaseButton variant="primary" size="large">
  Clique aqui
</BaseButton>
```

### 2. **Progressive Enhancement**

A aplicação funciona com JavaScript desabilitado (graças ao SSR) e melhora progressivamente:

1. **Nível 0:** HTML estático (SSR)
2. **Nível 1:** Navegação funcional (hydration)
3. **Nível 2:** Interações ricas (JS completo)

### 3. **Mobile-First**

Todos os componentes são projetados mobile-first:

```css
/* Base: mobile */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
}
```

Com Tailwind:

```html
<div class="p-4 md:p-8 lg:p-12">...</div>
```

### 4. **Acessibilidade (a11y)**

- Sempre use tags semânticas (`<nav>`, `<article>`, `<button>`)
- Forneça labels para inputs
- Atributos ARIA quando necessário
- Suporte a navegação por teclado

```vue
<button
  @click="handleClick"
  :aria-label="ariaLabel"
  :aria-pressed="isActive"
>
  {{ label }}
</button>
```

---

## Padrões de Componentes

### Estrutura de Componente

```vue
<template>
  <!-- 1. Template primeiro (visual) -->
  <div class="container">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
// 2. Imports
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

// 3. Props
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 4. Emits
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'close'): void
}>()

// 5. Estado local
const isOpen = ref(false)

// 6. Computed
const displayTitle = computed(() => 
  props.title.toUpperCase()
)

// 7. Funções
function handleClick() {
  emit('update', props.count + 1)
}

// 8. Lifecycle
onMounted(() => {
  console.log('Mounted')
})
</script>

<style scoped>
/* 9. Estilos (apenas se necessário) */
.container {
  /* Evite estilos customizados, prefira Tailwind */
}
</style>
```

### Props vs Slots

**Use Props quando:**
- Dados primitivos (string, number, boolean)
- Configuração simples
- Passar dados para processamento

```vue
<MyComponent title="Título" :count="5" :enabled="true" />
```

**Use Slots quando:**
- Conteúdo HTML complexo
- Customização de layout
- Composição de componentes

```vue
<MyComponent>
  <template #header>
    <h1>Título customizado com <strong>HTML</strong></h1>
  </template>
  <p>Conteúdo principal</p>
</MyComponent>
```

### Computed vs Methods

**Use Computed:**
- Cálculos baseados em estado reativo
- Resultados cachados (performance)
- Usado em templates

```typescript
// ✅ Bom: cacheia resultado
const fullName = computed(() => 
  `${firstName.value} ${lastName.value}`
)
```

**Use Methods:**
- Ações/eventos
- Side effects
- Operações não determinísticas

```typescript
// ✅ Bom: ação com side effect
function saveData() {
  localStorage.setItem('data', JSON.stringify(data.value))
}
```

### Watch vs Computed

**Use Computed:**
- Transformar dados reativos
- Sem side effects

```typescript
// ✅ Bom: transformação pura
const filteredItems = computed(() => 
  items.value.filter(item => item.active)
)
```

**Use Watch:**
- Side effects (API calls, localStorage)
- Reagir a mudanças complexas

```typescript
// ✅ Bom: side effect ao mudar
watch(searchQuery, async (newQuery) => {
  if (newQuery.length > 3) {
    results.value = await fetchResults(newQuery)
  }
})
```

---

## Padrões de Estado

### Hierarquia de Estado

```
1. Props (pai → filho)
   ↓
2. Local State (ref/reactive)
   ↓
3. Provide/Inject (contexto local)
   ↓
4. Pinia Store (global)
   ↓
5. URL Query Params (compartilhável)
```

### Quando Usar Cada Um

| Tipo | Escopo | Persistência | Exemplo |
|------|--------|--------------|---------|
| Props | Componente filho | Não | Passar hotel para HotelCard |
| ref() | Componente | Não | Estado de um modal (isOpen) |
| Pinia | Global | Opcional | Auth, carrinho, comparação |
| URL | Global | Sim (URL) | Filtros de busca, paginação |

### Padrão de Store (Pinia)

```typescript
// stores/exemplo.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExemploStore = defineStore('exemplo', () => {
  // 1. Estado (ref)
  const items = ref<Item[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // 2. Getters (computed)
  const itemCount = computed(() => items.value.length)
  const hasItems = computed(() => itemCount.value > 0)
  
  // 3. Actions (functions)
  async function fetchItems() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/items')
      items.value = await response.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  function addItem(item: Item) {
    items.value.push(item)
  }
  
  function removeItem(id: number) {
    items.value = items.value.filter(i => i.id !== id)
  }
  
  function reset() {
    items.value = []
    loading.value = false
    error.value = null
  }
  
  // 4. Retorna API pública
  return {
    // Estado (somente leitura fora da store)
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    // Getters
    itemCount,
    hasItems,
    // Actions
    fetchItems,
    addItem,
    removeItem,
    reset
  }
})
```

### Reatividade e storeToRefs

```typescript
// ❌ ERRADO: Perde reatividade
const store = useMyStore()
const { count } = store // count não é reativo!

// ✅ CORRETO: Mantém reatividade
import { storeToRefs } from 'pinia'
const store = useMyStore()
const { count } = storeToRefs(store) // count é reativo
```

---

## Padrões de API

### Estrutura de Endpoint

```typescript
// server/api/recurso/acao.ts
export default defineEventHandler(async (event) => {
  // 1. Autenticação/Autorização (se necessário)
  const user = await authenticateUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  // 2. Extrair parâmetros
  const query = getQuery(event)
  const body = await readBody(event).catch(() => null)
  const params = { ...query, ...body }
  
  // 3. Validar
  if (!params.requiredField) {
    throw createError({
      statusCode: 400,
      message: 'requiredField is required'
    })
  }
  
  // 4. Processar
  const result = await processData(params)
  
  // 5. Retornar
  return {
    success: true,
    data: result
  }
})
```

### Tratamento de Erros

```typescript
// ✅ Bom: Erros estruturados
export default defineEventHandler(async (event) => {
  try {
    const data = await fetchData()
    return { success: true, data }
  } catch (error) {
    // Log no servidor
    console.error('Error fetching data:', error)
    
    // Erro amigável para o cliente
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})
```

### Normalização de Dados

```typescript
// Funções helper para normalização
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .trim()
}

function parseDate(dateStr: string): Date | null {
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

// Uso no endpoint
const normalizedQuery = normalize(query.search)
const startDate = parseDate(query.startDate)
```

### Composable de API

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  
  async function request<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      const response = await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options
      })
      return { data: response, error: null }
    } catch (error) {
      console.error('API Error:', error)
      return { data: null, error: error as Error }
    }
  }
  
  return {
    get: <T>(url: string, params?: any) => 
      request<T>(url, { method: 'GET', params }),
    
    post: <T>(url: string, body?: any) => 
      request<T>(url, { method: 'POST', body }),
    
    put: <T>(url: string, body?: any) => 
      request<T>(url, { method: 'PUT', body }),
    
    delete: <T>(url: string) => 
      request<T>(url, { method: 'DELETE' })
  }
}
```

---

## Padrões de Estilo

### Tailwind Utility Classes

```html
<!-- ✅ Bom: Classes utilitárias -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 class="text-2xl font-bold text-gray-900">Título</h2>
  <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Ação
  </button>
</div>

<!-- ❌ Evite: CSS customizado -->
<div class="custom-container">
  <h2 class="custom-title">Título</h2>
  <button class="custom-button">Ação</button>
</div>
<style>
.custom-container { /* ... */ }
.custom-title { /* ... */ }
.custom-button { /* ... */ }
</style>
```

### Quando Usar CSS Customizado

Apenas para:
- Animações complexas
- Layouts que Tailwind não suporta
- Estilos globais (tipografia base)

```vue
<style scoped>
/* ✅ OK: Animação customizada */
@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-enter-active {
  animation: slide-in 0.3s ease;
}
</style>
```

### Responsividade

```html
<!-- Mobile-first: sem prefixo = mobile -->
<div class="
  text-sm           <!-- mobile -->
  md:text-base      <!-- tablet -->
  lg:text-lg        <!-- desktop -->
  xl:text-xl        <!-- large desktop -->
">
  Texto responsivo
</div>

<!-- Grid responsivo -->
<div class="
  grid
  grid-cols-1       <!-- mobile: 1 coluna -->
  md:grid-cols-2    <!-- tablet: 2 colunas -->
  lg:grid-cols-3    <!-- desktop: 3 colunas -->
  gap-4
">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Dark Mode (futuro)

```html
<!-- Prepara classes para dark mode -->
<div class="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
">
  Conteúdo
</div>
```

---

## Padrões de Testes

### Estrutura de Teste

```typescript
// tests/components/MyComponent.spec.ts
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MyComponent from '../../app/components/MyComponent.vue'

describe('MyComponent', () => {
  // 1. Setup antes de cada teste
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  // 2. Teste de renderização
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })
    expect(wrapper.text()).toContain('Test')
  })
  
  // 3. Teste de interação
  it('emits event on click', async () => {
    const wrapper = mount(MyComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
  
  // 4. Teste de lógica
  it('computes value correctly', async () => {
    const wrapper = mount(MyComponent, {
      props: { count: 5 }
    })
    expect(wrapper.vm.doubled).toBe(10)
  })
})
```

### O Que Testar

✅ **Teste:**
- Renderização de props
- Emissão de eventos
- Computed properties
- Lógica de negócio
- Edge cases

❌ **Não teste:**
- Implementação interna do Vue
- Bibliotecas externas
- Estilos CSS (use snapshot se necessário)

### Mocking

```typescript
// Mock de composable
vi.mock('~/composables/useApi', () => ({
  useApi: () => ({
    get: vi.fn().mockResolvedValue({ data: [] })
  })
}))

// Mock de Nuxt
vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn(),
  useRoute: () => ({ params: { id: '1' } })
}))

// Mock de fetch
global.fetch = vi.fn().mockResolvedValue({
  json: async () => ({ data: 'mocked' })
})
```

---

## Anti-Padrões

### ❌ 1. Mutação Direta de Props

```vue
<!-- ERRADO -->
<script setup>
const props = defineProps<{ count: number }>()
props.count++ // ❌ Nunca mute props!
</script>

<!-- CORRETO -->
<script setup>
const props = defineProps<{ count: number }>()
const emit = defineEmits<{ (e: 'update', val: number): void }>()

function increment() {
  emit('update', props.count + 1) // ✅ Emita evento
}
</script>
```

### ❌ 2. Estado Não Reativo

```typescript
// ❌ ERRADO: Não é reativo
let count = 0
count++ // Não triggera re-render

// ✅ CORRETO: Reativo
const count = ref(0)
count.value++ // Triggera re-render
```

### ❌ 3. Lógica Complexa no Template

```vue
<!-- ❌ ERRADO: Lógica no template -->
<template>
  <div>
    {{ items.filter(i => i.active).map(i => i.name.toUpperCase()).join(', ') }}
  </div>
</template>

<!-- ✅ CORRETO: Computed property -->
<script setup>
const activeNames = computed(() => 
  items.value
    .filter(i => i.active)
    .map(i => i.name.toUpperCase())
    .join(', ')
)
</script>

<template>
  <div>{{ activeNames }}</div>
</template>
```

### ❌ 4. Watch Desnecessário

```typescript
// ❌ ERRADO: Watch quando computed é suficiente
const fullName = ref('')
watch([firstName, lastName], () => {
  fullName.value = `${firstName.value} ${lastName.value}`
})

// ✅ CORRETO: Use computed
const fullName = computed(() => 
  `${firstName.value} ${lastName.value}`
)
```

### ❌ 5. Excesso de Stores

```typescript
// ❌ ERRADO: Store para estado local
const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  return { isOpen }
})

// ✅ CORRETO: ref() local no componente
const isOpen = ref(false)
```

### ❌ 6. Importações Desnecessárias

```typescript
// ❌ ERRADO: Importar componente auto-importado
import MyComponent from '~/components/MyComponent.vue'

// ✅ CORRETO: Nuxt auto-importa
<MyComponent /> // Funciona automaticamente
```

### ❌ 7. Any em TypeScript

```typescript
// ❌ ERRADO: Perde type safety
function process(data: any) {
  return data.value // Sem autocomplete, sem type check
}

// ✅ CORRETO: Tipo específico
interface Data {
  value: string
}
function process(data: Data) {
  return data.value // Type-safe!
}
```

---

## Checklist de Code Review

Antes de fazer commit, verifique:

- [ ] Componente usa `<script setup lang="ts">`?
- [ ] Props estão tipadas com interface?
- [ ] Eventos usam `defineEmits<T>()`?
- [ ] Lógica complexa está em computed/functions?
- [ ] Usa Tailwind ao invés de CSS customizado?
- [ ] Testes cobrem casos principais?
- [ ] Sem console.log esquecido?
- [ ] Nomes descritivos e em camelCase/PascalCase?
- [ ] Acessibilidade (aria-labels, semantic HTML)?
- [ ] Componente é reutilizável ou específico demais?

---

## Evolução dos Padrões

Estes padrões devem evoluir com o projeto. Se encontrar um caso que não se encaixa, documente e discuta com a equipe.

**Como propor mudanças:**
1. Abra uma issue/discussão
2. Explique o problema com o padrão atual
3. Proponha alternativa com exemplos
4. Consiga consenso da equipe
5. Atualize este documento

---

**Mantenha os padrões, mas não seja dogmático. Pragmatismo > Purismo.**

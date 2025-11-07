# 📚 Guia de Desenvolvimento - Hotel Booking

Este guia fornece instruções práticas para desenvolvedores que trabalham no projeto.

## 🚀 Setup Rápido

```bash
# Clone e entre no diretório
git clone <repo-url>
cd hotel-booking

# Instale dependências
yarn install

# Inicie o dev server
yarn dev

# Acesse http://localhost:3000
```

---

## 🏗️ Estrutura de Desenvolvimento

### Criando uma Nova Página

```bash
# Criar arquivo em app/pages/
touch app/pages/minha-pagina.vue
```

```vue
<!-- app/pages/minha-pagina.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold">Minha Página</h1>
    <p>Conteúdo da página</p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'

// SEO meta tags
useHead({
  title: 'Minha Página - Hotel Booking',
  meta: [
    { name: 'description', content: 'Descrição da página' }
  ]
})
</script>
```

**Rota criada automaticamente:** `/minha-pagina`

### Criando Rotas Dinâmicas

```bash
# Página com parâmetro dinâmico
touch app/pages/hotels/[id].vue
```

```vue
<script setup lang="ts">
const route = useRoute()
const hotelId = route.params.id // Acessa :id da URL
</script>
```

**Exemplos de URLs:**
- `/hotels/123` → `params.id = '123'`
- `/hotels/abc` → `params.id = 'abc'`

### Criando Componentes

```vue
<!-- app/components/MeuComponente.vue -->
<template>
  <div class="p-4 border rounded">
    <h3 class="font-bold">{{ titulo }}</h3>
    <p>{{ descricao }}</p>
    <button @click="handleClick">{{ textoBotao }}</button>
  </div>
</template>

<script setup lang="ts">
// Props tipadas
const props = defineProps<{
  titulo: string
  descricao: string
  textoBotao?: string
}>()

// Eventos tipados
const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>
```

**Uso:**
```vue
<MeuComponente
  titulo="Título"
  descricao="Descrição"
  texto-botao="Clique aqui"
  @click="handleAction"
/>
```

### Criando Componentes UI Reutilizáveis

```vue
<!-- app/components/ui/MeuBotao.vue -->
<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})

const buttonClass = computed(() => {
  const base = 'px-4 py-2 rounded font-semibold transition-colors'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  return `${base} ${variants[props.variant]}`
})
</script>
```

---

## 🔧 Trabalhando com Estado

### Estado Local (ref)

Para estado usado apenas em um componente:

```typescript
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const isOpen = ref(false)

function increment() {
  count.value++
}
</script>
```

### Estado Global (Pinia Store)

Para estado compartilhado entre componentes:

```typescript
// stores/minha-store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMinhaStore = defineStore('minha-store', () => {
  // Estado
  const items = ref<string[]>([])
  
  // Getters (computed)
  const itemCount = computed(() => items.value.length)
  const hasItems = computed(() => itemCount.value > 0)
  
  // Actions
  function addItem(item: string) {
    items.value.push(item)
  }
  
  function removeItem(index: number) {
    items.value.splice(index, 1)
  }
  
  function clearItems() {
    items.value = []
  }
  
  return {
    // Estado
    items,
    // Getters
    itemCount,
    hasItems,
    // Actions
    addItem,
    removeItem,
    clearItems
  }
})
```

**Usando a store:**

```vue
<script setup lang="ts">
import { useMinhaStore } from '~/stores/minha-store'

const store = useMinhaStore()

function handleAdd() {
  store.addItem('Novo item')
}
</script>

<template>
  <div>
    <p>Total: {{ store.itemCount }}</p>
    <ul>
      <li v-for="(item, index) in store.items" :key="index">
        {{ item }}
        <button @click="store.removeItem(index)">X</button>
      </li>
    </ul>
    <button @click="handleAdd">Adicionar</button>
  </div>
</template>
```

### Store com Persistência

```typescript
// stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<'light' | 'dark'>('light')
  
  // Carrega do localStorage na inicialização
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    if (saved) theme.value = saved as 'light' | 'dark'
  }
  
  // Salva automaticamente ao mudar
  watch(theme, (newTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  })
  
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  return { theme, toggleTheme }
})
```

---

## 🌐 Trabalhando com APIs

### Criando um Endpoint

```typescript
// server/api/produtos/listar.ts
export default defineEventHandler(async (event) => {
  // Lê query params (?categoria=X)
  const query = getQuery(event)
  const categoria = query.categoria?.toString()
  
  // Busca dados (mock ou DB)
  const produtos = await buscarProdutos(categoria)
  
  // Retorna JSON
  return produtos
})
```

**Acessível em:** `GET /api/produtos/listar?categoria=eletronicos`

### Endpoint POST

```typescript
// server/api/produtos/criar.ts
export default defineEventHandler(async (event) => {
  // Lê o body JSON
  const body = await readBody(event)
  
  // Valida dados
  if (!body.nome || !body.preco) {
    throw createError({
      statusCode: 400,
      message: 'Nome e preço são obrigatórios'
    })
  }
  
  // Salva produto (mock ou DB)
  const novoProduto = await salvarProduto(body)
  
  return { sucesso: true, produto: novoProduto }
})
```

**Uso:**
```bash
POST /api/produtos/criar
Content-Type: application/json

{
  "nome": "Produto X",
  "preco": 99.90
}
```

### Consumindo API no Cliente

```typescript
// composables/useProdutos.ts
export const useProdutos = () => {
  async function listar(categoria?: string) {
    const { data, error } = await useFetch('/api/produtos/listar', {
      params: { categoria },
      server: true // SSR
    })
    
    return { data: data.value || [], error }
  }
  
  async function criar(produto: Produto) {
    const { data, error } = await useFetch('/api/produtos/criar', {
      method: 'POST',
      body: produto
    })
    
    return { data: data.value, error }
  }
  
  return { listar, criar }
}
```

**Usando no componente:**

```vue
<script setup lang="ts">
const { listar, criar } = useProdutos()
const produtos = ref([])
const loading = ref(false)

async function carregarProdutos() {
  loading.value = true
  const { data, error } = await listar('eletronicos')
  if (!error) {
    produtos.value = data
  }
  loading.value = false
}

onMounted(() => {
  carregarProdutos()
})
</script>
```

---

## 🧪 Escrevendo Testes

### Teste de Componente

```typescript
// tests/components/MeuComponente.spec.ts
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MeuComponente from '../../app/components/MeuComponente.vue'

describe('MeuComponente', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza título corretamente', () => {
    const wrapper = mount(MeuComponente, {
      props: {
        titulo: 'Teste',
        descricao: 'Descrição de teste'
      }
    })
    
    expect(wrapper.text()).toContain('Teste')
    expect(wrapper.text()).toContain('Descrição de teste')
  })

  it('emite evento ao clicar no botão', async () => {
    const wrapper = mount(MeuComponente, {
      props: {
        titulo: 'Teste',
        descricao: 'Desc'
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

### Teste de Store

```typescript
// tests/stores/minha-store.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useMinhaStore } from '../../app/stores/minha-store'

describe('MinhaStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adiciona item corretamente', () => {
    const store = useMinhaStore()
    
    expect(store.itemCount).toBe(0)
    
    store.addItem('Item 1')
    
    expect(store.itemCount).toBe(1)
    expect(store.items[0]).toBe('Item 1')
  })

  it('remove item corretamente', () => {
    const store = useMinhaStore()
    
    store.addItem('Item 1')
    store.addItem('Item 2')
    store.removeItem(0)
    
    expect(store.itemCount).toBe(1)
    expect(store.items[0]).toBe('Item 2')
  })
})
```

### Teste de Página

```typescript
// tests/pages/minha-pagina.spec.ts
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MinhaPagina from '../../app/pages/minha-pagina.vue'

describe('MinhaPagina', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza título da página', () => {
    const wrapper = mount(MinhaPagina)
    expect(wrapper.find('h1').text()).toBe('Minha Página')
  })
})
```

### Mockando Composables

```typescript
// Mock do useRoute
vi.mock('nuxt/app', () => ({
  useRoute: () => ({
    params: { id: '123' },
    query: { filtro: 'teste' }
  }),
  navigateTo: vi.fn(),
  useHead: () => {}
}))
```

### Rodando Testes

```bash
# Rodar todos os testes
yarn test

# Modo watch (re-executa ao salvar)
yarn test:watch

# Rodar arquivo específico
yarn test tests/components/MeuComponente.spec.ts

# Com cobertura
yarn test --coverage
```

---

## 🎨 Estilização com Tailwind

### Classes Utilitárias Comuns

```html
<!-- Layout -->
<div class="flex items-center justify-between">...</div>
<div class="grid grid-cols-3 gap-4">...</div>
<div class="container mx-auto px-4">...</div>

<!-- Espaçamento -->
<div class="p-4">Padding 1rem</div>
<div class="mt-8 mb-4">Margin top 2rem, bottom 1rem</div>
<div class="space-y-4">Gap vertical entre filhos</div>

<!-- Tipografia -->
<h1 class="text-3xl font-bold">Título</h1>
<p class="text-gray-600">Texto cinza</p>
<span class="text-sm uppercase">Pequeno e maiúsculo</span>

<!-- Cores -->
<div class="bg-blue-600 text-white">...</div>
<div class="border-2 border-gray-300">...</div>

<!-- Responsivo -->
<div class="block md:flex lg:grid lg:grid-cols-4">
  <!-- block em mobile, flex em tablet, grid em desktop -->
</div>

<!-- Interações -->
<button class="hover:bg-blue-700 active:scale-95 transition-all">
  Clique
</button>
```

### Customizando Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
        }
      },
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

---

## 🔍 Debugging

### Vue DevTools

1. Instale a extensão: [Vue DevTools](https://devtools.vuejs.org/)
2. Abra o navegador (F12) → aba "Vue"
3. Inspecione:
   - Componentes e props
   - Pinia stores
   - Eventos emitidos
   - Performance

### Console Logs

```typescript
// Durante desenvolvimento
console.log('Valor:', valor)
console.table(array) // Tabela formatada
console.error('Erro:', error)

// Remova antes do commit!
```

### Breakpoints

```typescript
// Pausa execução no DevTools
debugger

// Ou use o DevTools do navegador:
// Sources → Clique na linha → Breakpoint
```

### Network Inspection

1. F12 → Network
2. Filtre por "Fetch/XHR"
3. Veja requisições à API
4. Inspecione headers, payload, response

---

## 📝 Boas Práticas

### Nomenclatura

```typescript
// Componentes: PascalCase
MeuComponente.vue
HotelCard.vue

// Composables: camelCase com prefixo 'use'
useHotels.ts
useApi.ts

// Stores: camelCase com sufixo 'Store'
authStore.ts
bookingStore.ts

// Tipos: PascalCase
interface Hotel { }
type SearchParams = { }

// Variáveis: camelCase
const userName = 'João'
const isActive = true
```

### Organização de Imports

```typescript
// 1. Vue/Nuxt
import { ref, computed } from 'vue'
import { useRoute } from 'nuxt/app'

// 2. Bibliotecas externas
import { useNotificationStore } from 'pinia'

// 3. Componentes
import HotelCard from './HotelCard.vue'

// 4. Utils/helpers
import { formatDate } from '~/utils/date'

// 5. Types
import type { Hotel } from '~/types'
```

### Comentários

```typescript
// ✅ BOM: Explica o "porquê"
// Debounce para evitar requisições excessivas durante digitação
const searchDebounced = debounce(search, 300)

// ❌ RUIM: Explica o "o quê" (óbvio no código)
// Incrementa o contador
count.value++
```

### TypeScript

```typescript
// ✅ Use tipos explícitos em interfaces públicas
interface Props {
  hotel: Hotel
  startDate: string
}

// ✅ Aproveite type inference em variáveis locais
const count = ref(0) // TypeScript infere Ref<number>

// ❌ Evite 'any'
function processar(dados: any) { } // Ruim

// ✅ Use tipos específicos
function processar(dados: Hotel[]) { } // Bom
```

---

## 🚀 Deploy

### Build de Produção

```bash
# Gera build otimizada em .output/
yarn build

# Testa build localmente
yarn preview
```

### Vercel

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Netlify

```bash
# Build command
yarn build

# Publish directory
.output/public
```

### Variáveis de Ambiente

```bash
# .env
NUXT_PUBLIC_API_BASE=https://api.exemplo.com
DATABASE_URL=postgres://...

# Acesso no código:
const config = useRuntimeConfig()
console.log(config.public.apiBase)
```

---

## 🆘 Troubleshooting

### Erro: "Cannot find module"

```bash
# Limpe cache e reinstale
rm -rf node_modules .nuxt
yarn install
```

### Erro de hidratação

```
Hydration mismatch: different content on server vs client
```

**Causa:** Conteúdo diferente entre SSR e cliente.

**Solução:**
```typescript
// Use ClientOnly para conteúdo apenas no cliente
<ClientOnly>
  <ComponenteComLocalStorage />
</ClientOnly>
```

### Erro de tipagem TypeScript

```bash
# Regenere tipos do Nuxt
yarn nuxi prepare
```

### Port 3000 já em uso

```bash
# Use outra porta
PORT=3001 yarn dev
```

---

## 📚 Recursos Úteis

- [Documentação do Nuxt 3](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/introduction.html)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vitest Docs](https://vitest.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy coding! 🎉**

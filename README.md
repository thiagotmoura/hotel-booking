# 🏨 Hotel Booking

Uma plataforma moderna de busca e reserva de hotéis, construída com Nuxt 3, Vue 3, TypeScript e Tailwind CSS.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🎯 Sobre o Projeto

O Hotel Booking é uma aplicação web completa para busca, comparação e reserva de hotéis. O projeto foi desenvolvido com foco em experiência do usuário, performance e manutenibilidade, utilizando as melhores práticas de desenvolvimento front-end.

## ✨ Funcionalidades

### 🔍 Busca Inteligente
- Busca por destino com autocomplete
- Filtros por datas (check-in/check-out)
- Seleção de número de hóspedes e quartos
- Resultados em tempo real via SSR

### ⚖️ Comparação de Quartos
- Compare até 3 quartos lado a lado
- Visualização detalhada de comodidades e preços
- Análise de melhor custo-benefício
- Persistência da seleção durante a navegação

### 📝 Sistema de Reservas
- Formulário completo de reserva
- Validação de dados do cliente
- Cálculo automático de total (diárias × preço)
- Histórico de reservas do usuário

### 🔔 Notificações
- Sistema de toast notifications
- Feedback visual para ações do usuário
- Notificações de sucesso, erro, aviso e informação
- Remoção automática após timeout

### 👤 Autenticação
- Login simplificado (aceita qualquer credencial para demonstração)
- Persistência de sessão no localStorage
- Estado global de autenticação via Pinia

### 🎨 Interface Moderna
- Design responsivo e mobile-first
- Componentes reutilizáveis (BaseButton, BaseCard, Section, etc.)
- Carrossel de imagens para hotéis e quartos
- Animações e transições suaves
- SEO otimizado com meta tags e structured data

## 🛠 Tecnologias

### Core
- **Nuxt 3** - Framework Vue.js com SSR, file-based routing e composables
- **Vue 3** - Framework JavaScript reativo com Composition API
- **TypeScript** - Tipagem estática e melhor DX
- **Tailwind CSS** - Utility-first CSS framework

### Estado e Dados
- **Pinia** - Store pattern oficial do Vue (substituindo Vuex)
- **SSR Endpoints** - API routes do Nuxt para dados server-side
- **LocalStorage** - Persistência de dados do cliente (auth, bookings)

### Testes
- **Vitest** - Test runner rápido e compatível com Vite
- **@vue/test-utils** - Utilities oficiais para testes de componentes Vue
- **happy-dom** - DOM environment para testes

### Desenvolvimento
- **Vite** - Build tool extremamente rápido
- **ESLint** - Linting e code quality
- **Git** - Controle de versão

## 🏗 Arquitetura

### Decisões de Design

#### 1. **Composables e Composition API**
Adotamos a Composition API do Vue 3 e criamos composables reutilizáveis para lógica compartilhada:

```typescript
// composables/useApi.ts - Wrapper SSR-safe para useFetch
export const useApi = () => {
  return {
    async get(url: string, opts = {}) {
      return useFetch(url, { ...opts, method: 'GET' })
    }
  }
}

// composables/useHotels.ts - Abstração de chamadas de API
export const useHotels = () => {
  const api = useApi()
  return {
    async search(params) { /* ... */ },
    async getAll() { /* ... */ }
  }
}
```

**Vantagens:**
- Reutilização de lógica entre componentes
- Melhor organização e testabilidade
- Tree-shaking automático
- Type-safety com TypeScript

#### 2. **SSR Endpoints vs Client-Side Fetching**
Utilizamos os endpoints do Nuxt (`server/api/*`) para processamento server-side:

```typescript
// server/api/hotels/search.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = getQuery(event)
  // Processamento server-side, filtros, ordenação
  return filteredHotels
})
```

**Vantagens:**
- Melhor SEO (dados renderizados no servidor)
- Performance (menos processamento no cliente)
- Segurança (lógica sensível no servidor)
- Hydration mais rápida

#### 3. **Sistema de Componentes Reutilizáveis**
Criamos um design system com componentes base:

```
app/components/ui/
├── BaseButton.vue      # Botões com variantes (primary, secondary, ghost)
├── BaseCard.vue        # Card container com padding configurável
├── Section.vue         # Seções de página com slots title/subtitle
├── FeatureCard.vue     # Cards de features da home
├── EmptyState.vue      # Estado vazio com slots customizáveis
└── LoadingSpinner.vue  # Indicador de loading
```

**Vantagens:**
- Consistência visual
- Facilita manutenção
- Reduz duplicação de código
- Props e slots para flexibilidade

#### 4. **Gerenciamento de Estado com Pinia**
Separamos o estado em stores especializadas:

```
app/stores/
├── auth.ts         # Autenticação e usuário
├── search.ts       # Parâmetros de busca
├── comparison.ts   # Quartos selecionados para comparação
├── booking.ts      # Reservas e booking atual
└── notification.ts # Sistema de notificações
```

**Vantagens:**
- Separação de responsabilidades
- Estado reativo e centralizado
- DevTools integration
- TypeScript-first

#### 5. **Busca com Autocomplete e Debounce**
Implementamos busca inteligente de destinos:

```typescript
// Debounce local para evitar requisições excessivas
const searchDestinations = debounceFn(async (query: string) => {
  if (query.length < 3) return
  const response = await fetch(`/api/destinations/search?q=${query}`)
  destinations.value = await response.json()
}, 300)

// Watch reativo no input com guarda SSR
watch(() => search.value?.destination || '', (newQuery) => {
  if (newQuery) searchDestinations(newQuery)
})
```

**Vantagens:**
- UX melhorada (feedback instantâneo)
- Performance (menos chamadas à API)
- SSR-safe (guardas para hidratação)

#### 6. **Normalização de Dados**
Criamos funções de normalização para busca:

```typescript
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
}

function parseDestination(destination: string) {
  // Suporta "Manaus, AM" ou "Manaus AM"
  const parts = destination.split(/[,\s]+/).filter(Boolean)
  // Retorna { city, uf } para matching preciso
}
```

**Vantagens:**
- Busca funciona com ou sem acentos
- Flexibilidade no formato de entrada
- Resultados mais precisos

#### 7. **Testes Abrangentes**
Estrutura de testes com Vitest:

```
tests/
├── setup.ts                    # Mocks globais (navigateTo, useFetch)
├── components/                 # Testes de componentes
│   ├── Navbar.spec.ts
│   ├── HotelSearch.spec.ts
│   ├── HotelCard.spec.ts
│   └── ui/                     # Testes do design system
├── pages/                      # Testes de páginas
│   ├── index.spec.ts
│   ├── hotels.index.spec.ts
│   └── compare.spec.ts
└── vitest.config.ts            # Configuração do Vitest
```

**Vantagens:**
- Confiança no código
- Refactoring seguro
- Documentação viva
- CI/CD ready

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18+ (recomendado: 20.x)
- **Yarn** 1.22+ (ou npm/pnpm)
- **Git**

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd hotel-booking
```

2. **Instale as dependências**
```bash
yarn install
```

3. **Inicie o servidor de desenvolvimento**
```bash
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

## 🚀 Desenvolvimento

### Comandos Disponíveis

```bash
# Desenvolvimento (hot-reload)
yarn dev

# Build para produção
yarn build

# Preview da build de produção
yarn preview

# Executar testes
yarn test

# Executar testes em modo watch
yarn test:watch

# Preparar tipos do Nuxt
yarn postinstall
```

### Estrutura de Desenvolvimento

#### Adicionando uma Nova Página
```bash
# Criar arquivo em app/pages/
touch app/pages/nova-pagina.vue
```

Nuxt automaticamente cria a rota `/nova-pagina`.

#### Criando um Novo Componente
```typescript
// app/components/MeuComponente.vue
<template>
  <div>{{ mensagem }}</div>
</template>

<script setup lang="ts">
defineProps<{
  mensagem: string
}>()
</script>
```

Auto-importado em qualquer página ou componente.

#### Adicionando uma Nova Store
```typescript
// app/stores/minha-store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMinhaStore = defineStore('minha-store', () => {
  const valor = ref(0)
  
  function incrementar() {
    valor.value++
  }
  
  return { valor, incrementar }
})
```

#### Criando um Endpoint SSR
```typescript
// server/api/meu-endpoint.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const body = await readBody(event).catch(() => null)
  
  // Lógica do endpoint
  return { sucesso: true, dados: [] }
})
```

Acessível em `/api/meu-endpoint`.

## 🧪 Testes

### Executando Testes

```bash
# Rodar todos os testes uma vez
yarn test

# Modo watch (re-executa ao salvar)
yarn test:watch

# Com cobertura
yarn test --coverage
```

### Escrevendo Testes

#### Teste de Componente
```typescript
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MeuComponente from '../../app/components/MeuComponente.vue'

describe('MeuComponente', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza corretamente', () => {
    const wrapper = mount(MeuComponente, {
      props: { mensagem: 'Olá' }
    })
    expect(wrapper.text()).toContain('Olá')
  })
})
```

#### Teste de Store
```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useMinhaStore } from '../../app/stores/minha-store'

describe('MinhaStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('incrementa o valor', () => {
    const store = useMinhaStore()
    expect(store.valor).toBe(0)
    store.incrementar()
    expect(store.valor).toBe(1)
  })
})
```

### Cobertura Atual

- ✅ 13 arquivos de teste
- ✅ 15 testes passando
- ✅ Componentes principais cobertos
- ✅ Páginas principais cobertas
- ✅ Design system completo testado

## 📁 Estrutura do Projeto

```
hotel-booking/
├── app/                        # Código fonte da aplicação
│   ├── components/             # Componentes Vue
│   │   ├── ui/                 # Design system (BaseButton, BaseCard, etc.)
│   │   ├── ComparisonBar.vue   # Barra de comparação flutuante
│   │   ├── Footer.vue          # Rodapé
│   │   ├── HotelCard.vue       # Card de hotel com quartos
│   │   ├── HotelSearch.vue     # Formulário de busca
│   │   ├── ImageCarousel.vue   # Carrossel de imagens
│   │   ├── Navbar.vue          # Barra de navegação
│   │   ├── NotificationToast.vue # Sistema de notificações
│   │   └── StructuredData.vue  # Structured data para SEO
│   ├── layouts/                # Layouts de página
│   │   └── default.vue         # Layout padrão
│   ├── pages/                  # Páginas (file-based routing)
│   │   ├── index.vue           # Página inicial
│   │   ├── hotels/
│   │   │   ├── index.vue       # Listagem de hotéis
│   │   │   └── [id].vue        # Detalhes do hotel
│   │   ├── compare.vue         # Comparação de quartos
│   │   ├── booking.vue         # Formulário de reserva
│   │   ├── my-bookings.vue     # Histórico de reservas
│   │   └── login.vue           # Login
│   ├── stores/                 # Pinia stores
│   │   ├── auth.ts             # Estado de autenticação
│   │   ├── booking.ts          # Gerenciamento de reservas
│   │   ├── comparison.ts       # Comparação de quartos
│   │   ├── notification.ts     # Sistema de notificações
│   │   └── search.ts           # Parâmetros de busca
│   └── app.vue                 # Componente raiz
├── composables/                # Composables reutilizáveis
│   ├── useApi.ts               # Wrapper para useFetch (SSR-safe)
│   └── useHotels.ts            # Lógica de busca de hotéis
├── server/                     # Server-side code
│   └── api/                    # API endpoints
│       ├── hotels.ts           # Dados mockados de hotéis
│       ├── hotels/
│       │   └── search.ts       # Endpoint de busca (GET/POST)
│       └── destinations/
│           └── search.ts       # Autocomplete de destinos
├── tests/                      # Testes automatizados
│   ├── setup.ts                # Configuração global de testes
│   ├── components/             # Testes de componentes
│   └── pages/                  # Testes de páginas
├── public/                     # Arquivos estáticos
│   └── robots.txt              # SEO robots
├── nuxt.config.ts              # Configuração do Nuxt
├── tailwind.config.js          # Configuração do Tailwind
├── tsconfig.json               # Configuração do TypeScript
├── vitest.config.ts            # Configuração do Vitest
└── package.json                # Dependências e scripts
```

## 🎨 Padrões de Código

### TypeScript
- Use tipos explícitos para props e eventos
- Evite `any`, prefira `unknown` quando necessário
- Aproveite o type inference do Vue 3

### Vue/Nuxt
- Prefira Composition API com `<script setup>`
- Use composables para lógica reutilizável
- Componentes auto-importados (sem imports explícitos quando possível)
- Props com `defineProps<Type>()` para type safety

### CSS/Tailwind
- Use utility classes do Tailwind
- Evite CSS customizado quando possível
- Componentes base para consistência visual

### Estado
- Use Pinia para estado global
- `ref()` e `computed()` para reatividade
- Persista dados sensíveis apenas quando necessário

## 🚢 Deploy

### Build de Produção

```bash
# Gerar build otimizada
yarn build

# Testar build localmente
yarn preview
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
# Exemplo (ajuste conforme sua infraestrutura)
NUXT_PUBLIC_API_BASE=https://api.exemplo.com
```

### Plataformas Recomendadas

- **Vercel** - Deploy automático com Git integration
- **Netlify** - Simples e com preview deployments
- **Cloudflare Pages** - Edge computing e CDN global
- **AWS Amplify** - Integração com AWS

## 📝 Licença

Este projeto é fornecido como exemplo educacional.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Nuxt 3 e Vue 3**

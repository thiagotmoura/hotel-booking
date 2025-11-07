interface Destination {
  id: number
  city: string
  state: string
  country: string
  airports: string[]
}

export const destinations: Destination[] = [
  { id: 1, city: 'São Paulo', state: 'SP', country: 'Brasil', airports: ['GRU', 'CGH'] },
  { id: 2, city: 'Rio de Janeiro', state: 'RJ', country: 'Brasil', airports: ['GIG', 'SDU'] },
  { id: 3, city: 'Salvador', state: 'BA', country: 'Brasil', airports: ['SSA'] },
  { id: 4, city: 'Fortaleza', state: 'CE', country: 'Brasil', airports: ['FOR'] },
  { id: 5, city: 'Recife', state: 'PE', country: 'Brasil', airports: ['REC'] },
  { id: 6, city: 'Porto Alegre', state: 'RS', country: 'Brasil', airports: ['POA'] },
  { id: 7, city: 'Manaus', state: 'AM', country: 'Brasil', airports: ['MAO'] },
  { id: 8, city: 'Brasília', state: 'DF', country: 'Brasil', airports: ['BSB'] },
  { id: 9, city: 'Curitiba', state: 'PR', country: 'Brasil', airports: ['CWB'] },
  { id: 10, city: 'Belém', state: 'PA', country: 'Brasil', airports: ['BEL'] }
]

const cities = [
  'Porto Seguro', 'Natal', 'Florianópolis', 'Belo Horizonte', 'Vitória',
  'João Pessoa', 'Maceió', 'Aracaju', 'São Luís', 'Teresina',
  'Campo Grande', 'Cuiabá', 'Goiânia', 'Porto Velho', 'Rio Branco',
  'Macapá', 'Boa Vista', 'Palmas'
]

const states = ['BA', 'RN', 'SC', 'MG', 'ES', 'PB', 'AL', 'SE', 'MA', 'PI', 'MS', 'MT', 'GO', 'RO', 'AC', 'AP', 'RR', 'TO']

export const extraDestinations: Destination[] = Array.from({ length: 90 }, (_, i) => {
  const cityIndex = Math.floor(Math.random() * cities.length)
  const stateIndex = Math.floor(Math.random() * states.length)
  const id = i + 11

  return {
    id,
    city: `${cities[cityIndex]} ${Math.floor(i / cities.length) + 1}`,
    state: states[stateIndex],
    country: 'Brasil',
    airports: [`${states[stateIndex]}${id}`]
  }
})

export const allDestinations = [...destinations, ...extraDestinations]
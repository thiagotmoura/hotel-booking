import { defineEventHandler, getQuery } from 'h3'
import { allDestinations } from '../../data/destinations'

function normalize(str: string) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

export default defineEventHandler((event) => {
  const { q = '' } = getQuery(event)
  const term = normalize(String(q))
  if (!term || term.length < 2) return []

  const results = allDestinations
    .map(d => ({
      id: d.id,
      label: `${d.city}, ${d.state}`,
      city: d.city,
      state: d.state,
      country: d.country,
      airports: d.airports
    }))
    .filter(d => {
      const hay = normalize(`${d.city} ${d.state} ${d.airports.join(' ')}`)
      return hay.includes(term)
    })
    .slice(0, 20)

  return results
})

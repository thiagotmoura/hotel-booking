import { defineEventHandler, readBody } from 'h3'
import { hotels } from '../../data/hotels'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    destination = '',
    guests = 1,
    startDate,
    endDate,
    sortBy = 'name',
    sortDir = 'asc'
  } = body || {}

  // normalize and parse helpers
  const normalize = (text: string) => String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  function parseDestination(input: string) {
    const term = normalize(input)
    if (!term) return { city: '', state: '' }
    // Prefer comma separated
    if (term.includes(',')) {
      const [city, state] = term.split(',').map(s => s.trim())
      return { city, state }
    }
    // Fallback: last token as 2-letter state
    const m = term.match(/^(.*?)[\s-]+([a-z]{2})$/)
    if (m) return { city: m[1].trim(), state: m[2] }
    return { city: term, state: '' }
  }

  const { city: citySearch, state: stateSearch } = parseDestination(destination)

  // Build availableRooms per hotel based on capacity (dates are not validated in mock)
  const g = Number(guests)
  let results = hotels
    // destination filter
    .filter(h => {
      const addr: any = h.address || {}
      if (!citySearch && !stateSearch) return true
      const cityNorm = normalize(addr.city)
      const stateNorm = normalize(addr.state)
      if (stateSearch) {
        // Require exact state match and city match (exact or startsWith)
        return stateNorm === stateSearch && (cityNorm === citySearch || cityNorm.startsWith(citySearch))
      }
      const term = citySearch
      return (
        normalize(h.name).includes(term) ||
        cityNorm.includes(term) ||
        normalize(addr.neighborhood).includes(term) ||
        stateNorm.includes(term)
      )
    })
    .map(h => ({
      ...h,
      availableRooms: (h.rooms || []).filter(r => r.capacity >= g)
    }))
    .filter(h => (h.availableRooms?.length || 0) > 0)

  // sort
  results.sort((a: any, b: any) => {
    const dir = sortDir === 'desc' ? -1 : 1
    switch (sortBy) {
      case 'price': {
        const pa = Math.min(...(a.availableRooms || a.rooms).map((r: any) => r.price))
        const pb = Math.min(...(b.availableRooms || b.rooms).map((r: any) => r.price))
        return (pa - pb) * dir
      }
      case 'rating':
        return (a.rating - b.rating) * dir
      default:
        return String(a.name).localeCompare(String(b.name)) * dir
    }
  })

  return results
})

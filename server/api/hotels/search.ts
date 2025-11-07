import { defineEventHandler, readBody, getQuery } from 'h3'
import { hotels } from '../../data/hotels'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => undefined)
  const query = getQuery(event)
  const destination = (body as any)?.destination ?? (query.destination as string) ?? ''
  const guests = Number((body as any)?.guests ?? query.guests ?? 1)
  const startDate = (body as any)?.startDate ?? (query.startDate as string) ?? ''
  const endDate = (body as any)?.endDate ?? (query.endDate as string) ?? ''
  const sortBy = ((body as any)?.sortBy ?? (query.sortBy as string) ?? 'name') as 'name' | 'price' | 'rating'
  const sortDir = ((body as any)?.sortDir ?? (query.sortDir as string) ?? 'asc') as 'asc' | 'desc'

  const guestCount = Number(guests) || 1

  const normalize = (text: string) => String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  function parseDestination(input: string) {
    const term = normalize(input)
    if (!term) return { city: '', state: '' }
    if (term.includes(',')) {
      const [city, state] = term.split(',').map(s => s.trim())
      return { city, state }
    }
    const m = term.match(/^(.*?)[\s-]+([a-z]{2})$/)
    if (m) return { city: m[1].trim(), state: m[2] }
    return { city: term, state: '' }
  }
  const { city: citySearch, state: stateSearch } = parseDestination(destination as string)

  // filter hotels by destination (name, city, neighborhood or state)
  let results = hotels
    .filter(h => {
      const addr: any = h.address || {}
      const cityNorm = normalize(addr.city)
      const stateNorm = normalize(addr.state)
      if (!citySearch && !stateSearch) return true
      if (stateSearch) {
        return stateNorm === stateSearch && (cityNorm === citySearch || cityNorm.startsWith(citySearch))
      }
      const term = citySearch
      return (
        (h.name && normalize(h.name).includes(term)) ||
        (addr.city && cityNorm.includes(term)) ||
        (addr.neighborhood && normalize(addr.neighborhood).includes(term)) ||
        (addr.state && stateNorm.includes(term))
      )
    })
    .map(h => {
      // compute available rooms by capacity >= guests
      const availableRooms = (h.rooms || []).filter((r: any) => (r.capacity || 0) >= guestCount)
      return { ...h, availableRooms }
    })
    // remove hotels without available rooms
    .filter(h => (h.availableRooms || []).length > 0)

  // sorting
  const dir = sortDir === 'desc' ? -1 : 1
  if (sortBy === 'price') {
    results.sort((a: any, b: any) => {
      const aMin = Math.min(...(a.availableRooms || []).map((r: any) => r.price || Infinity))
      const bMin = Math.min(...(b.availableRooms || []).map((r: any) => r.price || Infinity))
      return (aMin - bMin) * dir
    })
  } else if (sortBy === 'rating') {
    results.sort((a: any, b: any) => ((a.rating || 0) - (b.rating || 0)) * dir)
  } else {
    // default: name
    results.sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)) * dir)
  }

  return results
})

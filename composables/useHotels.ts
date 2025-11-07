import { useApi } from './useApi'

export function useHotels() {
  const { post, get } = useApi()

  const search = async (params: {
    destination: string
    guests: number
    startDate: string
    endDate: string
    sortBy?: 'name' | 'price' | 'rating'
    sortDir?: 'asc' | 'desc'
  }) => {
    const { data, error } = await post<any[]>('/api/hotels/search', params)
    return { data: data.value || [], error }
  }

  const getAll = async () => {
    const { data, error } = await get<any[]>('/api/hotels')
    return { data: data.value || [], error }
  }

  return { search, getAll }
}

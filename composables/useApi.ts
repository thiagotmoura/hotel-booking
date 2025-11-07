import { useFetch, type UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T = any>(url: string, options: UseFetchOptions<any> = {}) {
  return useFetch<T>(url, {
    server: true,
    ...(options as any)
  } as any)
}

export function useApi() {
  return {
    get: <T = any>(url: string, options: UseFetchOptions<any> = {}) => useApiFetch<T>(url, { method: 'GET', ...(options as any) }),
    post: <T = any>(url: string, body?: any, options: UseFetchOptions<any> = {}) => useApiFetch<T>(url, { method: 'POST', body, ...(options as any) })
  }
}

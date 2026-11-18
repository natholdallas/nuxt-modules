import { useRouter } from 'nuxt/app'

export function useQueryStr(query: string, defaultValue?: string, fallback?: VoidFunction) {
  const router = useRouter()
  const raw = router.currentRoute.value.query[query]
  const result = typeof raw === 'string' && raw !== '' ? raw : undefined
  if (result === undefined) {
    if (defaultValue !== undefined) return defaultValue
    fallback?.()
    return undefined
  }
  return result
}

export function useQueryInt(q: string, defaultValue?: number, fallback?: VoidFunction) {
  const router = useRouter()
  const raw = router.currentRoute.value.query[q]
  // Parse only when the parameter is actually present: `parseInt(undefined)` is
  // NaN, but the previous `!result` check also rejected a legitimate 0 (page=0).
  const result = typeof raw === 'string' && raw !== '' ? Number.parseInt(raw, 10) : Number.NaN
  if (Number.isNaN(result)) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    fallback?.()
    return undefined
  }
  return result
}

export function useRequiredQueryInt(q: string, defaultValue?: number) {
  const router = useRouter()
  return useQueryInt(q, defaultValue, router.back)!
}

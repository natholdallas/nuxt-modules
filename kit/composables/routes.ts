export function useQueryStr(query: string, defaultValue?: string, fallback?: VoidFunction) {
  const router = useRouter()
  const result = router.currentRoute.value.query[query] as string
  if (!result) {
    if (defaultValue) return defaultValue
    fallback?.()
    return undefined
  }
  return result
}

export function useQueryInt(q: string, defaultValue?: number, fallback?: VoidFunction) {
  const router = useRouter()
  const result = parseInt(router.currentRoute.value.query[q] as string)
  if (isNaN(result) || !result) {
    if (defaultValue) {
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

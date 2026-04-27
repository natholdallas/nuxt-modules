type PathRecord = Record<string, string | Record<string, any>>
type U<T> = { index: string } & T

export function makeUrls<T extends PathRecord>(prefix: string, urls: T): Readonly<U<T>> {
  prefix = noStartSlash(noEndSlash(prefix))
  const conv = depthconv(prefix)
  return Object.entries(urls).reduce((acc, [k, v]) => Object.assign(acc, { [k]: conv(v) }), <U<T>>{
    index: ensureStartSlash(prefix),
  })
}

export function getUrl() {
  return window.location.href
}

function depthconv(prefix: string) {
  const func = (obj: string | PathRecord) => {
    if (typeof obj === 'string') {
      return ensureStartSlash(`${prefix}${ensureStartSlash(obj)}`)
    }
    const record: PathRecord = {}
    for (const k in obj) {
      if (typeof obj[k] === 'string') {
        record[k] = ensureStartSlash(`${prefix}${obj[k]}`)
      } else {
        record[k] = func(obj[k]!)
      }
    }
    return record
  }
  return func
}

function ensureStartSlash(url: string) {
  return url.startsWith('/') ? url : `/${url}`
}

function noEndSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function noStartSlash(url: any) {
  return url.startsWith('/') ? url.slice(1) : url
}

import { createAlova, Method, type AlovaGenerics, type CacheConfig, type RequestBody } from 'alova'
import type { AlovaFrontMiddleware } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { isEmpty } from 'lodash'

export type Arg = Record<string, any> & { length?: never }
export type RequestConfig<T = any> = Partial<{
  sub: string
  params: any[]
  queries: Arg
  headers: Arg
  data: RequestBody
  transform: (data: any, headers: any) => T | Promise<T>
  excludes: string[]
  includes: string[]
  cache: CacheConfig<AlovaGenerics>
}>
export type FetchEvent = (response: Response, method: Method, data: any) => void
export type FetchHandler<T = any> = (conf: RequestConfig<T>) => void

function fromData(response: Response) {
  const ct = response.headers.get('Content-Type')
  // no content
  if (response.status === 204 || !ct) {
    return
  }
  // json
  if (ct.includes('application/json')) {
    return response.json()
  }
  // blob
  if (
    ct.includes('image/') ||
    ct.includes('audio/') ||
    ct.includes('video/') ||
    ct.includes('application/pdf') ||
    ct.includes('application/octet-stream')
  ) {
    return response.blob()
  }
  // array buffer
  if (ct.includes('application/zip') || ct.includes('arraybuffer')) {
    return response.arrayBuffer()
  }
  // text
  return response.text()
}

export function sneakyfetch(baseURL?: string, ...g: FetchHandler[]) {
  const events: Record<number, FetchEvent> = {}
  const alova = createAlova({
    requestAdapter: adapterFetch(),
    cacheFor: null,
    statesHook: VueHook,
    responded: {
      async onSuccess(response: Response, method: Method) {
        const v = await fromData(response)
        const fn = events[response.status]
        if (fn) {
          fn(response, method, v)
        } else {
          events[-1]?.(response, method, v)
        }
        return v
      },
    },
  })

  function sneaky(baseUrl?: string, ...g: FetchHandler[]) {
    return {
      Group(subUrl: string, ...handlers: FetchHandler[]) {
        return sneaky(baseUrl + subUrl, ...handlers)
      },

      Get<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Get<T>(mku(baseUrl, c.sub, c.params), mkc(c))
      },

      Post<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Post<T>(mku(baseUrl, c.sub, c.params), mkd(c.data, c.includes, c.excludes), mkc(c))
      },

      Put<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Put<T>(mku(baseUrl, c.sub, c.params), mkd(c.data, c.includes, c.excludes), mkc(c))
      },

      Delete<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Delete<T>(mku(baseUrl, c.sub, c.params), mkd(c.data, c.includes, c.excludes), mkc(c))
      },

      Head<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Head<T>(mku(baseUrl, c.sub, c.params), mkc(c))
      },

      Options<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Options<T>(mku(baseUrl, c.sub, c.params), mkc(c))
      },

      Patch<T = void>(c: RequestConfig<T> = {}, ...h: FetchHandler<T>[]) {
        g.forEach((execute) => execute(c))
        h.forEach((execute) => execute(c))
        return alova.Patch<T>(mku(baseUrl, c.sub, c.params), mkd(c.data, c.includes, c.excludes), mkc(c))
      },
    }
  }
  return {
    NewEvent(httpStatus: number, fn: FetchEvent) {
      events[httpStatus] = fn
    },
    ...sneaky(baseURL, ...g),
  }
}

function mkd(data?: any, includes?: string[], excludes?: string[]) {
  console.log(isPlainObject(data))
  if (isPlainObject(data)) {
    const res: Record<string, any> = {}
    includes?.forEach((x) => (res[x] = data[x]))
    excludes?.forEach((x) => delete res[x])
    return isEmpty(res) ? data : res
  }
  return data
}

function mkq(data: Arg = {}) {
  return Object.fromEntries(Object.entries(data).filter(([_k, v]) => v !== null))
}

function mkc(c: RequestConfig<any> = {}) {
  return {
    params: mkq(c.queries),
    headers: c.headers,
    transform: c.transform,
    cacheFor: c.cache,
  }
}

function mku(baseURL: string = '', subURL: string = '', params: any[] = []) {
  const p = params?.filter((x) => !!x)
  const path = isEmpty(p) ? '' : toStart(p.join('/'))
  const sub = !!subURL ? trimEnd(toStart(subURL)) : ''
  return baseURL + sub + path
}

function isPlainObject(val: any): val is Record<string, any> {
  return (
    val !== null &&
    typeof val === 'object' &&
    Object.prototype.toString.call(val) === '[object Object]' &&
    // excludes other types
    !(val instanceof FormData) &&
    !(val instanceof Blob) &&
    !(val instanceof ArrayBuffer) &&
    !(val instanceof URLSearchParams) &&
    !(val instanceof ReadableStream) &&
    !(val instanceof Array)
  )
}

export type Mid = () => Promise<boolean> | boolean
export function middlewares<AG extends AlovaGenerics, Args extends any[]>(...s: Mid[]): AlovaFrontMiddleware<AG, Args> {
  return async (_, next) => {
    for (const fn of s) if (!(await fn())) return
    next()
  }
}

function toStart(url: string, char: string = '/') {
  return url.startsWith(char) ? url : `${char}${url}`
}

function trimEnd(url: string, char: string = '/') {
  return url.endsWith(char) ? url.slice(0, -1) : url
}

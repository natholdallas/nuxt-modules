import { cloneDeep } from 'lodash'

export function inst<T extends {} = {}>(model: T, s?: Partial<T>): T {
  return Object.assign(cloneDeep(model), s)
}

export function keys(s: any) {
  return Object.keys(s)
}

export function rst<T extends {}>(src: T, source: any) {
  Object.assign(src, source)
}

export function cpm<T extends {}>(src: T) {
  return cloneDeep(src)
}

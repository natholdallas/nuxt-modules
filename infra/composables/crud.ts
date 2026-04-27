import cloneDeep from 'lodash/cloneDeep'
import { ref, shallowRef } from 'vue'

// Example:
// const { mi, mo, sc, su, sr, reset } = useCrud<>()
export function useCrud<I, O = I>(mi?: I, mo?: O) {
  if (!mo) mo = cloneDeep<any>(mi)
  const crud = {
    mi: ref(mi!),
    mo: ref(mo!),
    sc: shallowRef(false),
    su: shallowRef(false),
    sr: shallowRef(false),
  }
  return {
    ...crud,
    reset() {
      crud.sc.value = false
      crud.su.value = false
      crud.sr.value = false
      crud.mi.value = cloneDeep(mi)
      crud.mo.value = cloneDeep(mo)
    },
    smc(mi?: I) {
      if (!mi) {
        crud.mi.value = cloneDeep(mi)
      }
      crud.sc.value = true
    },
    smu(mo: O) {
      crud.mo.value = cloneDeep(mo)
      crud.su.value = true
    },
    smr(mo: O) {
      crud.mo.value = cloneDeep(mo)
      crud.sr.value = true
    },
  }
}

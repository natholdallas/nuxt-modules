import copyclip from 'copy-to-clipboard'
import { useSnackBar } from '../composables/snackbar'

export type VuetifySortOpt = { key: string; order: string }

export const vtables = {
  optconv(opt: VuetifySortOpt): { column?: string; desc?: boolean } {
    return { column: opt.key, desc: opt.order === 'desc' }
  },
  sort(col: { column?: string; desc?: boolean }, opts: VuetifySortOpt[]) {
    if (opts.length) {
      col.column = opts[0]?.key
      col.desc = opts[0]?.order === 'desc'
    }
  },
}

export function vcopy(text: any, successText: string = 'Success') {
  if (text) copyclip(text)
  useSnackBar().success(successText)
}

import { shallowReactive } from 'vue'

export const dialog = shallowReactive<Dialog>({
  show: false,
  title: undefined,
  content: undefined,
  confirm: undefined,
})

export function useDialog() {
  return {
    open(v?: DialogOptions) {
      dialog.show = true
      dialog.title = v?.title
      dialog.content = v?.content
      dialog.confirm = v?.confirm
    },
  }
}

type DialogOptions = Omit<Dialog, 'show'>
type Dialog = Partial<{
  show: boolean
  title: string
  content: string
  confirm: VoidFunction
}>

import { useNuxtApp } from 'nuxt/app'
import { shallowReactive } from 'vue'

export const snackbar = shallowReactive({
  show: false,
  message: <undefined | string>'',
  color: '',
  timeout: 1000,
})

export function useSnackBar() {
  const i18n: any = useNuxtApp()?.$i18n
  const t = i18n.t
  return {
    success(msg: string = t('success')) {
      snackbar.message = msg
      snackbar.color = 'success'
      snackbar.timeout = 1000
      snackbar.show = true
    },
    error(msg: string = t('error')) {
      snackbar.message = msg
      snackbar.color = 'error'
      snackbar.timeout = 5000
      snackbar.show = true
    },
    warn(msg: string = t('warning')) {
      snackbar.message = msg
      snackbar.color = 'warning'
      snackbar.timeout = 5000
      snackbar.show = true
    },
    info(msg: string = t('info')) {
      snackbar.message = msg
      snackbar.color = 'info'
      snackbar.timeout = 3000
      snackbar.show = true
    },
  }
}

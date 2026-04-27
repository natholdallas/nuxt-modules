import { onUnmounted } from 'vue'

export function useInterval(fun: TimerHandler, ms?: number) {
  const id = setInterval(fun, ms)
  onUnmounted(() => clearInterval(id))
}

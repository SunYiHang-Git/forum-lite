import { ref } from 'vue'

/**
 * 防止中文输入法输入过程中按 Enter 键触发事件
 *
 * @param callback - 回车时要执行的回调函数
 * @returns 返回一个处理函数，供 @keydown.enter 调用
 */
export function useEnterSubmit(callback: (event: KeyboardEvent) => void) {
  const isComposing = ref(false)

  const handleCompositionStart = () => {
    isComposing.value = true
  }

  const handleCompositionEnd = () => {
    isComposing.value = false
  }

  const handleKeyDown = (event: KeyboardEvent | Event) => {
    // 类型守卫
    if (!(event instanceof KeyboardEvent)) return
    if (isComposing.value) return
    if (event.key === 'Enter' || event.keyCode === 13) {
      callback(event)
    }
  }

  return {
    onEnter: handleKeyDown,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
  }
}

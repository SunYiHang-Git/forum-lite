import { ref, computed, onMounted } from 'vue'

export function useCountdown(initialSeconds = 60, localKey = '') {
  const storageKey = 'lite_sendCode_countdown_end_time_' + localKey
  /** 倒计时结束的时间戳（毫秒） */
  const endTime = ref<number | null>(null)

  // 👉 添加：定时器 ID
  let timer: number | null = null

  /** 是否正在倒计时 */
  const isCounting = computed(() => {
    if (!endTime.value) {
      return false
    }
    return Date.now() < endTime.value
  })

  /** 当前剩余秒数 */
  const seconds = ref(0)

  /** 更新秒数并管理定时器 */
  const updateSeconds = () => {
    if (!isCounting.value) {
      seconds.value = 0
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      endTime.value = null
      localStorage.removeItem(storageKey)
    } else {
      seconds.value = Math.ceil((endTime.value! - Date.now()) / 1000)
      if (seconds.value === 0) {
        endTime.value = null
        localStorage.removeItem(storageKey)
      }
    }
  }
  /** 开启定时器 */
  const startTimer = () => {
    if (timer) clearInterval(timer)
    updateSeconds()
    if (isCounting.value) {
      timer = window.setInterval(updateSeconds, 1000)
    }
  }
  /** 启动倒计时 */
  const startCountdown = () => {
    if (isCounting.value) return
    const end = Date.now() + initialSeconds * 1000
    endTime.value = end
    localStorage.setItem(storageKey, String(end))
    startTimer()
  }

  /** 页面加载时恢复状态 */
  const resumeCountdown = () => {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return
    const savedEnd = Number(saved)
    if (Date.now() < savedEnd) {
      endTime.value = savedEnd
      startTimer()
    } else {
      localStorage.removeItem(storageKey)
    }
  }

  /** 清空本地缓存 */
  function clearLocalTempCache() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    localStorage.removeItem(storageKey)
    endTime.value = null
    seconds.value = 0
  }

  onMounted(() => {
    resumeCountdown()
  })

  return {
    isCounting,
    seconds,
    startCountdown,
    clearLocalTempCache,
  }
}

import { getLocalStorage, setLocalStorage } from '@/utils/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLang = defineStore('lane', () => {
  const LOCAL_KEY = 'store_lang'
  const locale = ref('zh')
  const langList = ref([
    { label: '中文', value: 'zh' },
    { label: '英语', value: 'en' },
  ])

  /** 获取当前语言 */
  const getNowLang = () => {
    // locale.value = getLocalStorage(LOCAL_KEY)
  }
  /** 设置语言 */
  const setNewLang = (lang: string) => {
    locale.value = lang
    // setLocalStorage(LOCAL_KEY, lang)
  }
  return {
    locale,
    langList,
    getNowLang,
    setNewLang,
  }
})

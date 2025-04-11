import { createI18n, useI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import { useLang } from '@/store/modules/lang'

/** @type {(key: string) => boolean} 判断是否是 i18n 的key */
const isI18nKey = (key) => typeof key === 'string' && key.includes('.')

const ct = (t, ...args) => {
  if (!args?.length) {
    return ''
  }
  const res = []
  let tArgs = []
  for (const arg of args) {
    if (isI18nKey(arg) && tArgs.length) {
      res.push(t(...tArgs))
      tArgs = []
    }
    tArgs.push(arg)
  }
  tArgs.length && res.push(t(...tArgs))
  return res.join(t('common.sep', ''))
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en,
  },
})

export default (app) => {
  const { locale } = useLang()
  console.log('locale--->', locale)
  // 引入 i18n
  app.use(i18n)
  const $i18n = app.config.globalProperties.$i18n
  // 修改语言
  $i18n.locale = locale
  $i18n.fallbackLocale = 'zh'
  // 添加一个组合翻译(composable translate)的方法
  app.config.globalProperties.$ct = (...args) => {
    return ct(app.config.globalProperties.$t, ...args)
  }
}

// 供组合式api使用
export const useCI18n = () => {
  const i18n = useI18n()
  return {
    ct: (...args) => ct(i18n.t, ...args),
    ...i18n,
  }
}

export const langMap = {
  '': 'zh',
  English: 'en',
  Chinese: 'zh',
}

import { ct } from '@/i18n/index'

declare module 'vue' {
  interface ComponentCustomProperties {
    $ct: typeof ct
  }
}

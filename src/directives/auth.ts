import { useUser } from '@/store/modules/user'
import type { DirectiveBinding } from 'vue'

export const authDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUser()
    if (!userStore.isAdminByUser()) {
      el.style.display = 'none'
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUser()
    if (!userStore.isAdminByUser()) {
      el.style.display = 'none'
    } else {
      el.style.display = ''
    }
  },
}

import './styles/style.scss'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import '@ksware/ksw-ux/kingsware-ui/style.css'
// import { useUser } from '@/store/modules/user'
import KswUx from '@ksware/ksw-ux'
// 封装统一请求方法
import ElementPlus, { ClickOutside } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { KswIcon } from 'ksw-vue-icon'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import VXETable from 'vxe-table'
import '@/component/Vditor/vditor.less'

import AppContainer from '@/component/AppContainer.vue'
import FontIcon from '@/component/icon/FontIcon.vue'
import SvgIcon from '@/component/icon/SvgIcon.vue'
import router from '@/router/router'
import i18n from '@/i18n'
import '@/permission.ts'
import App from './App.vue'
import { authDirective } from './directives/auth'
const app = createApp(App)
app.directive('ClickOutside', ClickOutside)
app.use(KswIcon)
app.use(KswUx)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VXETable, { size: 'mini' }).use(ElementPlus, { size: 'small', locale: zhCn })
app.component('SvgIcon', SvgIcon)
app.component('FontIcon', FontIcon)
app.component('AppContainer', AppContainer)
app.use(i18n)
app.directive('auth', authDirective)

app.mount('#app')

import './styles/style.scss'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import 'ksw-vue-icon/styles/icon.css'

import KswUx from '@ksware/ksw-ux'
// 封装统一请求方法
import { insetInit, isInset } from '@ksware/micro-lib-web-temp'
import ElementPlus, { ClickOutside } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { KswIcon } from 'ksw-vue-icon'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VXETable from 'vxe-table'

import AppContainer from '@/component/AppContainer.vue'
import FontIcon from '@/component/icon/FontIcon.vue'
import SvgIcon from '@/component/icon/SvgIcon.vue'
import router from '@/utils/router'

import App from './App.vue'

const app = createApp(App)
app.directive('ClickOutside', ClickOutside)
app.use(KswIcon)
app.use(KswUx)
app.use(router).use(createPinia()).use(VXETable, { size: 'mini' }).use(ElementPlus, { size: 'small', locale: zhCn })
app.component('SvgIcon', SvgIcon)
app.component('FontIcon', FontIcon)
app.component('AppContainer', AppContainer)

// 判断是否为嵌入模式
if (isInset) {
  // 初始化嵌入功能
  insetInit(app)
} else {
  // 不是嵌入模式
  app.mount('#app')
}

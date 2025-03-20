import moment from 'moment'
import path from 'path'
import { loadEnv } from 'vite'

const { VITE_APP_DEMO_NAME } = loadEnv('production', process.cwd())

/**
 * @param options
 * @returns
 */
export default function replaceStringsPlugin() {
  /** 需要替换的文件路径 */
  const filePath = './node_modules/@ksware/micro-lib-web-temp/lib/insetInit.ts'
  return {
    name: 'vite-plugin-replace-strings',
    transform(code, id) {
      const fileFullPath = path.join(process.cwd(), filePath).replace(/\\/g, '/')
      const cPath = id.replace(/\\/g, '/')
      if (fileFullPath === cPath) {
        // 将打包时间进行替换
        let newCode = code.replace(/__BUILD_SCRIPT_DATE__/g, moment().format('YYYY年MM月DD日 HH:mm:ss'))

        // 将模块名称进行替换
        newCode = newCode.replace(/__BUILD_SCRIPT_DM_NAME__/g, VITE_APP_DEMO_NAME || 'demo')
        return newCode
      }
      return code
    },
  }
}

/* eslint-disable no-console */

/** 该文件可以自定义编译项目后的文件存放路径 设置.env.production文件中的参数: VITE_APP_BUILD_OUT_PATH 后执行npm run build:dev 即可 */

import { spawn } from 'child_process'
import { loadEnv } from 'vite'
// 读取环境变量配置
const cwdPath = process.cwd()
const {
  /* 开发时打包编译文件存放路径*/
  VITE_APP_BUILD_OUT_PATH,
} = loadEnv('production', cwdPath)

if (VITE_APP_BUILD_OUT_PATH) {
  // 执行编译命令，并保存编译进程
  const child = spawn(`vite build --outDir ${VITE_APP_BUILD_OUT_PATH}`, [], { cwd: process.cwd(), shell: true })

  // 接收及打印日志信息
  child.stdout.on('data', (data) => {
    console.info(`${data}`)
  })

  child.stderr.on('data', (data) => {
    console.error(`${data}`)
  })

  child.on('close', () => {
    // console.log(`子进程退出码 ${code}`)
  })
} else {
  console.error('未配置.env.production文件中的参数: VITE_APP_BUILD_OUT_PATH')
}

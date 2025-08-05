import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import tsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import repairKeepAlive from './internal/keepAlive.js'
import replaceStringsPlugin from './internal/replaceStringPlugin.js'

// KeepAlive 支持手动清除缓存
repairKeepAlive()

// 读取环境变量配置
// const { VITE_APP_HOST } = loadEnv('development', process.cwd())

// 当前应用名称,默认获取当前文件的文件夹名称
// const appName = __dirname.substring(__dirname.lastIndexOf('\\') + 1)

export default defineConfig(({ mode }) => {
  const outDirFolder = 'dist'
  /** 项目打包后的文件名称 */
  const distFileName = 'krpalite-forum'
  // const appName = path.basename(process.cwd())
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_HOST } = env
  return {
    optimizeDeps: {
      force: true,
    },
    // default
    root: process.cwd(),
    // 打包时，这里填充的为绝对路径，对应的是部署路径
    base: '',
    // default
    publicDir: 'public',
    // default
    cacheDir: 'node_modules/.vite',
    // 定义全局常量替换方式
    define: {},
    // default
    logLevel: 'info',
    // 默认值为true。调试时设置为false，可以看到更多信息
    clearScreen: false,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/*': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      tsx(),
      vueDevTools(),
      replaceStringsPlugin(),
      legacy({
        modernPolyfills: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          entryFileNames: '[name].[hash].js',
          // chunkFileNames: 'js/chunk-[name].[hash].js',
          // assetFileNames: '[ext]/[name].[ext]',
          assetFileNames: '[ext]/[name].[hash].[ext]',
          // 拆分js到模块文件夹
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].js`
            // return `js/${fileName}/[name].[hash].js`
          },
        },
      },
      outDir: path.resolve(__dirname, `${outDirFolder}/${distFileName}`),
      assetsDir: 'static',
      emptyOutDir: true,
      // default，最低为es2015
      target: 'esnext',
      // default
      cssCodeSplit: true,
      // default
      sourcemap: false,
    },
    server: {
      host: '0.0.0.0',
      port: 8071,
      cors: true,
      // origin: "http://localhost:8081",
      proxy: {
        '/api': {
          // 后台接口前缀
          target: VITE_APP_HOST,
          // 是否允许跨域
          changeOrigin: true,
          // 如果是https接口，需要配置这个参数
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/get': {
          // 后台接口前缀
          target: VITE_APP_HOST,
          // 是否允许跨域
          changeOrigin: true,
          // 如果是https接口，需要配置这个参数
          secure: false,
          rewrite: (path) => path.replace(/^\/get/, ''),
        },
      },
    },
  }
})

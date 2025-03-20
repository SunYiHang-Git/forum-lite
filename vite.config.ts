import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import repairKeepAlive from './internal/keepAlive.js'
import replaceStringsPlugin from './internal/replaceStringPlugin.js'

// KeepAlive 支持手动清除缓存
repairKeepAlive()

// 读取环境变量配置
const { VITE_APP_HOST } = loadEnv('development', process.cwd())

// 当前应用名称,默认获取当前文件的文件夹名称
const appName = __dirname.substring(__dirname.lastIndexOf('\\') + 1)
const outDirFolder = 'dist'

export default defineConfig({
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
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: '[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        // chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[ext]',
        // assetFileNames: '[ext]/[name].[hash].[ext]',
        // 拆分js到模块文件夹
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name].js`
          // return `js/${fileName}/[name].[hash].js`
        },
      },
    },
    outDir: path.resolve(__dirname, `${outDirFolder}/app-dist-${appName}`),
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
})

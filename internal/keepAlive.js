/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'

/** 本文件是为了修复 vue KeepAlive组件 不支持手动清除缓存 使用本脚本后， 直接使用 keepAliveRef.$pruneCacheEntry(key) 即可手动删除缓存 */
export default function () {
  try {
    const vue_bundler_file = path.resolve(
      __dirname,
      '../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js',
    )
    // 使用同步读取文件
    const data = fs.readFileSync(vue_bundler_file, 'utf8')
    // 如果未添加过
    if (data.indexOf('sharedContext.$pruneCacheEntry') < 0) {
      // 先找到__v_cache变量的位置
      let index = data.indexOf('__v_cache')
      if (index >= 0) {
        // 继续找下一个大括号 }
        index = data.indexOf('}', index)
        if (index >= 0) {
          // 从下一个位置开始
          index += 1
          // 然后放一个可以释放的函数
          const remove =
            '        sharedContext.$pruneCacheEntry = function(key) {\r\n' +
            '            const cached = cache.get(key);\r\n' +
            '            if (cached) {\r\n' +
            '                if (cached.key == current?.key) {\r\n' +
            '                    resetShapeFlag(current);\r\n' +
            '                } else {\r\n' +
            '                    unmount(cached);\r\n' +
            '                }\r\n' +
            '                cache.delete(key);\r\n' +
            '                keys.delete(key);\r\n' +
            '            }\r\n' +
            '        }\r\n'
          // 然后拼接
          const result = data.substring(0, index) + '\r\n' + remove + '\r\n' + data.substring(index)
          fs.writeFileSync(vue_bundler_file, result, 'utf8')
        }
      }
    }
  } catch (err) {
    console.error(err.message)
  }
}

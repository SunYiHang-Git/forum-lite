import { KMessage } from '@ksware/ksw-ux'
import { callServerFunc, downServerFile, getServerFilePath, getToken, isInset } from '@ksware/micro-lib-web-temp'
import { ElMessage } from 'element-plus'

export const downLoadFileById = async (id: string = '', fileName: string = '下载文件') => {
  if (!id) {
    ElMessage.error('下载失败')
    return false
  }
  const { data }: any = await callServerFunc('THawkeyeDM', 'DownShopsApp', { ID: id })
  if (isInset) {
    // 内嵌网页
    const arrayBuffer = await downServerFileBlob(data.Url, fileName)
    return { type: 'arrayBuffer', arrayBuffer }
  } else {
    downServerFile(data.Url, fileName)
  }
}

/**
 * 下载服务器文件Blob
 *
 * @param fullPath 文件路径
 * @param name 自定义文件名称
 */
export async function downServerFileBlob(fullPath: string, name?: string) {
  fullPath = getServerFilePath(fullPath)
  name = name || fullPath.substring(fullPath.lastIndexOf('\\') + 1, fullPath.lastIndexOf('.'))
  const suffix = fullPath.substring(fullPath.lastIndexOf('.'))
  //解决RPOM下载文件需要带token的问题
  const joinText = /\?/.test(fullPath) ? '&' : '?'
  const tokenFullPath = `${fullPath}${joinText}token=${getToken()}`
  const response = await fetch(tokenFullPath)
  const arrayBuffer = await response.arrayBuffer()
  return arrayBuffer
}

/**
 * 创建下载文件，解决浏览器直接打开文件的问题
 *
 * @param blob
 * @param fileName
 * @param successMsg
 */
async function downloadBlob(blob: Blob, fileName: string, successMsg = '导出成功') {
  try {
    const href = window.URL.createObjectURL(blob) //创建下载的链接
    const downloadElement = document.createElement('a')
    downloadElement.href = href
    downloadElement.target = '_blank'
    downloadElement.download = fileName
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
    KMessage({
      type: 'success',
      message: successMsg,
    })
  } catch (e) {
    console.error('文件保存失败:', e)
    // ElMessage.error('下载文件失败')
    KMessage({
      type: 'error',
      message: '文件保存失败',
    })
  }
}

/**
 * ArrayBuffer转16进制字符串
 *
 * @param {Buffer} buffer 传入二进制数据流
 * @returns {String} 十六进制字符串
 */
export function arrayBufferToHex(buffer: ArrayBuffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}

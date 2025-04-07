import { isInset, setToken } from '@ksware/micro-lib-web-temp'

/** 接收父级传输的消息 */
const allowedIPPorts = ['127.0.0.1:8071', 'localhost:8071', '192.168.104.62:8071']

/** 通信 */
export const postMessageTransmit = () => {
  window.addEventListener('message', (e) => {
    const originUrl = new URL(e.origin)
    const hostname = originUrl.hostname // IP 或域名
    const protocol = originUrl.protocol // 协议（http: 或 https:）
    let port = originUrl.port
    // 处理默认端口（HTTP 默认为 80，HTTPS 默认为 443）
    if (!port) {
      port = protocol === 'https:' ? '443' : '80'
    }
    // 组合为 IP:端口 或 域名:端口
    const sourceKey = `${hostname}:${port}`
    if (!allowedIPPorts.includes(sourceKey)) return
    if (e.data.type === 'Token') {
      if (e.data.value) {
        setToken(e.data.value)
      }
    }
  })
}

/** 获取 url 对象 */
export const getWindowUrlObj = () => {
  if (!isInset) return {}
  const search = window.location.search // 示例值: "?parentOrigin=...&token=..."
  const params = new URLSearchParams(search)

  const queryObject: any = {}
  for (const [key, value] of params) {
    queryObject[key] = decodeURIComponent(value) // 解码特殊字符（如 %3A → :）
  }
  const { token } = queryObject
  setToken(token)
  return queryObject
}

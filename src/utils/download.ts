import { callServerFunc } from '@ksware/micro-lib-web-temp'
import { ElMessage } from 'element-plus'

export const downLoadFileById = async (id: string = '') => {
  if (!id) return ElMessage.error('下载失败')
  console.log('id--->', id)
  // DownShopsApp
  const { data }: any = await callServerFunc('THawkeyeDM', 'DownShopsApp', { ID: id })
  console.log('data--->', data)
  ElMessage.success('下载成功')
  return Promise.resolve('下载成功')
}

import { ElMessage } from 'element-plus'

export const downLoadFileById = async (id: string) => {
  if (!id) return ElMessage.error('下载失败')
  ElMessage.success('下载成功')
  return Promise.resolve('下载成功')
}

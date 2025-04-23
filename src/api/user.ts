import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 保存用户资料 */
export const SetRPAUserInfoAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'SetRPAUserInfo', params)
}

/** 通过手机号验证身份 */
export const CheckPhoneCodeAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'CheckPhoneCode', params)
  return data
}

/** 获取短信验证码 */
export const SendPhoneCodeAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'SendPhoneCode', params)
  return data
}

/** 修改密码 */
export const SetRPAUserNewPassAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'SetRPAUserNewPass', params)
  return data
}

/** 申请为开发者 */
export const RPAApplyDeveloperAPI = async (params: any) => {
  await callServerFunc('TRPADM', 'RPAApplyDeveloper', params)
}

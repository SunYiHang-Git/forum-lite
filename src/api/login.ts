import { handleUrlFormat, maturityDays } from '@/utils/format'
import { generateUniqueNumber } from '@/utils/tools'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, setToken, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取用户信息 */
export const GetRPAUserAPI = async () => {
  const { data } = await callServerFunc('TRPADM', 'GetRPAUser', { TokenError: true, HandleError: true })
  return data
}

/** 账号登录登录 */
export const loginByAccountAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAUserLogin', params, { isShowErrorMsg: false })
  const { ID, IsLite, LncDate, LoginID, PassWord, Token, User, UserID, UserName, IsForumLogin } = data
  setToken(Token)
  const userInfoRes: any = await GetRPAUserAPI()
  const { IsAdmin, Phone, City, Company, DeveloperState, FullName, IsDeveloper, Sex, Signature, UserIcon } = userInfoRes
  /** 拆分 userName 的 # 后缀 */
  const nameArr = UserName.split('#')
  const userInfoObj = {
    id: ID,
    isLite: IsLite,
    isForumLogin: IsForumLogin,
    remainDays: maturityDays(LncDate),
    loginId: LoginID,
    passWord: PassWord,
    token: Token,
    user: User,
    userId: UserID,
    userName: nameArr[0],
    userName_suffix: '#' + (nameArr[1] || generateUniqueNumber()),
    role: IsAdmin,
    isAdmin: IsAdmin === 1,
    loginStatus: true,
    phone: Phone,
    city: City,
    company: Company,
    developerState: DeveloperState,
    isDeveloper: IsDeveloper,
    sex: Sex,
    signature: Signature,
    avatar: fileHostUrl + UserIcon,
    fullName: FullName,
  }
  return userInfoObj
}

/** 验证码登录 */
export const RPALitePhoneCodeLoginAPI = async (params: any) => {
  const { data }: any = await callServerFunc('THttpDM', 'RPALitePhoneCodeLogin', params, { isShowErrorMsg: false })
  const { ID, IsLite, LncDate, LoginID, RPALite: PassWord, Token, user, UserName, Phone } = data
  setToken(Token)
  const userInfoRes: any = await GetRPAUserAPI()
  const { IsAdmin, City, Company, DeveloperState, UserID, FullName, IsDeveloper, Sex, Signature, UserIcon } =
    userInfoRes
  /** 拆分 userName 的 # 后缀 */
  const nameArr = UserName.split('#')
  const userInfoObj = {
    id: ID,
    isLite: IsLite,
    remainDays: maturityDays(LncDate),
    loginId: LoginID,
    passWord: PassWord,
    token: Token,
    user: user,
    userId: UserID,
    userName: nameArr[0],
    userName_suffix: '#' + (nameArr[1] || generateUniqueNumber()),
    role: IsAdmin,
    isAdmin: IsAdmin === 1,
    loginStatus: true,
    phone: Phone,
    city: City,
    company: Company,
    developerState: DeveloperState,
    isDeveloper: IsDeveloper,
    sex: Sex,
    signature: Signature,
    avatar: fileHostUrl + UserIcon,
    fullName: FullName,
  }
  return userInfoObj
}

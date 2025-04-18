//

import { convertKeysToLowerCase, handleUrlFormat } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp'

/** 获取首页 官方公告, 回帖周榜, 本周热议 的数据 */
export const getHomeAllDataAPI = async () => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetForumIndex', {})
  const table1 = new SQLTable(data.k_forum_newestNotice)
  const noticeList = handleNoticeListByTable(table1)
  const table2 = new SQLTable(data.k_forum_weeklyusers)
  const replyList = handleReplyByTable(table2)
  //   const table3 = new SQLTable(data.k_forum_hotReplyposts)
  return { noticeList, replyList }
}
/** 抽离官方公告数据处理 */
function handleNoticeListByTable(table: any) {
  const rows = []
  while (!table.eof()) {
    const createTime = table.s('CreateTime')
    const tags = table.s('Tag').split(',').filter(Boolean)
    const row = {
      id: table.s('ID'),
      title: table.s('Title'),
      createTime: createTime,
      month: createTime.substring(5, 7),
      day: createTime.substring(8, 10),
      lastTime: table.s('LastTime'),
      isFine: table.s('IsFine'),
      isEnd: table.s('IsEnd'),
      isTop: table.s('IsTop'),
      hot: table.s('Hot'),
      state: table.s('State'),
      tag: tags,
      cover: table.s('Cover'),
      abstract: table.s('Abstract'),
      replyNum: table.s('ReplyNum'),
      typeName: table.s('TypeName'),
      typePid: table.s('TypePID'),
      typePName: table.s('TypePName'),
      sex: table.s('Sex'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      isAdmin: table.s('IsAdmin'),
      userName: table.s('UserName'),
    }
    rows.push(row)
    table.next()
  }
  return rows
}
/** 抽离回帖周榜数据处理 */
function handleReplyByTable(table: any) {
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      sex: table.s('Sex'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      userName: table.s('UserName'),
      replyNum: table.s('ReplyNum'),
    }
    rows.push(row)
    table.next()
  }
  return rows
}
/** 抽离本周热议数据处理 */

/** 获取互动解答数据接口 */
export const getInteractionListAPI = async (params: any) => {
  const res: any = await callServerFunc('TRPADM', 'RPAGetPosts', params)
  const table = new SQLTable(res.data.k_forum_postslist)
  const rows = []
  while (!table.eof()) {
    const tags = table.s('Tag').split(',').filter(Boolean)
    const row = {
      id: table.s('ID'),
      type: table.s('Type'),
      title: table.s('Title'),
      lastTime: table.s('LastTime'),
      createUser: table.s('CreateUser'),
      isFine: table.s('IsFine'),
      isEnd: table.s('IsEnd'),
      isTop: table.s('IsTop'),
      hot: table.s('Hot'),
      collectNum: table.s('CollectNum'),
      state: table.s('State'),
      tag: tags,
      cover: table.s('Cover'),
      abstract: table.s('Abstract'),
      replyNum: table.s('ReplyNum'),
      typeName: table.s('TypeName'),
      typePid: table.s('TypePID'),
      typePName: table.s('TypePName'),
      sex: table.s('Sex'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      isAdmin: table.s('IsAdmin'),
      userName: table.s('UserName'),
    }
    rows.push(row)
    table.next()
  }
  const total = res.data.total || 90
  return { list: rows, total }
}

/** 获取互动解答分类 */

/** 获取首页帖子类型 */
export const getArticleTypeListAPI = async () => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetPostsAllTypes', {})
  const table1 = new SQLTable(data.k_forum_poststype)
  const table2 = new SQLTable(data.k_forum_postssecondtype)
  const parentList = handleParentType(table1)
  const sonList = handleSonType(table2)
  const resData = { parentList, sonList }
  return resData
}
/** 处理父级专栏 */
function handleParentType(table: any) {
  const rows = []
  while (!table.eof()) {
    const row = {
      postsTypeId: table.s('PostsTypeId'),
      postsTypeName: table.s('PostsTypeName'),
      postsTypeDesc: handleUrlFormat(fileHostUrl + table.s('PostsTypeDesc')),
    }
    rows.push(row)
    table.next()
  }
  return rows
}
/** 处理子类专栏 */
function handleSonType(table: any) {
  const rows = []
  while (!table.eof()) {
    const row = {
      postsTypeId: table.s('PostsTypeId'),
      pid: table.s('PostsTypePID'),
      postsTypeName: table.s('PostsTypeName'),
      postsTypeDesc: handleUrlFormat(fileHostUrl + table.s('PostsTypeDesc')),
    }
    rows.push(row)
    table.next()
  }
  return rows
}

/** 根据 Id 获取分类 */
export const getClassByIdAPI = async (params: any) => {
  const res: any = await callServerFunc('TRPADM', 'RPAGetDataTypeByID', params)
  const table = new SQLTable(res.data.k_forum_poststype)
  const rows = []
  while (!table.eof()) {
    const row = {
      postsTypeId: table.s('PostsTypeId'),
      postsTypeName: table.s('PostsTypeName'),
      postsTypeDesc: handleUrlFormat(fileHostUrl + table.s('PostsTypeDesc')),
    }
    rows.push(row)
    table.next()
  }
  return rows
}

/** 获取用户的提问, 文章, 回复, 收藏 的数据 */
export const getUserASllTypeNumAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetUserHomeLite', params)
  return data
}

/** 根据 Id 获取帖子详情 */
export const getArticleInfoById = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetPostsDetail', params)
  console.log('data--->', data)
  const table = new SQLTable(data.k_forum_list_position)
  const {
    Abstract,
    City,
    Content,
    Cover,
    CreateTime,
    CreateUser,
    FineCount,
    Hot,
    ID,
    IsAdmin,
    IsAudit,
    IsEnd,
    IsFine,
    LastTime,
    LoginAdmin,
    LoginAuthor,
    PageSize,
    PageNum,
    PType,
    PostsID,
    ReplyNum,
    Sex,
    Signature,
    State,
    ThisIsAdmin,
    Title,
    Token,
    Tag,
    TypeName,
    Type,
    TypePName,
    UserDetailID,
    UserName,
    UserIcon,
    UserPostCount,
    CollectNum,
  } = data
  const obj = {
    Abstract,
    City,
    Content,
    Cover,
    CreateTime,
    CreateUser,
    FineCount,
    Hot,
    ID,
    IsAdmin,
    IsAudit,
    IsEnd,
    IsFine,
    LastTime,
    LoginAdmin,
    LoginAuthor,
    PageSize,
    PageNum,
    PType,
    PostsID,
    ReplyNum,
    Sex,
    Signature,
    State,
    ThisIsAdmin,
    Title,
    Token,
    Tag: Tag.split(',').filter(Boolean),
    TypeName,
    Type,
    TypePName,
    UserDetailID,
    UserName,
    UserIcon: handleUrlFormat(fileHostUrl + UserIcon),
    UserPostCount,
    CollectNum,
  }
  return convertKeysToLowerCase(obj)
}

/** 获取帖子的回复数据 */
export const getReplyListAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetReply', params)
  const table1 = new SQLTable(data.k_forum_reply)
  const table2 = new SQLTable(data.k_forum_secondreply)
  const firstList = handleReplyList(table1)
  const secondList = handleReplyList(table2)
  return { firstList, secondList }
}

/** 处理评论 */
function handleReplyList(table: any) {
  const rows = []
  while (!table.eof()) {
    const row = {
      id: table.s('ID'),
      pid: table.s('PID'),
      postId: table.s('PostID'),
      userId: table.s('UserID'),
      time: table.s('Time'),
      content: table.s('Content'),
      isApprove: table.s('IsApprove'),
      isEnd: table.s('IsEnd'),
      sex: table.s('Sex'),
      userIcon: handleUrlFormat(fileHostUrl + table.s('UserIcon')),
      isAdmin: table.s('IsAdmin'),
      userName: table.s('Username'),
      likeCount: table.s('LikeCount'),
      initialID: table.s('InitialID'),
    }
    rows.push(row)
    table.next()
  }
  return rows
}

/** 获取所有回复帖子数量 */
export const getAllReplyNumAPI = async (params: any) => {
  const { data }: any = await callServerFunc('TRPADM', 'RPAGetReplyCount', params)
  return data.ReplyCouunt
}

/** 添加评论 */
export const addReplyForArticleAPI = async (params: any) => {
  const { data } = await callServerFunc('TRPADM', 'RPAAddReply', params)
  console.log('data--->', data)
  return data
}

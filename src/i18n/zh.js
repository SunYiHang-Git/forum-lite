import { tense } from './i18nUtils'

export default {
  // 一些通用的字段
  common: {
    // 通用名词 （函数则说明要区分单数复数）
    app: '应用',
    command: '指令 | 指令集',
    theme: '主题',
    uname: '用户名',
    pwd: '密码',
    tip: '提示',
    name: '名称',
    port: '端口',
    setting: '设置',
    type: '类型',
    status: '状态',
    operation: '操作',
    remark: '备注',
    order: '序号',
    param: '参数',
    direction: '方向',
    string: '字符串',
    integer: '整数',
    boolean: '布尔值',
    element: '元素',
    condition: '条件',
    image: '图像',
    instruction: '说明',
    var: '变量',
    column: '列',
    value: '值',
    version: '版本',
    path: '路径',
    parameter: '参数',
    data: '数据',
    debugging: '调试',
    // 通用动作（函数则说明要区分世态时态）
    remember: '记住',
    forget: '忘记',
    return: '返回',
    goBack: '回退',
    submit: '提交',
    confirm: '确定',
    cancel: '取消',
    copy: '复制',
    cut: '剪切',
    paste: '粘贴',
    undo: '撤销',
    redo: '重做',
    delete: '删除',
    update: '更新',
    rename: '重命名',
    fold: '收起',
    unfold: '展开',
    selectTip: '请选择',
    position: '位置',
    restart: '重启',
    run: '运行',
    save: '保存',
    exit: '退出',
    discard: '丢弃',
    release: tense('发布', '已发布'),
    debug: '调试',
    modify: '修改',
    import: '导入',
    export: '导出',
    add: '新增',
    new: '创建',
    created: '创建',
    newFolder: '创建分组',
    continue: '继续',
    edit: tense('编辑', null, '编辑中'),
    move: '移动',
    clear: '清除',
    try: '试试看',
    check: '查看',
    view: '查看',
    stop: '停止',
    input: '输入',
    click: '点击',
    target: '目标',
    output: '输出',
    validate: '校验',
    preview: '预览',
    complete: '完成',
    install: '安装',
    selectAll: '全选',
    // 其他通用
    on: '开',
    off: '关',
    default: '默认',
    loading: '正在加载',
    modifiedTip: '{cnt}已修改，是否保存？',
    successTip: '{cnt}成功',
    errorTip: '{cnt}失败',
    checkTip: '请输入{cnt}',
    logTip: '{cnt}日志',
    undoDelTip: '将要删除{cnt}，操作不可撤销，是否确认？',
    noData: '暂无数据',
    search: '搜索',
    time: '时间',
    details: '详情',
    hour: '小时',
    minutes: '分钟',
    days: '天',
    weeks: '周',
    delTip: ({ values }) => {
      const { name, type, ex = '' } = values
      if (type == 1) {
        return `删除后分组中的应用将解散，是否删除?`
      } else if (type == 2) {
        return `关联的任务也会删除是否继续?`
      }
      return `是否要删除${ex}"${name}"?`
    },
    actionAnd: '并',
    sep: '', // 单词分割符
    advanced: '高级',
    inputNoNull: '不能为空，请输入。',
    inputDup: '重复，请重新输入！',
    ifAnd: '且',
    or: '或',
    other: '其他',
    noFileSepChar: '不能包含以下字符: \\/:*?"<>{pipe}',
    weeks: ({ values }) => {
      let { week } = values
      let res = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      if (week) {
        week = week - 1
      }
      return res[week] || ''
    },
    days: ({ values }) => {
      let { day } = values
      if (!(day > 0 && day <= 31)) {
        return ''
      }
      return `${day}号`
    },
    months: ({ values }) => {
      let { month } = values
      let res = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      if (month) {
        month = month - 1
      }
      return res[month] || ''
    },
  },
  // 主页面和顶部导航
  home: {},
  // 登录
  login: {
    login: '登录',
    register: '注册',
    reset: '重置',
    otherWay: '其他方式',
    account: '账号',
    cloudAccount: '云账号',
    freeTrial: '免费试用',
    not: '没有',
    immediately: '立即',
    loginSucceeded: '登录成功',
    enterprise: '企业',
    phone: '手机号',
    validity: '有效的',
    verificationCode: '验证码',
    authorizeCode: '授权码',
    gain: '获取',
    success: '成功',
    fail: '失败',
    have: tense('有', '已有'),
    applyFor: '申请',
    thank: '感谢你',
    select: '选择',
    handsFree: '以自动化解放双手, 让资源发挥更大价值',
    remainTrialTime: '剩余试用时间',
    setCodeByYou: '您可以在设置中管理您的授权码',
    trial: '试用',
    continue: '继续',
    scanCode: '请扫码联系相关人员',
    productivity: '人机协同重塑组织生产力',
    active: '激活',
    dateFormat: '日期格式',
    port: '端口号',
    username: '昵称',
    KMSTip: '是否确认要{cnt}？',
    exit: '退出',
    machineCode: '机器码',
    authorize: '授权',
  },
}

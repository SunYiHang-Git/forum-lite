import { tense } from './i18nUtils'

export default {
  // 一些通用的字段
  common: {
    // 通用名词 （函数则说明要区分单数复数）
    app: 'Application | Applications',
    command: 'Command | Commands',
    theme: 'Theme',
    uname: 'Username',
    pwd: 'Password',
    tip: 'Tip',
    name: 'Name',
    port: 'Port',
    setting: 'Setting | Settings',
    type: 'Type',
    status: 'Status',
    operation: 'Operation | Operations',
    remark: 'Remark',
    order: 'Order',
    param: 'Parameter',
    direction: 'Direction',
    string: 'String',
    integer: 'Integer',
    boolean: 'Boolean',
    condition: 'Condition',
    element: 'Element',
    image: 'Image',
    instruction: 'Instruction',
    var: 'Variable',
    column: 'Column | Columns',
    value: 'Value',
    version: 'Version',
    path: 'Path',
    parameter: 'Parameter | Parameters',
    data: 'Data',
    debugging: 'Debugging',
    // 通用动作（函数则说明要区分时态）
    remember: 'Remember',
    forget: 'Forget',
    return: tense('Return', 'Returned'),
    goBack: 'GoBack',
    submit: tense('Submit', 'Submitted'),
    confirm: 'Confirm',
    cancel: 'Cancel',
    copy: 'Copy',
    cut: 'Cut',
    paste: 'Paste',
    undo: 'Undo',
    redo: 'Redo',
    delete: 'Delete',
    update: 'Update',
    rename: 'Rename',
    fold: 'Fold',
    unfold: 'Expand',
    selectTip: 'Please select',
    position: 'Position',
    restart: 'Restart',
    run: 'Run',
    save: tense('Save', 'Saved'),
    exit: 'Exit',
    discard: 'Discard',
    release: tense('Release', 'Released'),
    debug: 'Debug',
    modify: tense('Modify', 'Modified'),
    import: 'Import',
    export: 'Export',
    add: 'New',
    new: 'New',
    created: 'Created',
    newFolder: 'New Folder',
    continue: 'Continue',
    edit: tense('Edit', 'Edited', 'Editing'),
    move: 'Move',
    clear: 'Clear',
    try: 'Try',
    check: 'Check',
    view: 'View',
    stop: 'Stop',
    input: 'Input',
    click: 'Click',
    target: 'Target',
    output: 'Output',
    validate: 'Validate',
    preview: 'Preview',
    complete: 'Complete',
    install: tense('Install', 'Installed'),
    selectAll: 'Select all',
    // 其他通用
    on: 'On',
    off: 'Off',
    default: 'Default',
    loading: 'Loading',
    modifiedTip: 'Save the changed {cnt}?',
    successTip: '{cnt} successfully.',
    errorTip: '{cnt} failed.',
    checkTip: 'Please enter {cnt}',
    logTip: '{cnt} log',
    undoDelTip: "{cnt} will be removed. The operation can't be undone, are you sure?",
    noData: 'No Data',
    search: 'Search',
    time: 'Time',
    details: 'Details',
    hour: 'Hour | Hours',
    minutes: 'Minute | Minutes',
    days: 'Day | Days',
    weeks: 'Week | Weeks',
    delTip: ({ values }) => {
      const { name, type } = values
      if (type == 1) {
        return `After deletion, the applications in the group will be disbanded. Do you want to delete them?`
      } else if (type == 2) {
        return `Will the associated tasks also be deleted? Do you want to continue?`
      }
      return `Do you want to delete "${name}"?`
    },
    actionAnd: 'and',
    sep: ' ', // 单词分割符
    advanced: 'Advanced',
    inputNoNull: "can't not be null. Please input.",
    inputDup: 'duplicate. Please re-enter!',
    ifAnd: 'And',
    or: 'Or',
    other: 'Other',
    pipe: '|',
    noFileSepChar: 'can not contain the following characters: \\/:*?"<>{pipe}',
    weeks: ({ values }) => {
      let { week } = values
      let res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      return res[week - 1] ?? ''
    },
    days: ({ values }) => {
      let { day } = values
      if (!(day > 0 && day <= 31)) {
        return ''
      }
      const suffixArr = [void 0, 'st', 'nd', 'rd']
      const remain = day % 10
      const suffix = suffixArr[remain] ?? 'th'
      return `${day}${suffix}`
    },
    months: ({ values }) => {
      let { month } = values
      let res = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
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
    login: 'Login',
    register: 'Register',
    reset: 'Reset',
    otherWay: 'OtherWay',
    account: 'Account',
    cloudAccount: 'CloudAccount',
    freeTrial: 'FreeTrial',
    not: 'Not',
    immediately: 'Immediately',
    loginSucceeded: 'LoginSucceeded',
    enterprise: 'Enterprise',
    phone: 'Phone',
    validity: 'Validity',
    verificationCode: 'VerificationCode',
    authorizeCode: 'AuthorizeCode',
    gain: 'Gain',
    success: tense('Success', 'Succeed'),
    fail: tense('Fail', 'Defeat'),
    have: tense('Have', 'Had'),
    applyFor: tense('ApplyFor', 'AppliedFor'),
    thank: 'Thank you',
    select: tense('select', 'Select'),
    handsFree: 'Liberate hands with automation and maximize the value of resources',
    remainTrialTime: 'Remaining trial time',
    setCodeByYou: 'You can manage your authorization code in the settings',
    trial: 'On Trial',
    continue: 'Continue',
    scanCode: 'Please scan the code to contact the relevant personnel',
    productivity: 'Human machine collaboration reshapes organizational productivity',
    active: tense('activate', 'activation'),
    dateFormat: 'Date Format',
    port: 'Port',
    username: 'UserName',
    KMSTip: 'Do you want to {cnt} ?',
    exit: 'Exit',
    machineCode: 'Machine Code',
    authorize: 'Authorize',
  },
}

export type IData = {
  ID: string
  /** 父级id */
  Pid?: string
  /** 名称 */
  Name?: string
  /** 应用图标 */
  Icon?: string
  /** 功能描述 */
  FuncDes?: string
  /** 变更内容 */
  UpdateInfo?: string
  /** 开发者 */
  Developer?: string
  /** 创建时间 */
  CreateTime?: string
  /** 应用脚本 */
  Obj?: any
  /** 排序 */
  Sort?: string
  /** 修改人 */
  ModifyBy?: string
  /** 修改时间 */
  ModifyTime?: string
  /** 审核 */
  Audit?: string
  /** 审核人 */
  AuditBy?: string
  /** 审核时间 */
  AuditTime?: string
  /** 审核状态 审核状态: 0:未审核, 1:同意, 2:拒绝 */
  IsPassed?: number
  /** 版本号 */
  Ver?: string
  /** 下载次数 */
  DownloadCount?: number
}

export type IHistoryList = {
  ID: string
  /** 版本号,没有V , : 2.6.0 */
  Version: string
  /** 版本描述 */
  Desc: string
  /** 发布时间 */
  PublishTime: string
}

// const imageUrl =
//   'https://ts1.tc.mm.bing.net/th/id/R-C.d7e9b73f67eea88918f341eb509ed65e?rik=Wy5%2fpmI%2bMqYL4w&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2021%2f04-21%2f99504%2fwater_99504_698_698_.png&ehk=SgPCThmJO90qw8DdGy6Cpk0aNE49KqytBFUx2VVWnc4%3d&risl=&pid=ImgRaw&r=0'

// export const tableData: IData[] = []
export const tableDataList: IData[] = [
  {
    ID: '1',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用一',
    Icon: 'edit', // 示例图标
    FuncDes:
      '这是一个详细的功能描述，它包含了关于这个应用的各种信息和细节，帮助用户更好地了解项目的内容。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '修复了一些已知问题并优化了性能。',
    Developer: '张三',
    CreateTime: '2023-01-01',
    Obj: '{}',
    Sort: '1',
    ModifyBy: '李四',
    ModifyTime: '2023-02-01',
    DownloadCount: 100,
  },
  {
    ID: '2',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二',
    Icon: 'share',
    FuncDes:
      '这是另一个详细的功能描述，提供了更多的背景信息和相关的使用指南，确保用户能够充分利用该功能。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '增加了新的功能模块。',
    Developer: '王五',
    CreateTime: '2023-01-02',
    Obj: '{}',
    Sort: '2',
    ModifyBy: '赵六',
    ModifyTime: '2023-02-02',
    DownloadCount: 150,
  },
  {
    ID: '3',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用三',
    Icon: 'delete',
    FuncDes:
      '这里有一些详细的信息，包括项目的起源、发展过程以及未来的规划，让用户对项目有一个全面的认识。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '优化了用户界面。',
    Developer: '孙七',
    CreateTime: '2023-01-03',
    Obj: '{}',
    Sort: '3',
    ModifyBy: '周八',
    ModifyTime: '2023-02-03',
    DownloadCount: 200,
  },
  {
    ID: '4',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用四',
    Icon: 'setting',
    FuncDes:
      '这个项目非常有趣，它不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '新增了国际化支持。',
    Developer: '吴九',
    CreateTime: '2023-01-04',
    Obj: '{}',
    Sort: '4',
    ModifyBy: '郑十',
    ModifyTime: '2023-02-04',
    DownloadCount: 250,
  },
  {
    ID: '5',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用五',
    Icon: 'picture',
    FuncDes:
      '这是一个测试项目，尽管它是测试性质的，但依然包含了丰富的功能和详细的文档说明，方便开发者进行调试和学习。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '修复了一些安全漏洞。',
    Developer: '钱十一',
    CreateTime: '2023-01-05',
    Obj: '{}',
    Sort: '5',
    ModifyBy: '刘十二',
    ModifyTime: '2023-02-05',
    DownloadCount: 300,
  },
  {
    ID: '6',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用六',
    Icon: 'search',
    FuncDes:
      '这是一个详细的功能描述，它包含了关于这个应用的各种信息和细节，帮助用户更好地了解项目的内容。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '优化了性能。',
    Developer: '陈十三',
    CreateTime: '2023-01-06',
    Obj: '{}',
    Sort: '6',
    ModifyBy: '杨十四',
    ModifyTime: '2023-02-06',
    DownloadCount: 350,
  },
  {
    ID: '7',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用七',
    Icon: 'star-off',
    FuncDes:
      '这是另一个详细的功能描述，提供了更多的背景信息和相关的使用指南，确保用户能够充分利用该功能。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '增加了新的功能模块。',
    Developer: '黄十五',
    CreateTime: '2023-01-07',
    Obj: '{}',
    Sort: '7',
    ModifyBy: '徐十六',
    ModifyTime: '2023-02-07',
    DownloadCount: 400,
  },
  {
    ID: '8',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用八',
    Icon: 'upload',
    FuncDes:
      '这里有一些详细的信息，包括项目的起源、发展过程以及未来的规划，让用户对项目有一个全面的认识。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '优化了用户界面。',
    Developer: '何十七',
    CreateTime: '2023-01-08',
    Obj: '{}',
    Sort: '8',
    ModifyBy: '朱十八',
    ModifyTime: '2023-02-08',
    DownloadCount: 450,
  },
  {
    ID: '9',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用九',
    Icon: 'download',
    FuncDes:
      '这个项目非常有趣，它不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '新增了国际化支持。',
    Developer: '尤十九',
    CreateTime: '2023-01-09',
    Obj: '{}',
    Sort: '9',
    ModifyBy: '秦二十',
    ModifyTime: '2023-02-09',
    DownloadCount: 500,
  },
  {
    ID: '10',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十',
    Icon: 'check',
    FuncDes:
      '这是一个测试项目，尽管它是测试性质的，但依然包含了丰富的功能和详细的文档说明，方便开发者进行调试和学习。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '修复了一些安全漏洞。',
    Developer: '许二十一',
    CreateTime: '2023-01-10',
    Obj: '{}',
    Sort: '10',
    ModifyBy: '何二十二',
    ModifyTime: '2023-02-10',
    DownloadCount: 550,
  },
  {
    ID: '11',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十一',
    Icon: 'message',
    FuncDes:
      '这是一个详细的功能描述，它包含了关于这个应用的各种信息和细节，帮助用户更好地了解项目的内容。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '优化了性能。',
    Developer: '施二十三',
    CreateTime: '2023-01-11',
    Obj: '{}',
    Sort: '11',
    ModifyBy: '孔二十四',
    ModifyTime: '2023-02-11',
    DownloadCount: 600,
  },
  {
    ID: '12',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十二',
    Icon: 'date',
    FuncDes:
      '这是另一个详细的功能描述，提供了更多的背景信息和相关的使用指南，确保用户能够充分利用该功能。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '增加了新的功能模块。',
    Developer: '常二十五',
    CreateTime: '2023-01-12',
    Obj: '{}',
    Sort: '12',
    ModifyBy: '严二十六',
    ModifyTime: '2023-02-12',
    DownloadCount: 650,
  },
  {
    ID: '13',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十三',
    Icon: 'zoom-in',
    FuncDes:
      '这里有一些详细的信息，包括项目的起源、发展过程以及未来的规划，让用户对项目有一个全面的认识。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '优化了用户界面。',
    Developer: '华二十七',
    CreateTime: '2023-01-13',
    Obj: '{}',
    Sort: '13',
    ModifyBy: '金二十八',
    ModifyTime: '2023-02-13',
    DownloadCount: 700,
  },
  {
    ID: '14',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十四',
    Icon: 'refresh',
    FuncDes:
      '这个项目非常有趣，它不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '新增了国际化支持。',
    Developer: '陶二十九',
    CreateTime: '2023-01-14',
    Obj: '{}',
    Sort: '14',
    ModifyBy: '邱三十',
    ModifyTime: '2023-02-14',
    DownloadCount: 750,
  },
  {
    ID: '15',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十五',
    Icon: 'more',
    FuncDes:
      '这是一个测试项目，尽管它是测试性质的，但依然包含了丰富的功能和详细的文档说明，方便开发者进行调试和学习。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '修复了一些安全漏洞。',
    Developer: '谢三十一',
    CreateTime: '2023-01-15',
    Obj: '{}',
    Sort: '15',
    ModifyBy: '章三十二',
    ModifyTime: '2023-02-15',
    DownloadCount: 800,
  },
  {
    ID: '16',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十六',
    Icon: 'menu',
    FuncDes:
      '这是一个详细的功能描述，它包含了关于这个应用的各种信息和细节，帮助用户更好地了解项目的内容。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '优化了性能。',
    Developer: '汪三十三',
    CreateTime: '2023-01-16',
    Obj: '{}',
    Sort: '16',
    ModifyBy: '余三十四',
    ModifyTime: '2023-02-16',
    DownloadCount: 850,
  },
  {
    ID: '17',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十七',
    Icon: 'document',
    FuncDes:
      '这是另一个详细的功能描述，提供了更多的背景信息和相关的使用指南，确保用户能够充分利用该功能。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '增加了新的功能模块。',
    Developer: '毕三十五',
    CreateTime: '2023-01-17',
    Obj: '{}',
    Sort: '17',
    ModifyBy: '尹三十六',
    ModifyTime: '2023-02-17',
    DownloadCount: 900,
  },
  {
    ID: '18',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十八',
    Icon: 'folder',
    FuncDes:
      '这里有一些详细的信息，包括项目的起源、发展过程以及未来的规划，让用户对项目有一个全面的认识。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '优化了用户界面。',
    Developer: '康三十七',
    CreateTime: '2023-01-18',
    Obj: '{}',
    Sort: '18',
    ModifyBy: '邓三十八',
    ModifyTime: '2023-02-18',
    DownloadCount: 950,
  },
  {
    ID: '19',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用十九',
    Icon: 'tickets',
    FuncDes:
      '这个项目非常有趣，它不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '新增了国际化支持。',
    Developer: '安三十九',
    CreateTime: '2023-01-19',
    Obj: '{}',
    Sort: '19',
    ModifyBy: '顾四十',
    ModifyTime: '2023-02-19',
    DownloadCount: 1000,
  },
  {
    ID: '20',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二十',
    Icon: 'bell',
    FuncDes:
      '这是一个测试项目，尽管它是测试性质的，但依然包含了丰富的功能和详细的文档说明，方便开发者进行调试和学习。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '修复了一些安全漏洞。',
    Developer: '柳四十一',
    CreateTime: '2023-01-20',
    Obj: '{}',
    Sort: '20',
    ModifyBy: '段四十二',
    ModifyTime: '2023-02-20',
    DownloadCount: 1050,
  },
  {
    ID: '21',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二十一',
    Icon: 'news',
    FuncDes:
      '这是一个详细的功能描述，它包含了关于这个应用的各种信息和细节，帮助用户更好地了解项目的内容。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '优化了性能。',
    Developer: '叶四十三',
    CreateTime: '2023-01-21',
    Obj: '{}',
    Sort: '21',
    ModifyBy: '熊四十四',
    ModifyTime: '2023-02-21',
    DownloadCount: 1100,
  },
  {
    ID: '22',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二十二',
    Icon: 'view',
    FuncDes:
      '这是另一个详细的功能描述，提供了更多的背景信息和相关的使用指南，确保用户能够充分利用该功能。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '增加了新的功能模块。',
    Developer: '贺四十五',
    CreateTime: '2023-01-22',
    Obj: '{}',
    Sort: '22',
    ModifyBy: '隋四十六',
    ModifyTime: '2023-02-22',
    DownloadCount: 1150,
  },
  {
    ID: '23',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二十三',
    Icon: 'video-camera',
    FuncDes:
      '这里有一些详细的信息，包括项目的起源、发展过程以及未来的规划，让用户对项目有一个全面的认识。该应用不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。',
    UpdateInfo: '优化了用户界面。',
    Developer: '尹四十七',
    CreateTime: '2023-01-23',
    Obj: '{}',
    Sort: '23',
    ModifyBy: '骆四十八',
    ModifyTime: '2023-02-23',
    DownloadCount: 1200,
  },
  {
    ID: '24',
    Pid: '0',
    Ver: '1.2.3',
    Name: '应用二十四',
    Icon: 'mobile-phone',
    FuncDes:
      '这个项目非常有趣，它不仅提供了一些基础的功能，还引入了许多创新的设计理念，极大地提升了用户体验。该应用提供了丰富的功能和详细的文档说明，方便开发者进行调试和学习。',
    UpdateInfo: '新增了国际化支持。',
    Developer: '薛四十九',
    CreateTime: '2023-01-24',
    Obj: '{}',
    Sort: '24',
    ModifyBy: '郦五十',
    ModifyTime: '2023-02-24',
    DownloadCount: 854,
  },
]

export const historyList: IHistoryList[] = [
  {
    ID: '000001',
    Version: '1.0.0',
    Desc: '这是第一个版本，我们推出了全新的用户界面和基本的功能模块，为用户提供了一个全新的体验平台。',
    PublishTime: '2023-01-15',
  },
  {
    ID: '000002',
    Version: '1.1.0',
    Desc: '在这个版本中，我们修复了一些已知的bug，并对部分功能进行了优化，提升了系统的稳定性和性能。',
    PublishTime: '2023-02-10',
  },
  {
    ID: '000003',
    Version: '1.2.0',
    Desc: '增加了新的数据分析工具，帮助用户更好地理解和利用他们的数据，同时改进了用户体验。',
    PublishTime: '2023-03-05',
  },
  {
    ID: '000004',
    Version: '1.3.0',
    Desc: '此次更新引入了安全增强功能，包括加强的数据加密技术和更严格的访问控制策略。',
    PublishTime: '2023-04-18',
  },
  {
    ID: '000005',
    Version: '1.4.0',
    Desc: '优化了移动设备上的显示效果，新增了夜间模式，保护用户的视力，适应更多的使用场景。',
    PublishTime: '2023-05-22',
  },
  {
    ID: '000006',
    Version: '1.5.0',
    Desc: '我们添加了一个全新的社区论坛，让用户可以分享经验、提出问题并互相帮助解决遇到的问题。',
    PublishTime: '2023-06-14',
  },
  {
    ID: '000007',
    Version: '1.6.0',
    Desc: '在这一版中，我们特别关注了速度的提升，减少了加载时间，提高了整体的操作流畅度。',
    PublishTime: '2023-07-09',
  },
  {
    ID: '000008',
    Version: '1.7.0',
    Desc: '实现了与第三方服务的集成，使得用户能够直接从我们的平台访问外部资源和服务，极大地扩展了功能。',
    PublishTime: '2023-08-25',
  },
  {
    ID: '000009',
    Version: '1.8.0',
    Desc: '增强了搜索功能，现在支持更加复杂的查询条件，使查找信息变得更加准确快捷。',
    PublishTime: '2023-09-30',
  },
  {
    ID: '000010',
    Version: '1.9.0',
    Desc: '加入了多语言支持，现在可以根据用户的偏好设置不同的语言环境，满足国际化需求。',
    PublishTime: '2023-10-15',
  },
  {
    ID: '000011',
    Version: '2.0.0',
    Desc: '这是一个重要的里程碑版本，我们重新设计了架构，以支持未来的扩展和改进。',
    PublishTime: '2023-11-20',
  },
  {
    ID: '000012',
    Version: '2.1.0',
    Desc: '改进了用户反馈系统，现在更容易提交建议和报告问题，以便我们快速响应用户的需求。',
    PublishTime: '2023-12-25',
  },
  {
    ID: '000013',
    Version: '2.2.0',
    Desc: '新版本提供了更多的自定义选项，允许用户调整界面布局和个人偏好设置，以获得最佳体验。',
    PublishTime: '2024-01-30',
  },
  {
    ID: '000014',
    Version: '2.3.0',
    Desc: '强化了云同步功能，确保所有设备上的数据保持最新，随时随地访问你的信息。',
    PublishTime: '2024-02-18',
  },
  {
    ID: '000015',
    Version: '2.4.0',
    Desc: '为了提高安全性，我们在这一版本中加入了双因素认证机制，进一步保护用户账户的安全。',
    PublishTime: '2024-03-12',
  },
  {
    ID: '000016',
    Version: '2.5.0',
    Desc: '此版本专注于改善用户体验，简化了操作流程，并提供更直观的帮助文档和教程。',
    PublishTime: '2024-04-07',
  },
  {
    ID: '000017',
    Version: '2.6.0',
    Desc: '这个是描述，实际上本版本带来了多项改进，如性能优化、错误修复以及一些小的功能更新。',
    PublishTime: '2025-03-20',
  },
  {
    ID: '000018',
    Version: '2.7.0',
    Desc: '增加了语音助手功能，使用户可以通过语音命令执行操作，大大提高了便捷性。',
    PublishTime: '2025-04-25',
  },
  {
    ID: '000019',
    Version: '2.8.0',
    Desc: '优化了后台管理系统，提供了更多统计图表，方便管理员监控和管理整个平台的运行状态。',
    PublishTime: '2025-05-20',
  },
  {
    ID: '000020',
    Version: '2.9.0',
    Desc: '最新的更新中，我们增强了隐私设置，允许用户更精细地控制个人信息的公开程度和可见范围。',
    PublishTime: '2025-06-15',
  },
]

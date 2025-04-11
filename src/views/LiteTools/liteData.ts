export type DataType = {
  id: string
  /** 头像url */
  avatar?: string
  /** 指令集名称 */
  instructionName: string
  /** 指令集说明 */
  instructionDesc: string
  /** 最后版本上传人 */
  lastUploadUser: string
  /** 最新版本号 v1.1.1 */
  version: string
  /** 历史版本号，包括最新版 */
  historyVersion: string[]
  /** 更新时间 */
  updateTime: string
  /** 创建时间 */
  createTime?: string
  /** 分类标签 字符串数组 */
  tags?: string[]
  /** 系统名称 */
  systemVersion: string
  /** 下载量 */
  download: number
  /** 图片 */
  picture?: string
}

const instructionData: DataType[] = [
  {
    id: '1',
    avatar: 'https://example.com/avatar1.png',
    instructionName: '指令集名称A',
    instructionDesc:
      '这是一个非常详细的指令集说明，包含了多种功能和用途。它可以帮助用户完成各种任务，并且易于使用。该指令集还支持多种系统版本，适用于不同环境。',
    lastUploadUser: 'Alice',
    version: 'v10.9.0',
    historyVersion: ['v0.9.0', 'v0.8.5'],
    updateTime: '2025-03-01',
    tags: [
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
      '标签1',
      '标签2',
      '标签3',
      '标签4',
    ],
    systemVersion: 'window',
    download: 758123255,
    picture: 'https://img.shetu66.com/2023/07/04/1688453333865029.png',
  },
  {
    id: '2',
    avatar: '',
    instructionName: '指令集名称B',
    instructionDesc:
      '这是另一个指令集，专注于提供高效的解决方案。它包括了许多实用的功能，可以大大提升工作效率。特别适合需要处理大量数据的用户。',
    lastUploadUser: 'Bob',
    version: 'v1.2.1',
    historyVersion: ['v1.2.0', 'v1.1.1'],
    updateTime: '2025-03-02',
    tags: ['标签1', '标签3'],
    systemVersion: 'macOS',
    download: 789012,
  },
  {
    id: '3',
    avatar: 'https://example.com/avatar3.png',
    instructionName: '指令集名称C',
    instructionDesc:
      '这个指令集是一个全面的工具包，适用于各种不同的场景。它的设计考虑了用户的多样化需求，并提供了丰富的自定义选项。',
    lastUploadUser: 'Charlie',
    version: 'v2.0.0',
    historyVersion: ['v1.9.0', 'v1.8.5'],
    updateTime: '2025-03-03',
    tags: ['标签1', '标签2', '标签3', '标签4'],
    systemVersion: 'Linux',
    download: 345678,
  },
  {
    id: '4',
    avatar: '',
    instructionName: '指令集名称D',
    instructionDesc:
      '这是一套针对初学者设计的指令集，旨在帮助他们快速上手并掌握基本技能。包含详细的教程和示例，非常适合新手学习。',
    lastUploadUser: 'David',
    version: 'v1.1.0',
    historyVersion: ['v1.0.1', 'v1.0.0'],
    updateTime: '2025-03-04',
    tags: ['标签1'],
    systemVersion: 'window',
    download: 987654,
  },
  {
    id: '5',
    avatar: 'https://example.com/avatar5.png',
    instructionName: '指令集名称E',
    instructionDesc:
      '这个指令集专注于高级用户，提供了许多高级功能和自定义选项。它是为那些需要高效工作的人设计的，可以帮助你节省大量时间。',
    lastUploadUser: 'Eve',
    version: 'v2.1.0',
    historyVersion: ['v2.0.1', 'v2.0.0'],
    updateTime: '2025-03-05',
    tags: ['标签2', '标签3'],
    systemVersion: 'macOS',
    download: 123456,
  },
  {
    id: '6',
    avatar: '',
    instructionName: '指令集名称F',
    instructionDesc:
      '这个指令集包含了一些独特的功能，可以帮助用户解决特定的问题。它适用于需要处理复杂任务的用户，并提供了灵活的配置选项。',
    lastUploadUser: 'Frank',
    version: 'v1.0.1',
    historyVersion: ['v1.0.0'],
    updateTime: '2025-03-06',
    tags: ['标签1', '标签4'],
    systemVersion: 'Linux',
    download: 789012,
  },
  {
    id: '7',
    avatar: 'https://example.com/avatar7.png',
    instructionName: '指令集名称G',
    instructionDesc:
      '这是一个功能强大的指令集，专为专业人士设计，提供了丰富的工具和资源。它支持多种系统版本，并具有良好的兼容性。',
    lastUploadUser: 'Grace',
    version: 'v2.2.0',
    historyVersion: ['v2.1.1', 'v2.1.0'],
    updateTime: '2025-03-07',
    tags: ['标签1', '标签2', '标签3'],
    systemVersion: 'window',
    download: 345678,
  },
  {
    id: '8',
    avatar: '',
    instructionName: '指令集名称H',
    instructionDesc:
      '这个指令集是为那些需要高效工作的人设计的，它可以帮助你节省大量时间。包含了许多实用的功能和优化选项，提升了整体性能。',
    lastUploadUser: 'Henry',
    version: 'v1.1.1',
    historyVersion: ['v1.1.0', 'v1.0.1'],
    updateTime: '2025-03-08',
    tags: ['标签1', '标签3'],
    systemVersion: 'macOS',
    download: 987654,
  },
  {
    id: '9',
    avatar: 'https://example.com/avatar9.png',
    instructionName: '指令集名称I',
    instructionDesc:
      '这个指令集是一个综合性的工具包，适用于各种不同的应用场景。它提供了丰富的功能和灵活的配置选项，满足不同用户的需求。',
    lastUploadUser: 'Ian',
    version: 'v2.0.1',
    historyVersion: ['v2.0.0', 'v1.9.5'],
    updateTime: '2025-03-09',
    tags: ['标签1', '标签2', '标签4'],
    systemVersion: 'Linux',
    download: 123456,
  },
  {
    id: '10',
    avatar: '',
    instructionName: '指令集名称J',
    instructionDesc:
      '这个指令集是为那些需要处理复杂任务的人设计的，它提供了强大的功能和灵活性。包含了许多实用的工具和优化选项，提升了整体性能。',
    lastUploadUser: 'Jack',
    version: 'v1.2.0',
    historyVersion: ['v1.1.1', 'v1.1.0'],
    updateTime: '2025-03-10',
    tags: ['标签1', '标签3'],
    systemVersion: 'window',
    download: 789012,
  },
  {
    id: '11',
    avatar: 'https://example.com/avatar11.png',
    instructionName: '指令集名称K',
    instructionDesc: '这是一个面向开发者的指令集，提供了许多有用的工具和资源。它支持多种系统版本，并具有良好的兼容性。',
    lastUploadUser: 'Kate',
    version: 'v2.1.1',
    historyVersion: ['v2.1.0', 'v2.0.1'],
    updateTime: '2025-03-11',
    tags: ['标签1', '标签2', '标签3', '标签4'],
    systemVersion: 'macOS',
    download: 345678,
  },
  {
    id: '12',
    avatar: '',
    instructionName: '指令集名称L',
    instructionDesc:
      '这个指令集是一个全面的解决方案，适用于各种不同的场景和需求。它提供了丰富的功能和灵活的配置选项，满足不同用户的需求。',
    lastUploadUser: 'Luke',
    version: 'v1.0.2',
    historyVersion: ['v1.0.1', 'v1.0.0'],
    updateTime: '2025-03-12',
    tags: ['标签1'],
    systemVersion: 'Linux',
    download: 987654,
  },
  {
    id: '13',
    avatar: 'https://example.com/avatar13.png',
    instructionName: '指令集名称M',
    instructionDesc:
      '这个指令集专注于提供高效的解决方案，帮助用户更快地完成任务。包含了许多实用的功能和优化选项，提升了整体性能。',
    lastUploadUser: 'Mary',
    version: 'v2.2.1',
    historyVersion: ['v2.2.0', 'v2.1.1'],
    updateTime: '2025-03-13',
    tags: ['标签2', '标签3'],
    systemVersion: 'window',
    download: 123456,
  },
  {
    id: '14',
    avatar: '',
    instructionName: '指令集名称N',
    instructionDesc:
      '这是一个专门为初学者设计的指令集，旨在帮助他们快速上手并掌握基本技能。包含详细的教程和示例，非常适合新手学习。',
    lastUploadUser: 'Nick',
    version: 'v1.1.2',
    historyVersion: ['v1.1.1', 'v1.1.0'],
    updateTime: '2025-03-14',
    tags: ['标签1', '标签4'],
    systemVersion: 'macOS',
    download: 789012,
  },
  {
    id: '15',
    avatar: 'https://example.com/avatar15.png',
    instructionName: '指令集名称O',
    instructionDesc:
      '这个指令集是一个功能强大的工具包，适用于各种不同的应用场景。它提供了丰富的功能和灵活的配置选项，满足不同用户的需求。',
    lastUploadUser: 'Olivia',
    version: 'v2.0.2',
    historyVersion: ['v2.0.1', 'v2.0.0'],
    updateTime: '2025-03-15',
    tags: ['标签1', '标签2', '标签3'],
    systemVersion: 'Linux',
    download: 345678,
  },
  {
    id: '16',
    avatar: '',
    instructionName: '指令集名称P',
    instructionDesc:
      '这个指令集专注于提供高效的解决方案，帮助用户更快地完成任务。包含了许多实用的功能和优化选项，提升了整体性能。',
    lastUploadUser: 'Paul',
    version: 'v1.2.2',
    historyVersion: ['v1.2.1', 'v1.2.0'],
    updateTime: '2025-03-16',
    tags: ['标签1', '标签3'],
    systemVersion: 'window',
    download: 987654,
  },
  {
    id: '17',
    avatar: 'https://example.com/avatar17.png',
    instructionName: '指令集名称Q',
    instructionDesc:
      '这是一个全面的解决方案，适用于各种不同的场景和需求。它提供了丰富的功能和灵活的配置选项，满足不同用户的需求。',
    lastUploadUser: 'Quincy',
    version: 'v2.1.2',
    historyVersion: ['v2.1.1', 'v2.1.0'],
    updateTime: '2025-03-17',
    tags: ['标签1', '标签2', '标签3', '标签4'],
    systemVersion: 'macOS',
    download: 123456,
  },
  {
    id: '18',
    avatar: '',
    instructionName: '指令集名称R',
    instructionDesc:
      '这个指令集是一个综合性的工具包，适用于各种不同的应用场景。它提供了丰富的功能和灵活的配置选项，满足不同用户的需求。',
    lastUploadUser: 'Rachel',
    version: 'v1.0.3',
    historyVersion: ['v1.0.2', 'v1.0.1'],
    updateTime: '2025-03-18',
    tags: ['标签1'],
    systemVersion: 'Linux',
    download: 789012,
  },
  {
    id: '19',
    avatar: 'https://example.com/avatar19.png',
    instructionName: '指令集名称S',
    instructionDesc:
      '这个指令集专注于提供高效的解决方案，帮助用户更快地完成任务。包含了许多实用的功能和优化选项，提升了整体性能。',
    lastUploadUser: 'Steve',
    version: 'v2.2.2',
    historyVersion: ['v2.2.1', 'v2.2.0'],
    updateTime: '2025-03-19',
    tags: ['标签2', '标签3'],
    systemVersion: 'window',
    download: 345678,
  },
  {
    id: '20',
    avatar: '',
    instructionName: '指令集名称T',
    instructionDesc:
      '这是一个专门为初学者设计的指令集，旨在帮助他们快速上手并掌握基本技能。包含详细的教程和示例，非常适合新手学习。',
    lastUploadUser: 'Tom',
    version: 'v1.1.3',
    historyVersion: ['v1.1.2', 'v1.1.1'],
    updateTime: '2025-03-20',
    tags: ['标签1', '标签4'],
    systemVersion: 'macOS',
    download: 987654,
  },
]

/**
 * 获取指令集列表数据
 *
 * @param filterValue 过滤值
 * @returns
 */
export const getInstructionListDataAPI = async (filterValue: string = '') => {
  if (filterValue === '') {
    return Promise.resolve({ data: instructionData })
  }
  return Promise.resolve({ data: instructionData.filter((item) => item.instructionName.includes(filterValue)) })
}

/**
 * @param id 指令集id
 * @param version 指令集版本号-不写默认是最新版本
 * @returns
 */
export const getInstructionByIdAPI = async (id: string, version?: string): Promise<{ data: DataType }> => {
  // 接口需要判断版本号，如果没有传，默认最新版本
  return Promise.resolve({ data: instructionData.find((item) => item.id === id) as DataType })
}

/**
 * 获取排序数据
 *
 * @param type 排序类型 1=升序 2=降序 3=默认
 * @returns
 */
export const getSortDataAPI = async (type: string) => {
  if (type === '1') {
    return Promise.resolve({ data: [...instructionData].sort((a, b) => (a.download > b.download ? 1 : -1)) })
  } else if (type === '2') {
    return Promise.resolve({ data: [...instructionData].sort((a, b) => (a.download < b.download ? 1 : -1)) })
  } else {
    return Promise.resolve({ data: instructionData })
  }
}

/**
 * @param id 指令集id
 * @param version 指令集版本，不传默认最新版
 * @returns
 */
export const downloadInstructionAPI = async (id: string, version: string = '') => {
  return Promise.resolve({ data: '下载成功' })
}

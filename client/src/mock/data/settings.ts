import { TagItem, FilterReason } from '../../components/SettingsPopup'

// 模拟标签数据
export const MOCK_TAGS: TagItem[] = [
  { id: 'photography', name: '摄影', selected: false },
  { id: 'art', name: '艺术', selected: false },
  { id: 'design', name: '设计', selected: false },
  { id: 'travel', name: '旅行', selected: false },
  { id: 'food', name: '美食', selected: false },
  { id: 'lifestyle', name: '生活', selected: false },
  { id: 'fashion', name: '时尚', selected: false },
  { id: 'technology', name: '科技', selected: false },
  { id: 'nature', name: '自然', selected: false },
  { id: 'sports', name: '运动', selected: false },
  { id: 'music', name: '音乐', selected: false },
  { id: 'reading', name: '阅读', selected: false }
]

// 模拟过滤原因数据
export const MOCK_FILTER_REASONS: FilterReason[] = [
  {
    id: 'violent_content',
    title: '暴力内容',
    description: '包含暴力、血腥或令人不适的内容',
    selected: false
  },
  {
    id: 'adult_content',
    title: '成人内容',
    description: '包含成人或不适宜未成年人观看的内容',
    selected: false
  },
  {
    id: 'spam_content',
    title: '垃圾信息',
    description: '重复、无意义或广告性质的内容',
    selected: false
  },
  {
    id: 'false_information',
    title: '虚假信息',
    description: '可能包含不准确或误导性信息的内容',
    selected: false
  },
  {
    id: 'negative_content',
    title: '负面情绪',
    description: '可能引起负面情绪或心理不适的内容',
    selected: false
  },
  {
    id: 'political_content',
    title: '政治敏感',
    description: '涉及政治话题或可能引起争议的内容',
    selected: false
  }
]

// 获取用户设置的模拟函数
export function getMockUserSettings() {
  return {
    tags: MOCK_TAGS.map(tag => ({ ...tag })),
    filterReasons: MOCK_FILTER_REASONS.map(reason => ({ ...reason }))
  }
}

// 保存用户设置的模拟函数
export function saveMockUserSettings(settings: {
  tags: TagItem[]
  filterReasons: FilterReason[]
}) {
  console.log('保存用户设置:', settings)
  // 在实际应用中，这里会调用API保存设置
  return Promise.resolve(settings)
}

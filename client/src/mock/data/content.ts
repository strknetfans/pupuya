import { ContentItem } from '../../types'

// 模拟用户数据
const mockUsers = [
  {
    id: 'user1',
    name: '摄影师小王',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'user2',
    name: '陶艺工匠',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b890?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'user3',
    name: '城市探索者',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'user4',
    name: '猫奴一枚',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'user5',
    name: '美食达人',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: 'user6',
    name: '旅行博主',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face'
  }
]

// 模拟图片数据
const mockImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=480&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=420&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=460&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=380&fit=crop',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=440&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=500&fit=crop'
]

// 模拟标题和描述
const mockContent = [
  {
    title: '美丽的日落风景',
    description: '今天在海边拍摄的绝美日落，橙红色的天空映照在海面上，形成了完美的倒影。'
  },
  {
    title: '手工制作的陶瓷杯',
    description: '用心制作的手工陶瓷，每一个都是独一无二的艺术品。温润的质感，简约的设计。'
  },
  {
    title: '城市夜景摄影',
    description: '夜晚的城市充满了迷人的光影，每一盏灯都诉说着这座城市的故事。'
  },
  {
    title: '可爱的小猫咪',
    description: '家里的小橘猫今天特别活泼，一直在阳光下打滚，太可爱了！'
  },
  {
    title: '精致的法式甜点',
    description: '今天尝试制作马卡龙，虽然第一次做，但是效果还不错呢！'
  },
  {
    title: '森林里的清晨',
    description: '早起到森林里散步，薄雾缭绕，阳光透过树叶洒下，美得像仙境一样。'
  },
  {
    title: '复古风咖啡店',
    description: '在这家小众咖啡店里度过了愉快的下午，复古的装修风格让人很放松。'
  },
  {
    title: '手绘插画作品',
    description: '最近迷上了手绘，这是我的一幅小作品，希望大家喜欢！'
  },
  {
    title: '街头艺术涂鸦',
    description: '路过发现的有趣涂鸦，艺术就在我们身边，只要用心去发现。'
  },
  {
    title: '阳台上的小花园',
    description: '在阳台上种了一些花花草草，每天看着它们成长，心情都变好了。'
  }
]

// 生成随机数据的辅助函数
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成单个内容项
function generateContentItem(id: string): ContentItem {
  const content = getRandomItem(mockContent)
  const user = getRandomItem(mockUsers)
  const imageUrl = getRandomItem(mockImages)
  
  return {
    id,
    title: content.title,
    description: content.description,
    imageUrl,
    user,
    likes: getRandomNumber(10, 500),
    comments: getRandomNumber(5, 100),
    createdAt: new Date(Date.now() - getRandomNumber(0, 30) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['摄影', '生活', '美食', '旅行', '艺术'].slice(0, getRandomNumber(1, 3))
  }
}

// 生成内容列表
export function generateMockContentList(count: number = 20): ContentItem[] {
  return Array.from({ length: count }, (_, index) => 
    generateContentItem(`mock_${index + 1}_${Date.now()}`)
  )
}

// 基础mock数据
export const MOCK_CONTENT_LIST: ContentItem[] = [
  {
    id: '1',
    title: '美丽的日落风景',
    description: '今天在海边拍摄的绝美日落，橙红色的天空映照在海面上，形成了完美的倒影。',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    user: mockUsers[0],
    likes: 128,
    comments: 24,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['摄影', '自然']
  },
  {
    id: '2',
    title: '手工制作的陶瓷杯',
    description: '用心制作的手工陶瓷，每一个都是独一无二的艺术品。温润的质感，简约的设计。',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop',
    user: mockUsers[1],
    likes: 89,
    comments: 15,
    createdAt: '2024-01-14T15:20:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
    tags: ['手工', '艺术']
  },
  {
    id: '3',
    title: '城市夜景摄影',
    description: '夜晚的城市充满了迷人的光影，每一盏灯都诉说着这座城市的故事。',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=450&fit=crop',
    user: mockUsers[2],
    likes: 256,
    comments: 42,
    createdAt: '2024-01-13T20:15:00Z',
    updatedAt: '2024-01-13T20:15:00Z',
    tags: ['摄影', '城市']
  },
  {
    id: '4',
    title: '可爱的小猫咪',
    description: '家里的小橘猫今天特别活泼，一直在阳光下打滚，太可爱了！',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
    user: mockUsers[3],
    likes: 312,
    comments: 68,
    createdAt: '2024-01-12T14:45:00Z',
    updatedAt: '2024-01-12T14:45:00Z',
    tags: ['宠物', '生活']
  }
]

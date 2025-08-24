import { ContentItem } from '../../types'

// 模拟用户数据
const mockUsers = [
  {
    id: 'user1',
    name: '设计师小王',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
  },
  {
    id: 'user2',
    name: '摄影师老李',
    avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png'
  },
  {
    id: 'user3',
    name: '美食博主小张',
    avatar: 'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
  },
  {
    id: 'user4',
    name: '旅行达人小刘',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png'
  },
  {
    id: 'user5',
    name: '健身教练小陈',
    avatar: 'https://img11.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png'
  },
  {
    id: 'user6',
    name: '艺术家小红',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
  }
]

// 模拟图片数据 - 使用创作内容相关的图片
const mockImages = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop', // 手工陶瓷
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop', // 城市夜景
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop', // 小猫咪
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=600&fit=crop', // 法式甜点
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop', // 森林清晨
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=600&fit=crop', // 复古咖啡店
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop', // 街头涂鸦
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=600&fit=crop', // 阳台花园
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', // 日落风景
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'  // 手绘插画
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
  },
  {
    title: '二次元世界',
    description: '在二次元的世界里去寻找另外一个自己，探索无限的可能性。'
  },
  {
    title: '动漫角色设计',
    description: '设计了一个新的动漫角色，融合了现代元素和传统美学。'
  },
  {
    title: '游戏场景概念',
    description: '为游戏设计的场景概念图，营造梦幻般的游戏世界。'
  },
  {
    title: '插画艺术创作',
    description: '用数字绘画创作了一幅插画，展现了独特的艺术风格。'
  },
  {
    title: '角色立绘设计',
    description: '为角色设计的立绘，每个细节都经过精心雕琢。'
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

// Mock内容数据
export const MOCK_CONTENT_LIST: ContentItem[] = [
  {
    id: 'content1',
    title: '美丽的日落风景',
    description: '今天在海边拍摄的绝美日落，橙红色的天空映照着海面，形成了一幅天然的画卷。',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    user: {
      id: 'user1',
      name: '设计师小王',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    likes: 128,
    comments: 24,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['风景', '摄影', '日落']
  },
  {
    id: 'content2',
    title: '手工制作的陶瓷',
    description: '用心制作的手工陶瓷，每一个都是独一无二的艺术品，承载着匠人的心血和温度。',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    user: {
      id: 'user2',
      name: '摄影师老李',
      avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png'
    },
    likes: 89,
    comments: 15,
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    tags: ['手工', '陶瓷', '艺术']
  },
  {
    id: 'content3',
    title: '城市街景随拍',
    description: '漫步在城市街头，用镜头记录下每一个精彩的瞬间，感受都市的繁华与活力。',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop',
    user: {
      id: 'user3',
      name: '美食博主小张',
      avatar: 'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    likes: 156,
    comments: 32,
    createdAt: '2024-01-13T09:20:00Z',
    updatedAt: '2024-01-13T09:20:00Z',
    tags: ['城市', '街拍', '摄影']
  },
  {
    id: 'content4',
    title: '可爱的小猫咪',
    description: '这只小猫咪有着绿色的眼睛，在绿色背景的衬托下显得格外可爱和神秘。',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
    user: {
      id: 'user4',
      name: '旅行达人小刘',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png'
    },
    likes: 203,
    comments: 45,
    createdAt: '2024-01-12T14:15:00Z',
    updatedAt: '2024-01-12T14:15:00Z',
    tags: ['宠物', '猫咪', '可爱']
  },
  {
    id: 'content5',
    title: '美食制作过程',
    description: '从食材准备到成品出炉，每一个步骤都充满了对美食的热爱和对生活的态度。',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=600&fit=crop',
    user: {
      id: 'user5',
      name: '健身教练小陈',
      avatar: 'https://img11.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png'
    },
    likes: 178,
    comments: 28,
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
    tags: ['美食', '制作', '生活']
  },
  {
    id: 'content6',
    title: '自然风光摄影',
    description: '大自然的鬼斧神工总是能带给我们惊喜，用镜头记录下这些美丽的瞬间。',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
    user: {
      id: 'user6',
      name: '艺术家小红',
      avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
    },
    likes: 234,
    comments: 56,
    createdAt: '2024-01-10T16:45:00Z',
    updatedAt: '2024-01-10T16:45:00Z',
    tags: ['自然', '风光', '摄影']
  }
]

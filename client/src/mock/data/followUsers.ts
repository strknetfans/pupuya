import { FollowUser } from '../../types'
import Taro from '@tarojs/taro'

// Mock关注用户数据
export const MOCK_FOLLOW_USERS: FollowUser[] = [
  {
    id: 'user1',
    name: '设计师小王',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    bio: '专注UI/UX设计，热爱创意',
    isFollowing: true,
    followersCount: 2580,
    postsCount: 145
  },
  {
    id: 'user2',
    name: '摄影师老李',
    avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
    bio: '风光摄影师，记录美好瞬间',
    isFollowing: true,
    followersCount: 4200,
    postsCount: 89
  },
  {
    id: 'user3',
    name: '美食博主小张',
    avatar: 'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    bio: '分享美食，传递快乐',
    isFollowing: true,
    followersCount: 6800,
    postsCount: 234
  },
  {
    id: 'user4',
    name: '旅行达人小刘',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png',
    bio: '走遍天下，分享旅行故事',
    isFollowing: true,
    followersCount: 3200,
    postsCount: 178
  },
  {
    id: 'user5',
    name: '健身教练小陈',
    avatar: 'https://img11.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
    bio: '专业健身指导，健康生活倡导者',
    isFollowing: true,
    followersCount: 5100,
    postsCount: 156
  },
  {
    id: 'user6',
    name: '艺术家小红',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    bio: '绘画是我的语言，色彩是我的词汇',
    isFollowing: true,
    followersCount: 3800,
    postsCount: 92
  },
  {
    id: 'user7',
    name: '程序员小明',
    avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
    bio: '代码改变世界，技术创造未来',
    isFollowing: true,
    followersCount: 2900,
    postsCount: 67
  },
  {
    id: 'user8',
    name: '音乐人小华',
    avatar: 'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    bio: '用音符编织梦想，用旋律传递情感',
    isFollowing: true,
    followersCount: 5200,
    postsCount: 128
  },
  {
    id: 'user9',
    name: '作家小芳',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png',
    bio: '文字是思想的翅膀，故事是心灵的港湾',
    isFollowing: false,
    followersCount: 4600,
    postsCount: 156
  },
  {
    id: 'user10',
    name: '厨师小强',
    avatar: 'https://img11.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
    bio: '烹饪是艺术，美味是追求',
    isFollowing: false,
    followersCount: 3700,
    postsCount: 203
  }
]

// 生成更多Mock关注用户数据
export function generateMockFollowUsers(count: number): FollowUser[] {
  const names = [
    '艺术家小红', '程序员小明', '音乐人小华', '作家小芳', '厨师小强',
    '画家小美', '学者小文', '运动员小健', '时尚达人小雅', '科技极客小智',
    '园艺师小花', '宠物博主小萌', '手工艺人小巧', '读书达人小书', '电影爱好者小影'
  ]
  
  const bios = [
    '热爱生活，分享美好', '创造有趣的内容', '用心记录每一天',
    '传递正能量', '探索未知世界', '追求完美细节',
    '享受简单快乐', '发现生活之美', '用爱温暖世界'
  ]
  
  const avatars = [
    'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
    'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
    'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png'
  ]
  
  return Array.from({ length: count }, (_, index) => ({
    id: `generated_user_${index + 100}`,
    name: names[index % names.length],
    avatar: avatars[index % avatars.length],
    bio: bios[index % bios.length],
    isFollowing: Math.random() > 0.7, // 30% 概率已关注
    followersCount: Math.floor(Math.random() * 10000) + 100,
    postsCount: Math.floor(Math.random() * 500) + 10
  }))
}

// 本地存储的关注状态
const FOLLOW_STORAGE_KEY = 'pupuya_follow_users'

// 获取本地存储的关注状态
export function getLocalFollowStatus(): Record<string, boolean> {
  try {
    const stored = Taro.getStorageSync(FOLLOW_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// 保存关注状态到本地存储
export function saveLocalFollowStatus(userId: string, isFollowing: boolean): void {
  try {
    const current = getLocalFollowStatus()
    const updated = { ...current, [userId]: isFollowing }
    Taro.setStorageSync(FOLLOW_STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save follow status:', error)
  }
}

// 更新用户的关注状态
export function updateUserFollowStatus(users: FollowUser[]): FollowUser[] {
  if (!users || !Array.isArray(users)) {
    console.warn('updateUserFollowStatus: users is not a valid array')
    return []
  }
  
  const localStatus = getLocalFollowStatus()
  
  return users.map(user => ({
    ...user,
    isFollowing: localStatus.hasOwnProperty(user.id) ? localStatus[user.id] : user.isFollowing,
    // 如果关注状态改变，模拟粉丝数变化
    followersCount: localStatus.hasOwnProperty(user.id) 
      ? (localStatus[user.id] ? user.followersCount + 1 : Math.max(0, user.followersCount - 1))
      : user.followersCount
  }))
}

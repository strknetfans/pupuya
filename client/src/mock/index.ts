import { ContentItem, PaginatedResponse, FollowUser, FollowAction, FollowUserParams } from '../types'
import { MOCK_CONTENT_LIST, generateMockContentList } from './data/content'
import { TagItem, FilterReason } from '../components/SettingsPopup'
import { getMockUserSettings, saveMockUserSettings } from './data/settings'
import { 
  MOCK_FOLLOW_USERS, 
  generateMockFollowUsers, 
  updateUserFollowStatus, 
  saveLocalFollowStatus, 
  getLocalFollowStatus 
} from './data/followUsers'

// 模拟网络延迟
function delay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 模拟API响应格式
function createMockResponse<T>(data: T, success = true): Promise<{ code: number; message: string; data: T }> {
  return Promise.resolve({
    code: success ? 200 : 500,
    message: success ? 'success' : 'error',
    data
  })
}

// Mock API 服务
export class MockApiService {
  // 获取内容列表
  static async getContentList(params: {
    page?: number
    pageSize?: number
    tab?: 'follow' | 'discover'
    tags?: string[]
  } = {}): Promise<{ code: number; message: string; data: PaginatedResponse<ContentItem> }> {
    await delay(800) // 模拟网络延迟
    
    const { page = 1, pageSize = 20, tab = 'discover', tags = [] } = params
    
    // 根据tab类型返回不同数据
    let allItems: ContentItem[]
    if (tab === 'follow') {
      // 关注的内容，使用基础数据
      allItems = MOCK_CONTENT_LIST || []
    } else {
      // 发现页，生成更多随机数据
      allItems = [...(MOCK_CONTENT_LIST || []), ...(generateMockContentList(50) || [])]
    }
    
    // 根据tags筛选内容
    if (tags && tags.length > 0) {
      allItems = allItems.filter(item => 
        item.tags && item.tags.some(tag => tags.includes(tag))
      )
    }
    
    // 分页逻辑
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = (allItems || []).slice(startIndex, endIndex)
    
    const result: PaginatedResponse<ContentItem> = {
      items,
      total: (allItems || []).length,
      page,
      pageSize,
      hasMore: endIndex < (allItems || []).length
    }
    
    return createMockResponse(result)
  }
  
  // 获取单个内容详情
  static async getContentDetail(id: string): Promise<{ code: number; message: string; data: ContentItem | null }> {
    await delay(500)
    
    const allItems = [...MOCK_CONTENT_LIST, ...generateMockContentList(20)]
    const item = allItems.find(item => item.id === id)
    
    return createMockResponse(item)
  }
  
  // 点赞内容
  static async likeContent(id: string): Promise<{ code: number; message: string; data: { success: boolean; likes: number } }> {
    await delay(300)
    
    // 模拟点赞成功，返回新的点赞数
    const newLikes = Math.floor(Math.random() * 100) + 50
    
    return createMockResponse({
      success: true,
      likes: newLikes
    })
  }
  
  // 搜索内容
  static async searchContent(params: {
    keyword: string
    page?: number
    pageSize?: number
  }): Promise<{ code: number; message: string; data: PaginatedResponse<ContentItem> }> {
    await delay(600)
    
    const { keyword, page = 1, pageSize = 20 } = params
    const allItems = [...(MOCK_CONTENT_LIST || []), ...(generateMockContentList(30) || [])]
    
    // 简单的搜索逻辑
    const filteredItems = (allItems || []).filter(item => 
      item.title?.includes(keyword) || 
      item.description?.includes(keyword) ||
      item.tags?.some(tag => tag.includes(keyword))
    )
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = filteredItems.slice(startIndex, endIndex)
    
    const result: PaginatedResponse<ContentItem> = {
      items,
      total: (filteredItems || []).length,
      page,
      pageSize,
      hasMore: endIndex < (filteredItems || []).length
    }
    
    return createMockResponse(result)
  }
  
  // 获取用户设置
  static async getUserSettings(): Promise<{ code: number; message: string; data: { tags: TagItem[]; filterReasons: FilterReason[] } }> {
    await delay(300)
    
    const settings = getMockUserSettings()
    return createMockResponse(settings)
  }
  
  // 保存用户设置
  static async saveUserSettings(settings: {
    tags: TagItem[]
    filterReasons: FilterReason[]
  }): Promise<{ code: number; message: string; data: { success: boolean } }> {
    await delay(500)
    
    await saveMockUserSettings(settings)
    return createMockResponse({ success: true })
  }
  
  // 获取关注用户列表
  static async getFollowUsers(params: FollowUserParams = {}): Promise<{ code: number; message: string; data: PaginatedResponse<FollowUser> }> {
    await delay(600)
    
    const { page = 1, pageSize = 20 } = params
    
    // 获取所有关注用户数据并更新状态
    const allUsers = updateUserFollowStatus([...MOCK_FOLLOW_USERS, ...generateMockFollowUsers(30)])
    
    // 只返回已关注的用户
    const followedUsers = (allUsers || []).filter(user => user.isFollowing)
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = followedUsers.slice(startIndex, endIndex)
    
    const result: PaginatedResponse<FollowUser> = {
      items,
      total: followedUsers.length,
      page,
      pageSize,
      hasMore: endIndex < followedUsers.length
    }
    
    return createMockResponse(result)
  }
  
  // 搜索可关注的用户
  static async searchUsers(params: FollowUserParams): Promise<{ code: number; message: string; data: PaginatedResponse<FollowUser> }> {
    await delay(800)
    
    const { keyword = '', page = 1, pageSize = 20 } = params
    
    // 获取所有用户数据并更新状态
    const allUsers = updateUserFollowStatus([...MOCK_FOLLOW_USERS, ...generateMockFollowUsers(50)])
    
    // 搜索逻辑
    const filteredUsers = keyword 
      ? (allUsers || []).filter(user => 
          user.name.includes(keyword) || 
          user.bio?.includes(keyword)
        )
      : (allUsers || [])
    
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = filteredUsers.slice(startIndex, endIndex)
    
    const result: PaginatedResponse<FollowUser> = {
      items,
      total: filteredUsers.length,
      page,
      pageSize,
      hasMore: endIndex < filteredUsers.length
    }
    
    return createMockResponse(result)
  }
  
  // 关注/取消关注用户
  static async toggleFollow(action: FollowAction): Promise<{ code: number; message: string; data: { success: boolean; isFollowing: boolean; followersCount: number } }> {
    await delay(400)
    
    const { userId, action: followAction } = action
    const isFollowing = followAction === 'follow'
    
    // 保存到本地存储
    saveLocalFollowStatus(userId, isFollowing)
    
    // 模拟粉丝数变化
    const allUsers = [...MOCK_FOLLOW_USERS, ...generateMockFollowUsers(50)]
    const user = allUsers.find(u => u.id === userId)
    const baseFollowersCount = user?.followersCount || 1000
    const newFollowersCount = isFollowing 
      ? baseFollowersCount + 1 
      : Math.max(0, baseFollowersCount - 1)
    
    return createMockResponse({
      success: true,
      isFollowing,
      followersCount: newFollowersCount
    })
  }
  
  // 获取用户关注状态
  static async getFollowStatus(userId: string): Promise<{ code: number; message: string; data: { isFollowing: boolean; followersCount: number } }> {
    await delay(200)
    
    const localStatus = getLocalFollowStatus()
    const allUsers = [...MOCK_FOLLOW_USERS, ...generateMockFollowUsers(50)]
    const user = allUsers.find(u => u.id === userId)
    
    const isFollowing = localStatus.hasOwnProperty(userId) 
      ? localStatus[userId] 
      : user?.isFollowing || false
    
    const followersCount = user?.followersCount || 1000
    
    return createMockResponse({
      isFollowing,
      followersCount
    })
  }
}

export default MockApiService

// 用户信息类型
export interface User {
  id: string
  name: string
  avatar: string
  email?: string
  bio?: string
  followersCount?: number
  followingCount?: number
}

// 内容项类型
export interface ContentItem {
  id: string
  title: string
  description: string
  imageUrl: string
  user: User
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
  tags?: string[]
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Tab 类型
export type TabType = 'follow' | 'discover'

// 页面状态类型
export interface PageState {
  loading: boolean
  error: string | null
  refreshing: boolean
}

// 关注用户相关类型
export interface FollowUser {
  id: string
  name: string
  avatar: string
  bio?: string
  isFollowing: boolean
  followersCount: number
  postsCount: number
}

// 关注操作类型
export interface FollowAction {
  userId: string
  action: 'follow' | 'unfollow'
}

// 关注用户列表参数
export interface FollowUserParams {
  page?: number
  pageSize?: number
  keyword?: string
}

// 内容列表参数
export interface ContentListParams {
  page?: number
  pageSize?: number
  tab?: TabType
  tags?: string[]
}

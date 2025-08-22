import { ContentItem, PaginatedResponse } from '../types'
import { USE_MOCK } from '../config/env'
import { api } from './request'
import MockApiService from '../mock'

// 内容服务接口
interface ContentListParams {
  page?: number
  pageSize?: number
  tab?: 'follow' | 'discover'
}

interface SearchParams {
  keyword: string
  page?: number
  pageSize?: number
}

// 真实API服务
class RealContentService {
  // 获取内容列表
  static async getContentList(params: ContentListParams = {}) {
    const response = await api.get<PaginatedResponse<ContentItem>>('/content/list', params)
    return response
  }
  
  // 获取内容详情
  static async getContentDetail(id: string) {
    const response = await api.get<ContentItem>(`/content/${id}`)
    return response
  }
  
  // 点赞内容
  static async likeContent(id: string) {
    const response = await api.post<{ success: boolean; likes: number }>(`/content/${id}/like`)
    return response
  }
  
  // 搜索内容
  static async searchContent(params: SearchParams) {
    const response = await api.get<PaginatedResponse<ContentItem>>('/content/search', params)
    return response
  }
}

// 内容服务 - 根据环境变量决定使用Mock还是真实API
export class ContentService {
  // 获取内容列表
  static async getContentList(params: ContentListParams = {}) {
    if (USE_MOCK) {
      return MockApiService.getContentList(params)
    } else {
      return RealContentService.getContentList(params)
    }
  }
  
  // 获取内容详情
  static async getContentDetail(id: string) {
    if (USE_MOCK) {
      return MockApiService.getContentDetail(id)
    } else {
      return RealContentService.getContentDetail(id)
    }
  }
  
  // 点赞内容
  static async likeContent(id: string) {
    if (USE_MOCK) {
      return MockApiService.likeContent(id)
    } else {
      return RealContentService.likeContent(id)
    }
  }
  
  // 搜索内容
  static async searchContent(params: SearchParams) {
    if (USE_MOCK) {
      return MockApiService.searchContent(params)
    } else {
      return RealContentService.searchContent(params)
    }
  }
}

export default ContentService

import { FollowUser, FollowAction, FollowUserParams, PaginatedResponse } from '../types'
import { USE_MOCK } from '../config/env'
import { api } from './request'
import MockApiService from '../mock'

// 关注服务接口
interface FollowUserResponse {
  success: boolean
  isFollowing: boolean
  followersCount: number
}

// 真实API服务
class RealFollowService {
  // 获取关注用户列表
  static async getFollowUsers(params: FollowUserParams = {}) {
    const response = await api.get<PaginatedResponse<FollowUser>>('/follow/users', params)
    return response
  }
  
  // 搜索可关注的用户
  static async searchUsers(params: FollowUserParams) {
    const response = await api.get<PaginatedResponse<FollowUser>>('/users/search', params)
    return response
  }
  
  // 关注/取消关注用户
  static async toggleFollow(action: FollowAction) {
    const response = await api.post<FollowUserResponse>(`/follow/${action.action}`, {
      userId: action.userId
    })
    return response
  }
  
  // 获取用户关注状态
  static async getFollowStatus(userId: string) {
    const response = await api.get<{ isFollowing: boolean; followersCount: number }>(`/follow/status/${userId}`)
    return response
  }
}

// 关注服务 - 根据环境变量决定使用Mock还是真实API
export class FollowService {
  // 获取关注用户列表
  static async getFollowUsers(params: FollowUserParams = {}) {
    if (USE_MOCK) {
      return MockApiService.getFollowUsers(params)
    } else {
      return RealFollowService.getFollowUsers(params)
    }
  }
  
  // 搜索可关注的用户
  static async searchUsers(params: FollowUserParams) {
    if (USE_MOCK) {
      return MockApiService.searchUsers(params)
    } else {
      return RealFollowService.searchUsers(params)
    }
  }
  
  // 关注/取消关注用户
  static async toggleFollow(action: FollowAction) {
    if (USE_MOCK) {
      return MockApiService.toggleFollow(action)
    } else {
      return RealFollowService.toggleFollow(action)
    }
  }
  
  // 获取用户关注状态
  static async getFollowStatus(userId: string) {
    if (USE_MOCK) {
      return MockApiService.getFollowStatus(userId)
    } else {
      return RealFollowService.getFollowStatus(userId)
    }
  }
}

export default FollowService

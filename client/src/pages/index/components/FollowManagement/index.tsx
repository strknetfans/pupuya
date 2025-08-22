import React, { FC, memo, useState, useEffect } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { Popup, Loading, Empty } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { FollowUser, FollowUserParams } from '../../../../types'
import { FollowService } from '../../../../services/followService'
import UserCard from './UserCard'
import { formatNumber } from '../../../../utils/textUtils'
import './index.less'

interface FollowManagementProps {
  visible: boolean
  onClose: () => void
  onFollowChange?: (userId: string, isFollowing: boolean) => void
}

const FollowManagement: FC<FollowManagementProps> = memo(({
  visible,
  onClose,
  onFollowChange
}) => {
  const [activeTab, setActiveTab] = useState<'following' | 'discover'>('following')
  const [followUsers, setFollowUsers] = useState<FollowUser[]>([])
  const [discoverUsers, setDiscoverUsers] = useState<FollowUser[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  // 获取关注用户列表
  const loadFollowUsers = async (reset = false) => {
    try {
      setLoading(true)
      const currentPage = reset ? 1 : page
      const params: FollowUserParams = {
        page: currentPage,
        limit: 20
      }
      
      const result = await FollowService.getFollowUsers(params)
      
      if (reset) {
        setFollowUsers(result.users)
        setPage(2)
      } else {
        setFollowUsers(prev => [...prev, ...result.users])
        setPage(prev => prev + 1)
      }
      
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('获取关注用户失败:', error)
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 搜索用户
  const searchUsers = async (keyword = searchKeyword, reset = false) => {
    try {
      setLoading(true)
      const currentPage = reset ? 1 : page
      const result = await FollowService.searchUsers({
        keyword,
        page: currentPage,
        limit: 20
      })
      
      if (reset) {
        setDiscoverUsers(result.users)
        setPage(2)
      } else {
        setDiscoverUsers(prev => [...prev, ...result.users])
        setPage(prev => prev + 1)
      }
      
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('搜索用户失败:', error)
      Taro.showToast({
        title: '搜索失败',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  // 切换关注状态
  const handleToggleFollow = async (user: FollowUser) => {
    try {
      const newStatus = !user.isFollowing
      await FollowService.toggleFollow(user.id, newStatus)
      
      // 更新本地状态
      const updateUserInList = (users: FollowUser[]) =>
        users.map(u => u.id === user.id ? { ...u, isFollowing: newStatus } : u)
      
      setFollowUsers(updateUserInList)
      setDiscoverUsers(updateUserInList)
      
      // 通知父组件
      onFollowChange?.(user.id, newStatus)
      
      Taro.showToast({
        title: newStatus ? '关注成功' : '取消关注',
        icon: 'success'
      })
    } catch (error) {
      console.error('操作失败:', error)
      Taro.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  }

  // 处理标签切换
  const handleTabChange = (tab: 'following' | 'discover') => {
    setActiveTab(tab)
    setPage(1)
    setHasMore(true)
    
    if (tab === 'following') {
      loadFollowUsers(true)
    } else {
      searchUsers('', true)
    }
  }

  // 处理搜索
  const handleSearch = () => {
    if (activeTab === 'discover') {
      setPage(1)
      setHasMore(true)
      searchUsers(searchKeyword, true)
    }
  }

  // 处理加载更多
  const handleLoadMore = () => {
    if (loading || !hasMore) return
    
    if (activeTab === 'following') {
      loadFollowUsers()
    } else {
      searchUsers()
    }
  }

  // 获取当前显示的用户列表
  const displayUsers = activeTab === 'following' ? followUsers : discoverUsers

  // 初始化数据
  useEffect(() => {
    if (visible) {
      setPage(1)
      setHasMore(true)
      setSearchKeyword('')
      
      if (activeTab === 'following') {
        loadFollowUsers(true)
      } else {
        searchUsers('', true)
      }
    }
  }, [visible, activeTab])

  return (
    <Popup 
      visible={visible} 
      position="right" 
      style={{ width: '100%', height: '100%' }}
      onClose={onClose}
    >
      <View className="follow-management">
        {/* 自定义头部 */}
        <View className="follow-management__header">
          <Text className="follow-management__title">管理关注</Text>
          <Text className="follow-management__close" onClick={onClose}>✕</Text>
        </View>
        
        <View className="follow-management__content">
          {/* 自定义标签页 */}
          <View className="follow-management__tabs">
            <View 
              className={`follow-management__tab ${activeTab === 'following' ? 'active' : ''}`}
              onClick={() => handleTabChange('following')}
            >
              <Text>关注 {followUsers.length}</Text>
            </View>
            <View 
              className={`follow-management__tab ${activeTab === 'discover' ? 'active' : ''}`}
              onClick={() => handleTabChange('discover')}
            >
              <Text>发现</Text>
            </View>
          </View>
          
          {/* 搜索框 */}
          {activeTab === 'discover' && (
            <View className="follow-management__search">
              <Input
                className="follow-management__search-input"
                placeholder="搜索用户"
                value={searchKeyword}
                onInput={(e) => setSearchKeyword(e.detail.value)}
                onConfirm={handleSearch}
              />
            </View>
          )}
          
          {/* 用户列表 */}
          <ScrollView 
            className="follow-management__list"
            scrollY
            onScrollToLower={handleLoadMore}
          >
            {displayUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onToggleFollow={handleToggleFollow}
              />
            ))}
            
            {/* 加载更多 */}
            {hasMore && displayUsers.length > 0 && (
              <View className="follow-management__load-more" onClick={handleLoadMore}>
                <Text>{loading ? '加载中...' : '加载更多'}</Text>
              </View>
            )}
            
            {/* 空状态 */}
            {!loading && displayUsers.length === 0 && (
              <Empty description={activeTab === 'following' ? '暂无关注用户' : '暂无用户'} />
            )}
          </ScrollView>
        </View>
        
        {loading && displayUsers.length === 0 && (
          <Loading className="follow-management__loading" />
        )}
      </View>
    </Popup>
  )
})

FollowManagement.displayName = 'FollowManagement'

export default FollowManagement
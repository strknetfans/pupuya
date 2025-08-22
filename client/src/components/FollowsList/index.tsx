import React, { FC, memo, useState, useEffect } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import { Loading } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { FollowUser } from '../../types'
import { FollowService } from '../../services/followService'
import PlatformUtils from '../../utils/platform'
import './index.less'

interface FollowsListProps {
  className?: string
  onFollowChange?: (users: FollowUser[]) => void
}

const FollowsList: FC<FollowsListProps> = memo(({
  className = '',
  onFollowChange
}) => {
  const [followUsers, setFollowUsers] = useState<FollowUser[]>([])
  const [loading, setLoading] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<FollowUser[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [deleteMode, setDeleteMode] = useState(false)

  // 加载已关注用户列表
  const loadFollowUsers = async () => {
    try {
      setLoading(true)
      const result = await FollowService.getFollowUsers({ page: 1, limit: 50 })
      if (result?.code === 200) {
        const followedUsers = (result?.data?.items || []).filter(user => user.isFollowing)
        setFollowUsers(followedUsers)
        onFollowChange?.(followedUsers)
      } else {
        console.error('获取关注用户失败:', result?.message)
        setFollowUsers([])
      }
    } catch (error) {
      console.error('加载关注用户失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 搜索用户
  const searchUsers = async (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([])
      return
    }

    try {
      setSearchLoading(true)
      const result = await FollowService.searchUsers({
        keyword: keyword.trim(),
        page: 1,
        limit: 20
      })
      if (result?.code === 200) {
        setSearchResults(result?.data?.items || [])
      } else {
        console.error('搜索用户失败:', result?.message)
        setSearchResults([])
      }
    } catch (error) {
      console.error('搜索用户失败:', error)
      Taro.showToast({
        title: '搜索失败',
        icon: 'error'
      })
    } finally {
      setSearchLoading(false)
    }
  }

  // 关注/取消关注用户
  const toggleFollow = async (user: FollowUser) => {
    try {
      const newStatus = !user.isFollowing
      await FollowService.toggleFollow(user.id, newStatus)

      if (newStatus) {
        // 添加关注
        const newUser = { ...user, isFollowing: true }
        setFollowUsers(prev => [...(prev || []), newUser])
        setSearchResults(prev => 
          (prev || []).map(u => u.id === user.id ? newUser : u)
        )
        
        Taro.showToast({
          title: '关注成功',
          icon: 'success'
        })
      } else {
        // 取消关注
        setFollowUsers(prev => (prev || []).filter(u => u.id !== user.id))
        setSearchResults(prev => 
          (prev || []).map(u => u.id === user.id ? { ...u, isFollowing: false } : u)
        )
        
        Taro.showToast({
          title: '已取消关注',
          icon: 'success'
        })
      }

      // 重新加载关注列表
      loadFollowUsers()
    } catch (error) {
      console.error('操作失败:', error)
      Taro.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  }

  // 处理添加按钮点击
  const handleAddClick = () => {
    setSearchVisible(true)
    setSearchKeyword('')
    setSearchResults([])
  }

  // 处理搜索输入
  const handleSearchInput = (e: any) => {
    const value = e.detail.value
    setSearchKeyword(value)
    searchUsers(value)
  }

  // 处理用户长按
  const handleUserLongPress = () => {
    setDeleteMode(true)
    Taro.vibrateShort()
  }

  // 处理删除用户
  const handleDeleteUser = (user: FollowUser) => {
    toggleFollow(user)
    setDeleteMode(false)
  }

  // 处理用户触摸开始
  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      handleUserLongPress()
    }, 800) // 800ms长按
    setLongPressTimer(timer)
  }

  // 处理用户触摸结束
  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  // 取消删除模式
  const cancelDeleteMode = () => {
    setDeleteMode(false)
  }

  useEffect(() => {
    loadFollowUsers()
  }, [])

  return (
    <View className={`follows-list ${className} ${PlatformUtils.getPlatformClass()}`}>
      {/* 关注用户列表 */}
      <View 
        className="follows-list__container"
        onClick={deleteMode ? cancelDeleteMode : undefined}
      >
        {/* 添加按钮 */}
        <View className="follows-list__add-btn" onClick={handleAddClick}>
          <Text className="follows-list__add-icon">+</Text>
          <Text className="follows-list__add-text">添加</Text>
        </View>

        {/* 已关注用户列表 */}
        {loading ? (
          <View className="follows-list__loading">
            <Loading />
          </View>
        ) : followUsers && followUsers.length > 0 ? (
          followUsers.map(user => (
            <View
              key={user.id}
              className={`follows-list__user ${deleteMode ? 'follows-list__user--delete-mode' : ''}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <Image
                className="follows-list__user-avatar"
                src={user.avatar}
                mode="aspectFill"
              />
              <Text className="follows-list__user-name">{user.name}</Text>
              
              {/* 删除模式下的删除按钮 */}
              {deleteMode && (
                <View 
                  className="follows-list__delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteUser(user)
                  }}
                >
                  <Text className="follows-list__delete-icon">×</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className="follows-list__empty">
            <Text className="follows-list__empty-text">暂无关注用户</Text>
          </View>
        )}
      </View>

      {/* 搜索用户弹窗 */}
      {searchVisible && (
        <View className="follows-list__modal-overlay" onClick={() => setSearchVisible(false)}>
          <View className="follows-list__search-popup" onClick={(e) => e.stopPropagation()}>
            {/* 弹窗头部 */}
            <View className="follows-list__search-header">
              <Text className="follows-list__search-title">添加关注</Text>
              <View 
                className="follows-list__search-close"
                onClick={(e) => {
                  e.stopPropagation()
                  setSearchVisible(false)
                }}
              >
                <Text className="follows-list__search-close-icon">×</Text>
              </View>
            </View>

            {/* 搜索输入框 */}
            <View className="follows-list__search-input-container">
              <Input
                className="follows-list__search-input"
                placeholder="搜索用户名..."
                value={searchKeyword}
                onInput={handleSearchInput}
                focus
              />
            </View>

            {/* 搜索结果 */}
            <View className="follows-list__search-results">
              {searchLoading ? (
                <View className="follows-list__search-loading">
                  <Loading />
                  <Text>搜索中...</Text>
                </View>
              ) : searchResults && searchResults.length > 0 ? (
                searchResults.map(user => (
                  <View
                    key={user.id}
                    className="follows-list__search-result"
                  >
                    <Image
                      className="follows-list__search-result-avatar"
                      src={user.avatar}
                      mode="aspectFill"
                    />
                    <View className="follows-list__search-result-info">
                      <Text className="follows-list__search-result-name">
                        {user.name}
                      </Text>
                      {user.bio && (
                        <Text className="follows-list__search-result-bio">
                          {user.bio}
                        </Text>
                      )}
                    </View>
                    <View 
                      className="follows-list__search-result-action"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFollow(user)
                      }}
                    >
                      <Text className={`follows-list__follow-btn ${user.isFollowing ? 'follows-list__follow-btn--following' : ''}`}>
                        {user.isFollowing ? '已关注' : '+ 关注'}
                      </Text>
                    </View>
                  </View>
                ))
              ) : searchKeyword ? (
                <View className="follows-list__search-empty">
                  <Text className="follows-list__search-empty-icon">🔍</Text>
                  <Text className="follows-list__search-empty-text">没有找到相关用户</Text>
                </View>
              ) : (
                <View className="follows-list__search-hint">
                  <Text className="follows-list__search-hint-text">
                    输入用户名进行搜索
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  )
})

FollowsList.displayName = 'FollowsList'

export default FollowsList

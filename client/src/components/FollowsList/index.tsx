import React, { FC, memo, useState, useEffect, useRef } from 'react'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { Loading } from '@nutui/nutui-react-taro'
import Taro, { showToast as _showToast, vibrateShort as _vibrateShort } from "@tarojs/taro"
import { FollowUser } from '../../types'
import { FollowService } from "../../services/followService"
import { MOCK_FOLLOW_USERS, generateMockFollowUsers } from "../../mock/data/followUsers"
import PlatformUtils from "../../utils/platform"
import "./index.less"

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

  // 加载关注用户列表
  const loadFollowUsers = async () => {
    try {
      setLoading(true)
      const result = await FollowService.getFollowUsers({
        page: 1,
        pageSize: 20
      })
      if (result?.code === 200) {
        setFollowUsers(result?.data?.items || [])
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
      
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // 调用API搜索
      const result = await FollowService.searchUsers({
        keyword: keyword.trim(),
        page: 1,
        pageSize: 20
      })
      
      if (result?.code === 200 && result?.data?.items && result.data.items.length > 0) {
        // API返回了数据，使用API数据
        setSearchResults(result.data.items)
      } else {
        // API没有返回数据，生成mock数据
        const mockResults = generateMockSearchResults(keyword.trim())
        setSearchResults(mockResults)
      }
    } catch (error) {
      console.error('搜索用户失败:', error)
      // 即使API失败，也生成mock数据
      const mockResults = generateMockSearchResults(keyword.trim())
      setSearchResults(mockResults)
    } finally {
      setSearchLoading(false)
    }
  }

  // 生成搜索相关的mock数据
  const generateMockSearchResults = (keyword: string): FollowUser[] => {
    const allMockUsers = [
      ...MOCK_FOLLOW_USERS,
      ...generateMockFollowUsers(15) // 额外生成15个用户
    ]
    
    // 根据关键词过滤用户
    const filteredUsers = allMockUsers.filter(user => 
      user.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (user.bio && user.bio.toLowerCase().includes(keyword.toLowerCase()))
    )
    
    // 如果过滤后没有结果，生成一些包含关键词的新用户
    if (filteredUsers.length === 0) {
      const newUsers = generateKeywordBasedUsers(keyword, 8)
      return newUsers
    }
    
    // 如果过滤后结果太少，补充一些相关用户
    if (filteredUsers.length < 5) {
      const additionalUsers = generateKeywordBasedUsers(keyword, 8 - filteredUsers.length)
      return [...filteredUsers, ...additionalUsers]
    }
    
    return filteredUsers.slice(0, 8) // 最多返回8个结果
  }

  // 根据关键词生成相关用户
  const generateKeywordBasedUsers = (keyword: string, count: number): FollowUser[] => {
    const bios = [
      `热爱${keyword}，专注${keyword}领域`, 
      `${keyword}是我的专业，分享${keyword}知识`,
      `探索${keyword}的无限可能`, 
      `${keyword}让生活更美好`,
      `用${keyword}创造价值`, 
      `${keyword}是我的生活方式`,
      `专业${keyword}服务`, 
      `${keyword}达人，经验丰富`
    ]
    
    const avatars = [
      'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
      'https://img14.360buyimg.com/imagetools/jfs/t1/119808/14/21072/15316/5fc6f541Ee7ba5a4d/e74bcc2dc53e1c42.png',
      'https://img10.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
      'https://img12.360buyimg.com/imagetools/jfs/t1/197430/22/11378/316232/60ec2312E27b2e89e/5ac29f7970ba2c22.png'
    ]
    
    return Array.from({ length: count }, (_, index) => ({
      id: `search_user_${Date.now()}_${index}`,
      name: `${keyword}达人${index + 1}`,
      avatar: avatars[index % avatars.length],
      bio: bios[index % bios.length],
      isFollowing: Math.random() > 0.8, // 20% 概率已关注
      followersCount: Math.floor(Math.random() * 8000) + 500,
      postsCount: Math.floor(Math.random() * 300) + 20
    }))
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

  // 关闭搜索弹窗
  const closeSearchPopup = () => {
    setSearchVisible(false)
  }

  // 处理弹窗背景点击
  const handleOverlayClick = () => {
    closeSearchPopup()
  }

  // 处理弹窗内容点击，阻止事件冒泡
  const handlePopupClick = (e: any) => {
    e.stopPropagation()
  }

  // 处理关闭按钮点击
  const handleCloseClick = (e: any) => {
    e.stopPropagation()
    closeSearchPopup()
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
    
    // 组件卸载时恢复页面滚动
    return () => {
      // 在Taro中不需要手动管理页面滚动
    }
  }, [])

  // 监听弹窗状态变化，管理页面滚动
  useEffect(() => {
    if (searchVisible) {
      // 弹窗打开时，尝试阻止页面滚动
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      
      // 添加CSS类来防止页面滚动
      if (typeof document !== 'undefined') {
        document.body.classList.add('popup-open')
      }
    } else {
      // 弹窗关闭时，移除CSS类
      if (typeof document !== 'undefined') {
        document.body.classList.remove('popup-open')
      }
    }
  }, [searchVisible])

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
        <View className="follows-list__modal-overlay" onClick={handleOverlayClick}>
          <View className="follows-list__search-popup" onClick={handlePopupClick}>
            {/* 弹窗头部 */}
            <View className="follows-list__search-header">
              <Text className="follows-list__search-title">添加关注</Text>
              <View 
                className="follows-list__search-close"
                onClick={handleCloseClick}
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

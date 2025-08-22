import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidShow, useLoad, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'

import HomeHeader from './components/HomeHeader'
import WaterfallFlow from './components/WaterfallFlow'
import FollowManagement from './components/FollowManagement'
import TabBar from '../../components/TabBar'
import SettingsPopup from '../../components/SettingsPopup'
import FollowsList from '../../components/FollowsList'
import { ContentItem, TabType, PageState } from '../../types'
import { ContentService } from '../../services/contentService'
import { USE_MOCK, DEBUG } from '../../config/env'
import PlatformUtils from '../../utils/platform'

import './index.less'

function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('follow')
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [pageState, setPageState] = useState<PageState>({
    loading: false,
    error: null,
    refreshing: false
  })
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    hasMore: true
  })
  
  // 设置弹窗相关状态
  const [settingsVisible, setSettingsVisible] = useState(false)
  
  // 关注管理相关状态
  const [followManagementVisible, setFollowManagementVisible] = useState(false)

  useLoad(() => {
    console.log('首页加载')
    if (DEBUG) {
      console.log('平台信息:', PlatformUtils.getDebugInfo())
    }
    loadContent()
  })

  useDidShow(() => {
    console.log('首页显示')
  })

  usePullDownRefresh(() => {
    handleRefresh()
  })

  useReachBottom(() => {
    handleLoadMore()
  })

  const loadContent = async (isRefresh = false) => {
    // 如果是刷新，重置分页
    const currentPage = isRefresh ? 1 : pagination.page
    
    setPageState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      if (DEBUG) {
        console.log(`加载内容 - Tab: ${activeTab}, Page: ${currentPage}, Mock: ${USE_MOCK}`)
      }
      
      const response = await ContentService.getContentList({
        page: currentPage,
        pageSize: pagination.pageSize,
        tab: activeTab
      })
      
      if (response.code === 200) {
        const { items = [], hasMore } = response.data || {}
        
        if (isRefresh) {
          // 刷新时替换数据
          setContentItems(items)
          setPagination(prev => ({ ...prev, page: 1, hasMore }))
        } else {
          // 加载更多时追加数据
          setContentItems(prev => [...(prev || []), ...(items || [])])
          setPagination(prev => ({ ...prev, hasMore }))
        }
      } else {
        throw new Error(response.message || '加载失败')
      }
    } catch (error: any) {
      console.error('加载内容失败:', error)
      setPageState(prev => ({ ...prev, error: error.message || '加载失败，请重试' }))
    } finally {
      setPageState(prev => ({ ...prev, loading: false }))
    }
  }

  const handleRefresh = async () => {
    setPageState(prev => ({ ...prev, refreshing: true }))
    
    try {
      await loadContent(true)
      Taro.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      })
    } catch (error) {
      Taro.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1500
      })
    } finally {
      setPageState(prev => ({ ...prev, refreshing: false }))
      Taro.stopPullDownRefresh()
    }
  }

  const handleLoadMore = async () => {
    if (pageState.loading || !pagination.hasMore) return
    
    const nextPage = pagination.page + 1
    setPagination(prev => ({ ...prev, page: nextPage }))
    
    try {
      await loadContent(false)
    } catch (error) {
      // 加载失败时回滚页码
      setPagination(prev => ({ ...prev, page: nextPage - 1 }))
      Taro.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    // 切换tab时重置数据并重新加载
    setContentItems([])
    setPagination({ page: 1, pageSize: 20, hasMore: true })
    
    // 使用 useEffect 来监听 activeTab 变化
  }

  // 监听 activeTab 变化，重新加载数据
  useEffect(() => {
    if (activeTab) {
      loadContent(true)
    }
  }, [activeTab])

  // 设置相关处理函数
  const handleSettingsClick = () => {
    setSettingsVisible(true)
  }
  
  const handleSettingsClose = () => {
    setSettingsVisible(false)
  }
  
  const handleContentNotInterested = () => {
    Taro.showToast({
      title: '已减少此类内容推荐',
      icon: 'success',
      duration: 2000
    })
    
    // 重新加载内容
    setContentItems([])
    setPagination({ page: 1, pageSize: 20, hasMore: true })
    loadContent(true)
  }
  
  const handleAuthorNotInterested = () => {
    Taro.showToast({
      title: '已减少该作者内容推荐',
      icon: 'success',
      duration: 2000
    })
    
    // 重新加载内容
    setContentItems([])
    setPagination({ page: 1, pageSize: 20, hasMore: true })
    loadContent(true)
  }

  const handleSearchClick = () => {
    Taro.showToast({
      title: '搜索功能',
      icon: 'none'
    })
  }

  const handleItemClick = (item: ContentItem) => {
    Taro.showToast({
      title: `查看：${item.title}`,
      icon: 'none'
    })
  }

  const handleFollowManagementClose = () => {
    setFollowManagementVisible(false)
  }
  
  const handleFollowChange = (userId: string, isFollowing: boolean) => {
    console.log(`用户 ${userId} 关注状态变为: ${isFollowing}`)
    // 如果当前在关注tab，重新加载内容
    if (activeTab === 'follow') {
      setContentItems([])
      setPagination({ page: 1, pageSize: 20, hasMore: true })
      loadContent(true)
    }
  }

  const handleFollowsListChange = (users: any[]) => {
    console.log('关注用户列表变化:', users)
    // 如果当前在关注tab，重新加载内容以反映关注变化
    if (activeTab === 'follow') {
      setContentItems([])
      setPagination({ page: 1, pageSize: 20, hasMore: true })
      loadContent(true)
    }
  }

  return (
    <ConfigProvider locale={zhCN}>
      <View className={`home-page ${PlatformUtils.getPlatformClass()}`}>
        <HomeHeader
          onTabChange={handleTabChange}
          onSettingsClick={handleSettingsClick}
          onSearchClick={handleSearchClick}
        />
        
        {/* 关注用户列表 - 仅在关注tab下显示 */}
        {activeTab === 'follow' && (
          <FollowsList
            onFollowChange={handleFollowsListChange}
          />
        )}
        
        <WaterfallFlow
          items={contentItems}
          onItemClick={handleItemClick}
          onLoadMore={handleLoadMore}
          loading={pageState.loading}
        />
        
        <TabBar activeTab="home" />
        
        {/* 设置弹窗 */}
        <SettingsPopup
          visible={settingsVisible}
          onClose={handleSettingsClose}
          currentTags={['娱乐', '短视频', '三月打卡', '衍生', '大理寺少卿游']}
          onNotInterested={handleContentNotInterested}
          onAuthorNotInterested={handleAuthorNotInterested}
        />
        
        {/* 关注管理弹窗 */}
        <FollowManagement
          visible={followManagementVisible}
          onClose={handleFollowManagementClose}
          onFollowChange={handleFollowChange}
        />
      </View>
    </ConfigProvider>
  )
}

export default Index

import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import './index.less'

interface SearchHistory {
  id: string
  keyword: string
  timestamp: number
}

interface SuggestedSearch {
  id: string
  keyword: string
  category: string
}

interface TrendingItem {
  id: string
  keyword: string
  score: number
  rank: number
}

const SearchPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [suggestedSearches, setSuggestedSearches] = useState<SuggestedSearch[]>([])
  const [trendingList, setTrendingList] = useState<TrendingItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<any>(null)

  // 页面加载生命周期
  useLoad(() => {
    console.log('搜索页面加载成功')
  })

  // 页面显示生命周期
  useDidShow(() => {
    console.log('搜索页面显示')
  })

  // 模拟搜索历史数据
  const mockSearchHistory: SearchHistory[] = [
    { id: '1', keyword: '短视频', timestamp: Date.now() - 3600000 },
    { id: '2', keyword: '二次元', timestamp: Date.now() - 7200000 },
    { id: '3', keyword: '设计', timestamp: Date.now() - 10800000 },
    { id: '4', keyword: '美食', timestamp: Date.now() - 14400000 }
  ]

  // 模拟推荐搜索数据
  const mockSuggestedSearches: SuggestedSearch[] = [
    { id: '1', keyword: '二次元大世界', category: '动漫' },
    { id: '2', keyword: '二次元', category: '动漫' },
    { id: '3', keyword: '二次', category: '动漫' },
    { id: '4', keyword: '美女子', category: '生活' },
    { id: '5', keyword: '你喜欢看啥', category: '生活' },
    { id: '6', keyword: '哈哈哈哈', category: '娱乐' }
  ]

  // 模拟热搜榜数据
  const mockTrendingList: TrendingItem[] = [
    { id: '1', keyword: '二次元', score: 100, rank: 1 },
    { id: '2', keyword: '设计', score: 99, rank: 2 },
    { id: '3', keyword: '你想去的地方', score: 86, rank: 3 },
    { id: '4', keyword: '加班加班', score: 80, rank: 4 },
    { id: '5', keyword: '哈哈哈哈哈', score: 76, rank: 5 },
    { id: '6', keyword: '你看看', score: 60, rank: 6 },
    { id: '7', keyword: '你想去的地方', score: 50, rank: 7 }
  ]

  useEffect(() => {
    console.log('搜索页面useEffect执行')
    // 加载搜索历史
    loadSearchHistory()
    // 加载推荐搜索
    loadSuggestedSearches()
    // 加载热搜榜
    loadTrendingList()
    // 聚焦搜索输入框
    focusSearchInput()
  }, [])

  // 加载搜索历史
  const loadSearchHistory = () => {
    try {
      const stored = Taro.getStorageSync('search_history')
      if (stored) {
        setSearchHistory(JSON.parse(stored))
      } else {
        setSearchHistory(mockSearchHistory)
      }
    } catch (error) {
      console.error('加载搜索历史失败:', error)
      setSearchHistory(mockSearchHistory)
    }
  }

  // 加载推荐搜索
  const loadSuggestedSearches = () => {
    setSuggestedSearches(mockSuggestedSearches)
  }

  // 加载热搜榜
  const loadTrendingList = () => {
    setTrendingList(mockTrendingList)
  }

  // 聚焦搜索输入框
  const focusSearchInput = () => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 100)
  }

  // 处理搜索输入
  const handleSearchInput = (e: any) => {
    const value = e.detail.value
    setSearchKeyword(value)
  }

  // 处理搜索提交
  const handleSearchSubmit = () => {
    if (!searchKeyword.trim()) {
      Taro.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }

    // 保存搜索历史
    saveSearchHistory(searchKeyword.trim())
    
    // 执行搜索
    performSearch(searchKeyword.trim())
  }

  // 保存搜索历史
  const saveSearchHistory = (keyword: string) => {
    try {
      const newHistory = {
        id: Date.now().toString(),
        keyword,
        timestamp: Date.now()
      }
      
      const updatedHistory = [newHistory, ...searchHistory.filter(h => h.keyword !== keyword)]
      const finalHistory = updatedHistory.slice(0, 10) // 最多保存10条
      
      setSearchHistory(finalHistory)
      Taro.setStorageSync('search_history', JSON.stringify(finalHistory))
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  // 执行搜索
  const performSearch = (keyword: string) => {
    setIsSearching(true)
    
    // 模拟搜索延迟
    setTimeout(() => {
      setIsSearching(false)
      
      // 跳转到搜索结果页面或返回首页
      Taro.navigateBack({
        delta: 1
      })
      
      Taro.showToast({
        title: `搜索: ${keyword}`,
        icon: 'none'
      })
    }, 500)
  }

  // 清除搜索历史
  const clearSearchHistory = () => {
    Taro.showModal({
      title: '确认清除',
      content: '确定要清除所有搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          setSearchHistory([])
          Taro.removeStorageSync('search_history')
          Taro.showToast({
            title: '已清除',
            icon: 'success'
          })
        }
      }
    })
  }

  // 刷新推荐搜索
  const refreshSuggestedSearches = () => {
    Taro.showToast({
      title: '已刷新',
      icon: 'success'
    })
    // 这里可以重新请求推荐搜索数据
  }

  // 点击搜索历史项
  const handleHistoryClick = (keyword: string) => {
    setSearchKeyword(keyword)
    performSearch(keyword)
  }

  // 点击推荐搜索项
  const handleSuggestedClick = (keyword: string) => {
    setSearchKeyword(keyword)
    performSearch(keyword)
  }

  // 点击热搜项
  const handleTrendingClick = (keyword: string) => {
    setSearchKeyword(keyword)
    performSearch(keyword)
  }

  // 返回上一页
  const handleBack = () => {
    Taro.navigateBack({
      delta: 1
    })
  }

  return (
    <View className="search-page">
      {/* 搜索头部 */}
      <View className="search-header">
        <View className="search-input-container">
          <Text className="search-icon">🔍</Text>
          <Input
            ref={searchInputRef}
            className="search-input"
            placeholder="搜索你喜欢的用户"
            value={searchKeyword}
            onInput={handleSearchInput}
            onConfirm={handleSearchSubmit}
            confirmType="search"
          />
        </View>
        <Text className="cancel-btn" onClick={handleBack}>
          取消
        </Text>
      </View>

      {/* 搜索内容 */}
      <ScrollView className="search-content" scrollY>
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <View className="search-section">
            <View className="section-header">
              <Text className="section-title">历史记录</Text>
              <Text 
                className="clear-icon"
                onClick={clearSearchHistory}
              >
                🗑️
              </Text>
            </View>
            <View className="history-tags">
              {searchHistory.map(item => (
                <View
                  key={item.id}
                  className="history-tag"
                  onClick={() => handleHistoryClick(item.keyword)}
                >
                  <Text className="tag-text">#{item.keyword}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 推荐搜索 */}
        <View className="search-section">
          <View className="section-header">
            <Text className="section-title">猜你想搜</Text>
            <Text 
              className="refresh-icon"
              onClick={refreshSuggestedSearches}
            >
              🔄
            </Text>
          </View>
          <View className="suggested-list">
            {suggestedSearches.map(item => (
              <View
                key={item.id}
                className="suggested-item"
                onClick={() => handleSuggestedClick(item.keyword)}
              >
                <Text className="suggested-text">{item.keyword}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 热搜榜 */}
        <View className="search-section trending-section">
          <View className="section-header">
            <Text className="trending-icon">🔥</Text>
            <Text className="section-title trending-title">站内热榜</Text>
          </View>
          <View className="trending-list">
            {trendingList.map(item => (
              <View
                key={item.id}
                className="trending-item"
                onClick={() => handleTrendingClick(item.keyword)}
              >
                <View className="trending-rank">
                  <Text className={`rank-number ${item.rank <= 3 ? 'top-rank' : ''}`}>
                    {item.rank}
                  </Text>
                </View>
                <Text className="trending-keyword">{item.keyword}</Text>
                <Text className="trending-score">{item.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 搜索中遮罩 */}
      {isSearching && (
        <View className="search-overlay">
          <View className="search-loading">
            <Text className="loading-icon">⏳</Text>
            <Text className="loading-text">搜索中...</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default SearchPage

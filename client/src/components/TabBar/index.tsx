import React, { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

interface TabBarProps {
  activeTab: 'home' | 'profile'
  onTabChange?: (tab: 'home' | 'profile') => void
}

const TabBar: FC<TabBarProps> = memo(({ activeTab, onTabChange }) => {
  const handleTabClick = (tab: 'home' | 'profile') => {
    if (tab === activeTab) return
    
    onTabChange?.(tab)
    
    // 路由跳转
    if (tab === 'home') {
      Taro.switchTab({ url: '/pages/index/index' })
    } else if (tab === 'profile') {
      Taro.switchTab({ url: '/pages/profile/index' })
    }
  }

  return (
    <View className="tab-bar">
      <View 
        className={`tab-bar__item ${activeTab === 'home' ? 'tab-bar__item--active' : ''}`}
        onClick={() => handleTabClick('home')}
      >
        <Text className="tab-bar__icon">
          {activeTab === 'home' ? '🏠' : '🏘️'}
        </Text>
        <Text className="tab-bar__text">首页</Text>
      </View>
      
      <View className="tab-bar__item tab-bar__item--center">
        <View className="tab-bar__add-btn">
          <Text className="tab-bar__add-icon">+</Text>
        </View>
      </View>
      
      <View 
        className={`tab-bar__item ${activeTab === 'profile' ? 'tab-bar__item--active' : ''}`}
        onClick={() => handleTabClick('profile')}
      >
        <Text className="tab-bar__icon">👤</Text>
        <Text className="tab-bar__text">我的</Text>
      </View>
    </View>
  )
})

TabBar.displayName = 'TabBar'

export default TabBar
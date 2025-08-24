import React, { FC, memo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

interface HomeHeaderProps {
  onTabChange?: (tab: 'follow' | 'discover') => void
  onSettingsClick?: () => void
  onSearchClick?: () => void
}

const HomeHeader: FC<HomeHeaderProps> = memo(({
  onTabChange,
  onSettingsClick,
  onSearchClick
}) => {
  const [activeTab, setActiveTab] = useState<'follow' | 'discover'>('follow')

  const handleTabClick = (tab: 'follow' | 'discover') => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <View className="home-header">
      <View className="home-header__top">
        <View 
          className="home-header__settings"
          onClick={onSettingsClick}
        >
          <Text className="home-header__settings-icon">☰</Text>
        </View>
        
        <View className="home-header__tabs">
          <Text 
            className={`home-header__tab ${activeTab === 'follow' ? 'home-header__tab--active' : ''}`}
            onClick={() => handleTabClick('follow')}
          >
            关注
          </Text>
          <Text 
            className={`home-header__tab ${activeTab === 'discover' ? 'home-header__tab--active' : ''}`}
            onClick={() => handleTabClick('discover')}
          >
            发现
          </Text>
        </View>
        
        <View 
          className="home-header__search"
          onClick={onSearchClick}
        >
          <Text className="home-header__search-icon">🔍</Text>
        </View>
      </View>
    </View>
  )
})

HomeHeader.displayName = 'HomeHeader'

export default HomeHeader

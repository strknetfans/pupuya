import { FC, memo, useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { formatUsername, formatTitle, formatDescription, formatNumber } from '../../../../utils/textUtils'
import PlatformUtils from '../../../../utils/platform'
import './index.less'

interface WaterfallItem {
  id: string
  title: string
  description: string
  imageUrl: string
  user: {
    id: string
    name: string
    avatar: string
  }
  likes: number
  comments: number
}

interface WaterfallFlowProps {
  items: WaterfallItem[]
  onItemClick?: (item: WaterfallItem) => void
  onLoadMore?: () => void
  loading?: boolean
}

const WaterfallFlow: FC<WaterfallFlowProps> = memo(({
  items,
  onItemClick,
  loading = false
}) => {
  const [leftColumn, setLeftColumn] = useState<WaterfallItem[]>([])
  const [rightColumn, setRightColumn] = useState<WaterfallItem[]>([])

  useEffect(() => {
    // 简单的瀑布流算法：交替分配到左右两列
    const left: WaterfallItem[] = []
    const right: WaterfallItem[] = []
    
    items.forEach((item, index) => {
      if (index % 2 === 0) {
        left.push(item)
      } else {
        right.push(item)
      }
    })
    
    setLeftColumn(left)
    setRightColumn(right)
  }, [items])

  const handleItemClick = (item: WaterfallItem) => {
    onItemClick?.(item)
  }

  return (
    <View className="waterfall-flow">
      <View className="waterfall-flow__container">
        <View className="waterfall-flow__column">
          {leftColumn.map(item => (
            <WaterfallCard 
              key={item.id} 
              item={item} 
              onClick={() => handleItemClick(item)}
            />
          ))}
        </View>
        
        <View className="waterfall-flow__column">
          {rightColumn.map(item => (
            <WaterfallCard 
              key={item.id} 
              item={item} 
              onClick={() => handleItemClick(item)}
            />
          ))}
        </View>
      </View>
      
      {loading && (
        <View className="waterfall-flow__loading">
          <Text>加载中...</Text>
        </View>
      )}
    </View>
  )
})

interface WaterfallCardProps {
  item: WaterfallItem
  onClick: () => void
}

const WaterfallCard: FC<WaterfallCardProps> = memo(({ item, onClick }) => {
  const isH5 = PlatformUtils.isH5()
  
  // 根据平台调整文本长度限制
  const usernameMaxLength = isH5 ? 4 : 6
  const titleMaxLength = isH5 ? 16 : 20
  const descriptionMaxLength = isH5 ? 45 : 60
  
  return (
    <View className="waterfall-card" onClick={onClick}>
      <View className="waterfall-card__image-container">
        <Image 
          className="waterfall-card__image"
          src={item.imageUrl}
          mode="aspectFill"
        />
      </View>
      
      <View className="waterfall-card__content">
        <Text className="waterfall-card__title">
          {formatTitle(item.title, titleMaxLength)}
        </Text>
        <Text className="waterfall-card__description">
          {formatDescription(item.description, descriptionMaxLength)}
        </Text>
        
        <View className="waterfall-card__footer">
          <View className="waterfall-card__user">
            <Image 
              className="waterfall-card__avatar"
              src={item.user.avatar}
              mode="aspectFill"
            />
            <Text className="waterfall-card__username">
              {formatUsername(item.user.name, usernameMaxLength)}
            </Text>
          </View>
          
          <View className="waterfall-card__stats">
            <View className="waterfall-card__stat">
              <Text className="waterfall-card__stat-icon">❤️</Text>
              <Text className="waterfall-card__stat-count">
                {formatNumber(item.likes)}
              </Text>
            </View>
            <View className="waterfall-card__stat">
              <Text className="waterfall-card__stat-icon">💬</Text>
              <Text className="waterfall-card__stat-count">
                {formatNumber(item.comments)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})

WaterfallFlow.displayName = 'WaterfallFlow'
WaterfallCard.displayName = 'WaterfallCard'

export default WaterfallFlow

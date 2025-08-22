import React, { FC, memo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import PlatformUtils from '../../utils/platform'
import './index.less'

// 标签类型定义
export interface TagItem {
  id: string
  name: string
  selected: boolean
}

// 过滤原因类型定义
export interface FilterReason {
  id: string
  title: string
  description: string
  selected: boolean
}

interface SettingsPopupProps {
  visible: boolean
  onClose: () => void
  currentTags?: string[] // 当前内容的标签
  onNotInterested?: () => void // 内容不感兴趣
  onAuthorNotInterested?: () => void // 作者不感兴趣
}

const SettingsPopup: FC<SettingsPopupProps> = memo(({
  visible,
  onClose,
  currentTags = [],
  onNotInterested,
  onAuthorNotInterested
}) => {
  // 默认显示的标签（如果没有传入当前标签）
  const defaultTags = ['娱乐', '短视频', '三月打卡', '衍生', '大理寺少卿游', '李饼', '陈逗比', '饼干', '娱乐饼干']
  const displayTags = currentTags.length > 0 ? currentTags : defaultTags

  const handleNotInterested = () => {
    onNotInterested?.()
    onClose()
  }

  const handleAuthorNotInterested = () => {
    onAuthorNotInterested?.()
    onClose()
  }

  if (!visible) return null

  return (
    <View className={`settings-popup ${PlatformUtils.getPlatformClass()}`}>
      {/* 遮罩层 */}
      <View className="settings-popup__mask" onClick={onClose} />
      
      {/* 弹窗内容 */}
      <View className="settings-popup__content">
        {/* 关闭按钮 */}
        <View className="settings-popup__close" onClick={onClose}>
          <Text className="settings-popup__close-icon">✕</Text>
        </View>
        
        {/* 标题 */}
        <View className="settings-popup__header">
          <Text className="settings-popup__title">减少标签下内容推荐</Text>
        </View>
        
        {/* 标签展示 */}
        <View className="settings-popup__tags">
          {displayTags.map((tag, index) => (
            <View key={index} className="settings-popup__tag">
              <Text className="settings-popup__tag-text">#{tag}</Text>
            </View>
          ))}
        </View>
        
        {/* 提示文字 */}
        <View className="settings-popup__hint">
          <Text className="settings-popup__hint-text">
            不喜欢标签可在「设置」中彻底屏蔽
          </Text>
        </View>
        
        {/* 反馈按钮 */}
        <View className="settings-popup__feedback">
          <View 
            className="settings-popup__feedback-btn settings-popup__feedback-btn--content"
            onClick={handleNotInterested}
          >
            <Text className="settings-popup__feedback-icon">🙄</Text>
            <Text className="settings-popup__feedback-text">内容不感兴趣</Text>
          </View>
          
          <View 
            className="settings-popup__feedback-btn settings-popup__feedback-btn--author"
            onClick={handleAuthorNotInterested}
          >
            <Text className="settings-popup__feedback-icon">💔</Text>
            <Text className="settings-popup__feedback-text">作者不感兴趣</Text>
          </View>
        </View>
        
        {/* 底部按钮 */}
        <View className="settings-popup__footer">
          <Button
            className="settings-popup__btn settings-popup__btn--reset"
            onClick={onClose}
          >
            重置
          </Button>
          <Button
            className="settings-popup__btn settings-popup__btn--confirm"
            onClick={onClose}
            type="primary"
          >
            确定
          </Button>
        </View>
      </View>
    </View>
  )
})

SettingsPopup.displayName = 'SettingsPopup'

export default SettingsPopup
import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import PlatformUtils from './utils/platform'

// 全局样式
import './app.less'

// 抑制React对未知CSS属性的警告
if (typeof console !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' && 
      args[0].includes('Warning: Unsupported style property') &&
      (args[0].includes('webkitMask') || args[0].includes('WebkitMask'))
    ) {
      // 忽略webkit相关的CSS属性警告，这些通常来自第三方组件库
      return
    }
    originalError.apply(console, args)
  }
}

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    // H5环境下添加平台样式类
    if (PlatformUtils.isH5()) {
      document.body.classList.add('platform-h5')
      console.log('H5环境检测完成，已添加平台样式类')
    }
  })

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App

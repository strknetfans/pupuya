import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import PlatformUtils from '../../utils/platform'
import './index.less'

function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useLoad(() => {
    setDebugInfo(PlatformUtils.getDebugInfo())
  })

  const refreshInfo = () => {
    setDebugInfo(PlatformUtils.getDebugInfo())
  }

  return (
    <View className="debug-page">
      <View className="debug-header">
        <Text className="debug-title">平台兼容性调试</Text>
        <Button onClick={refreshInfo} size="mini">刷新信息</Button>
      </View>
      
      {debugInfo && (
        <View className="debug-content">
          <View className="debug-section">
            <Text className="debug-section-title">环境信息</Text>
            <Text className="debug-item">运行环境: {debugInfo.env}</Text>
            <Text className="debug-item">平台类名: {debugInfo.platform}</Text>
            <Text className="debug-item">是否H5: {debugInfo.isH5 ? '是' : '否'}</Text>
            <Text className="debug-item">是否小程序: {debugInfo.isMiniProgram ? '是' : '否'}</Text>
            <Text className="debug-item">是否移动设备: {debugInfo.isMobile ? '是' : '否'}</Text>
          </View>
          
          <View className="debug-section">
            <Text className="debug-section-title">屏幕信息</Text>
            <Text className="debug-item">屏幕宽度: {debugInfo.screenWidth}px</Text>
            <Text className="debug-item">屏幕高度: {debugInfo.screenHeight}px</Text>
            <Text className="debug-item">像素比: {debugInfo.pixelRatio}</Text>
            <Text className="debug-item">状态栏高度: {debugInfo.statusBarHeight}px</Text>
          </View>
          
          {debugInfo.systemInfo && (
            <View className="debug-section">
              <Text className="debug-section-title">系统信息</Text>
              <Text className="debug-item">系统: {debugInfo.systemInfo.system}</Text>
              <Text className="debug-item">版本: {debugInfo.systemInfo.version}</Text>
              <Text className="debug-item">平台: {debugInfo.systemInfo.platform}</Text>
              <Text className="debug-item">品牌: {debugInfo.systemInfo.brand}</Text>
              <Text className="debug-item">型号: {debugInfo.systemInfo.model}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default DebugPage

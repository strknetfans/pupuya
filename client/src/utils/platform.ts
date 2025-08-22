import Taro from '@tarojs/taro'

// 平台检测工具
export class PlatformUtils {
  // 获取当前运行环境
  static getCurrentEnv() {
    return Taro.getEnv()
  }
  
  // 是否是小程序环境
  static isMiniProgram() {
    const env = Taro.getEnv()
    return [
      Taro.ENV_TYPE.WEAPP,
      Taro.ENV_TYPE.ALIPAY,
      Taro.ENV_TYPE.SWAN,
      Taro.ENV_TYPE.TT,
      Taro.ENV_TYPE.QQ,
      Taro.ENV_TYPE.JD
    ].includes(env)
  }
  
  // 是否是H5环境
  static isH5() {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  }
  
  // 是否是React Native环境
  static isRN() {
    return Taro.getEnv() === Taro.ENV_TYPE.RN
  }
  
  // 是否是微信小程序
  static isWeapp() {
    return Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  }
  
  // 获取设备信息
  static getSystemInfo() {
    try {
      return Taro.getSystemInfoSync()
    } catch (error) {
      console.error('获取设备信息失败:', error)
      return null
    }
  }
  
  // 获取屏幕宽度
  static getScreenWidth() {
    const systemInfo = this.getSystemInfo()
    return systemInfo?.screenWidth || 375
  }
  
  // 获取屏幕高度
  static getScreenHeight() {
    const systemInfo = this.getSystemInfo()
    return systemInfo?.screenHeight || 667
  }
  
  // 是否是移动设备（H5环境下）
  static isMobile() {
    if (!this.isH5()) return true
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }
  
  // 获取设备像素比
  static getPixelRatio() {
    const systemInfo = this.getSystemInfo()
    return systemInfo?.pixelRatio || 1
  }
  
  // 获取状态栏高度
  static getStatusBarHeight() {
    const systemInfo = this.getSystemInfo()
    return systemInfo?.statusBarHeight || 0
  }
  
  // 获取安全区域
  static getSafeArea() {
    const systemInfo = this.getSystemInfo()
    return systemInfo?.safeArea || null
  }
  
  // 根据平台添加样式类名
  static getPlatformClass() {
    const env = this.getCurrentEnv()
    const envMap = {
      [Taro.ENV_TYPE.WEB]: 'platform-h5',
      [Taro.ENV_TYPE.WEAPP]: 'platform-weapp',
      [Taro.ENV_TYPE.ALIPAY]: 'platform-alipay',
      [Taro.ENV_TYPE.SWAN]: 'platform-swan',
      [Taro.ENV_TYPE.TT]: 'platform-tt',
      [Taro.ENV_TYPE.QQ]: 'platform-qq',
      [Taro.ENV_TYPE.JD]: 'platform-jd',
      [Taro.ENV_TYPE.RN]: 'platform-rn'
    }
    
    return envMap[env] || 'platform-unknown'
  }
  
  // 调试信息
  static getDebugInfo() {
    const systemInfo = this.getSystemInfo()
    return {
      env: this.getCurrentEnv(),
      platform: this.getPlatformClass(),
      isH5: this.isH5(),
      isMiniProgram: this.isMiniProgram(),
      isMobile: this.isMobile(),
      screenWidth: this.getScreenWidth(),
      screenHeight: this.getScreenHeight(),
      pixelRatio: this.getPixelRatio(),
      statusBarHeight: this.getStatusBarHeight(),
      systemInfo
    }
  }
}

export default PlatformUtils

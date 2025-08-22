// 环境配置管理
interface EnvConfig {
  API_BASE_URL: string
  API_TIMEOUT: number
  USE_MOCK: boolean
  DEBUG: boolean
  APP_NAME: string
  VERSION: string
}

// 开发环境配置
const developmentConfig: EnvConfig = {
  API_BASE_URL: 'https://dev-api.pupuya.com',
  API_TIMEOUT: 10000,
  USE_MOCK: true,
  DEBUG: true,
  APP_NAME: 'Pupuya Dev',
  VERSION: '1.0.0'
}

// 生产环境配置
const productionConfig: EnvConfig = {
  API_BASE_URL: 'https://api.pupuya.com',
  API_TIMEOUT: 10000,
  USE_MOCK: false,
  DEBUG: false,
  APP_NAME: 'Pupuya',
  VERSION: '1.0.0'
}

// 测试环境配置
const testConfig: EnvConfig = {
  API_BASE_URL: 'https://test-api.pupuya.com',
  API_TIMEOUT: 10000,
  USE_MOCK: true,
  DEBUG: true,
  APP_NAME: 'Pupuya Test',
  VERSION: '1.0.0'
}

// 根据环境变量获取配置
function getConfig(): EnvConfig {
  const env = process.env.NODE_ENV || 'development'
  
  switch (env) {
    case 'production':
      return productionConfig
    case 'test':
      return testConfig
    default:
      return developmentConfig
  }
}

export const ENV_CONFIG = getConfig()

// 导出常用配置
export const {
  API_BASE_URL,
  API_TIMEOUT,
  USE_MOCK,
  DEBUG,
  APP_NAME,
  VERSION
} = ENV_CONFIG

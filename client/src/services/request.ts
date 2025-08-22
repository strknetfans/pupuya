import Taro from '@tarojs/taro'
import { API_BASE_URL, API_TIMEOUT } from '../config/env'

// 请求配置接口
interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
  header?: Record<string, string>
  timeout?: number
}

// 响应接口
interface Response<T = any> {
  code: number
  message: string
  data: T
}

// 请求拦截器
function requestInterceptor(config: RequestConfig): RequestConfig {
  // 添加通用header
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  // 可以在这里添加token等认证信息
  const token = Taro.getStorageSync('token')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }
  
  return {
    ...config,
    header: {
      ...defaultHeaders,
      ...config.header
    },
    timeout: config.timeout || API_TIMEOUT
  }
}

// 响应拦截器
function responseInterceptor<T>(response: any): Response<T> {
  const { statusCode, data } = response
  
  // HTTP状态码检查
  if (statusCode >= 200 && statusCode < 300) {
    // 检查业务状态码
    if (data.code === 200) {
      return data
    } else {
      // 业务错误
      throw new Error(data.message || '请求失败')
    }
  } else {
    // HTTP错误
    throw new Error(`HTTP ${statusCode}: ${getHttpErrorMessage(statusCode)}`)
  }
}

// HTTP错误信息映射
function getHttpErrorMessage(statusCode: number): string {
  const errorMap: Record<number, string> = {
    400: '请求参数错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求的资源不存在',
    405: '请求方法不允许',
    408: '请求超时',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时'
  }
  
  return errorMap[statusCode] || '网络错误'
}

// 主要的请求方法
export async function request<T = any>(config: RequestConfig): Promise<Response<T>> {
  try {
    // 应用请求拦截器
    const finalConfig = requestInterceptor(config)
    
    // 构建完整URL
    const fullUrl = finalConfig.url.startsWith('http') 
      ? finalConfig.url 
      : `${API_BASE_URL}${finalConfig.url}`
    
    // 发起请求
    const response = await Taro.request({
      url: fullUrl,
      method: finalConfig.method || 'GET',
      data: finalConfig.data,
      header: finalConfig.header,
      timeout: finalConfig.timeout
    })
    
    // 应用响应拦截器
    return responseInterceptor<T>(response)
    
  } catch (error: any) {
    // 错误处理
    console.error('Request Error:', error)
    
    // 显示错误提示
    Taro.showToast({
      title: error.message || '网络请求失败',
      icon: 'error',
      duration: 2000
    })
    
    throw error
  }
}

// 便捷方法
export const api = {
  get: <T = any>(url: string, params?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) => 
    request<T>({ ...config, url, method: 'GET', data: params }),
    
  post: <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) => 
    request<T>({ ...config, url, method: 'POST', data }),
    
  put: <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) => 
    request<T>({ ...config, url, method: 'PUT', data }),
    
  delete: <T = any>(url: string, params?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) => 
    request<T>({ ...config, url, method: 'DELETE', data: params }),
    
  patch: <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>) => 
    request<T>({ ...config, url, method: 'PATCH', data })
}

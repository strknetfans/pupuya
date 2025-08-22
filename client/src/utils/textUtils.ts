// 文本处理工具函数

/**
 * 截断文本并添加省略号
 * @param text 原始文本
 * @param maxLength 最大长度
 * @param ellipsis 省略号字符，默认为'...'
 * @returns 处理后的文本
 */
export function truncateText(
  text: string, 
  maxLength: number, 
  ellipsis: string = '...'
): string {
  if (!text) return ''
  
  if (text.length <= maxLength) {
    return text
  }
  
  return text.substring(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * 按字符宽度截断文本（中文字符按2个字符计算）
 * @param text 原始文本
 * @param maxWidth 最大宽度
 * @param ellipsis 省略号字符
 * @returns 处理后的文本
 */
export function truncateTextByWidth(
  text: string, 
  maxWidth: number, 
  ellipsis: string = '...'
): string {
  if (!text) return ''
  
  let width = 0
  let truncatedText = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    // 中文字符、全角字符按2个字符宽度计算
    const charWidth = /[\u4e00-\u9fa5\uff00-\uffff]/.test(char) ? 2 : 1
    
    if (width + charWidth > maxWidth - ellipsis.length) {
      return truncatedText + ellipsis
    }
    
    truncatedText += char
    width += charWidth
  }
  
  return truncatedText
}

/**
 * 格式化用户名显示
 * @param username 用户名
 * @param maxLength 最大显示长度
 * @returns 格式化后的用户名
 */
export function formatUsername(username: string, maxLength: number = 6): string {
  return truncateTextByWidth(username, maxLength, '...')
}

/**
 * 格式化标题显示
 * @param title 标题
 * @param maxLength 最大显示长度
 * @returns 格式化后的标题
 */
export function formatTitle(title: string, maxLength: number = 20): string {
  return truncateTextByWidth(title, maxLength, '...')
}

/**
 * 格式化描述文本
 * @param description 描述文本
 * @param maxLength 最大显示长度
 * @returns 格式化后的描述
 */
export function formatDescription(description: string, maxLength: number = 60): string {
  return truncateTextByWidth(description, maxLength, '...')
}

/**
 * 计算文本实际显示宽度（中文字符按2计算）
 * @param text 文本
 * @returns 显示宽度
 */
export function getTextWidth(text: string): number {
  if (!text) return 0
  
  let width = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    // 中文字符、全角字符按2个字符宽度计算
    width += /[\u4e00-\u9fa5\uff00-\uffff]/.test(char) ? 2 : 1
  }
  
  return width
}

/**
 * 格式化数字显示（大数字简化显示）
 * @param num 数字
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString()
  } else if (num < 10000) {
    return (num / 1000).toFixed(1) + 'k'
  } else if (num < 100000) {
    return Math.floor(num / 1000) + 'k'
  } else {
    return Math.floor(num / 10000) + 'w'
  }
}

/**
 * 安全的文本渲染（防止XSS）
 * @param text 文本
 * @returns 安全的文本
 */
export function sanitizeText(text: string): string {
  if (!text) return ''
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * 文本处理的默认配置
 */
export const TEXT_CONFIG = {
  USERNAME_MAX_LENGTH: 6,
  TITLE_MAX_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 60,
  H5_USERNAME_MAX_LENGTH: 4,
  H5_TITLE_MAX_LENGTH: 16,
  H5_DESCRIPTION_MAX_LENGTH: 45
} as const

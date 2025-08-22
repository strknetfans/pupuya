# Mock 数据系统

## 📁 目录结构

```
mock/
├── data/           # Mock 数据文件
│   └── content.ts  # 内容数据
├── index.ts        # Mock API 服务
└── README.md       # 说明文档
```

## 🎯 功能特性

### 环境控制
- 通过 `src/config/env.ts` 中的 `USE_MOCK` 配置控制是否使用Mock数据
- 开发环境默认启用Mock，生产环境默认关闭
- 支持动态切换，便于开发调试

### Mock API 服务
- 模拟真实API的响应格式
- 支持分页、搜索、错误处理等功能
- 包含网络延迟模拟，更贴近真实使用场景

### 数据管理
- 结构化的Mock数据管理
- 支持动态生成随机数据
- 提供基础数据集和扩展数据生成

## 🔧 使用方法

### 环境配置
在 `src/config/env.ts` 中修改配置：

```typescript
const developmentConfig: EnvConfig = {
  // ... 其他配置
  USE_MOCK: true,  // 开启Mock数据
  // USE_MOCK: false, // 关闭Mock数据，使用真实API
}
```

### 添加新的Mock数据
1. 在 `data/` 目录下创建新的数据文件
2. 在 `index.ts` 中添加对应的API服务方法
3. 在 `services/` 中调用相应的Mock服务

### API服务调用
服务层会自动根据环境配置选择Mock或真实API：

```typescript
// 会根据 USE_MOCK 配置自动切换
const response = await ContentService.getContentList(params)
```

## 🎨 Mock数据特点

### 内容数据
- 多样化的用户信息
- 丰富的图片资源（来自Unsplash）
- 真实的标题和描述
- 随机的点赞和评论数
- 支持标签系统

### 数据生成
- `MOCK_CONTENT_LIST`: 基础数据集（4条精选内容）
- `generateMockContentList()`: 动态生成指定数量的随机数据
- 支持关注/发现两种内容类型

## 🔄 API接口说明

### 获取内容列表
```typescript
MockApiService.getContentList({
  page: 1,           // 页码
  pageSize: 20,      // 每页数量
  tab: 'discover'    // 内容类型: 'follow' | 'discover'
})
```

### 搜索内容
```typescript
MockApiService.searchContent({
  keyword: '摄影',   // 搜索关键词
  page: 1,
  pageSize: 20
})
```

### 点赞内容
```typescript
MockApiService.likeContent('content_id')
```

## 🚀 切换到真实API

当后端API准备就绪时，只需：

1. 修改 `src/config/env.ts` 中的 `USE_MOCK: false`
2. 确保 `services/request.ts` 中的API基础URL正确
3. 根据真实API接口调整请求参数和响应处理

无需修改业务组件代码，实现无缝切换！

## 📝 注意事项

- Mock数据仅用于开发和演示
- 图片资源依赖外部服务，需要网络连接
- 数据会在每次刷新时重新生成
- 建议在开发完成后及时切换到真实API

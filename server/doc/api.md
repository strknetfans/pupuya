1. 用户认证与管理API
   POST /api/auth/login - 用户登录（支持手机号/短信/一键登录）
   POST /api/auth/register - 用户注册
   GET /api/user/profile - 获取用户资料
   PUT /api/user/profile - 更新用户资料
   GET /api/user/settings - 获取用户设置
   PUT /api/user/settings - 更新用户设置

2. AI绘画功能API
   POST /api/generate/task - 提交生成任务（文生图/图生图等）
   GET /api/generate/tasks/{task_id} - 查询任务状态
   GET /api/generate/tasks/active - 获取进行中任务列表
   GET /api/generate/tasks/{task_id}/results -获取生成结果
   GET /api/history - 查询生成历史记录
   GET /api/styles - 获取可用风格模型列表
   GET /api/presets - 获取预设提示词

3. 内容管理API
   POST /api/content - 发布作品
   GET /api/content/{id} - 获取特定作品
   PUT /api/content/{id} - 编辑作品
   DELETE /api/content/{id} - 删除作品
   POST /api/content/{id}/like - 点赞作品
   POST /api/content/{id}/favorite - 收藏作品
   POST /api/content/{id}/share - 分享作品
   GET /api/content/feed - 获取内容流

4. 标签管理API
   GET /api/tags/search

5. 社交互动API
   POST /api/social/follow/{userId} - 关注用户
   GET /api/social/following - 获取关注列表
   GET /api/social/followers - 获取粉丝列表
   POST /api/social/message - 发送私信
   GET /api/social/messages - 获取私信列表
   GET /api/social/recommendations - 获取推荐用户

6. 搜索与发现API
   GET /api/search/content - 搜索内容
   GET /api/search/users - 搜索用户
   GET /api/discover/trending - 获取热门趋势
   GET /api/discover/recommendations - 获取推荐内容

7. 积分与任务API
   GET /api/points/balance - 获取积分余额
   GET /api/points/history - 获取积分历史记录
   POST /api/tasks/checkin - 签到
   POST /api/tasks/share - 完成任务(分享)
   GET /api/tasks/status - 任务完成状态

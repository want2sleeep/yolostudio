# YOLOStudio 项目介绍

## 一、工作室概述

### 1. 团队介绍

**介绍语**

**活跃成员**
- 彭 周 詹 丁 李 何……

**指导老师**

### 2. 荣誉与成就

**奖项**
- 每个年度

### 3. 核心项目

**工具箱**
- 工具集合（如课表等）

**自动登录系统**
- 需要脚本实现自动登录学校账号
- 存储在本地保证安全，且减轻服务器压力

### 4. 其他功能

- 动效
- 登录系统
- 权限管理
- 工作室成员管理
- 学校相关功能（待定）
- 未登录状态处理
- 学习路径

## 二、总体技术路线

### 1. 前端架构

**Web 官网（重视 SEO）**
- Next.js + react-native-web（RNW）：既能 SSR/SSG，满足搜索引擎收录，又能与移动端共享组件与业务逻辑
- 托管：Vercel（简单、省心、自动 HTTPS/CI）
- 内容管理：接入 Headless CMS（Sanity/Contentful/Strapi 等）维护“社团介绍、活动、招新页内容”

**移动端 App（Android/iOS）**
- Expo（React Native）托管工作流：开发体验好、打包和 OTA 更新简单；需要硬件权限也方便
- 与 Web 共享代码：通过 react-native-web + Monorepo，把 UI 组件和业务逻辑抽到共享包

### 2. Monorepo 组织

- `apps/web`：Next.js（SSR/SSG）+ RNW
- `apps/mobile`：Expo（React Native）
- `packages/ui`：跨端 UI 组件（View/Text/按钮/卡片/主题）
- `packages/utils`：工具函数（时间、学期周次、ICS 解析、网络）
- `packages/types`：TypeScript 类型定义

**包管理器**：pnpm + Turborepo/Nx，提高构建速度与依赖共享

### 3. 技术选型优势

- **SEO**：Next.js 的 SSR/SSG 明显优于纯前端渲染；官网/招新页容易被搜索引擎收录
- **代码复用**：用 RN 组件层 + RNW，可最大化共享 UI 与业务逻辑
- **成本与效率**：Expo + Vercel + CMS/BaaS，上线快、维护成本低

## 三、核心功能拆解与实现要点

### 1. 官网与招新

**页面**：主页、社团介绍、相册/活动、招新指南与表单、常见问题、联系我们

**SEO 细节**：title/description、语义化结构、Open Graph、站点地图、Robots、核心内容 SSG/SSR、良好的 Core Web Vitals

**内容来源**：CMS 可视化编辑（社团干事能自行更新）；图片用图床/CDN（如 Cloudflare Images）

**招新表单**：两种路线
- 低成本：外链 Typeform/飞书表单/腾讯问卷（快但数据分散）
- 自建：Next.js API + 数据库（见“后端与数据”），支持文件上传、审核状态、导出 Excel

### 2. 工具箱（以课表为例）

**数据来源**
- 最理想：学校提供 iCal/ICS、API 或 CSV 导出
- 若无官方接口：支持“手动导入模板 + 智能表单”或“爬取/抓包解析”（注意合规与账号安全，优先与学校沟通）

**功能建议**
- 学期/周次规则配置（单双周、节次时段表、节假日调休）
- 导入：ICS/CSV/截图识别（可后续再做）/手填；导出：ICS 订阅链接或文件
- 离线可用：本地缓存（MMKV/AsyncStorage），网络差也能看
- 提醒：上课前 X 分钟本地通知；期中期末/活动提醒
- 同步：登录后云端备份，换机不丢（可选开关）
- Web 端：PWA 加到主屏，离线缓存课表；消息提醒用浏览器通知（用户授权）

**体验优化**
- 今日视图/周视图快速切换；走在路上能秒开（首屏极简、图片延迟加载）
- 深色模式、节次颜色、教室地图跳转、与系统日历单向同步（可选）

**技术点**
- 本地存储：MMKV（性能更好）或 AsyncStorage；Web 端用 localStorage/IndexedDB
- 通知：expo-notifications（移动端）；Web 用 Notifications API + Service Worker
- 时间计算：Day.js/Date-fns；避免在渲染线程做重计算，必要时预计算缓存
- 大量列表：FlashList/FlatList，稳定 key、虚拟化良好

### 3. 账号与权限（可选）

- **无强登录**：官网与工具大多可匿名用，上手快
- **如需云同步/个性化**：用 Supabase/Auth（邮箱登录/魔术链接/微信登录因地区合规另议）或学校 SSO（CAS/OAuth）
- **隐私合规**：只采集必要信息，告知用途与保存期限，支持导出/删除

### 4. 深链与一键跳转

- **功能**：Web 链接自动唤起 App（已安装）；未安装跳应用商店或留在 H5
- **实现**：iOS Universal Links + Android App Links；RN 用 expo-linking 或 react-navigation 集成深链
- **常用链接**：社团活动页、招新报名、课表分享某周/某课

### 5. 后端与数据

**低成本云后端方案（推荐二选一）**
- Supabase：Auth + Postgres + 存储，简单易用；API/实时订阅齐全
- Firebase：Auth + Firestore + Storage；生态成熟

**自建轻后端**
- 直接用 Next.js API Routes/Edge Functions；数据库接 PlanetScale（MySQL）或 Neon（Postgres）

**表结构示例**
- `users`：id, email, role, created_at
- `posts`：id, title, slug, content, cover, published_at
- `recruit_applications`：id, user_id, answers(json), status, created_at
- `schedules`：id, user_id, source, data(json), updated_at
- `terms`：id, campus, start_date, weeks, periods(json)

## 四、三端同构策略

### 1. 推荐方案

全部三端同构（Next.js + RNW + Expo，共享 UI/逻辑）是可行的，也是推荐的主线。

### 2. 简化替代方案

- **静态页面需求**：如果对 Web 的 SEO 只需静态页面，Expo（Web）也可导出静态站点，成本更低。但复杂 SEO/SSR 还是 Next.js 更稳
- **团队熟悉度考量**：若团队不熟 RNW，也可以“Web 用纯 React/Next.js，App 用 RN”，通过 Monorepo 共享“业务逻辑包（utils）”，UI 分开写。代价是 UI 不完全复用

## 五、性能与体验要点

### 1. Web 性能

- SSG/ISR 预渲染内容页
- 图片用 next/image
- 尽量小的首屏 JS
- PWA 缓存离线课表

### 2. App 性能

- 启用 Hermes
- 引入 Reanimated + Gesture Handler 提升交互流畅度
- FlashList 优化列表
- 懒加载非首屏工具

### 3. 启动速度优化

将课表算法与数据预处理，放在首次导入或后台；首屏只读简化数据。

## 六、上线与运维

### 1. Web 部署

- Vercel 自动化部署，绑定 club 域名
- 接入分析（Plausible/Umami/GA4）

### 2. 移动应用部署

- iOS/Android：Expo EAS Build 分发
- EAS Update 做 OTA（仅 JS 层更新）
- 崩溃与日志用 Sentry

### 3. 数据管理

- 表单与数据备份：定期导出 CSV；设置只读备份库

### 4. 合规性要求

- 权限合规：移动端最小权限声明
- 表单隐私声明与同意勾选
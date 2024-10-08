# iNews 项目

## 目录
1. [项目简介](#项目简介)
2. [技术栈](#技术栈)
3. [项目结构](#项目结构)
4. [功能设计](#功能设计)
5. [工程笔记](#工程笔记)
6. [使用说明](#使用说明)
7. [常见问题](#常见问题)

---

## 1. 项目简介
iNews 是一个新闻聚合平台，旨在提供各种新闻分类和个性化推荐功能。用户可以通过首页浏览新闻、按类别查看不同类型的新闻内容，并可以通过搜索功能找到特定主题的新闻。iNews 的核心功能还包括用户不感兴趣内容的过滤，以及页面内容的动态加载和返回顶部功能。

## 2. 技术栈
- **前端框架**: React
- **路由**: React Router
- **状态管理**: useState 和 useEffect 进行状态管理
- **打包工具**: Webpack
- **图标**: react-icons
- **CSS**: 原生 CSS 文件

## 3. 项目结构
```
iNews/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
├── src/
│   ├── assets/
│   │   ├── 003.jpg
│   │   ├── giphy.webp
│   ├── components/
│   │   ├── BackToTopButton.js   # 回到顶部按钮组件
│   │   ├── BackToTopButton.css
│   │   ├── NewsList.js          # 新闻列表组件
│   │   ├── NewsList.css
│   │   ├── NewsCard.js          # 单个新闻卡片组件
│   │   ├── NewsCard.css 
│   │   ├── SearchBar.js         # 搜索栏组件
│   │   ├── SearchBar.css
│   ├── data/
│   │   ├── newsData.json        # 静态新闻数据
│   ├── pages/
│   │   ├── HomePage.js          # 首页组件
│   │   ├── HomePage.css
│   │   ├── CategoryPage.js      # 分类页面组件
│   │   ├── CategoryPage.css
│   │   ├── SearchResultsPage.js # 搜索结果页面组件
│   │   ├── SearchResultsPage.css
│   │   ├── NewsDetailPage.js # 新闻详情页面组件
│   │   ├── NewsDetailPage.css
│   ├── App.js                   # 应用主组件
│   ├── index.js                 # 应用入口
├── package.json
```

## 4. 功能设计
1. **首页**:
   - 展示新闻列表，支持不感兴趣功能，用户可以点击按钮将不喜欢的新闻隐藏。
   - 搜索栏居中，并配有新闻分类菜单。
   - 提供滚动加载更多新闻的功能，当用户滚动到底部时加载更多新闻。
   - **回到顶部按钮**：页面右下角显示，当点击后返回页面顶部。

2. **分类页面**:
   - 根据用户选择的新闻类别，展示对应的新闻。
   - 实现滚动加载和不感兴趣过滤功能。

3. **搜索页面**:
   - 用户可以输入关键词进行新闻搜索，显示与关键词匹配的新闻内容。
   - 具备不感兴趣功能，用户可以过滤不相关的新闻。

4. **动态加载**:
   - 每次只加载部分新闻，滚动到底部时加载更多新闻内容。
   
5. **回到顶部按钮**：
   - 当页面下拉一定距离后，右下角显示按钮，点击后页面平滑滚动到顶部。

## 5. 工程笔记
- **不感兴趣功能**：通过 `useState` 存储用户标记不感兴趣的新闻 ID，利用数组过滤机制动态更新页面显示的新闻列表。
- **动态加载**：结合 `useEffect` 和 `scroll` 事件，判断页面滚动位置，动态加载新闻。每次加载时通过切片操作限制加载量。
- **样式**：项目中采用了原生 CSS，简单实现了新闻列表和各类组件的布局和样式。

## 6. 使用说明
### 本地开发
1. 克隆项目：
   ```bash
   git clone https://github.com/zqding11/iNews.git
   cd iNews
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动项目：
   ```bash
   npm start
   ```
   运行 `npm start` 后，项目将在本地的 `http://localhost:3000` 启动。

### 功能操作
- **新闻过滤**：用户可以通过点击每条新闻卡片上的“不感兴趣”按钮来移除该新闻。
- **搜索**：在首页的搜索栏中输入关键词，点击搜索图标，进入搜索结果页面查看相关新闻。
- **分类查看**：通过点击分类菜单中的链接，浏览特定类别的新闻。
- **回到顶部**：当滚动页面后，点击页面右下角的返回顶部按钮，页面将自动滚动回到顶部。

## 7. 常见问题
1. **滚动加载没有反应**：
   - 确认是否存在网络问题，或者检查 `loadMoreContent` 函数逻辑。
   
2. **不感兴趣功能失效**：
   - 检查 `onDislike` 回调函数是否正确传递和处理新闻 ID。

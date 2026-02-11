---
layout: post
title: 搭建个人博客系统
permalink: /goals/personal-blog/
date: 2026-02-11 10:00:00 +0800
categories: [项目, Web开发]
tags: [Jekyll, GitHub Pages, CI/CD]
---

## 🎯 项目概述

使用 Jekyll 搭建个人博客，实现自动化部署和 CI/CD 流程。

## 📊 项目状态

- **状态**: ✅ 已完成
- **完成时间**: 2026年2月
- **技术栈**: Jekyll, Ruby, GitHub Pages, GitHub Actions

## 🏗️ 项目功能

### 核心功能
- [x] 响应式设计，支持移动端和桌面端
- [x] Markdown 文章编写
- [x] 代码高亮
- [x] 分类和标签系统
- [x] 全文搜索
- [x] RSS 订阅
- [x] 评论系统集成

### 特色功能
- [x] 自定义导航栏（Todo、Reading List、Projects）
- [x] 目标管理系统（Goals & Plans）
- [x] 书籍阅读列表
- [x] 项目展示页面
- [x] 深色模式支持

### CI/CD 流程
- [x] GitHub Actions 自动构建
- [x] 自动部署到 GitHub Pages
- [x] 代码质量检查
- [x] 自动化测试

## 💻 技术细节

### 项目结构
```
.
├── _config.yml          # Jekyll 配置
├── _posts/              # 博客文章
├── _tabs/               # 导航页面
├── _data/               # 数据文件
├── _sass/               # 样式文件
├── _javascript/         # JS 文件
└── assets/              # 静态资源
```

### 核心配置
```yaml
# _config.yml
theme: jekyll-theme-chirpy
timezone: Asia/Shanghai
url: "https://pluto417-qing.github.io"

collections:
  tabs:
    output: true
  books:
    output: true
    permalink: /books/:title/
  projects:
    output: true
    permalink: /projects/:title/
  goals:
    output: true
    permalink: /goals/:title/
```

### 自动化部署
```yaml
# .github/workflows/pages-deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Jekyll
        run: bundle install && bundle exec jekyll build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
```

## 📚 学到的知识

1. **Jekyll 静态站点生成器**
   - Liquid 模板语言
   - Collections 和 Data Files
   - 插件系统

2. **前端技能**
   - Sass/SCSS 预处理器
   - 响应式布局
   - JavaScript 交互

3. **DevOps 实践**
   - GitHub Actions CI/CD
   - 自动化部署流程
   - 版本控制最佳实践

## 🎨 界面设计

采用 Chirpy 主题作为基础，并进行了大量自定义：
- 优化了时间线组件
- 设计了卡片式项目展示
- 实现了书架式阅读列表
- 添加了目标追踪功能

## 🌟 项目亮点

1. **数据驱动**: 使用 YAML 文件管理内容，便于维护
2. **自动化**: 完整的 CI/CD 流程，提交即部署
3. **可扩展**: 模块化设计，易于添加新功能
4. **性能优化**: 静态站点，加载速度快
5. **SEO 友好**: 良好的 meta 标签和 sitemap

## 📈 后续优化计划

- [ ] 添加访问统计分析
- [ ] 优化图片加载性能
- [ ] 实现多语言支持
- [ ] 添加更多交互动画
- [ ] PWA 支持

## 🔗 相关链接

- **博客地址**: [https://pluto417-qing.github.io](https://pluto417-qing.github.io)
- **源码仓库**: [GitHub](https://github.com/Pluto417-Qing/Pluto417-Qing.github.io)
- **主题文档**: [Chirpy Theme](https://github.com/cotes2020/jekyll-theme-chirpy)

---

**项目总结**: 这个项目让我从零到一搭建了完整的个人博客系统，不仅学会了 Jekyll 和静态站点生成，还掌握了现代化的 CI/CD 部署流程。这是一个很好的学习和展示平台，未来会持续优化和添加新功能。

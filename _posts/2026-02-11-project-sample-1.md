---
title: 个人博客系统
date: 2026-02-11 12:00:00 +0800
categories: [Projects]
tags: [jekyll, ruby, javascript, web]
pin: false
---

## 项目简介

这是一个基于 Jekyll 的个人博客系统，采用 Chirpy 主题，支持 Markdown 写作、代码高亮、暗黑模式等现代化功能。

## 主要功能

- ✨ 响应式设计，支持移动端和桌面端
- 🌓 深色/浅色主题切换
- 📝 Markdown 写作支持
- 💬 集成评论系统
- 🔍 全文搜索功能
- 📊 文章分类和标签管理
- 📱 PWA 支持，可安装到桌面

## 技术栈

| 技术         | 说明           |
| ------------ | -------------- |
| Jekyll       | 静态网站生成器 |
| Ruby         | 后端语言       |
| JavaScript   | 前端交互       |
| SCSS         | 样式预处理     |
| GitHub Pages | 部署平台       |

## 项目截图

![博客首页](/assets/img/sample/blog-screenshot.png)
_博客首页展示_

## 开发过程

### 1. 环境搭建
首先安装 Ruby 和 Jekyll 环境，然后克隆 Chirpy 主题模板。

```bash
gem install bundler jekyll
bundle install
```

### 2. 主题定制
根据个人需求修改配置文件和样式：

```yaml
# _config.yml
title: 我的博客
tagline: 记录技术与生活
```

### 3. 内容创建
在 `_posts` 目录下创建 Markdown 文件，编写文章。

## 遇到的挑战

1. **头像配置问题**：初期头像路径配置不正确，通过调整 CDN 设置解决
2. **热重载配置**：配置 LiveReload 实现自动刷新功能
3. **侧边栏定制**：添加自定义导航栏目

## 项目链接

- 🔗 **在线演示：** [https://pluto417-qing.github.io](https://pluto417-qing.github.io)
- 💻 **GitHub 仓库：** [github.com/Pluto417-Qing/Pluto417-Qing.github.io](https://github.com/Pluto417-Qing/Pluto417-Qing.github.io)

## 未来计划

- [ ] 添加更多交互功能
- [ ] 优化 SEO 配置
- [ ] 集成更多第三方服务
- [ ] 添加多语言支持

## 总结

通过这个项目，我学习了 Jekyll 静态网站生成、Ruby 生态系统，以及如何部署和维护一个个人博客。

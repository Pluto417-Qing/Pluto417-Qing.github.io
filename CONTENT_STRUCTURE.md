# 内容组织结构

✅ 已配置完成！现在你的内容按类型分类存储：

## 📁 目录结构

```
├── _posts/          # 常规博客文章
├── _books/          # 书评和阅读笔记
├── _projects/       # 项目介绍和文档
└── _tabs/           # 导航页面
```

## 🔗 URL 路径

- **博客文章：** `/posts/文章标题/`
- **书籍：** `/books/书名/`
- **项目：** `/projects/项目名/`

## 📝 如何添加新内容

### 添加书评
在 `_books/` 目录创建文件：`YYYY-MM-DD-book-书名.md`

```markdown
---
title: 《书名》书评
date: 2026-02-11 10:00:00 +0800
categories: [Reading, Computer Science]
tags: [标签1, 标签2]
---

内容...
```

### 添加项目
在 `_projects/` 目录创建文件：`YYYY-MM-DD-project-项目名.md`

```markdown
---
title: 项目名称
date: 2026-02-11 10:00:00 +0800
categories: [Projects]
tags: [技术栈]
---

内容...
```

### 添加博客文章
在 `_posts/` 目录创建文件：`YYYY-MM-DD-文章标题.md`

```markdown
---
title: 文章标题
date: 2026-02-11 10:00:00 +0800
categories: [分类]
tags: [标签]
---

内容...
```

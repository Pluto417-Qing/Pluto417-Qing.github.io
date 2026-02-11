---
layout: page
icon: fas fa-project-diagram
order: 7
title: Projects
---

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.project-card {
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--card-bg, #fff);
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-decoration: none;
}

.project-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
}

.project-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.status-active {
  background: #d1f4e0;
  color: #0e6537;
}

.status-completed {
  background: #dfe6f5;
  color: #0550ae;
}

.project-desc {
  color: var(--text-muted, #586069);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tech-tag {
  background: var(--tag-bg, #f6f8fa);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--text-color);
}
</style>

## 我的项目

<div class="project-grid">

  <a href="/projects/project-sample-1/" class="project-card">
    <span class="project-status status-active">进行中</span>
    <h3>个人博客系统</h3>
    <p class="project-desc">基于 Jekyll 的个人博客，支持 Markdown 写作、代码高亮、评论系统等功能。</p>
    <div class="project-tech">
      <span class="tech-tag">Jekyll</span>
      <span class="tech-tag">Ruby</span>
      <span class="tech-tag">JavaScript</span>
    </div>
  </a>

  <a href="/projects/project-sample-2/" class="project-card">
    <span class="project-status status-completed">已完成</span>
    <h3>Todo 应用</h3>
    <p class="project-desc">一个简洁的待办事项管理应用，支持任务分类、提醒和数据同步。</p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">Node.js</span>
      <span class="tech-tag">MongoDB</span>
    </div>
  </a>

  <a href="/projects/project-sample-3/" class="project-card">
    <span class="project-status status-active">进行中</span>
    <h3>数据可视化平台</h3>
    <p class="project-desc">用于展示和分析大规模数据的交互式可视化平台。</p>
    <div class="project-tech">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">D3.js</span>
      <span class="tech-tag">Flask</span>
    </div>
  </a>

</div>

---
layout: page
icon: fas fa-project-diagram
order: 3
title: Projects
---

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.project-card {
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 6px;
  padding: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--card-bg, #fff);
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-decoration: none;
}

.project-card h3 {
  margin-top: 0;
  margin-bottom: 0.4rem;
  color: var(--heading-color);
  font-size: 1.1rem;
}

.project-status {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
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
  margin-bottom: 0.8rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.tech-tag {
  background: var(--tag-bg, #f6f8fa);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  color: var(--text-muted-color);
}
</style>

<div class="project-grid">
  {% for project in site.data.projects.projects %}
  <a href="{{ project.url }}" class="project-card">
    <span class="project-status {{ project.status_class }}">{{ project.status }}</span>
    <h3>{{ project.title }}</h3>
    <p class="project-desc">{{ project.desc }}</p>
    <div class="project-tech">
      {% for tech in project.tech %}
      <span class="tech-tag">{{ tech }}</span>
      {% endfor %}
    </div>
  </a>
  {% endfor %}
</div>

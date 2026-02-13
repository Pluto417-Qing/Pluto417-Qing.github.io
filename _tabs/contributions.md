---
layout: page
icon: fas fa-code-branch
order: 4
title: Open Source
---

<style>
.contribution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.contribution-card {
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  padding: 1rem 1.8rem;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--card-bg, #fff);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contribution-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  text-decoration: none;
  border-color: var(--link-color, #0969da);
}

.contribution-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.7rem;
}

.contribution-icon {
  font-size: 1.8rem;
}

.contribution-card h3 {
  margin: 0;
  color: var(--heading-color);
  font-size: 1.15rem;
  font-weight: 600;
}

.contribution-repo {
  color: var(--text-muted, #586069);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.contribution-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  color: var(--text-muted, #586069);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.stat-item i {
  font-size: 0.9rem;
}

.contribution-desc {
  color: var(--text-color);
  margin-bottom: 0.8rem;
  line-height: 1.6;
  font-size: 0.9rem;
}

.contribution-type {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.type-maintainer {
  background: #ffd6cc;
  color: #8a2c0d;
}

.type-contributor {
  background: #ddf4ff;
  color: #0550ae;
}

.type-collaborator {
  background: #e4e2ff;
  color: #5e41d0;
}

.contribution-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.tech-tag {
  background: var(--tag-bg, #f6f8fa);
  border: 1px solid var(--border-color, #d0d7de);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--text-color);
}

.contributions-intro {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--card-bg, #f6f8fa);
  border-radius: 6px;
  border-left: 3px solid var(--link-color, #0969da);
}

.contributions-intro p {
  margin: 0;
  color: var(--text-muted, #586069);
}
</style>

<div class="contributions-intro">
  <p>🚀 My contributions to open source projects. Building together with the community.</p>
</div>

<div class="contribution-grid">
  {% for contribution in site.contributions %}
  <a href="{{ contribution.url | relative_url }}" class="contribution-card">
    <span class="contribution-type {{ contribution.contribution_info.type_class }}">{{ contribution.contribution_info.type }}</span>
    <div class="contribution-header">
      <span class="contribution-icon">{{ contribution.contribution_info.icon }}</span>
      <div>
        <h3>{{ contribution.contribution_info.name }}</h3>
        <div class="contribution-repo">{{ contribution.contribution_info.repo }}</div>
      </div>
    </div>

    {% if contribution.contribution_info.stats %}
    <div class="contribution-stats">
      {% if contribution.contribution_info.stats.prs %}
      <span class="stat-item">
        <i class="fas fa-code-branch"></i>
        <span>{{ contribution.contribution_info.stats.prs }} PRs</span>
      </span>
      {% endif %}
      {% if contribution.contribution_info.stats.issues %}
      <span class="stat-item">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ contribution.contribution_info.stats.issues }} Issues</span>
      </span>
      {% endif %}
      {% if contribution.contribution_info.stats.commits %}
      <span class="stat-item">
        <i class="fas fa-code-commit"></i>
        <span>{{ contribution.contribution_info.stats.commits }} Commits</span>
      </span>
      {% endif %}
    </div>
    {% endif %}

    <p class="contribution-desc">{{ contribution.description | strip_html | truncatewords: 20 }}</p>

    {% if contribution.contribution_info.tech %}
    <div class="contribution-tech">
      {% for tech in contribution.contribution_info.tech %}
      <span class="tech-tag">{{ tech }}</span>
      {% endfor %}
    </div>
    {% endif %}
  </a>
  {% endfor %}
</div>

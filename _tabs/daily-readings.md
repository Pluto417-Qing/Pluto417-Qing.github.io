---
layout: page
icon: fas fa-share-alt
order: 5
title: Daily Reading
---

<style>
.reading-share-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.reading-share-card {
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 6px;
  padding: 1rem;
  background: var(--card-bg, #fff);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.reading-share-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-color: var(--link-color, #0969da);
  text-decoration: none;
}

.reading-share-meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.75rem;
  color: var(--text-muted, #586069);
  margin-bottom: 0.5rem;
}

.reading-share-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--heading-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reading-share-excerpt {
  color: var(--text-muted, #586069);
  line-height: 1.5;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.85rem;
  flex-grow: 1;
}

.reading-share-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color, #f0f0f0);
}

.reading-share-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.reading-tag {
  background: var(--tag-bg, #f6f8fa);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  font-size: 0.7rem;
  color: var(--text-muted-color);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-muted, #586069);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}
</style>

<div class="reading-share-grid">
  {% assign shares = site.daily_readings | sort: 'date' | reverse %}
  {% if shares.size > 0 %}
    {% for share in shares %}
      <a href="{{ share.url | relative_url }}" class="reading-share-card">
        <div class="reading-share-meta">
          <span class="reading-share-date">
            <i class="far fa-calendar-alt fa-fw"></i>
            {{ share.date | date: "%Y-%m-%d" }}
          </span>
        </div>
        <h3 class="reading-share-title">{{ share.title }}</h3>
        <div class="reading-share-excerpt">
          {{ share.excerpt | strip_html | truncate: 120 }}
        </div>
        <div class="reading-share-footer">
          <div class="reading-share-tags">
            {% for tag in share.tags limit:2 %}
              <span class="reading-tag">{{ tag }}</span>
            {% endfor %}
          </div>
          <span class="read-more" style="color: var(--link-color); font-size: 0.75rem;">
            更多 <i class="fas fa-arrow-right"></i>
          </span>
        </div>
      </a>
    {% endfor %}
  {% else %}
    <div class="empty-state">
      <i class="fas fa-feather-alt"></i>
      <p>暂时还没有分享，开始记录你的每日阅读吧！</p>
    </div>
  {% endif %}
</div>

---
layout: page
icon: fas fa-book-open
order: 7
title: Courses
---

<style>
.source-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.35rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 12px;
  border: 1px solid var(--border-color, #e1e4e8);
}

.source-tab {
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
}

.source-tab:hover {
  color: var(--link-color);
  background: var(--card-bg, #fff);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.source-tab.active {
  background: var(--link-color);
  color: white;
  box-shadow: 0 4px 12px rgba(9, 105, 218, 0.3);
}

.course-search-container {
  margin-bottom: 2rem;
  position: relative;
}

.course-search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border-radius: 12px;
  border: 1px solid var(--border-color, #e1e4e8);
  background: var(--card-bg, #fff);
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.course-search-input:focus {
  outline: none;
  border-color: var(--link-color);
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.course-group {
  display: none;
}

.course-group.active {
  display: block;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.course-card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 150px;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

.course-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-decoration: none;
}

.course-header {
  margin-bottom: 0.5rem;
}

.course-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  color: var(--heading-color);
  line-height: 1.3;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-card:hover .course-title {
  color: var(--link-color);
}

.course-excerpt {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.course-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: auto;
}

.course-badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.1rem 0.5rem;
  border-radius: 20px;
  background: var(--tag-bg);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.badge-source {
  background: rgba(9, 105, 218, 0.08);
  color: var(--link-color);
  border-color: rgba(9, 105, 218, 0.15);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 576px) {
  .course-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .source-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }
  
  .source-tab {
    white-space: nowrap;
  }
}
</style>

<div class="course-search-container">
  <i class="fas fa-search search-icon"></i>
  <input type="text" id="course-search" class="course-search-input" placeholder="搜索课程名称或分类...">
</div>

<div class="source-tabs" id="source-tabs">
  <div class="source-tab active" data-source="all">
    <i class="fas fa-th-large fa-fw mr-1"></i>全部学校
  </div>
  {% for source in site.data.courses.sources %}
    <div class="source-tab" data-source="{{ source.id }}">
      <i class="{{ source.icon }} fa-fw mr-1"></i>{{ source.name }}
    </div>
  {% endfor %}
</div>

<div id="course-container">
  {% if site.courses %}
    <div id="no-results" class="text-center py-5" style="display: none;">
      <i class="fas fa-search fa-3x text-muted mb-3"></i>
      <p class="text-muted">未找到匹配的课程</p>
    </div>

    <!-- 全部学校的网格 -->
    <div class="course-group active" id="group-all">
      <div class="course-grid">
        {% assign sorted_courses = site.courses | sort: "source" %}
        {% for course in sorted_courses %}
          {% assign source_data = site.data.courses.sources | where: "id", course.source | first %}
          {% assign category_data = source_data.categories | where: "id", course.category | first %}
          <a href="{{ course.url }}" class="course-card" data-title="{{ course.title | downcase }}" data-category="{{ category_data.name | downcase }}">
            <div class="course-header">
              <h3 class="course-title">{{ course.title }}</h3>
            </div>
            <p class="course-excerpt">{{ course.content | strip_html | truncate: 100 }}</p>
            <div class="course-badges">
              {% if source_data %}
                <span class="course-badge badge-source">
                  <i class="{{ source_data.icon }} fa-fw"></i>
                  {{ source_data.name }}
                </span>
              {% endif %}
              {% if category_data %}
                <span class="course-badge">
                  <i class="fas fa-tag fa-fw"></i>
                  {{ category_data.name }}
                </span>
              {% endif %}
            </div>
          </a>
        {% endfor %}
      </div>
    </div>

    <!-- 按学校分组的网格 -->
    {% for source in site.data.courses.sources %}
      <div class="course-group" id="group-{{ source.id }}">
        <div class="course-grid">
          {% assign source_courses = site.courses | where: "source", source.id %}
          {% for course in source_courses %}
            {% assign category_data = source.categories | where: "id", course.category | first %}
            <a href="{{ course.url }}" class="course-card" data-title="{{ course.title | downcase }}" data-category="{{ category_data.name | downcase }}">
              <div class="course-header">
                <h3 class="course-title">{{ course.title }}</h3>
              </div>
              <p class="course-excerpt">{{ course.content | strip_html | truncate: 100 }}</p>
              <div class="course-badges">
                <span class="course-badge badge-source">
                  <i class="{{ source.icon }} fa-fw"></i>
                  {{ source.name }}
                </span>
                {% if category_data %}
                  <span class="course-badge">
                    <i class="fas fa-tag fa-fw"></i>
                    {{ category_data.name }}
                  </span>
                {% endif %}
              </div>
            </a>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  {% else %}
    <div class="text-center py-5">
      <i class="fas fa-book-open fa-3x text-muted mb-3"></i>
      <p class="text-muted">暂无课程数据。如果刚添加了配置，请尝试重启 Jekyll 服务。</p>
    </div>
  {% endif %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.source-tab');
  const groups = document.querySelectorAll('.course-group');
  const searchInput = document.getElementById('course-search');
  const courseCards = document.querySelectorAll('.course-card');

  // Tab 切换逻辑
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sourceId = tab.getAttribute('data-source');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      groups.forEach(group => {
        if (group.id === `group-${sourceId}`) {
          group.classList.add('active');
        } else {
          group.classList.remove('active');
        }
      });

      // 切换 Tab 时重置搜索
      if (searchInput.value) {
        filterCourses(searchInput.value);
      }
    });
  });

  // 搜索过滤逻辑
   function filterCourses(query) {
     const term = query.toLowerCase().trim();
     const activeGroup = document.querySelector('.course-group.active');
     const cards = activeGroup.querySelectorAll('.course-card');
     const noResults = document.getElementById('no-results');
     let hasVisible = false;
     
     cards.forEach(card => {
       const title = card.getAttribute('data-title');
       const category = card.getAttribute('data-category');
       
       if (title.includes(term) || category.includes(term)) {
         card.style.display = 'flex';
         hasVisible = true;
       } else {
         card.style.display = 'none';
       }
     });

     if (hasVisible) {
       noResults.style.display = 'none';
     } else {
       noResults.style.display = 'block';
     }
   }

  searchInput.addEventListener('input', (e) => {
    filterCourses(e.target.value);
  });
});
</script>

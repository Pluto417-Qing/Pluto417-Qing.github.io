---
layout: page
icon: fas fa-check-circle
order: 5
---

<!-- 说明：目标数据存储在 _data/goals.yml 文件中，修改目标请编辑该文件 -->

<style>
.goals-header {
  text-align: center;
  margin-bottom: 3rem;
}

.goals-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.goals-header .subtitle {
  color: var(--text-muted, #586069);
  font-size: 1.1rem;
}

.timeline-container {
  max-width: 900px;
  margin: 0 auto 1.5rem;
  padding: 1.5rem 1rem 1rem;
}

.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 30px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 1.2rem;
  left: 30px;
  right: 30px;
  height: 2px;
  background: linear-gradient(90deg, 
    var(--link-color, #0969da) 0%, 
    var(--link-color, #0969da) 50%, 
    var(--border-color, #e1e4e8) 50%,
    var(--border-color, #e1e4e8) 100%);
  border-radius: 2px;
  z-index: 0;
}

.timeline-year {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;
  padding: 0.25rem;
}

.timeline-year:hover .year-dot {
  transform: scale(1.2);
  box-shadow: 0 6px 20px rgba(9, 105, 218, 0.3);
}

.year-dot {
  width: 14px;
  height: 14px;
  background: var(--card-bg, #fff);
  border: 3px solid var(--border-color, #d0d7de);
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 0.5rem;
}

.timeline-year.active .year-dot {
  width: 18px;
  height: 18px;
  border-color: var(--link-color, #0969da);
  background: var(--link-color, #0969da);
  box-shadow: 0 0 0 4px rgba(9, 105, 218, 0.15), 0 4px 12px rgba(9, 105, 218, 0.3);
}

.timeline-year.completed .year-dot {
  background: var(--link-color, #0969da);
  border-color: var(--link-color, #0969da);
}

.timeline-year.completed .year-dot::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 8px;
  font-weight: bold;
}

.year-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted, #586069);
  transition: all 0.3s;
  letter-spacing: 0.5px;
}

.timeline-year.active .year-label {
  color: var(--link-color, #0969da);
  font-size: 1rem;
  font-weight: 700;
  transform: scale(1.05);
}

.timeline-year.completed .year-label {
  color: var(--heading-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .timeline {
    padding: 0 10px;
  }
  
  .timeline::before {
    left: 10px;
    right: 10px;
  }
  
  .year-label {
    font-size: 0.9rem;
  }
  
  .timeline-year.active .year-label {
    font-size: 1.1rem;
  }
}

.progress-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 0 auto 2rem;
  max-width: 600px;
}

.progress-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 1.25rem;
  border-radius: 10px;
  color: white;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.progress-card:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.progress-card:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.progress-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.progress-label {
  font-size: 0.8rem;
  opacity: 0.95;
  font-weight: 500;
}

.goals-section {
  margin-bottom: 3rem;
}

.goal-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.goal-item {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}

.goal-item:hover {
  border-color: var(--link-color, #0969da);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateX(5px);
}

.goal-item.completed {
  background: var(--tag-bg, #f6f8fa);
  opacity: 0.8;
}

.goal-top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.goal-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color, #d0d7de);
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  margin-top: 0.15rem;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 10;
  position: relative;
}

.goal-checkbox:hover {
  border-color: var(--link-color, #0969da);
  transform: scale(1.1);
}

.goal-item.completed .goal-checkbox {
  background: var(--link-color, #0969da);
  border-color: var(--link-color, #0969da);
}

.goal-checkbox::after {
  content: '✓';
  color: white;
  font-size: 1rem;
  font-weight: 700;
  display: none;
}

.goal-item.completed .goal-checkbox::after {
  display: block;
}

.goal-content {
  flex: 1;
}

.goal-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.goal-item.completed .goal-title {
  text-decoration: line-through;
  color: var(--text-muted, #586069);
}

.goal-desc {
  font-size: 0.9rem;
  color: var(--text-muted, #586069);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.goal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.goal-tag {
  padding: 0.25rem 0.75rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--text-color);
}

.goal-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted, #586069);
}

.progress-bar {
  width: 100px;
  height: 6px;
  background: var(--border-color, #e1e4e8);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--link-color, #0969da);
  transition: width 0.3s;
}

.goal-deadline {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--text-muted, #586069);
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border-color, #e1e4e8);
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted, #586069);
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -2px;
}

.category-tab:hover {
  color: var(--heading-color);
  background: var(--tag-bg, #f6f8fa);
  border-radius: 8px 8px 0 0;
}

.category-tab.active {
  color: var(--link-color, #0969da);
  border-bottom-color: var(--link-color, #0969da);
  font-weight: 600;
}

.category-tab .tab-icon {
  font-size: 1.2rem;
}

.category-tab .tab-count {
  background: var(--tag-bg, #f6f8fa);
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.category-tab.active .tab-count {
  background: var(--link-color, #0969da);
  color: white;
}

.tab-content {
  display: none;
  animation: fadeIn 0.3s ease-in;
}

.tab-content.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>

<div class="timeline-container">
  <div class="timeline">
    <div class="timeline-year" data-year="2024">
      <div class="year-dot"></div>
      <div class="year-label">2024</div>
    </div>
    <div class="timeline-year" data-year="2025">
      <div class="year-dot"></div>
      <div class="year-label">2025</div>
    </div>
    <div class="timeline-year active" data-year="2026">
      <div class="year-dot"></div>
      <div class="year-label">2026</div>
    </div>
    <div class="timeline-year" data-year="2027">
      <div class="year-dot"></div>
      <div class="year-label">2027</div>
    </div>
    <div class="timeline-year" data-year="2028">
      <div class="year-dot"></div>
      <div class="year-label">2028</div>
    </div>
  </div>
</div>

<div class="progress-summary">
  <div class="progress-card">
    <div class="progress-number" id="totalGoals">15</div>
    <div class="progress-label">总目标数</div>
  </div>
  <div class="progress-card">
    <div class="progress-number" id="completedGoals">5</div>
    <div class="progress-label">已完成</div>
  </div>
  <div class="progress-card">
    <div class="progress-number" id="progressPercent">33%</div>
    <div class="progress-label">完成率</div>
  </div>
</div>

<!-- 分类标签页 -->
<div class="category-tabs">
  <button class="category-tab active" data-category="study">
    <span class="tab-icon">💻</span>
    技术学习
    <span class="tab-count">{{ site.data.goals.study.size }}</span>
  </button>
  <button class="category-tab" data-category="project">
    <span class="tab-icon">🚀</span>
    项目实践
    <span class="tab-count">{{ site.data.goals.project.size }}</span>
  </button>
  <button class="category-tab" data-category="career">
    <span class="tab-icon">📈</span>
    职业发展
    <span class="tab-count">{{ site.data.goals.career.size }}</span>
  </button>
  <button class="category-tab" data-category="growth">
    <span class="tab-icon">🌱</span>
    个人成长
    <span class="tab-count">{{ site.data.goals.growth.size }}</span>
  </button>
</div>

<!-- 技术学习 Tab -->
<div class="tab-content active" data-category="study">
<div class="goals-section">
  <ul class="goal-list">
    {% for goal in site.data.goals.study %}
    <li class="goal-item {% if goal.completed %}completed{% endif %}" data-goal-url="{{ goal.url }}">
      <div class="goal-top">
        <div class="goal-checkbox" onclick="toggleGoalCompleted(event)"></div>
        <div class="goal-content">
          <div class="goal-title">{{ goal.title }}</div>
          <div class="goal-desc">{{ goal.desc }}</div>
          <div class="goal-meta">
            <span class="goal-tag">{{ goal.tag }}</span>
            {% if goal.progress %}
            <div class="goal-progress">
              <div class="progress-bar"><div class="progress-fill" style="width: {{ goal.progress }}%;"></div></div>
              <span>{% if goal.progress_text %}{{ goal.progress_text }}{% else %}{{ goal.progress }}%{% endif %}</span>
            </div>
            {% endif %}
            <span class="goal-deadline">{% if goal.completed %}✅{% else %}⏰{% endif %} {{ goal.deadline }}</span>
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>
</div>

<!-- 项目实践 Tab -->
<div class="tab-content" data-category="project">
<div class="goals-section">
  <ul class="goal-list">
    {% for goal in site.data.goals.project %}
    <li class="goal-item {% if goal.completed %}completed{% endif %}" data-goal-url="{{ goal.url }}">
      <div class="goal-top">
        <div class="goal-checkbox" onclick="toggleGoalCompleted(event)"></div>
        <div class="goal-content">
          <div class="goal-title">{{ goal.title }}</div>
          <div class="goal-desc">{{ goal.desc }}</div>
          <div class="goal-meta">
            <span class="goal-tag">{{ goal.tag }}</span>
            {% if goal.progress %}
            <div class="goal-progress">
              <div class="progress-bar"><div class="progress-fill" style="width: {{ goal.progress }}%;"></div></div>
              <span>{% if goal.progress_text %}{{ goal.progress_text }}{% else %}{{ goal.progress }}%{% endif %}</span>
            </div>
            {% endif %}
            <span class="goal-deadline">{% if goal.completed %}✅{% else %}⏰{% endif %} {{ goal.deadline }}</span>
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>
</div>

<!-- 职业发展 Tab -->
<div class="tab-content" data-category="career">
<div class="goals-section">
  <ul class="goal-list">
    {% for goal in site.data.goals.career %}
    <li class="goal-item {% if goal.completed %}completed{% endif %}" data-goal-url="{{ goal.url }}">
      <div class="goal-top">
        <div class="goal-checkbox" onclick="toggleGoalCompleted(event)"></div>
        <div class="goal-content">
          <div class="goal-title">{{ goal.title }}</div>
          <div class="goal-desc">{{ goal.desc }}</div>
          <div class="goal-meta">
            <span class="goal-tag">{{ goal.tag }}</span>
            {% if goal.progress %}
            <div class="goal-progress">
              <div class="progress-bar"><div class="progress-fill" style="width: {{ goal.progress }}%;"></div></div>
              <span>{% if goal.progress_text %}{{ goal.progress_text }}{% else %}{{ goal.progress }}%{% endif %}</span>
            </div>
            {% endif %}
            <span class="goal-deadline">{% if goal.completed %}✅{% else %}⏰{% endif %} {{ goal.deadline }}</span>
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>
</div>

<!-- 个人成长 Tab -->
<div class="tab-content" data-category="growth">
<div class="goals-section">
  <ul class="goal-list">
    {% for goal in site.data.goals.growth %}
    <li class="goal-item {% if goal.completed %}completed{% endif %}" data-goal-url="{{ goal.url }}">
      <div class="goal-top">
        <div class="goal-checkbox" onclick="toggleGoalCompleted(event)"></div>
        <div class="goal-content">
          <div class="goal-title">{{ goal.title }}</div>
          <div class="goal-desc">{{ goal.desc }}</div>
          <div class="goal-meta">
            <span class="goal-tag">{{ goal.tag }}</span>
            {% if goal.progress %}
            <div class="goal-progress">
              <div class="progress-bar"><div class="progress-fill" style="width: {{ goal.progress }}%;"></div></div>
              <span>{% if goal.progress_text %}{{ goal.progress_text }}{% else %}{{ goal.progress }}%{% endif %}</span>
            </div>
            {% endif %}
            <span class="goal-deadline">{% if goal.completed %}✅{% else %}⏰{% endif %} {{ goal.deadline }}</span>
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>
</div>

<script>
// Checkbox 切换完成状态（仅本地显示，不保存）
function toggleGoalCompleted(event) {
  event.stopPropagation(); // 阻止事件冒泡
  const goalItem = event.target.closest('.goal-item');
  goalItem.classList.toggle('completed');
  updateStats();
}

// 目标项点击跳转到详情页
document.addEventListener('DOMContentLoaded', function() {
  const goalItems = document.querySelectorAll('.goal-item');
  goalItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // 如果点击的是checkbox，不跳转
      if (e.target.classList.contains('goal-checkbox')) {
        return;
      }
      const url = this.dataset.goalUrl;
      if (url) {
        window.location.href = url;
      }
    });
  });
});

// Tab 切换功能
const categoryTabs = document.querySelectorAll('.category-tab');
const tabContents = document.querySelectorAll('.tab-content');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const category = this.dataset.category;
    
    // 移除所有 active 状态
    categoryTabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // 添加当前 active 状态
    this.classList.add('active');
    document.querySelector(`.tab-content[data-category="${category}"]`).classList.add('active');
    
    // 更新统计数据
    updateStats();
  });
});

function updateStats() {
  setTimeout(() => {
    const allGoals = document.querySelectorAll('.tab-content.active .goal-item');
    const completedGoals = document.querySelectorAll('.tab-content.active .goal-item.completed');
    const total = allGoals.length;
    const completed = completedGoals.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('totalGoals').textContent = total;
    document.getElementById('completedGoals').textContent = completed;
    document.getElementById('progressPercent').textContent = percent + '%';
  }, 100);
}

// 全局统计（所有分类）
function updateGlobalStats() {
  setTimeout(() => {
    const allGoals = document.querySelectorAll('.goal-item');
    const completedGoals = document.querySelectorAll('.goal-item.completed');
    const total = allGoals.length;
    const completed = completedGoals.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // 这里可以用于显示总体统计，如果需要的话
    console.log(`总体: ${completed}/${total} (${percent}%)`);
  }, 100);
}

// 初始化当前 Tab 的统计
updateStats();

// 时间线年份切换
const timelineYears = document.querySelectorAll('.timeline-year');
const currentYear = new Date().getFullYear();

timelineYears.forEach(yearElement => {
  const year = parseInt(yearElement.dataset.year);
  
  // 标记已完成的年份
  if (year < currentYear) {
    yearElement.classList.add('completed');
  }
  
  // 点击事件
  yearElement.addEventListener('click', function() {
    // 移除所有 active 状态
    timelineYears.forEach(y => y.classList.remove('active'));
    
    // 添加当前 active 状态
    this.classList.add('active');
    
    const selectedYear = this.dataset.year;
    
    // 添加切换动画效果
    const allTabContents = document.querySelectorAll('.tab-content');
    allTabContents.forEach(section => {
      section.style.opacity = '0.3';
      setTimeout(() => {
        section.style.opacity = '1';
      }, 200);
    });
    
    // 显示临时提示
    const existingNotice = document.getElementById('yearNotice');
    if (existingNotice) {
      existingNotice.remove();
    }
    
    let noticeText = '';
    if (selectedYear < currentYear) {
      noticeText = `🎉 ${selectedYear} 年的目标已完成`;
    } else if (selectedYear == currentYear) {
      noticeText = `💪 ${selectedYear} 年目标进行中，加油！`;
    } else {
      noticeText = `📝 ${selectedYear} 年目标规划中`;
    }
    
    const notice = document.createElement('div');
    notice.id = 'yearNotice';
    notice.style.cssText = 'text-align: center; margin: 1rem auto; padding: 0.75rem 1.5rem; background: var(--tag-bg, #f6f8fa); border-left: 4px solid var(--link-color, #0969da); border-radius: 6px; color: var(--text-color); font-size: 0.9rem; max-width: 600px; animation: slideIn 0.3s ease;';
    notice.textContent = noticeText;
    
    const progressSummary = document.querySelector('.progress-summary');
    progressSummary.parentNode.insertBefore(notice, progressSummary.nextSibling);
    
    setTimeout(() => {
      if (notice.parentNode) {
        notice.style.transition = 'opacity 0.5s ease';
        notice.style.opacity = '0';
        setTimeout(() => notice.remove(), 500);
      }
    }, 3000);
    
    // 更新统计数据
    updateStats();
  });
  
  // 悬停效果增强
  yearElement.addEventListener('mouseenter', function() {
    const year = this.dataset.year;
    const info = this.querySelector('.year-info');
    if (!this.classList.contains('active')) {
      info.style.opacity = '0.7';
    }
  });
  
  yearElement.addEventListener('mouseleave', function() {
    const info = this.querySelector('.year-info');
    if (!this.classList.contains('active')) {
      info.style.opacity = '0';
    }
  });
});
</script>

> 💡 **提示：** 点击时间线上的年份查看不同年度的目标。点击目标可以切换完成状态，追踪你的成长历程！修改目标请编辑 `_data/goals.yml` 文件。
{: .prompt-tip }

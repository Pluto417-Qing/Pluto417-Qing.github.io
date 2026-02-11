---
# the default layout is 'page'
icon: fas fa-info-circle
order: 8
title: About
---

<style>
.animated-banner {
  position: relative;
  padding: 2rem 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(-45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 25%, rgba(240, 147, 251, 0.1) 50%, rgba(79, 172, 254, 0.1) 75%, rgba(102, 126, 234, 0.1) 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  border: 1px solid var(--border-color, #e1e4e8);
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.banner-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.8rem 0;
  color: var(--heading-color);
  text-shadow: none;
}

.typing-text {
  font-size: 1.1rem;
  font-weight: 500;
  min-height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-color);
}

.typing-text::after {
  content: '|';
  animation: blink 1s infinite;
  font-weight: 100;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 C150,80 350,0 600,50 C850,100 1050,20 1200,50 L1200,100 L0,100 Z' fill='rgba(255,255,255,0.1)'%3E%3C/path%3E%3C/svg%3E");
  background-size: 50% 100px;
  animation: wave 20s linear infinite;
}

.wave:nth-child(2) {
  bottom: 10px;
  opacity: 0.5;
  animation: wave 15s linear infinite reverse;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 1.4rem;
  }
  
  .typing-text {
    font-size: 0.9rem;
  }
  
  .animated-banner {
    padding: 1.5rem 1rem;
  }
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.profile-tag {
  padding: 0.8rem 1.5rem;
  background: var(--card-bg, #fff);
  border: 2px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.profile-tag:hover {
  transform: translateY(-2px);
  border-color: var(--link-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.profile-tag i {
  margin-right: 0.5rem;
  color: var(--link-color);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--link-color);
}

.profile-info h2 {
  margin: 0 0 0.5rem 0;
  color: var(--heading-color);
}

.profile-bio {
  color: var(--text-muted-color);
  line-height: 1.6;
  margin: 0.5rem 0;
}

.profile-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.profile-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.profile-links a:hover {
  background: var(--link-color);
  color: #fff;
  transform: translateY(-2px);
}

.section {
  margin: 2rem 0;
}

.section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
  color: var(--heading-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.skill-category {
  padding: 1.5rem;
  background: var(--card-bg, #fff);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e1e4e8);
}

.skill-category h4 {
  margin: 0 0 1rem 0;
  color: var(--heading-color);
  font-size: 1.1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.3rem 0.8rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-color);
}

.education-item, .experience-item {
  padding: 1.5rem;
  background: var(--card-bg, #fff);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e1e4e8);
  margin-bottom: 1rem;
}

.education-header, .experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.education-header h4, .experience-header h4 {
  margin: 0;
  color: var(--heading-color);
}

.date-tag {
  padding: 0.3rem 0.8rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-muted-color);
}

.education-details, .experience-details {
  color: var(--text-muted-color);
  line-height: 1.8;
}

.education-details ul, .experience-details ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.interest-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: var(--card-bg, #fff);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e1e4e8);
}

.interest-item i {
  color: var(--link-color);
  font-size: 1.2rem;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-bg, #fff);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e1e4e8);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-item i {
  color: var(--link-color);
  font-size: 1.1rem;
  min-width: 20px;
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  background: var(--card-bg, #fff);
  color: var(--link-color);
  border: 2px solid var(--border-color, #e1e4e8);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.view-more-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-decoration: none;
  border-color: var(--link-color);
  background: var(--card-bg, #fff);
  color: var(--link-color) !important;
}

.view-more-link i {
  transition: transform 0.3s ease;
}

.view-more-link:hover i {
  transform: translateX(4px);
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .education-header, .experience-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

<div class="animated-banner">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="banner-content">
    <h1 class="banner-title">👋 Hi, I'm Yuan</h1>
    <div class="typing-text" id="typingText"></div>
  </div>
</div>

<script>
const texts = [
  '清华大学软件工程专业在读',
  '前端工程师',
  'AI & Agent 学习者',
  '热衷于探索学习新知识'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentText = texts[textIndex];
  const typingElement = document.getElementById('typingText');
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // 停留2秒
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // 切换前停留0.5秒
  }
  
  setTimeout(type, typingSpeed);
}

// 页面加载后启动打字机效果
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(type, 500));
} else {
  setTimeout(type, 500);
}
</script>

<div class="profile-tags">
  <div class="profile-tag">
    <i class="fas fa-university"></i>
    清华大学软件工程专业
  </div>
  <div class="profile-tag">
    <i class="fas fa-laptop-code"></i>
    前端工程师
  </div>
  <div class="profile-tag">
    <i class="fas fa-robot"></i>
    AI & Agent 学习者
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-graduation-cap"></i> 教育经历</h3>
  <div class="education-item">
    <div class="education-header">
      <h4>清华大学 - 软件工程（本科）</h4>
      <span class="date-tag">2023.01 - 2027.06</span>
    </div>
    <div class="education-details">
      <ul>
        <li>主要课程：数据结构、算法设计与分析、Web前端开发、机器学习核心课程、软件工程原理与计算机基础理论</li>
        <li>核心技术：熟练掌握 Java、HTML、CSS、JavaScript 前端三剑客，能够使用 Vue、React 框架完成前端项目的设计与开发</li>
        <li>当前学习方向: AI Agent 技术、大模型应用开发、智能化前端交互设计</li>
      </ul>
    </div>
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-code"></i> 技术栈</h3>
  <div class="skills-grid">
    <div class="skill-category">
      <h4>前端开发</h4>
      <div class="skill-tags">
        <span class="skill-tag">HTML5</span>
        <span class="skill-tag">CSS3</span>
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">Vue.js</span>
        <span class="skill-tag">React</span>
        <span class="skill-tag">React Native</span>
      </div>
    </div>
    <div class="skill-category">
      <h4>后端开发</h4>
      <div class="skill-tags">
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Python</span>
      </div>
    </div>
    <div class="skill-category">
      <h4>AI & Agent</h4>
      <div class="skill-tags">
        <span class="skill-tag">ChatGPT</span>
        <span class="skill-tag">GitHub Copilot</span>
        <span class="skill-tag">AI Agent</span>
        <span class="skill-tag">大模型应用</span>
      </div>
    </div>
    <div class="skill-category">
      <h4>工具 & 其他</h4>
      <div class="skill-tags">
        <span class="skill-tag">Git</span>
      </div>
    </div>
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-project-diagram"></i> 项目经历</h3>
  <div class="experience-item">
    <div class="experience-header">
      <h4>前端项目</h4>
      <span class="date-tag">2024 - 2025.01</span>
    </div>
    <div class="experience-details">
      <ul>
        <li>使用 Vue 框架搭建电影座位管理系统前端，实现实时座位状态更新、API拉取功能，确保用户体验流畅</li>
        <li>使用 React Native 开发移动端应用，产出一个完整可上线的 APP，实现跨平台一致性体验</li>
        <li>从需求分析到项目实现全程负责，通过迭代化设计提升代码复用率</li>
      </ul>
    </div>
  </div>
  <div class="text-center">
    <a href="/project/" class="view-more-link">
      查看项目详情
      <i class="fas fa-arrow-right"></i>
    </a>
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-lightbulb"></i> 关于我</h3>
  <div class="education-item">
    <div class="education-details">
      <p>我是一名来自清华大学软件工程专业的学生，对前端技术和人工智能充满热情。目前正在深入学习 AI Agent 技术和大模型应用开发，探索如何将 AI 能力融入前端应用，创造更智能、更人性化的用户体验。</p>
      <p>在学校主要使用 Java 进行编程学习，同时掌握前端全栈技术，能够独立完成从前端到后端的完整项目开发。我具备较强的 AI 辅助开发能力，熟练使用 Cursor、Claude code 等工具提升开发效率和代码质量。</p>
      <p>我相信技术的价值在于解决实际问题，期待通过不断学习和实践，将前沿技术应用到实际项目中，创造有价值的产品。</p>
    </div>
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-heart"></i> 兴趣爱好</h3>
  <div class="interests">
    <div class="interest-item">
      <i class="fas fa-robot"></i>
      <span>AI & Agent 技术</span>
    </div>
    <div class="interest-item">
      <i class="fas fa-laptop-code"></i>
      <span>前端开发</span>
    </div>
    <div class="interest-item">
      <i class="fas fa-book"></i>
      <span>技术阅读</span>
    </div>
    <div class="interest-item">
      <i class="fas fa-comments"></i>
      <span>开源社区</span>
    </div>
  </div>
</div>

<div class="section">
  <h3><i class="fas fa-envelope"></i> 联系方式</h3>
  <div class="contact-info">
    <div class="contact-item">
      <i class="fas fa-envelope"></i>
      <span>yuanqh23@mails.tsinghua.edu.cn</span>
    </div>
    <div class="contact-item">
      <i class="fas fa-map-marker-alt"></i>
      <span>北京</span>
    </div>
    <div class="contact-item">
      <i class="fab fa-github"></i>
      <a href="https://github.com/Pluto417-Qing" target="_blank">@Pluto417-Qing</a>
    </div>
  </div>
</div>

---
layout: page
icon: fas fa-book
order: 6
title: Reading List
---

<style>
.reading-controls {
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--border-color, #e1e4e8);
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-muted, #586069);
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  margin-bottom: -2px;
}

.tab.active {
  color: var(--heading-color);
  border-bottom-color: var(--link-color, #0969da);
  font-weight: 600;
}

.tab:hover {
  color: var(--heading-color);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.4rem 1rem;
  background: var(--tag-bg, #f6f8fa);
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: var(--link-color, #0969da);
  color: white;
  border-color: var(--link-color, #0969da);
}

.filter-btn.active {
  background: var(--link-color, #0969da);
  color: white;
  border-color: var(--link-color, #0969da);
}

.bookshelf {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 2rem 1.5rem;
  margin-top: 2rem;
}

.book {
  cursor: pointer;
  transition: transform 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.book:hover {
  transform: translateY(-8px);
}

.book-cover {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  position: relative;
  overflow: hidden;
}

.book-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.book-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-author {
  font-size: 0.85rem;
  color: var(--text-muted, #586069);
  margin-bottom: 0.3rem;
}

.book-category {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  background: var(--tag-bg, #f6f8fa);
  border-radius: 10px;
  font-size: 0.75rem;
  margin-top: 0.3rem;
}

.book-rating {
  color: #f5a623;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.book.hidden {
  display: none;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted, #586069);
  display: none;
}

.empty-state.show {
  display: block;
}
</style>

<div class="reading-controls">
  <div class="tabs">
    <button class="tab active" data-status="reading">正在阅读</button>
    <button class="tab" data-status="read">已读完</button>
    <button class="tab" data-status="toread">想读</button>
  </div>

  <div class="filters">
    <button class="filter-btn active" data-category="all">全部</button>
    <button class="filter-btn" data-category="computer">计算机科学</button>
    <button class="filter-btn" data-category="politics">政治</button>
    <button class="filter-btn" data-category="economics">经济</button>
    <button class="filter-btn" data-category="fiction">小说</button>
  </div>
</div>

<div class="bookshelf" id="bookshelf">
  <!-- 示例书籍 - 正在阅读 -->
  <a href="/books/book-clean-code/" class="book" data-status="reading" data-category="computer">
    <div class="book-cover" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <span>Clean Code</span>
    </div>
    <div class="book-title">代码整洁之道</div>
    <div class="book-author">Robert C. Martin</div>
    <div class="book-category">计算机科学</div>
  </a>

  <a href="/books/book-thinking-fast-slow/" class="book" data-status="reading" data-category="economics">
    <div class="book-cover" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
      <span>Thinking, Fast and Slow</span>
    </div>
    <div class="book-title">思考，快与慢</div>
    <div class="book-author">Daniel Kahneman</div>
    <div class="book-category">经济</div>
  </a>

  <!-- 已读完 -->
  <a href="/books/book-1984/" class="book" data-status="read" data-category="fiction">
    <div class="book-cover" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
      <span>1984</span>
    </div>
    <div class="book-title">一九八四</div>
    <div class="book-author">George Orwell</div>
    <div class="book-category">小说</div>
    <div class="book-rating">⭐⭐⭐⭐⭐</div>
  </a>

  <a href="/books/book-sapiens/" class="book" data-status="read" data-category="politics">
    <div class="book-cover" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
      <span>Sapiens</span>
    </div>
    <div class="book-title">人类简史</div>
    <div class="book-author">Yuval Noah Harari</div>
    <div class="book-category">政治</div>
    <div class="book-rating">⭐⭐⭐⭐⭐</div>
  </a>

  <a href="/books/book-design-patterns/" class="book" data-status="read" data-category="computer">
    <div class="book-cover" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);">
      <span>Design Patterns</span>
    </div>
    <div class="book-title">设计模式</div>
    <div class="book-author">Gang of Four</div>
    <div class="book-category">计算机科学</div>
    <div class="book-rating">⭐⭐⭐⭐</div>
  </a>

  <!-- 想读 -->
  <a href="/books/book-capital/" class="book" data-status="toread" data-category="economics">
    <div class="book-cover" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
      <span>Das Kapital</span>
    </div>
    <div class="book-title">资本论</div>
    <div class="book-author">Karl Marx</div>
    <div class="book-category">经济</div>
  </a>

  <a href="/books/book-algorithm/" class="book" data-status="toread" data-category="computer">
    <div class="book-cover" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
      <span>Introduction to Algorithms</span>
    </div>
    <div class="book-title">算法导论</div>
    <div class="book-author">Thomas H. Cormen</div>
    <div class="book-category">计算机科学</div>
  </a>
</div>

<div class="empty-state" id="emptyState">
  <p>📚 这个分类下还没有书籍</p>
</div>

<script>
(function() {
  let currentStatus = 'reading';
  let currentCategory = 'all';

  const tabs = document.querySelectorAll('.tab');
  const filters = document.querySelectorAll('.filter-btn');
  const books = document.querySelectorAll('.book');
  const bookshelf = document.getElementById('bookshelf');
  const emptyState = document.getElementById('emptyState');

  function filterBooks() {
    let visibleCount = 0;
    
    books.forEach(book => {
      const bookStatus = book.dataset.status;
      const bookCategory = book.dataset.category;
      
      const statusMatch = bookStatus === currentStatus;
      const categoryMatch = currentCategory === 'all' || bookCategory === currentCategory;
      
      if (statusMatch && categoryMatch) {
        book.classList.remove('hidden');
        visibleCount++;
      } else {
        book.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      emptyState.classList.add('show');
    } else {
      emptyState.classList.remove('show');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentStatus = this.dataset.status;
      filterBooks();
    });
  });

  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      filterBooks();
    });
  });

  // 初始过滤
  filterBooks();
})();
</script>

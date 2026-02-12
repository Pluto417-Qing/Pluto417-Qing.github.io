---
layout: page
icon: fas fa-book
order: 2
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.book:hover {
  transform: translateY(-8px);
}

.book-cover {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: white;
  text-align: center;
  margin-bottom: 0.75rem;
  position: relative;
  overflow: hidden;
}

.book-cover > span {
  padding: 1rem;
  position: relative;
  z-index: 0;
}

.book-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
  pointer-events: none;
  z-index: 0;
}

/* Override refactor-content wrapping for book cover images */
.book-cover .img-link,
.book-cover a.popup {
  display: contents;
}

.book-cover img,
.book-cover .book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.book-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  {% for book in site.data.books_reading.books %}
  <a class="book" data-status="reading" data-category="{{ book.category }}" href="{{ book.url }}">
    <div class="book-cover" style="background: {{ book.cover_gradient }};">
      {% if book.cover_image %}
      <img src="{{ book.cover_image }}" alt="{{ book.title }}" class="book-cover-img no-popup">
      {% else %}
      <span>{{ book.title_en }}</span>
      {% endif %}
    </div>
    <div class="book-info">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">{{ book.author }}</div>
      <div class="book-category">{{ book.category_cn }}</div>
    </div>
  </a>
  {% endfor %}

  {% for book in site.data.books_read.books %}
  <a class="book" data-status="read" data-category="{{ book.category }}" href="{{ book.url }}">
    <div class="book-cover" style="background: {{ book.cover_gradient }};">
      {% if book.cover_image %}
      <img src="{{ book.cover_image }}" alt="{{ book.title }}" class="book-cover-img no-popup">
      {% else %}
      <span>{{ book.title_en }}</span>
      {% endif %}
    </div>
    <div class="book-info">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">{{ book.author }}</div>
      <div class="book-category">{{ book.category_cn }}</div>
      {% if book.rating %}
      <div class="book-rating">{% for i in (1..book.rating) %}⭐{% endfor %}</div>
      {% endif %}
    </div>
  </a>
  {% endfor %}

  {% for book in site.data.books_toread.books %}
  <a class="book" data-status="toread" data-category="{{ book.category }}" href="{{ book.url }}">
    <div class="book-cover" style="background: {{ book.cover_gradient }};">
      {% if book.cover_image %}
      <img src="{{ book.cover_image }}" alt="{{ book.title }}" class="book-cover-img no-popup">
      {% else %}
      <span>{{ book.title_en }}</span>
      {% endif %}
    </div>
    <div class="book-info">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">{{ book.author }}</div>
      <div class="book-category">{{ book.category_cn }}</div>
    </div>
  </a>
  {% endfor %}
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
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentStatus = this.dataset.status;
      filterBooks();
    });
  });

  filters.forEach(filter => {
    filter.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      filterBooks();
    });
  });

  /* Remove popup/img-link wrappers injected by refactor-content
     so that GLightbox does not hijack book cover clicks */
  books.forEach(book => {
    book.querySelectorAll('.book-cover a.popup, .book-cover a.img-link').forEach(link => {
      const parent = link.parentNode;
      while (link.firstChild) {
        parent.insertBefore(link.firstChild, link);
      }
      link.remove();
    });
  });

  filterBooks();
})();
</script>

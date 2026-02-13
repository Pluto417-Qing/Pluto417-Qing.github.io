---
title: "Add Dark Mode Toggle Component"
date: 2026-02-08 10:00:00 +0800
categories: [Contribution Detail, Feature]
tags: [Jekyll, Dark Mode, UI, Feature]
contribution_id: chirpy
type: feature
status: merged
description: Implemented a smooth dark mode toggle with system preference detection and localStorage persistence.
---

## Feature Description

Added a beautiful dark mode toggle component that respects system preferences and remembers user choice across sessions.

## Implementation

### Key Features

- Smooth transition animations
- System preference detection
- localStorage persistence
- Keyboard accessibility (Space/Enter to toggle)
- ARIA labels for screen readers
- No flash on page load

### Technical Details

```javascript
// Toggle logic
function toggleDarkMode() {
  const currentMode = document.documentElement.getAttribute('data-mode');
  const newMode = currentMode === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-mode', newMode);
  localStorage.setItem('mode', newMode);
}

// System preference detection
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (!localStorage.getItem('mode')) {
  setMode(prefersDark.matches ? 'dark' : 'light');
}
```

### CSS Improvements

- Added smooth color transitions
- Optimized color palette for both modes
- Improved contrast ratios for accessibility
- Added custom properties for easy theming

## User Benefits

- Better reading experience at night
- Reduced eye strain
- Respects user preferences
- Seamless experience across devices

## Pull Request

[#1245](https://github.com/cotes2020/jekyll-theme-chirpy/pull/1245) - Merged on February 10, 2026

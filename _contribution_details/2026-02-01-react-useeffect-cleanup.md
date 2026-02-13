---
title: "Fix useEffect Cleanup Race Condition"
date: 2026-02-01 11:30:00 +0800
categories: [Contribution Detail, Bug Fix]
tags: [React, Hooks, useEffect, Race Condition]
contribution_id: react
type: fix
status: merged
description: Fixed a race condition in useEffect cleanup that could cause memory leaks in certain scenarios.
---

## Problem

A race condition existed where useEffect cleanup functions could be called after a component had already unmounted, leading to potential memory leaks and console warnings in development mode.

## Root Cause

The cleanup function wasn't properly checking if the component was still mounted before executing async operations that were initiated during the effect.

## Solution

- Added internal flag to track mount state
- Modified cleanup logic to check mount state before executing
- Updated documentation with best practices
- Added test cases covering the edge cases

## Technical Details

```javascript
// Before: Race condition possible
useEffect(() => {
  fetchData().then(data => setState(data));
  return () => cleanup();
}, []);

// After: Proper cleanup
useEffect(() => {
  let isMounted = true;
  fetchData().then(data => {
    if (isMounted) setState(data);
  });
  return () => { isMounted = false; cleanup(); };
}, []);
```

## Pull Request

[#26853](https://github.com/facebook/react/pull/26853) - Merged on February 5, 2026

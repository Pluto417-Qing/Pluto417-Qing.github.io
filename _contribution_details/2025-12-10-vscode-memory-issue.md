---
title: "Report: High Memory Usage in Large Workspaces"
date: 2025-12-10 09:15:00 +0800
categories: [Contribution Detail, Issue]
tags: [Performance, Memory, Issue Report]
contribution_id: vscode
type: issue
status: closed
description: Reported and helped diagnose high memory usage when opening large monorepo workspaces with multiple projects.
---

## Issue Description

VS Code was consuming excessive memory (4GB+) when opening large monorepo workspaces with more than 20 TypeScript projects. This caused performance degradation and sometimes crashes on machines with limited RAM.

## Investigation

- Profiled memory usage using Chrome DevTools
- Identified that the TypeScript language server was creating separate instances for each project
- Found that file watchers were duplicating efforts across projects
- Discovered unnecessary caching of AST nodes

## Reproduction Steps

1. Open a monorepo with 20+ TypeScript projects
2. Wait for IntelliSense to initialize
3. Observe memory usage climbing above 4GB
4. Notice sluggish editor performance

## Impact

- Affected developers working on large codebases
- Made VS Code unusable on lower-end machines
- Caused crashes during long coding sessions

## Resolution

The VS Code team implemented several optimizations:
- Shared TypeScript server instances across related projects
- Optimized file watcher strategy
- Improved AST node caching with LRU eviction

## Issue Thread

[#144523](https://github.com/microsoft/vscode/issues/144523) - Closed as fixed on January 5, 2026

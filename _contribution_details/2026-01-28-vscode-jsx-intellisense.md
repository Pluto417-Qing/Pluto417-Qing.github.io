---
title: "Add IntelliSense Support for JSX Props"
date: 2026-01-28 16:20:00 +0800
categories: [Contribution Detail, Feature]
tags: [TypeScript, IntelliSense, JSX, Feature]
contribution_id: vscode
type: feature
status: merged
description: Enhanced IntelliSense to provide better autocomplete suggestions for JSX props in TypeScript files.
---

## Feature Overview

Added enhanced IntelliSense support for JSX component props, making it easier for developers to discover available props and their types while writing React components in TypeScript.

## Implementation Details

- Extended the TypeScript language service integration
- Added prop inference from component type definitions
- Improved completion item documentation
- Added support for generic component props

## Benefits

- Faster development workflow
- Reduced typos in prop names
- Better discovery of component APIs
- Improved TypeScript integration

## Screenshots

Before: Basic prop suggestions
After: Rich prop suggestions with types and documentation

## Pull Request

[#146932](https://github.com/microsoft/vscode/pull/146932) - Merged on February 2, 2026

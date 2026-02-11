---
layout: post
title: 学习 Rust 编程语言
permalink: /goals/learn-rust/
date: 2026-02-11 10:00:00 +0800
categories: [学习, 技术]
tags: [Rust, 系统编程]
---

## 🎯 目标概述

完成 Rust 官方教程，做 3 个实战项目，理解所有权、生命周期等核心概念。

## 📊 当前进度

- **状态**: 🚀 进行中
- **完成度**: 60%
- **截止日期**: Q2 2026

## 📝 学习计划

### 第一阶段：基础语法 ✅
- [x] 变量与数据类型
- [x] 函数与控制流
- [x] 所有权系统基础
- [x] 引用与借用
- [x] Slice 类型

### 第二阶段：核心概念 🔄
- [x] 结构体与枚举
- [x] 模式匹配
- [x] 包管理 Cargo
- [ ] 生命周期详解
- [ ] 智能指针

### 第三阶段：高级特性 📋
- [ ] Trait 与泛型
- [ ] 错误处理
- [ ] 迭代器与闭包
- [ ] 并发编程
- [ ] Unsafe Rust

### 第四阶段：实战项目
1. **命令行工具** ✅
   - 文件搜索工具 `minigrep`
   - 学习了参数解析和文件IO

2. **Web 服务器** 🔄
   - 实现简单的 HTTP 服务器
   - 学习多线程和网络编程

3. **待定项目** 📋
   - 考虑做一个小型数据库或编译器

## 💡 学习笔记

### 所有权规则
```rust
// Rust 的所有权三大规则：
// 1. 每个值都有一个所有者
// 2. 值在任一时刻有且只有一个所有者
// 3. 当所有者离开作用域，值被丢弃

fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 被移动到 s2，s1 不再有效
    // println!("{}", s1); // 编译错误！
    println!("{}", s2); // OK
}
```

### 生命周期标注
```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 📚 参考资料

- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rust By Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings 练习题](https://github.com/rust-lang/rustlings)

## 🎓 当前感悟

Rust 的学习曲线确实陡峭，但它强大的类型系统和所有权机制让我对内存管理有了全新的理解。虽然编译器很严格，但这种严格性在运行时带来了更高的安全性和性能。

## ✅ 已完成成果

- 完成了《The Rust Programming Language》前 10 章
- 实现了 minigrep 命令行工具
- 通过了 Rustlings 80% 的练习题

## 🚧 当前挑战

- 生命周期标注理解还不够深入
- 需要更多实战练习来巩固知识
- 异步编程部分还没开始学习

---

**下一步计划**: 
- 完成 Web 服务器项目
- 深入学习生命周期和智能指针
- 开始第三个实战项目

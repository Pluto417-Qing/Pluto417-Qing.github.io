---
title: 环境配置
date: 2026-02-13 10:00:00 +0800
categories: [Reading, Computer Science]
tags: [RAG, LLM]
layout: book-note
book_id: rag-llm
chapter: 2
toc: true
summary: 环境搭建

---

### LlamaIndex
{% include url-card.html url="https://www.llamaindex.ai/" title="LlamaIndex - Agents for Document OCR + AI Workflows" description="LlamaIndex delivers industry-leading agentic document processing and workflow builders to transform complex documents into automated knowledge workflows. Start building today." host="www.llamaindex.ai" favicon="https://www.llamaindex.ai/favicon.ico" image="https://www.llamaindex.ai/og-image.png" %}
{% include url-card.html url="https://llamahub.ai/" title="Llama Hub" description="A hub of integrations for LlamaIndex including data loaders, tools, vector databases, LLMs and more." host="llamahub.ai" favicon="https://llamahub.ai/favicon.ico" %}

### Ollama
启动ollama本地API服务：
```shell
ollama serve

# 更改服务端口
OLLAMA_HOST=:11435 ollama serve
```
测试：
```shell
curl http://localhost:11434/v1/chat/completions -H "Content-Type: application/json" -d '{"model": "qwen2.5:7b", "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "你好呀！"}]}'
```
![image.png](http://teentime.cloud/img/20260217091207071.png)

### 基于Ollama部署本地嵌入模型
在 RAG 应用中，通常需要使用嵌入模型（Embedding Model）来实现对知识块的向量化从而实现基于语义相似度的检索能力，且嵌入模型的向量生成质量对后面检索的准确性有着重要的影响。嵌入模型包括基于商业大模型基座的向量模型（比如 OpenAI 的 Embedding 系列模型）与开源的向量模型（比如智源研究院的开源向量模型 BGE Embeddding）。

Ollama 也可以基于部署的开源嵌入模型提供向量生成服务，比如我们可以拉取中文向量模型 milkey/dmeta-embedding-zh:f16 提供嵌入服务。
```shell
ollama serve

curl http://localhost:11434/api/embeddings -d '{"model": "nomic-embed-text", "prompt": "Here is an article about llamas..."}'
```
![image.png](http://teentime.cloud/img/20260217091221656.png)

### 向量库
持久化存储并使用嵌入模型生成的文本向量。向量库通常有以下几种类型：
1. 基于内存的嵌入式向量库：一般仅用于测试或原型应用，比如 FAISS。
2. 本地管理的向量库：部署在本地，由自己管理的向量库。这类向量库有 Chroma、Milvus 和 PostgreSQL（带有 pgvector 插件）等。这类向量库还可以细分为支持嵌入式使用的向量库与支持 Client/Server 模式使用的向量库。
3. 云端管理的向量库：这类向量库与数据托管在云服务商。可以通过提供的控制台与 API 访问云端向量数据，比如腾讯的 Tencent Cloud VectorDB、Pinecone 等。

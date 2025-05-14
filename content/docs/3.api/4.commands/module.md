---
title: "nuxi module"
description: "使用命令行搜索并添加模块到你的 Nuxt 应用程序。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/module/
    size: xs
---

Nuxi 提供了一些实用工具，可以无缝地处理 [Nuxt 模块](/modules)。

## nuxi module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxi module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
参数 | 描述
--- | ---
`MODULENAME` | 模块名称
<!--/module-add-args-->

<!--module-add-opts-->
选项 |  默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` |  指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--skipInstall` |  | 跳过 npm install
`--skipConfig` |  | 跳过更新 nuxt.config.ts 文件
`--dev` |  | 将模块安装为开发依赖
<!--/module-add-opts-->

该命令让你无需手动操作即可在你的应用程序中安装 [Nuxt 模块](/modules)。

运行该命令时，它将：

- 使用你的包管理器安装模块作为依赖
- 将其添加到你的 [package.json](/docs/guide/directory-structure/package) 文件中
- 更新你的 [`nuxt.config`](/docs/guide/directory-structure/nuxt-config) 文件

**示例:**

安装 [`Pinia`](/modules/pinia) 模块

```bash [Terminal]
npx nuxi module add pinia
```

## nuxi module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxi module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### 参数

<!--module-search-args-->
参数 | 描述
--- | ---
`QUERY` | 要搜索的关键词
<!--/module-search-args-->

### 选项

<!--module-search-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--nuxtVersion=<2\|3>` |  | 按 Nuxt 版本过滤，并且只列出兼容的模块（默认自动检测）
<!--/module-search-opts-->

该命令搜索与你的查询匹配且与你的 Nuxt 版本兼容的 Nuxt 模块。

**Example:**

```bash [Terminal]
npx nuxi module search pinia
```

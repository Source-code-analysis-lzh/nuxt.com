---
title: "nuxi typecheck"
description: typecheck 命令运行 vue-tsc 来检查你的整个应用程序的类型。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxi typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>]
```
<!--/typecheck-cmd-->

`typecheck` 命令运行 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) 来检查你的整个应用程序的类型。

## 参数

<!--typecheck-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/typecheck-args-->

## 选项

<!--typecheck-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
<!--/typecheck-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。要覆盖此设置，请在 [`.env`](/docs/guide/directory-structure/env) 文件中或作为命令行参数定义 `NODE_ENV`。
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
阅读更多关于如何在构建或开发时启用类型检查的信息。
::

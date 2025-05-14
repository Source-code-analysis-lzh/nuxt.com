---
title: 'nuxi build-module'
description: '在发布你的 Nuxt 模块之前构建它的 Nuxt 命令。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxi build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

`build-module` 命令运行 `@nuxt/module-builder`，在你的 `rootDir` 中生成一个 `dist` 目录，其中包含你的 **nuxt 模块** 的完整构建产物。

## 参数

<!--build-module-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/build-module-args-->

## 选项

<!--build-module-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--build` | `false` | 为发布构建模块
`--stub` | `false` | 为开发生成 dist 目录的存根，而不是实际构建
`--sourcemap` | `false` | 生成 sourcemap 文件
`--prepare` | `false` | 为本地开发准备模块
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
阅读更多关于 `@nuxt/module-builder` 的信息。
::

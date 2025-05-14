---
title: "nuxi build"
description: "构建你的 Nuxt 应用程序。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxi build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

`build` 命令会创建一个 `.output` 目录，其中包含你应用程序、服务器和依赖项的所有内容，为生产环境做好准备。

## 参数

<!--build-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/build-args-->

## 选项

<!--build-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--prerender` |  | 构建 Nuxt 应用并预渲染静态路由
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 加载 `.env` 文件的路径，相对于根目录
`--envName` |  | 解析配置覆盖时使用的环境名称（构建时默认为 `production`，运行开发服务器时默认为 `development`）
<!--/build-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 始终会将 `preset` 设置为 `static`。
::

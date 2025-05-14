---
title: "nuxi generate"
description: 预渲染应用程序的每个路由，并将结果存储在纯 HTML 文件中。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxi generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

`generate` 命令预渲染你的应用程序的每个路由，并将结果存储在纯 HTML 文件中，你可以将这些文件部署到任何静态托管服务上。该命令会触发 `nuxi build` 命令，并将 `prerender` 参数设置为 `true`。

## 参数

<!--generate-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/generate-args-->

## 选项

<!--generate-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 加载 `.env` 文件的路径，相对于根目录
`--envName` |  | 解析配置覆盖时使用的环境名称（构建时默认为 `production`，运行开发服务器时默认为 `development`）
<!--/generate-opts-->

::read-more{to="/docs/getting-started/deployment#static-hosting"}
阅读更多关于预渲染和静态托管的信息。
::

---
title: "nuxi preview"
description: preview 命令在 build 命令之后启动一个服务器来预览你的应用程序。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxi preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [--dotenv] [-p, --port]
```
<!--/preview-cmd-->

`preview` 命令在运行 `build` 命令后启动一个服务器来预览你的 Nuxt 应用程序。`start` 命令是 `preview` 的别名。在生产环境中运行你的应用程序时，请参考 [部署章节](/docs/getting-started/deployment)。

## 参数

<!--preview-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/preview-args-->

## 选项

<!--preview-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--envName` |  | 解析配置覆盖时使用的环境名称（构建时默认为 `production`，运行开发服务器时默认为 `development`）
`--dotenv` |  | 加载 `.env` 文件的路径，相对于根目录
`-p, --port` |  | 监听端口（默认值：`NUXT_PORT \|\| NITRO_PORT \|\| PORT`)
<!--/preview-opts-->

此命令会将 `process.env.NODE_ENV` 设置为 `production`。要覆盖此设置，请在 `.env` 文件中或作为命令行参数定义 `NODE_ENV`。

::note
为了方便起见，在预览模式下，你的 [`.env`](/docs/guide/directory-structure/env) 文件将被加载到 `process.env` 中。（但是，在生产环境中，你需要自己确保环境变量已设置。）
::

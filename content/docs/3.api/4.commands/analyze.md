---
title: "nuxi analyze"
description: "分析你的 Nuxt 应用程序的生产环境打包文件。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxi analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 命令构建 Nuxt 应用并分析生产环境的打包文件（实验性功能）。

## 参数

<!--analyze-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/analyze-args-->

## 选项

<!--analyze-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--dotenv` |  | 加载 `.env` 文件的路径，相对于根目录
`--name=<name>` | `default` | 分析的名称
`--no-serve` |  | 跳过展示分析结果
<!--/analyze-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。
::

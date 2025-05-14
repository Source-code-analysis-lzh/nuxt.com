---
title: "nuxi devtools"
description: devtools 命令允许你基于每个项目启用或禁用 Nuxt DevTools。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxi devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

运行 `nuxi devtools enable` 将会在全局安装 Nuxt DevTools，并且也会在你当前使用的特定项目中启用它。这个偏好设置会保存在你的用户级别的 `.nuxtrc` 文件中。如果你想移除特定项目的 DevTools 支持，你可以运行 `nuxi devtools disable`。

## 参数

<!--devtools-args-->
参数 | 描述
--- | ---
`COMMAND` | 要运行的命令 (选项: <enable\|disable>)
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/devtools-args-->

## 选项

<!--devtools-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
阅读更多关于 **Nuxt DevTools** 的信息。
::

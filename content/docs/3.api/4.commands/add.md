---
title: "nuxi add"
description: "在你的 Nuxt 应用程序中搭建一个实体（或骨架）。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxi add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### Arguments

<!--add-args-->
参数 | 描述                                                                                   
--- |--------------------------------------------------------------------------------------
`TEMPLATE` | 指定要生成的模板 (选项: <api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>) 
`NAME` | 指定生成的文件名                                                                             
<!--/add-args-->

### Options

<!--add-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--force` | `false` | 如果文件已存在，强制覆盖
<!--/add-opts-->

**修饰符:**

一些模板支持额外的修饰符标记，用于在其名称中添加后缀（例如 `.client` 或 `.get`）。

```bash [Terminal]
# Generates `/plugins/sockets.client.ts`
npx nuxi add plugin sockets --client
```

## `nuxi add component`

* 修饰符标记: `--mode client|server` or `--client` or `--server`

```bash [Terminal]
# Generates `components/TheHeader.vue`
npx nuxi add component TheHeader
```

## `nuxi add composable`

```bash [Terminal]
# Generates `composables/foo.ts`
npx nuxi add composable foo
```

## `nuxi add layout`

```bash [Terminal]
# Generates `layouts/custom.vue`
npx nuxi add layout custom
```

## `nuxi add plugin`

* 修饰符标记: `--mode client|server` or `--client`or `--server`

```bash [Terminal]
# Generates `plugins/analytics.ts`
npx nuxi add plugin analytics
```

## `nuxi add page`

```bash [Terminal]
# Generates `pages/about.vue`
npx nuxi add page about
```

```bash [Terminal]
# Generates `pages/category/[id].vue`
npx nuxi add page "category/[id]"
```

## `nuxi add middleware`

* 修饰符标记: `--global`

```bash [Terminal]
# Generates `middleware/auth.ts`
npx nuxi add middleware auth
```

## `nuxi add api`

* 修饰符标记: `--method` （可以接受 `connect`、`delete`、`get`、`head`、`options`、`patch`、`post`、`put` 或 `trace`）或者，你也可以直接使用 `--get`、`--post` 等。

```bash [Terminal]
# Generates `server/api/hello.ts`
npx nuxi add api hello
```

## `nuxi add layer`

```bash [Terminal]
# Generates `layers/subscribe/nuxt.config.ts`
npx nuxi add layer subscribe
```

---
title: 'nuxi dev'
description: dev 命令启动一个带有热模块替换功能的开发服务器，地址是 http://localhost:3000。
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxi dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 命令启动一个带有热模块替换功能的开发服务器，地址是 [http://localhost:3000](https://localhost:3000)。

## 参数

<!--dev-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/dev-args-->

## 选项

<!--dev-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--dotenv` |  | 加载 `.env` 文件的路径，相对于根目录
`--envName` |  | 解析配置覆盖时使用的环境名称（构建时默认为 `production`，运行开发服务器时默认为 `development`）
`--no-clear` |  | 禁用在重启时清除控制台
`--no-fork` |  | 禁用 fork 模式
`-p, --port` |  | 监听端口（默认值: `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`)
`-h, --host` |  | 监听主机名（默认值: `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions._layers?.[0]?.devServer?.host`)
`--clipboard` | `false` | 将 URL 复制到剪贴板
`-o, --open` | `false` | 在浏览器中打开 URL
`--https` |  | 启用 HTTPS
`--publicURL` |  | 显示的公共 URL（用于二维码）
`--qr` |  | 在可用时显示公共 URL 的二维码
`--public` |  | 监听所有网络接口
`--tunnel` |  | 使用 https://github.com/unjs/untun 打开一个隧道
`--sslCert` |  | （已弃用）请使用 `--https.cert` 代替。
`--sslKey` |  | （已弃用）请使用 `--https.key` 代替。
<!--/dev-opts-->

端口和主机名也可以通过 NUXT_PORT、PORT、NUXT_HOST 或 HOST 环境变量设置。

除了上述选项外，`nuxi` 还可以将选项传递给 `listhen`，例如 `--no-qr` 可以关闭开发服务器的二维码。你可以在 [unjs/listhen](https://github.com/unjs/listhen) 的文档中找到 `listhen` 选项的列表。

此命令会将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果你在开发环境中使用自签名证书，你需要设置环境变量 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::

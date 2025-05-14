---
title: Cloudflare
description: '将你的 Nuxt 应用程序部署到 Cloudflare 基础设施。'
logoSrc: '/assets/integrations/cloudflare.svg'
category: Hosting
nitroPreset: 'cloudflare'
website: 'https://pages.cloudflare.com/'
---

## Cloudflare Pages

::tip
**零配置 ✨**
:br
与 Cloudflare Pages 的集成可以实现零配置，[了解更多](https://nitro.unjs.io/deploy#zero-config-providers)。
::

::important
查看 [@nuxthub/core](/modules/hub) 模块，使用 Cloudflare 构建全栈 Nuxt 应用程序，在 [hub.nuxt.com](https://hub.nuxt.com) 上了解更多。
::

### Git 集成

如果你使用 GitHub/GitLab 与 Cloudflare Pages 集成，**无需任何配置**。推送到你的仓库将自动构建你的项目并部署它。

::note
Nuxt 将检测环境以设置正确的 [Server/Nitro 预设](https://nitro.unjs.io/deploy/providers/cloudflare)。
::

要在边缘利用服务器端渲染，请将构建命令设置为：`nuxt build`

要静态生成你的网站，请将构建命令设置为：`nuxt generate`

### 路由匹配

在 Cloudflare Pages 上，如果找到与当前请求的路由路径匹配的 HTML 文件，它将提供该文件。它还会将 HTML 页面重定向到其无扩展名的对应版本：例如，`/contact.html` 将被重定向到 `/contact`，而 `/about/index.html` 将被重定向到 `/about/`。

要匹配 Cloudflare [路由匹配](https://developers.cloudflare.com/pages/configuration/serving-pages/#route-matching) 规则，请将 nitro 选项 `autoSubfolderIndex` 设置为 `false`。

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
})
```

### 直接上传

或者，你可以使用 [wrangler](https://github.com/cloudflare/workers-sdk) 将你的项目上传到 Cloudflare。

在这种情况下，你必须手动设置预设。

1. 为 Cloudflare Pages 构建你的项目：

    ```bash [Terminal]
    npx nuxi build --preset=cloudflare_pages
    ```

2. 部署，首次部署会要求你创建一个项目：

    ```bash [Terminal]
    wrangler pages deploy dist/
    ```

## 了解更多

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
前往 **Nitro 文档** 了解更多关于 Cloudflare 部署预设的信息。
::

::read-more{to="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/#use-bindings-in-your-nuxt-application" target="_blank"}
前往 **Cloudflare Pages** 文档 了解更多相关信息。
::

## 模板

::card-group
  ::card
  ---
  icon: i-simple-icons-github
  title: Atidone
  to: https://github.com/atinux/atidone
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个带有用户身份验证、SSR 和 Cloudflare D1 的 todos 应用程序。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atinotes
  to: https://github.com/atinux/atinotes
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个基于 Cloudflare KV 的通用渲染可编辑网站。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atidraw
  to: https://github.com/atinux/atidraw
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个让你绘制并与世界分享你的绘画的网络应用程序，使用 Cloudflare R2 & AI。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Nuxt Image Gallery
  to: https://github.com/flosciante/nuxt-image-gallery
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个上传、编辑和与世界分享你的图片的图片库，使用 Cloudflare R2。
  ::
::

## 了解更多

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
前往 **Nitro 文档** 了解更多关于 cloudflare 部署预设的信息。
::

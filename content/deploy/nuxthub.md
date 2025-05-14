---
title: NuxtHub
description: '通过零配置在你的 Cloudflare 账户上全球部署 Nuxt 应用程序。'
componentImg: NuxtHub
logoSrc: '/assets/integrations/nuxthub-logo.svg'
category: Hosting
featured: true
nitroPreset: 'cloudflare-pages'
website: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page'
---

::tip
**零配置 ✨**
:br
与 NuxtHub 的集成可以实现零配置，[了解更多](https://nitro.unjs.io/deploy#zero-config-providers)。
::

## 简介

NuxtHub 是一个基于 Cloudflare 的 Nuxt 部署和管理平台。

与 [Cloudflare](/deploy/cloudflare) 部署的主要区别在于，NuxtHub 提供了零配置的部署体验（配置、部署和管理）。

它还提供了一个强大的管理界面来管理你的 Nuxt 项目（数据库、Blob、KV 等）以及 [远程存储](https://hub.nuxt.com/docs/getting-started/remote-storage?utm_source=nuxt-website&utm_medium=deploy-page)。

在 [hub.nuxt.com](https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page) 上了解更多。

## NuxtHub CLI

你可以使用一个命令部署你的本地项目：

```bash [Terminal]
npx nuxthub deploy
```

该命令将：

1. 确保你已登录 [admin.hub.nuxt.com](https://admin.hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page)
2. 将你的本地项目链接到 NuxtHub 项目或帮助你创建一个新项目
3. 使用正确的预设构建你的 Nuxt 项目
4. 将其部署到你的 Cloudflare 账户，包含所有必要的资源
5. 提供一个访问你项目的 URL

观看视频示例：

::video{poster="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.jpg" controls class="rounded dark:border dark:border-gray-700 md:w-2/3"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.webm" type="video/webm"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.mp4" type="video/mp4"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.ogg" type="video/ogg"}
::

::note
你也可以通过以下命令全局安装 [NuxtHub CLI](https://github.com/nuxt-hub/cli)：`npm i -g nuxthub`。
::

## 使用 Git 部署

1. 将你的代码推送到你的 Git 仓库 (GitHub)
2. 点击 `New Project` 然后点击 `Import a Git repository`
3. 选择你的仓库并点击 `Import repository`
4. NuxtHub 将配置一个 GitHub Action 工作流程来部署你的项目
5. 你的应用程序将部署并获得一个 `.nuxt.dev` 域名

在你的项目导入和部署之后，所有后续推送到分支的操作都将生成预览部署，而对生产分支（通常是 “main”）所做的所有更改都将导致生产部署。

## 模板

::card-group
  ::card
  ---
  icon: i-simple-icons-github
  title: Hello Edge
  to: https://github.com/nuxt-hub/hello-edge
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个运行在边缘的最小 Nuxt 启动器。  
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: NuxtHub Starter
  to: https://github.com/nuxt-hub/starter
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个开始使用 NuxtHub 功能（数据库、Blob、KV 等）的启动器。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atidone
  to: https://github.com/atinux/atidone
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个包含身份验证和数据库以管理你的 Todos 的全栈应用程序。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Nuxt Image Gallery
  to: https://github.com/flosciante/nuxt-image-gallery
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个上传、编辑和与世界分享你的图片的图片库。
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atinotes
  to: https://github.com/atinux/atinotes
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  一个由 Markdown 和 Vue 组件驱动的、具有动态 OG 图片生成的、可编辑的网站。
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
::

::callout
在 https://hub.nuxt.com/templates 上查看完整的模板列表
::

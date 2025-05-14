---
title: GitHub Pages
description: '将你的 Nuxt 应用程序部署到 GitHub Pages 基础设施。'
logoIcon: 'i-simple-icons-github'
category: Hosting
nitroPreset: 'github-pages'
website: 'https://pages.github.com/'
---

Nuxt 支持通过最少的配置部署到 [GitHub Pages](https://pages.github.com/)。

::caution
GitHub Pages 仅支持静态站点，Nuxt 将预渲染你的应用程序为静态 HTML 文件。
::

::caution
如果你 **不** 使用自定义域名，你需要在构建步骤中将 `NUXT_APP_BASE_URL` 设置为你的仓库名。

**示例**: `https://<user>.github.io/<repository>/`: `NUXT_APP_BASE_URL=/<repository>/ npx nuxt build --preset github_pages`
::

## 设置

按照步骤[创建 GitHub Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

## 部署

这是一个使用 `github_pages` 预设将你的站点部署到 GitHub Pages 的 GitHub Actions 工作流程示例：

```yaml [.github/workflows/deploy.yml]
# https://github.com/actions/deploy-pages#usage
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      # 选择你自己的包管理器和构建脚本
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  # 部署任务
  deploy:
    # 添加对构建任务的依赖
    needs: build
    # 授予 GITHUB_TOKEN 进行 Pages 部署所需的权限
    permissions:
      pages: write      # 部署到 Pages
      id-token: write   # 验证部署源自适当的来源
    # 部署到 github_pages 环境
    environment:
      name: github_pages
      url: ${{ steps.deployment.outputs.page_url }}
    # 指定运行器 + 部署步骤
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

::read-more{to="https://nitro.unjs.io/deploy/providers/github-pages" target="_blank"}
前往 **Nitro 文档** 了解更多关于 github-pages 部署预设的信息。
::

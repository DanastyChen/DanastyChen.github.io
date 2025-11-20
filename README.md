# DanastyChen.github.io

一个 GitHub Pages 用户站点仓库，根域名为 `https://danastychen.github.io/`。本仓库包含一个使用 React + Vite + Tailwind CSS v4 构建的子项目 `my-portfolio/`，用于在子路径 `https://danastychen.github.io/my-portfolio/` 部署个人作品集。

**特点**
- 技术栈：React、Vite、Tailwind CSS v4（`@tailwindcss/vite` 插件）。
- 目录结构：
  - `my-portfolio/` 前端源码与本地开发环境
  - `docs/` 推荐的构建产物发布目录（用于 GitHub Pages）
- 用户站点仓库（本仓库）应从默认分支的仓库根或 `docs/` 目录发布。

**开发**
- 进入子项目目录并安装依赖：
  - `cd my-portfolio`
  - `npm install`
- 本地运行：
  - `npm run dev`

**构建与部署**
- 子路径部署（推荐）：将作品集挂载到 `https://danastychen.github.io/my-portfolio/`
  - `my-portfolio/vite.config.js:13` 设置 `base: '/my-portfolio/'`
  - 设置构建输出到仓库 `docs/my-portfolio`：在 `my-portfolio/vite.config.js` 增加：
    - `build: { outDir: '../docs/my-portfolio' }`
  - 构建：`npm run build`
  - 提交并推送生成的 `docs/` 到默认分支
  - 在仓库 `Settings → Pages` 选择 `Branch: main` 与 `Folder: /docs`

- 根域名部署（如果主页也需要）：
  - 将另一个项目或主页静态文件输出到 `docs/` 根；或者将 `my-portfolio` 的 `base` 改为 `'/'` 并输出到 `../docs`
  - 注意：`base` 为 `'/'` 时站点将部署到根域名而非子路径

**代码引用**
- Tailwind v4 插件启用：`my-portfolio/vite.config.js:3,7-10`
- 子路径基准：`my-portfolio/vite.config.js:13`
- Tailwind 引入（v4）：`my-portfolio/src/index.css:1`
- 脚本与（不建议在本仓库使用的）发布脚本：`my-portfolio/package.json:7-14`

**分支策略**
- 默认分支使用 `main`。如存在 `master` 并需合并到 `main`：
  - `git fetch origin`
  - `git checkout main && git pull`
  - `git merge master --allow-unrelated-histories`
  - 解决冲突后 `git add -A && git commit && git push origin main`
  - 如不再需要 `master`：`git branch -d master && git push origin --delete master`

**常见问题**
- 根域名显示 404：未在 Pages 选定分支/目录下提供 `index.html`（推荐在 `/docs` 输出构建产物并启用）。
- 子路径空白：线上加载了源码入口（如 `/src/main.jsx`）；需使用 Vite 构建后的 `dist`/`docs` 产物，并确保 `base` 与部署路径一致。

**License**
- 本仓库内容按个人项目许可使用（如需明确许可证，可在根目录添加 LICENSE 文件）。

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

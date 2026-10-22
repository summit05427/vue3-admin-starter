# Vue3 Admin Starter

基于 Vue 3 + TypeScript + Vite 的前端启动模板：内置多环境配置、三态主题、国际化、统一请求层、模块化路由与响应式布局，可直接作为新项目的基础骨架。

## 技术栈

| 分类   | 选型                      | 说明                                                                 |
| ------ | ------------------------- | -------------------------------------------------------------------- |
| 框架   | Vue 3（`<script setup>`） | 组合式 API，全部页面与组件使用 TypeScript                            |
| 构建   | Vite 8 + Rolldown         | 路由级懒加载，构建时并行执行类型检查                                 |
| 语言   | TypeScript 6              | `strict` 模式，禁止 `any`                                            |
| 状态   | Pinia 4（setup store）    | 按领域拆分：`app`、`auth`，持久化由 pinia-plugin-persistedstate 接管 |
| 路由   | Vue Router 5              | 嵌套路由 + 全局守卫 + `RouteMeta` 类型增强                           |
| 样式   | Tailwind CSS v4           | 无 `tailwind.config.js`，主题变量定义在 `src/assets/styles/main.css` |
| 组件库 | shadcn-vue（Reka UI）     | 代码位于 `src/components/ui`，按需增删                               |
| 图标   | `@lucide/vue`             | 按需引入图标组件，项目统一使用显式导入                               |
| 请求   | axios                     | 拦截器统一解包 `{ code, data, message }`                             |
| 国际化 | vue-i18n 11               | `legacy: false`，词条按语言分文件                                    |
| 提示   | vue-sonner                | 全局 Toast 出口在 `App.vue`                                          |
| 字体   | Inter + Noto Sans SC      | 本地引入：西文用 Inter，中文回落到 Noto Sans SC                      |

## 环境要求

- Node.js：`^22.18.0` 或 `>=24.12.0`
- 包管理器：pnpm
- 浏览器：Chrome / Edge 等现代浏览器（模板使用 `color-scheme`、`localStorage` 等标准能力）

## 快速开始

安装依赖并复制环境变量模板：

```sh
pnpm install
cp .env.example .env.local
```

按本地后端地址修改 `.env.local` 中的 `VITE_API_BASE_URL` 后启动开发服务器：

```sh
pnpm dev
```

## 常用命令

| 命令              | 作用                                  |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | 启动开发服务器（含热更新）            |
| `pnpm build`      | 并行执行类型检查与生产构建            |
| `pnpm build-only` | 仅执行生产构建，不做类型检查          |
| `pnpm preview`    | 本地预览生产产物                      |
| `pnpm type-check` | `vue-tsc --build` 类型检查            |
| `pnpm lint`       | 依次执行 oxlint 与 ESLint（自动修复） |
| `pnpm format`     | 使用 Prettier 格式化 `src/`           |

## 环境变量

配置按环境分层：`.env` 放公共项，`.env.development` / `.env.production` 放环境差异项，`.env.local` 存放本地覆盖且已被 `.gitignore` 忽略。`VITE_` 前缀的变量会打包进前端产物，禁止写入密钥、Token 或内网地址。

| 变量                | 必填 | 默认值  | 说明                                        |
| ------------------- | ---- | ------- | ------------------------------------------- |
| `VITE_APP_TITLE`    | 是   | 无      | 应用标题，用于页面标题与品牌展示            |
| `VITE_APP_ENV`      | 是   | 无      | 环境标识，可选 `development` / `production` |
| `VITE_API_BASE_URL` | 是   | 无      | 接口基础地址                                |
| `VITE_API_TIMEOUT`  | 否   | `10000` | 请求超时时间（毫秒）                        |
| `VITE_USE_MOCK`     | 否   | `false` | Mock 开关占位，当前未接入实现               |

环境变量统一由 `src/config/env.ts` 读取并校验，缺失或取值非法会在启动时直接抛错，业务代码不要直接访问 `import.meta.env`。

## 目录结构

```text
src/
├── api/            # 请求层：axios 实例、错误类型、鉴权 token、401 事件、业务接口
│   └── modules/    # 按业务域拆分的接口文件
├── assets/         # 全局样式与静态资源
├── components/     # 通用组件；ui/ 为 shadcn-vue 生成代码
├── config/         # 运行时配置：环境变量、主题、语言、错误文案
├── constants/      # 存储键、HTTP 状态码等常量
├── hooks/          # 组合式函数（主题、菜单、页面标题）
├── layout/         # 布局入口与布局内部子组件
├── lib/            # 第三方工具适配（cn 类名合并）
├── locales/        # 中英文词条
├── plugins/        # 应用插件（i18n）
├── router/         # 路由表、守卫、路由名称常量
├── stores/         # Pinia store（app / auth）
├── types/          # 公共类型与模块类型增强
├── utils/          # 纯函数工具（storage、format）
└── views/          # 路由级页面
```

目录职责约定：

- `views` 只做数据编排与模块组合，不沉淀通用组件。
- `components` 只放可复用组件，布局私有子组件放在 `layout/components`。
- 请求函数统一放 `api`，组件内不直接使用 `axios` / `fetch`。
- 跨页面状态放 `stores`，组件内状态使用 `ref` / `reactive`。
- 跨目录引用统一使用 `@/` 别名。

## 核心机制

### 布局与路由

路由分为 `publicRoutes`（空布局，如登录页）与 `mainRoutes`（主布局，含侧边栏、顶栏）。布局通过嵌套路由承载 `<RouterView />`，根组件只保留路由出口。

菜单不单独维护，统一由路由 `meta` 派生：`titleKey` 提供多语言标题，`icon` 提供图标，`hidden` 控制是否在菜单中隐藏。新增页面只需登记路由，菜单与面包屑会自动同步。

### 主题

支持 `light` / `dark` / `system` 三态，选择结果由 pinia-plugin-persistedstate 写入 `localStorage` 的 `app-state`（JSON）。`index.html` 中的内联脚本会在首屏渲染前解析该键并应用主题，避免暗色用户看到白屏闪烁；`initTheme()` 在 Pinia 就绪后接管后续变化。

### 国际化

默认语言 `zh-CN`，支持 `en-US`。词条按命名空间组织（`routes`、`layout`、`theme`、`locale`、`login`、`error`），英文文件通过 `satisfies` 与中文结构对齐。语言状态存放在 `app` store，切换后同步更新 `i18n`、`document.documentElement.lang` 与页面标题。

### 请求层

- 响应契约统一为 `{ code, data, message }`，`code === 0` 视为成功，`request<T>()` 直接返回 `data`。
- 业务错误、超时、网络异常、HTTP 错误均转换为 `ApiError`，并通过 vue-sonner 统一提示。
- 401 由请求层触发事件，路由层注册处理函数完成清理登录态与跳转登录页，避免请求层依赖 router。
- 主动取消的请求不弹错误提示。

### 认证

`auth` store 只管理 token 与登录态。当前 `/auth/login`、`/auth/logout`、`/auth/profile` 为模板占位接口，接入真实后端时替换路径与字段即可。token 由持久化插件写入 `app-token`，请求层通过 `src/api/token.ts` 只读访问同一份存储，不依赖 Pinia；后续若改用 Cookie，只需替换该文件。

## 新增一个页面

在 `src/views/<模块名>/index.vue` 创建页面组件。页面目录允许使用 `index.vue` 作为路由入口，其他组件仍需使用 PascalCase 文件名并在 `src/components` 或页面目录内就近放置。

在 `src/router/routes/main.ts` 的 `children` 中登记路由，并补充 `meta.titleKey` 与可选的 `icon`。路由组件必须使用动态 `import()` 保持懒加载。

在 `src/locales/zh-CN.ts` 与 `src/locales/en-US.ts` 中补充同名 `routes.<name>` 词条，菜单、面包屑与页面标题会自动生效。

## 代码规范与质量门禁

- 提交前必须通过 `pnpm lint` 与 `pnpm type-check`。
- 组件统一使用 `<script setup lang="ts">`，props / emits 显式声明类型。
- 禁止 `any`、禁止直接操作 DOM、禁止在组件内直接发请求。
- 公共组件、hooks、工具函数需补充 JSDoc，注释解释「为什么」而非复述代码。
- 单文件不超过 300 行，函数不超过 50 行；超出时拆分组件或抽取函数。
- 详细的目录与命名约定见 `.trae/rules/frontend-project-rules.md`。

## 已知占位与后续工作

- `/auth/*` 为占位接口，未与真实后端联调。
- 路由 `meta.requiresAuth` 已具备守卫逻辑，但首页尚未开启；业务接入后按需在路由上声明即可。
- `VITE_USE_MOCK` 仅保留配置位，尚未接入 Mock 实现。
- `src/api/index.ts` 为可选的统一导出入口，当前项目内直接按路径引用。
- 依赖清单与版本说明见 [docs/dependencies.md](./docs/dependencies.md)。

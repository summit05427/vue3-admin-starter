# 项目依赖清单

版本为当前 `pnpm-lock.yaml` 实际解析的版本，`package.json` 中使用的是 `^` 范围。

整理日期：2026-10-22

## 一、创建项目时自带

### 运行时依赖

| 包名       | 版本   | 作用                                     |
| ---------- | ------ | ---------------------------------------- |
| vue        | 3.5.44 | 前端框架核心，提供响应式系统与组合式 API |
| vue-router | 5.4.0  | 官方路由，负责页面导航、路由参数与守卫   |
| pinia      | 4.1.0  | 官方状态管理，存放跨组件共享状态         |

### 开发依赖

| 包名                          | 版本    | 作用                                    |
| ----------------------------- | ------- | --------------------------------------- |
| vite                          | 8.3.4   | 开发服务器与生产构建工具                |
| @vitejs/plugin-vue            | 6.0.10  | 让 Vite 编译 `.vue` 单文件组件          |
| vite-plugin-vue-devtools      | 8.2.1   | 浏览器内的 Vue 组件与状态调试面板       |
| typescript                    | 6.0.3   | 类型系统与编译器                        |
| vue-tsc                       | 3.3.13  | 对 `.vue` 文件执行 TypeScript 类型检查  |
| @vue/tsconfig                 | 0.9.1   | Vue 官方 TypeScript 配置基线            |
| @tsconfig/node24              | 24.0.5  | Node 24 环境的 TypeScript 配置基线      |
| @types/node                   | 24.19.2 | Node.js 内置模块的类型声明              |
| eslint                        | 10.13.0 | JavaScript / TypeScript 代码质量检查    |
| eslint-plugin-vue             | 10.11.1 | Vue 模板与单文件组件相关规则            |
| @vue/eslint-config-typescript | 14.9.0  | Vue + TypeScript 的 ESLint 共享配置     |
| eslint-config-prettier        | 10.1.8  | 关闭与 Prettier 冲突的格式类规则        |
| eslint-plugin-oxlint          | 1.82.0  | 将 oxlint 规则接入 ESLint，避免重复报错 |
| vue-eslint-parser             | 10.4.1  | 解析 `.vue` 文件供 ESLint 使用          |
| oxlint                        | 1.82.0  | Rust 实现的高速 linter                  |
| prettier                      | 3.9.6   | 代码格式化                              |
| jiti                          | 2.7.0   | 让 Node 直接加载 TypeScript 配置文件    |
| npm-run-all2                  | 9.0.3   | 串行 / 并行执行 npm scripts             |

## 二、后续自行下载

### 运行时依赖

| 包名                        | 版本    | 作用                                            |
| --------------------------- | ------- | ----------------------------------------------- |
| axios                       | 1.20.0  | HTTP 请求客户端，用于接口调用                   |
| echarts                     | 6.1.0   | 图表渲染引擎                                    |
| vue-echarts                 | 8.3.2   | ECharts 的 Vue 3 组件封装                       |
| gsap                        | 3.15.0  | 高性能动画库，适合复杂时间轴动画                |
| three                       | 0.186.1 | WebGL 3D 渲染引擎                               |
| @vueuse/core                | 15.0.0  | Vue 组合式工具集，提供常用响应式能力            |
| vue-i18n                    | 11.4.16 | 国际化与多语言文案管理                          |
| dayjs                       | 1.11.23 | 轻量日期时间处理库                              |
| zod                         | 4.6.7   | 运行时数据校验，并可从 schema 推导类型          |
| nprogress                   | 0.2.0   | 页面顶部加载进度条                              |
| @fontsource/noto-sans-sc    | 5.3.1   | 本地托管的思源黑体，中文默认字体                |
| @fontsource/inter           | 5.3.0   | 本地托管的 Inter 字体，西文显示优先使用         |
| pinia-plugin-persistedstate | 4.7.1   | Pinia 状态持久化，统一管理 app 与 auth 的落盘   |
| @vuelidate/core             | 2.0.3   | Vue 3 表单校验核心                              |
| @vuelidate/validators       | 2.0.4   | Vuelidate 内置校验规则集合                      |
| reka-ui                     | 2.11.0  | 无头 UI 组件库，shadcn-vue 的底层实现           |
| @lucide/vue                 | 1.60.0  | Lucide 图标组件，shadcn-vue 组件依赖            |
| class-variance-authority    | 0.7.1   | 组件样式变体管理，Button 等组件依赖             |
| cn                          | 0.5.0   | 官方类名合并工具，替代 clsx + tailwind-merge    |
| vue-sonner                  | 2.0.9   | 轻量 Toast 消息组件，作为请求层统一错误提示出口 |

### 开发依赖

| 包名                     | 版本    | 作用                                        |
| ------------------------ | ------- | ------------------------------------------- |
| tailwindcss              | 4.3.3   | 原子化 CSS 框架 v4                          |
| @tailwindcss/vite        | 4.3.3   | Tailwind v4 的 Vite 插件                    |
| vite-plugin-compression2 | 2.5.3   | 构建产物 gzip / brotli 预压缩               |
| @types/nprogress         | 0.2.3   | nprogress 的类型声明                        |
| @types/three             | 0.186.0 | three.js 的类型声明，three 本体不含类型     |
| tw-animate-css           | 1.4.0   | Tailwind 动画工具类，供 shadcn-vue 组件使用 |

## 补充说明

1. Vue 3 的表单校验使用 `@vuelidate/core` + `@vuelidate/validators`，npm 上的 `vuelidate` 包只支持 Vue 2。
2. `vite-plugin-compression2` 是 `vite-plugin-compression` 的替代品，后者已停止维护且类型停留在旧版 Vite。
3. `three` 不随包发布类型声明，因此必须搭配 `@types/three`。
4. 依赖版本会随 `pnpm update` 变化，更新后可执行 `pnpm list --depth 0` 重新核对本清单。
5. shadcn-vue 组件以源码形式存放在 `src/components/ui`，CLI 通过 `pnpm dlx` 临时运行，不计入项目依赖。
6. `cn` 包已替代 `clsx` + `tailwind-merge`，Inter 字体改为本地文件加载，不再请求 Google Fonts。

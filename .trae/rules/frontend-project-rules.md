---
alwaysApply: true
---

# 前端项目通用规则

## 适用范围

本规则适用于所有前端项目，当前项目技术栈为 Vue 3 + TypeScript + Vite + Pinia + Vue Router。

与全局规则重叠时以本文件为准；本文件未覆盖的部分沿用全局规则。

## 目录职责

| 目录             | 职责                               | 禁止放入               |
| ---------------- | ---------------------------------- | ---------------------- |
| `src/views`      | 路由级页面，负责数据编排和模块组合 | 复杂业务逻辑、通用组件 |
| `src/components` | 可复用组件                         | 页面级一次性代码       |
| `src/layout`     | 全局布局、导航、页头页脚           | 业务逻辑               |
| `src/api`        | 接口定义与请求函数，按业务域拆分   | 页面状态、DOM 操作     |
| `src/stores`     | Pinia 状态管理，按领域拆分         | 组件私有状态           |
| `src/hooks`      | 组合式逻辑复用                     | 与具体页面强绑定的逻辑 |
| `src/utils`      | 纯函数工具                         | 含副作用的业务代码     |
| `src/types`      | 公共类型定义                       | 运行时逻辑             |
| `src/router`     | 路由表与守卫                       | 页面组件实现           |

跨目录引用一律使用 `@/` 别名，禁止出现多层相对路径 `../../../`。

## 文件与目录命名

1. 目录统一用 kebab-case，例如 `src/views/user-center`。
2. Vue 组件与页面文件统一用 PascalCase，文件名与组件名保持一致，例如 `UserCard.vue`、`HomeView.vue`。
3. TypeScript 模块统一用 kebab-case，例如 `request.ts`、`use-theme.ts`。
4. 测试文件与被测文件同名，例如 `UserCard.spec.ts`。
5. `src/components/ui/**` 属于 shadcn-vue 生成代码，保留上游的 PascalCase 与单字组件名，不做改名；对应 ESLint 规则在该目录单独豁免。
6. 禁止创建多个 `index.vue`；页面目录的 `index.vue` 仅作为路由入口使用。

## 组件规范

1. 统一使用 `<script setup lang="ts">`，禁止混用 Options API。
2. 组件名用 PascalCase（`UserCard`），文件名与组件名保持一致，遵循「文件与目录命名」。
3. `props`、`emits` 必须显式声明类型，禁止隐式传参。
4. 自定义事件用 kebab-case，双向绑定统一用 `modelValue` + `update:modelValue`。
5. 单个组件超过 200 行或承担两种以上职责时必须拆分。
6. 模板嵌套不超过 3 层，超出时拆子组件或用 `computed` 简化条件。
7. `v-for` 必须绑定稳定唯一的 `key`，禁止用数组下标。
8. 禁止直接操作 DOM，统一使用模板引用 `ref`。
9. 组件内不直接发请求，统一调用 `src/api` 中的函数。

## 组件目录与统一出口

1. 单个组件直接扁平放置并以组件名命名，例如 `src/components/UserCard.vue`，不额外建目录或 `index` 文件。
2. 组件族（一个主组件带多个公开子组件）才建目录，目录用 kebab-case，例如 `src/components/user-card/`。
3. 需要对外导出多个成员时，用 `index.ts` 聚合导出，禁止用 `index.vue` 作为统一出口。
4. 页面目录允许用 `index.vue` 作为路由入口，例如 `src/views/user-center/index.vue`，但只能被路由表显式引用。
5. 布局入口直接使用语义化命名，例如 `src/layout/DefaultLayout.vue`、`src/layout/BlankLayout.vue`，禁止 `index.vue`。
6. 组件族的私有子组件放同目录的 `components/` 下，不对外导出。

## 状态管理

1. 只有跨页面、跨组件共享的状态才进 Pinia，组件内部状态用 `ref` / `reactive`。
2. store 命名用 `useXxxStore`，按业务域拆分，禁止建一个巨型全局 store。
3. 异步请求写在 store 的 action 中，组件只负责调用和展示。
4. 派生数据用 `computed` 或 getters，禁止在模板里做复杂计算。
5. store 中禁止操作 DOM、禁止直接读写 `localStorage` 以外的浏览器 API。
6. 需要在刷新后保留的状态，明确写入 `localStorage` 或 `sessionStorage`，并处理反序列化异常。

## API 层

1. 所有请求必须经过统一封装实例，禁止在组件中直接使用 `axios` 或 `fetch`。
2. 函数命名遵循 `getXxx`、`createXxx`、`updateXxx`、`deleteXxx`。
3. 每个接口必须有请求参数类型和响应数据类型，禁止裸对象和 `any`。
4. 接口按业务域分文件，例如 `src/api/user.ts`、`src/api/order.ts`。
5. 错误统一在请求层或调用处处理，禁止静默 `catch` 后不处理。
6. 禁止字符串拼接 URL 参数，统一使用请求库的 `params`。
7. 环境相关地址通过 `import.meta.env.VITE_*` 读取，禁止硬编码域名和密钥。

## 路由

1. 页面组件必须路由懒加载，使用动态 `import()`。
2. 路由 `name` 全局唯一，与路径保持语义一致。
3. 登录态、角色权限在全局守卫统一处理，页面内不重复判断。
4. 路由参数必须在使用前做存在性校验，禁止直接断言非空。
5. 路由表按模块拆分，`src/router/index.ts` 只做聚合。

## 类型与命名

1. 禁止 `any`；无法确定时用 `unknown` 并在使用处收窄。
2. 接口响应、组件 props、store 状态必须有明确类型。
3. 类型名用 PascalCase，接口用 `I` 前缀以外的语义化命名，禁止 `Data1`、`TypeA`。
4. 布尔值统一用 `is`、`has`、`can` 前缀。
5. 常量用 SCREAMING_SNAKE_CASE，魔法数字必须提取为命名常量。
6. 公共类型放 `src/types`，模块私有类型就近定义。

## 样式

1. 组件样式必须加 `scoped`，全局样式统一放 `src/assets`。
2. 类名用 kebab-case，禁止无意义缩写。
3. 禁止行内 `style`，动态样式通过绑定 `style` 对象实现。
4. 颜色、间距、圆角、字号统一使用 CSS 变量，禁止散落魔法值。
5. 布局优先 `flex` / `grid`，避免用绝对定位搭页面。
6. 响应式断点全项目统一，禁止每个组件自定义一套。
7. 不使用 `!important`，除非覆盖第三方组件且已注明原因。

## 性能

1. 路由和大型组件按需加载。
2. 长列表必须分页或虚拟滚动，禁止一次性渲染上千条。
3. 图片指定宽高并懒加载，避免布局抖动。
4. 输入、滚动、`resize` 等高频事件必须防抖或节流。
5. `watch` 避免滥用 `deep`，能用 `computed` 推导的不要监听。
6. 组件卸载时清理定时器、事件监听和订阅。
7. 优化前先测量，用数据说明瓶颈，禁止凭感觉重构。

## 安全

1. 禁止用 `v-html` 渲染未经净化的用户输入；确需使用时必须先做 XSS 过滤。
2. 禁止在前端代码、注释、提交信息中写入密钥、Token、内网地址。
3. 外链必须加 `rel="noopener noreferrer"`。
4. 用户输入在提交前做格式与长度校验，不能只依赖后端。
5. 敏感信息不进 URL 查询参数。
6. 前端权限判断只用于交互体验，真正的权限校验必须由后端保证。

## 质量门禁

1. 提交前必须通过 `pnpm lint` 与 `pnpm type-check`。
2. 单个文件不超过 300 行，函数不超过 50 行。
3. 不提交调试代码（`console.log`、`debugger`），确需保留时标注 `TODO` 并说明原因。
4. 不引入未经确认的第三方依赖；确需引入时说明用途和包体影响。
5. 新增公共组件、hooks、工具函数必须写清参数、返回值与异常。
6. 一次提交只做一件事，提交信息遵循 Conventional Commits。

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { env } from '@/config/env'
import { initTheme } from '@/hooks/use-theme'
import { setupI18n } from '@/plugins/i18n'
import '@/assets/styles/main.css'

// 引入配置模块时完成必填变量校验，同时同步首屏标题
document.title = env.title

const app = createApp(App)
const pinia = createPinia()

// 持久化统一由插件接管，store 通过 persist 配置声明需要落盘的字段
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

// pinia 就绪后立即接管主题，首屏 class 已由 index.html 脚本预先写入
initTheme()

// i18n 需要在路由之前安装，保证守卫与首屏渲染都能取到词条
setupI18n(app)

app.use(router)

app.mount('#app')

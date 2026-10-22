import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  {
    name: 'app/shadcn-ui-overrides',
    files: ['src/components/ui/**/*.vue'],
    rules: {
      // shadcn-vue 上游使用单字组件名，保持原样
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    name: 'app/page-entry-overrides',
    files: ['src/views/**/index.vue'],
    rules: {
      // 页面目录的 index.vue 仅作为路由入口，组件语义由路由 name 承担
      'vue/multi-word-component-names': 'off',
    },
  },

  skipFormatting,
)

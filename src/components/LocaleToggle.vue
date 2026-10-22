<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Check, Languages } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppStore } from '@/stores/app'
import type { AppLocale } from '@/config/locale'

const appStore = useAppStore()
const { t } = useI18n()

// 语言名称始终用该语言本身展示，方便用户识别
const LOCALE_OPTIONS: { value: AppLocale; labelKey: string }[] = [
  { value: 'zh-CN', labelKey: 'locale.zhCN' },
  { value: 'en-US', labelKey: 'locale.enUS' },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" :aria-label="t('locale.switch')">
        <Languages class="size-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="option in LOCALE_OPTIONS"
        :key="option.value"
        @select="appStore.setLocale(option.value)"
      >
        <span>{{ t(option.labelKey) }}</span>
        <Check v-if="appStore.locale === option.value" class="ml-auto size-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

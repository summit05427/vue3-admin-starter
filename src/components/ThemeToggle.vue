<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Monitor, Moon, Sun } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import type { ThemeMode } from '@/config/theme'

const { theme, resolvedTheme, setTheme } = useTheme()
const { t } = useI18n()

const themeOptions = computed<{ value: ThemeMode; label: string }[]>(() => [
  { value: 'light', label: t('theme.light') },
  { value: 'dark', label: t('theme.dark') },
  { value: 'system', label: t('theme.system') },
])

// system 模式显示显示器图标，其余模式显示当前实际生效的图标
const currentIcon = computed(() => {
  if (theme.value === 'system') {
    return Monitor
  }
  return resolvedTheme.value === 'dark' ? Moon : Sun
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" :aria-label="t('theme.switch')">
        <component :is="currentIcon" class="size-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-36">
      <DropdownMenuItem
        v-for="option in themeOptions"
        :key="option.value"
        @select="setTheme(option.value)"
      >
        <span>{{ option.label }}</span>
        <Check v-if="theme === option.value" class="ml-auto size-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

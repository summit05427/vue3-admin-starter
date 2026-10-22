<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'
import { cn } from '@/lib/utils'

const props = defineProps<ToasterProps>()

// 用 shadcn 的语义色变量覆盖 sonner 默认配色，保证亮暗主题下与整体风格一致
const TOASTER_STYLE: CSSProperties = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
}
</script>

<template>
  <Sonner v-bind="props" :class="cn('toaster group', props.class)" :style="TOASTER_STYLE" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { APP_NAME } from '@/config/app'

interface Props {
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

// 折叠时只展示品牌缩写：多词名称取首字母，单词名称取前两个字符
const shortName = computed(() => {
  const words = APP_NAME.trim().split(/\s+/).filter(Boolean)
  if (words.length > 1) {
    return words
      .map((word) => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }
  return APP_NAME.trim().slice(0, 2)
})
</script>

<template>
  <div class="flex h-14 shrink-0 items-center border-b border-border px-4">
    <span v-if="props.collapsed" class="mx-auto text-sm font-semibold">{{ shortName }}</span>
    <span v-else class="truncate text-sm font-semibold">{{ APP_NAME }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

// 只渲染有 titleKey 的路由记录，布局层本身不参与面包屑
const breadcrumbs = computed(() =>
  route.matched.flatMap((record) => {
    const titleKey = record.meta.titleKey
    return titleKey ? [{ path: record.path, title: t(titleKey) }] : []
  }),
)
</script>

<template>
  <nav class="flex min-w-0 items-center gap-2 text-sm" :aria-label="t('layout.breadcrumb')">
    <template v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="index > 0" class="text-muted-foreground">/</span>
      <span
        class="truncate"
        :class="index === breadcrumbs.length - 1 ? 'font-medium' : 'text-muted-foreground'"
      >
        {{ item.title }}
      </span>
    </template>
  </nav>
</template>

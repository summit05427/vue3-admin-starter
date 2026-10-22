<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppLogo from './app-logo.vue'
import { useMenu } from '@/hooks/use-menu'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { menuItems } = useMenu()
const { t } = useI18n()
</script>

<template>
  <aside
    class="hidden shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-200 md:flex"
    :class="appStore.isSidebarCollapsed ? 'w-16' : 'w-60'"
  >
    <AppLogo :collapsed="appStore.isSidebarCollapsed" />

    <nav class="flex-1 space-y-1 overflow-y-auto p-2">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        active-class="bg-sidebar-accent text-sidebar-accent-foreground"
      >
        <component :is="item.icon" v-if="item.icon" class="size-4 shrink-0" />
        <span v-if="!appStore.isSidebarCollapsed" class="truncate">{{ t(item.titleKey) }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

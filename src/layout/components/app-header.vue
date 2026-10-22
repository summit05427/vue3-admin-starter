<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Menu, PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import LocaleToggle from '@/components/LocaleToggle.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import UserMenu from '@/components/UserMenu.vue'
import AppBreadcrumb from './app-breadcrumb.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { t } = useI18n()
</script>

<template>
  <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
    <Button
      variant="ghost"
      size="icon"
      class="md:hidden"
      :aria-label="t('layout.openNav')"
      @click="appStore.openMobileNav()"
    >
      <Menu class="size-4" />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      class="hidden md:inline-flex"
      :aria-label="appStore.isSidebarCollapsed ? t('layout.expandSidebar') : t('layout.collapseSidebar')"
      @click="appStore.toggleSidebar()"
    >
      <PanelLeftOpen v-if="appStore.isSidebarCollapsed" class="size-4" />
      <PanelLeftClose v-else class="size-4" />
    </Button>

    <AppBreadcrumb />

    <div class="ml-auto flex items-center gap-2">
      <LocaleToggle />
      <ThemeToggle />
      <UserMenu />
    </div>
  </header>
</template>

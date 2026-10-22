<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useEventListener } from '@vueuse/core'
import { X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import AppLogo from './app-logo.vue'
import { useMenu } from '@/hooks/use-menu'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { menuItems } = useMenu()
const { t } = useI18n()
const route = useRoute()

// 移动端跳转后自动收起抽屉，避免遮挡新页面
watch(
  () => route.fullPath,
  () => appStore.closeMobileNav(),
)

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'Escape' && appStore.isMobileNavOpen) {
    appStore.closeMobileNav()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div v-if="appStore.isMobileNavOpen" class="fixed inset-0 z-50 md:hidden">
        <div class="absolute inset-0 bg-black/50" @click="appStore.closeMobileNav()" />

        <aside class="absolute inset-y-0 left-0 flex w-64 flex-col bg-sidebar shadow-lg">
          <div class="flex items-center gap-2 pr-2">
            <AppLogo class="flex-1" />
            <Button
              variant="ghost"
              size="icon"
              :aria-label="t('layout.closeNav')"
              @click="appStore.closeMobileNav()"
            >
              <X class="size-4" />
            </Button>
          </div>

          <nav class="flex-1 space-y-1 overflow-y-auto p-2">
            <RouterLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              active-class="bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <component :is="item.icon" v-if="item.icon" class="size-4 shrink-0" />
              <span class="truncate">{{ t(item.titleKey) }}</span>
            </RouterLink>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

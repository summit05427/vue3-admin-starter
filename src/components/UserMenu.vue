<script setup lang="ts">
import { LogOut, User } from '@lucide/vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth'
import { ROUTE_NAMES } from '@/router/constants'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const handleLogout = async (): Promise<void> => {
  // 无状态 JWT 直接丢弃本地凭证即可，不需要调用服务端
  authStore.logout()
  await router.replace({ name: ROUTE_NAMES.login })
}
</script>

<template>
  <DropdownMenu v-if="authStore.isLoggedIn">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" :aria-label="t('layout.account')">
        <User class="size-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{{ authStore.username }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @select="handleLogout">
        <LogOut class="mr-2 size-4" />
        {{ t('layout.logout') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <Button v-else variant="ghost" size="icon" as-child :aria-label="t('layout.login')">
    <RouterLink :to="{ name: ROUTE_NAMES.login }">
      <User class="size-4" />
    </RouterLink>
  </Button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APP_NAME } from '@/config/app'
import { ROUTE_NAMES } from '@/router/constants'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const form = reactive({ username: '', password: '' })
const isSubmitting = ref(false)

// 只接受站内路径，避免 redirect 被用作开放重定向
const resolveRedirect = (): string | undefined => {
  const redirect = route.query.redirect
  if (typeof redirect !== 'string' || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return undefined
  }
  return redirect
}

const handleSubmit = async (): Promise<void> => {
  const username = form.username.trim()

  if (!username || !form.password) {
    toast.error(t('login.required'))
    return
  }

  isSubmitting.value = true
  try {
    await authStore.login({ username, password: form.password })
    await router.replace(resolveRedirect() ?? { name: ROUTE_NAMES.home })
  } catch {
    // 失败提示已由请求层统一 Toast，这里只负责结束加载态
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader class="space-y-1">
      <p class="text-sm font-semibold">{{ APP_NAME }}</p>
      <CardTitle class="text-xl">{{ t('login.title') }}</CardTitle>
      <CardDescription>{{ t('login.description') }}</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <Label for="username">{{ t('login.username') }}</Label>
          <Input
            id="username"
            v-model="form.username"
            :placeholder="t('login.usernamePlaceholder')"
            autocomplete="username"
            :disabled="isSubmitting"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">{{ t('login.password') }}</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            :placeholder="t('login.passwordPlaceholder')"
            autocomplete="current-password"
            :disabled="isSubmitting"
          />
        </div>

        <Button type="submit" class="w-full" :disabled="isSubmitting">
          {{ isSubmitting ? t('login.submitting') : t('login.submit') }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>

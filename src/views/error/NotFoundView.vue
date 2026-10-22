<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ROUTE_NAMES } from '@/router/constants'

const { t } = useI18n()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('error.notFound.title') }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-sm text-muted-foreground">{{ t('error.notFound.description') }}</p>
      <Button as-child>
        <RouterLink :to="{ name: ROUTE_NAMES.home }">
          {{ t('error.notFound.backHome') }}
        </RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>

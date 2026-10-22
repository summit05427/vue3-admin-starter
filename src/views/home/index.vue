<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>首页</CardTitle>
      <CardDescription>布局与路由已接通，后续在此接入业务模块。</CardDescription>
    </CardHeader>
    <CardContent class="text-sm text-muted-foreground">
      当前为模板骨架页面，业务代码可放在 src/views/home 下继续扩展。
    </CardContent>
  </Card>
</template>

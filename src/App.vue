<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { useTheme } from '@/hooks/use-theme'
import { useDocumentTitle } from '@/hooks/use-document-title'

const { resolvedTheme } = useTheme()

useDocumentTitle()
</script>

<template>
  <!-- 根组件只负责路由出口，页面外壳由路由绑定的布局组件承载 -->
  <RouterView />
  <!-- 全局消息出口，主题跟随当前解析结果 -->
  <Toaster :theme="resolvedTheme" position="top-center" rich-colors close-button />
</template>

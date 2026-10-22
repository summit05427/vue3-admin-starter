<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/app-header.vue'
import AppSidebar from './components/app-sidebar.vue'
import MobileNav from './components/mobile-nav.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground">
    <AppSidebar />
    <MobileNav />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

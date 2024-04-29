<script setup lang="ts">
import { CalendarEvent, ChartPie, Menu2, Notebook } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
</script>

<template>
  <div class="flex flex-col home">
    <div class="flex-1 overflow-auto">
      <router-view
        v-slot="{ Component }"
      >
        <keep-alive>
          <component
            :is="Component"
          />
        </keep-alive>
      </router-view>
    </div>
    <footer class="flex justify-between">
      <theme-icons :component="Notebook"/>
      <theme-icons :component="CalendarEvent"/>
      <theme-icons :component="ChartPie"/>
      <theme-icons :component="Menu2"/>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  //padding: 0 16px;
  overflow: hidden;
}

header {
  gap: 16px;
}

footer {
  padding: 8px 16px calc(env(safe-area-inset-bottom) + 8px);
  //padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  //padding-top: 8px;
}

.n-icon {
  font-size: 26px;
}

.header-icon-layout {
  font-size: 20px;
}

.n-breadcrumb-item {
  font-size: 15px;
}

.n-tree {
  font-size: 15px;
}

:deep(.n-breadcrumb-item__link) {
  color: rgb(118, 124, 130) !important;
  padding: 0!important;
}

:deep(.n-breadcrumb-item__separator) {
  margin: 0 6px!important;
}

.menu-drawer {
  .menu-drawer-header {
    h1 {
      font-size: 18px;
      font-weight: bold;
    }
    .menu-drawer-header-text {
      padding-top: 2px;
      font-size: 13px;
    }
  }
}

:deep(.n-drawer-body-content-wrapper) {
  display: flex;
  flex-direction: column;
}

:deep(.n-tree-node-switcher) {
  width: auto !important;
}
</style>

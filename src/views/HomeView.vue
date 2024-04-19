<script setup lang="ts">
import { ChevronLeft, ChevronRight, CirclePlus, BallBowling, Menu2, LayoutSidebarRight, Dots } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
import { ref } from 'vue'
const handleBack = () => {

}

const LeftMenuActive = ref(false)

const openLeftMenu = () => {
  console.log('openLeftMenu')
  LeftMenuActive.value = true
}
</script>

<template>
  <div class="flex flex-col home">
    <header class="flex items-center">
      <theme-icons
        :component="LayoutSidebarRight"
        class="header-icon-layout"
        @click="openLeftMenu"
      />
      <n-breadcrumb class="flex-1 text-center overflow-hidden">
        <n-breadcrumb-item>Journal</n-breadcrumb-item>
        <n-breadcrumb-item>2024</n-breadcrumb-item>
        <n-breadcrumb-item>W19</n-breadcrumb-item>
        <n-breadcrumb-item>2024-04-18424244242423</n-breadcrumb-item>
      </n-breadcrumb>
      <theme-icons :component="Dots"/>
    </header>
    <main class="flex-1">
      主体
      <n-button>Default</n-button>
    </main>
    <footer class="flex justify-around pb-4">
      <theme-icons :component="ChevronLeft"/>
      <theme-icons :component="ChevronRight"/>
      <theme-icons :component="CirclePlus"/>
      <theme-icons :component="BallBowling"/>
      <theme-icons :component="Menu2"/>
    </footer>
  </div>
  <n-drawer
    v-model:show="LeftMenuActive"
    width="85vw"
    placement="left"
  >
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.home {
  height: 100%;

}

header {
  gap: 16px;
  padding: 4px 8px;
}

.n-icon {
  font-size: 24px;
}

.header-icon-layout {
  font-size: 20px;
}

.n-breadcrumb-item {
  font-size: 14px;
}

:deep(.n-breadcrumb-item__link) {
  color: rgb(118, 124, 130) !important;
  padding: 0!important;
}

:deep(.n-breadcrumb-item__separator) {
  margin: 0 6px!important;
}




</style>

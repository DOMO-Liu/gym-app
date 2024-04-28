<script setup lang="ts">
import { CalendarEvent, ChevronRight, ChartPie, Menu2, Notebook } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
import { ref, h } from 'vue'
import type { TreeOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { repeat } from 'seemly'
import NoteView from '@/views/NoteView.vue'

const LeftMenuActive = ref(false)

const openLeftMenu = () => {
  LeftMenuActive.value = true
}

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return '日记'
  if (level === 3) return '2024'
  if (level === 2) return 'W40'
  if (level === 1) return '2024-04-19'
  return ''
}

const menuDrawerTree = ref(createData())

const onNodeClick = (info: { option: TreeOption }) => {
  console.log('info.option', info.option)

  if (info.option.children?.length) {
    return 'toggleExpand'
  }
  return 'default'
}
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
  padding: 0 16px;
  overflow: hidden;
}

header {
  gap: 16px;
}

footer {
  //position: fixed;
  bottom: 0;
  left: 16px;
  right: 16px;
  background: #ffffff;
  //padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  padding-top: 8px;
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

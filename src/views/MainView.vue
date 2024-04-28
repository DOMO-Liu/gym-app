<script setup lang="ts">
import { CalendarEvent, ChevronRight, ChartPie, Menu2, Notebook } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
import { ref, h } from 'vue'
import type { TreeOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { repeat } from 'seemly'
import NoteView from '@/views/NoteView.vue'
import weather from '@/assets/images/weather.png'

const LeftMenuActive = ref(false)

const openLeftMenu = () => {
  console.log('openLeftMenu')
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

const renderSwitcherIcon= () => {
  return h(NIcon, { width: 'auto' }, { default: () => h(ChevronRight) })
}
</script>

<template>
  <div class="flex flex-col home">
    <header class="flex items-center">
      <theme-icons
        :component="Menu2"
        @click="openLeftMenu"
      />
      <n-breadcrumb class="flex-1 text-center overflow-hidden">
        <n-breadcrumb-item>2024</n-breadcrumb-item>
        <n-breadcrumb-item>W19</n-breadcrumb-item>
        <n-breadcrumb-item>2024-04-18</n-breadcrumb-item>
      </n-breadcrumb>
      <n-avatar
        round
        size="medium"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </header>
    <main class="flex-1">
      <n-button color="#333638" text-color="#FFFFFF">
        Tertiary
      </n-button>
      <n-image :src="weather" />
      <NoteView />
    </main>
    <footer class="flex justify-between pb-4">
      <theme-icons :component="Notebook"/>
      <theme-icons :component="CalendarEvent"/>
      <theme-icons :component="ChartPie"/>
      <theme-icons :component="Menu2"/>
    </footer>
  </div>
  <n-drawer
    to="main"
    v-model:show="LeftMenuActive"
    width="85vw"
    placement="left"
  >
    <n-drawer-content body-class="menu-drawer">
      <div class="menu-drawer-header">
        <h1>
          刘威
        </h1>
        <div class="menu-drawer-header-text">
          128个文件，24个文件夹
        </div>
      </div>

      <div class="flex-1">
        <n-tree
          show-line
          block-node
          check-strategy="child"
          :data="menuDrawerTree"
          expand-on-click
          :cancelable="false"
          :render-switcher-icon="renderSwitcherIcon"
          :override-default-node-click-behavior="onNodeClick"
        />
      </div>
      <div>
        底部
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  padding: 4px 16px;
}

header {
  gap: 16px;
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

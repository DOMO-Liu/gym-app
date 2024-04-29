<script setup lang="ts">
import { CalendarEvent, ChartPie, Menu2, Notebook } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
import { ref } from 'vue'

const tabIndex = ref(0)

const tabList =  [
  {
    component: Notebook,
    text: '首页'
  },
  {
    component: CalendarEvent,
    text: '日历'
  },
  {
    component: ChartPie,
    text: '统计'
  },
  {
    component: Menu2,
    text: '我的'
  },
]

const onClickTab = (index: number) => {
  tabIndex.value = index
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
      <theme-icons
        @click="onClickTab(index)"
        v-for="(item, index) in tabList"
        :component="item.component"
        :key="`tab${index}`"
        :color="tabIndex === index ? '#9c15ad' : '#767c82'"
      />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  overflow: hidden;
}

footer {
  padding: 8px 16px calc(env(safe-area-inset-bottom) + 8px);
  box-shadow: 0 0 0 1px rgb(211 207 213 / 20%);
}

.n-icon {
  font-size: 26px;
}
</style>

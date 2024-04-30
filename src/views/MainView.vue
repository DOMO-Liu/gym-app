<script setup lang="ts">
import { CalendarEvent, ChartPie, Notebook } from '@vicons/tabler'
import ThemeIcons from '@/components/icons/ThemeIcons.vue'
import HomeView from '@/views/Home/HomeView.vue'
import CalendarView from '@/views/Calendar/CalendarView.vue'
import MyView from '@/views/My/MyView.vue'
import StatisticsView from '@/views/Statistics/StatisticsView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tabIndex = ref(0)

const tabList =  [
  {
    component: HomeView,
    tabIcon: Notebook,
    text: '首页',
    path: '/'
  },
  {
    component: CalendarView,
    tabIcon: CalendarEvent,
    text: '日历',
    path: '/calendar'
  },
  {
    component: StatisticsView,
    tabIcon: ChartPie,
    text: '统计',
    path: '/statistics',
  },
  {
    component: MyView,
    tabIcon: ChartPie,
    text: '我的',
    path: '/my'
  },
]

const router = useRouter()

const onClickTab = (path: string, index: number) => {
  if (tabIndex.value !== index) {
    tabIndex.value = index
    // router.pu
    router.push(path)
  }
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



<!--    <keep-alive>-->
<!--    <n-tabs-->
<!--      class="flex-1 overflow-hidden"-->
<!--      type="line"-->
<!--      animated-->
<!--      placement="bottom"-->
<!--      justify-content="space-evenly"-->
<!--      :bar-width="0"-->
<!--    >-->
<!--      <n-tab-pane-->
<!--        v-for="(item, index) in tabList"-->
<!--        :key="`tab${index}`"-->
<!--        :name="index"-->
<!--      >-->
<!--        <template #tab>-->
<!--          <theme-icons-->
<!--            class="tab-item"-->
<!--            @click="onClickTab(index)"-->
<!--            :component="item.tabIcon"-->
<!--            :color="tabIndex === index ? '#9c15ad' : '#767c82'"-->
<!--          />-->
<!--        </template>-->

<!--          <component :is="item.component" />-->

<!--      </n-tab-pane>-->
<!--    </n-tabs>-->
<!--    </keep-alive>-->

    <footer class="flex justify-between">
      <theme-icons
        class="tab-item"
        @click="onClickTab(item.path, index)"
        v-for="(item, index) in tabList"
        :component="item.tabIcon"
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
  padding: 8px 0 calc(env(safe-area-inset-bottom) + 8px);
  box-shadow: 0 0 0 1px rgb(211 207 213 / 20%);
}

.tab-item {
  font-size: 26px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.n-tabs-wrapper) {
  .n-tabs-tab-wrapper, .n-tabs-tab, .n-tabs-tab__label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

:deep(.n-tabs-pane-wrapper) {
  flex: 1;
  .n-tab-pane {
    height: 100%;
    padding-bottom: 0;
  }
}
</style>

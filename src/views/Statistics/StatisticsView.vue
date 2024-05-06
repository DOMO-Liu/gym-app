<script setup lang="ts">
import { addDays, isToday } from 'date-fns/esm'
import { ref } from 'vue'
import { useFormHook } from '@/hook/use-form-hook'
import ChartLine from '@/views/Statistics/components/ChartLine.vue'
import ChartBar from '@/views/Statistics/components/ChartBar.vue'
import ChartCalendar from '@/views/Statistics/components/ChartCalendar.vue'

const calendarValue = ref(addDays(Date.now(), 1).valueOf())

const isDateDisabled = (timestamp: number) => {
  if (isToday(timestamp)) {
    return false
  }
  return true
}

const { formList: okrList } = useFormHook()

const okrData = ref<Recordable>({

})

const calendarDistance = ref(0)

const calendarActive = [
  '2024-4-1',
  '2024-4-2',
  '2024-4-3',
  '2024-4-4',
  '2024-4-8',
  '2024-4-9',
  '2024-4-10',
  '2024-4-21',
  '2024-4-28',
]
</script>

<template>
  <div class="statistics-main">
    <n-calendar
      v-model:value="calendarValue"
    >
      <template #default="{ year, month, date }">
        <div
          class="calendar-date"
          :class="{
          'calendar-date-active': calendarActive.includes(`${year}-${month}-${date}`)
        }"
        >
          {{ date }}
        </div>
      </template>
      <template #header="{ year, month }">
        <div class="statistics-item-header">
          {{ `${year}年${month}月` }}
        </div>
        <div class="calendar-header-tips">
          本月记录天数: {{ calendarActive.length }}天
        </div>

      </template>
    </n-calendar>

    <div class="statistics-item">
      <h1 class="statistics-item-header">
        Journal List
      </h1>
      <template
        v-for="(item, index) in calendarActive"
        :key="item"
      >
        <n-button class="journal-item" type="primary" text>
          {{ item }}
        </n-button>
        <span v-if="index !== calendarActive.length - 1">,</span>
      </template>
    </div>
    <div class="statistics-item">
      <h1 class="statistics-item-header">
        OKR
      </h1>
      <template
        v-for="item in okrList.filter(item => item.type === 'select')"
        :key="item"
      >
        <div class="okr-item">
          {{ item.icon }}{{ item.text}}
        </div>
        <div>
          {{ okrData[item.id] || 0 }}%
        </div>
      </template>
    </div>
    <div class="statistics-item">
      <h1 class="statistics-item-header">
        Statistics
      </h1>
      <ChartLine />
      <ChartBar />
      <ChartCalendar />
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics-main {
  padding: 62px 16px 12px;
}

.calendar-header-tips {
  font-size: 14px;
  font-weight: bold;
  color: var(--color-text);
}

.statistics-item {
  margin-bottom: 10px;
}

.statistics-item-header {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
  color: var(--color-text);
}

.n-calendar {
  height: auto;
  padding: 20px 0 10px;
  margin: 10px;
  border-radius: 6px;
  box-shadow: 0 0 2px 1px rgba(149, 145, 150, 0.2);
  :deep(.n-calendar-header) {
    position: absolute;
    top: 0;
    padding: 12px 16px 5px;
    right: 0;
    left: 0;
    z-index: 99;
    background: var(--color-background);
  }
  :deep(.n-calendar-dates) {
    border: none;
    grid-auto-rows: 30px;
    .n-calendar-cell {
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: none;
      }
    }
    .n-calendar-cell__bar {
      background: none;
    }
    .n-calendar-date__date {
      display: none;
    }

    .n-calendar-date__day {
      position: absolute;
      width: max-content;
      top: -22px;
    }
  }
}

.calendar-date {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-date-active {
  background: rgb(126 21 173 / 70%);
  color: #ffffff;
}

.journal-item {
  border-bottom: 1px solid;
}

.okr-item {
  letter-spacing: 4px;
  font-size: 14px;
}
</style>

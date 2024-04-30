<script setup lang="ts">
import { RouterView } from 'vue-router'
import { darkTheme, useOsTheme, zhCN, dateZhCN  } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/counter'

const osTheme = useOsTheme()

const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
const  { getPrimaryColorAlpha } = useThemeStore()

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: getPrimaryColorAlpha(),
    baseColor: getPrimaryColorAlpha(),
    primaryColorHover: getPrimaryColorAlpha(),
  },
  // Button: {
  //   textColor: '#FF0000'
  // },
  // Icon: {
  //   color: '#9c15ad',
  // },
}
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <RouterView />
  </n-config-provider>
</template>

<style scoped>
</style>

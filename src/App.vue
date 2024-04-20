<script setup lang="ts">
import { RouterView } from 'vue-router'
import { darkTheme, useOsTheme,  } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { computed } from 'vue'

const osTheme = useOsTheme()

const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#9c15ad',
    baseColor: '#9c15ad',
    primaryColorHover: '#9c15ad',
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
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<style scoped>
.n-config-provider {
  height: 100%;
}
</style>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  component: Component
}

const props = defineProps<Props>()
</script>

<template>
  <n-icon :component="component" color="#9c15ad">
  </n-icon>
</template>

<style scoped>

</style>

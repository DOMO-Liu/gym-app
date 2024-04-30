<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  component: Component
  color?: string
}


const props = withDefaults(defineProps<Props>(), {
  color: '#9c15ad',
})
</script>

<template>
  <n-icon :component="component" :color="color" />
</template>

<style scoped>

</style>

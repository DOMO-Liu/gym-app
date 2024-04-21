<template>
  <h1 class="note-title note-item-padding">
    2024-04-20
  </h1>
  <h1 class="note-title note-item-padding">
    Info
  </h1>
  <h1 class="note-title note-item-padding">
    OKR Tracker
  </h1>
  <FormView />
  <h1 class="note-title note-item-padding">
    Notes
  </h1>
</template>

<script lang="ts" setup>
import FormView from '@/views/FormView.vue'
</script>

<style scoped lang="scss">
.note-title {
  font-size: 24px;
  font-weight: bold;
}

.note-item-padding {
  padding-top: 18px;
}
</style>

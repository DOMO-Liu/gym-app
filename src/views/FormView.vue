<script setup lang="ts">
import { ref } from 'vue'
import { useFormHook } from '@/hook/use-form-hook'

interface ModelType {
  age: string | null
  password: string | null
  reenteredPassword: string | null
}

const model = ref<ModelType>({
  age: null,
  password: null,
  reenteredPassword: null
})

const { formList } = useFormHook()

navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude, longitude, position)

  // 在这里调用获取天气数据的函数
  // getWeatherData(latitude, longitude);
});

</script>

<template>
  <n-form
    class="note-item-padding"
    ref="formRef"
    :model="model"
    :show-feedback="false"
    label-placement="left"
  >
    <n-form-item
      v-for="item in formList"
      :key="item.id"
      :path="item.id"
      size="small"
    >
      <template v-slot:label>
        {{item.icon}}{{item.text}}:
      </template>
      <n-input
        placeholder=""
      />
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">
:deep(.n-input__border) {
  border: none;
}
</style>

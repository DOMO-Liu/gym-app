<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { type FormListItem } from '@/hook/use-form-hook'
import { useDateRef } from '@/hook/use-data-ref'

// interface ModelType {
//   age: string | null
//   password: string | null
//   reenteredPassword: string | null
// }
//
// const model = ref<ModelType>({
//   age: null,
//   password: null,
//   reenteredPassword: null
// })

interface Props {
  formList: FormListItem[]
  formData: Recordable
}

const props = defineProps<Props>()

// const { formList, formData } = useFormHook()

const [state] = useDateRef(props, 'formData', 'update:modelValue')

navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude, longitude, position)

  // 在这里调用获取天气数据的函数
  // getWeatherData(latitude, longitude);
});

const focusIndex: Ref<null | number> = ref(null)

const  onInputFocus = (index: number) => {
  focusIndex.value = index
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="state"
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
        <div class="note-item-label">
          <span>
            {{item.icon}}
          </span>
          {{item.text}}
          <n-divider vertical />
        </div>

      </template>
      <n-select
        v-model:value="state[item.id]"
        :options="item.options"
        :placeholder="item.placeholder"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">
:deep(.n-input__border) {
  border: none;
}

.n-form-item {
  border: 1px solid rgb(171 179 186 / 67%);
  padding: 10px;
  border-radius: 4px;
  margin: 8px 0;
}

:deep(.n-base-selection__border) {
  border: none;
}

:deep(.n-base-selection__state-border) {
  border: none !important;
  box-shadow: none !important;
}
.note-item-label {
  letter-spacing: 4px;
}
</style>

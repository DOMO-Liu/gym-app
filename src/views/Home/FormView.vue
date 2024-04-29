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

const [state] = useDateRef(props, 'formData', 'update:modelValue')

const focusIndex: Ref<string> = ref('')

const  onInputFocus = (index: string) => {
  focusIndex.value = index
  console.log('onInputFocus', focusIndex.value)
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
      <template v-if="item.type === 'input'">
        <n-input
          v-model:value="state[item.id]"
          :placeholder="focusIndex === item.id ? item.placeholder : ''"
          :data-id="item.id"
          @focus="onInputFocus(item.id)"
          @blur="focusIndex = ''"
        />
      </template>
      <template v-if="item.type === 'select'">
        <n-select
          v-model:value="state[item.id]"
          :options="item.options"
          :placeholder="focusIndex === item.id ? item.placeholder : ''"
          :show-arrow="false"
          @focus="onInputFocus(item.id)"
          @blur="focusIndex = ''"
          clearable
        />
      </template>

    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">
:deep(.n-input) {
  --n-color: transparent !important;
}

:deep(.n-base-selection-label) {
  background-color: transparent !important;
}

:deep(.n-input__border) {
  border: none !important;
}

:deep(.n-input__state-border) {
  border: none !important;
}

.n-form {
  padding: 0 4px;
}

.n-form-item {
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

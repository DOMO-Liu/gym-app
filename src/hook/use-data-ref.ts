import type { Ref, UnwrapRef } from 'vue'
import { computed, getCurrentInstance, nextTick, reactive, readonly, toRaw, unref, watchEffect } from 'vue'


// export const onReadonly = (schema: FormSchema, operationType: string) => {
//   return schema.readonly ||
//     schema.disabled ||
//     operationType === 'view' ||
//     (operationType === 'edit' && schema.unchangeable)
// }

// export function useDateRef<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(
//   props: T,
//   key?: K,
//   changeEvent?: any,
//   emitData?: Ref<any[]>
// ): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>];

export function useDateRef<T extends Recordable>(props: T, key: keyof T = 'value', changeEvent = 'change', emitData?: Ref<any[]>) {
  const instance = getCurrentInstance()
  const emit = instance?.emit

  const innerState = reactive({
    value: props[key]
  })

  const defaultState = readonly(innerState)

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  watchEffect(() => {
    innerState.value = props[key]
  })

  const state: any = computed({
    get() {
      return innerState.value
    },
    set(value) {
      innerState.value = value as T[keyof T]
      nextTick(() => {
        emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []))
      })
    }
  })

  return [state, setState, defaultState]
}

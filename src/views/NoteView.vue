<template>
  <h1 class="note-title note-item-padding">
    2024-04-20
  </h1>
  <div class="note-item-padding note-summarize overflow-hidden">
    <div
      v-for="(item, index) in summarizeList"
      :key="'button' + item.value"
      class="overflow-hidden"
      :class="{
        'flex-1' : index === summarizeList.length - 1,
      }"
    >
      <n-button
        strong
        secondary
        round
        :type="formData[item.value] ? 'primary' : 'tertiary'"
        @click="chooseSummarize(index)"
        style="max-width: 100%"
      >
        <n-ellipsis style="max-width: 100%">
          {{ formData[item.chooseLabel] || item.label }}
        </n-ellipsis>
      </n-button>
    </div>
  </div>
  <h1 class="note-title note-item-padding">
    OKR Tracker
  </h1>
  <FormView
    :form-data="formData"
    :form-list="formList"
  />
  <h1 class="note-title note-item-padding">
    Notes
  </h1>


  <n-auto-complete
    v-model:value="noteValue"
    :options="appendOptions"
    :append="true"
    :get-show="getShow"
  >
    <template
      #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
    >
      <n-input
        type="textarea"
        :placeholder="notePlaceholder"
        :value="slotValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :autosize="{
        minRows: 3
      }"
      />
    </template>
  </n-auto-complete>
  <n-drawer
    v-model:show="bottomMenuActive"
    placement="bottom"
  >
    <n-drawer-content
      closable
      title="早上好，DOMO"
      :style="{
        '--d-color-4': getPrimaryColorAlpha(0.4),
        '--d-color': getPrimaryColorAlpha()
      }"
    >
      <n-carousel
        show-arrow
        :loop="false"
        ref="carouselRef"
      >
        <div
          class="menu-drawer-content"
          v-for="(item) in summarizeList"
          :key="item.value"
        >
          <h1>
            {{ item.describe }}
          </h1>

          <div class="drawer-options">
            <n-input
              v-model:value="formData[item.value]"
              v-if="item.type === 'input'"
            />
            <template v-else>
              <div
                v-for="option in item.options"
                :key="option.value"
                class="drawer-option"
                :class="{
                  'drawer-option-choose': formData[item.value] === option.value
                }"
                @click="onClickSummarizeResult(item, option)"
              >
                <n-image
                  v-if="option.img"
                  preview-disabled
                  :src="option.img"
                  object-fit="cover"
                />
                <div v-else>
                {{ option.label }}
              </div>
              </div>
            </template>
          </div>
        </div>
        <template #arrow="{ prev, next, currentIndex, total }">
          <div class="custom-arrow">
            <div>
              <button
                v-show="currentIndex !== 0"
                type="button"
                class="custom-arrow--left"
                @click="prev"
              >
                <n-icon><ArrowBack /></n-icon>
              </button>
            </div>
            <div>
              <button
                v-show="currentIndex !== total - 1"
                type="button"
                class="custom-arrow--right"
                @click="next"
              >
                <n-icon><ArrowForward /></n-icon>
              </button>
            </div>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>

    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import FormView from '@/views/FormView.vue'
import { computed, nextTick, ref } from 'vue'
import { ArrowBack, ArrowForward } from '@vicons/tabler'
import { useThemeStore } from '@/stores/counter'
import weatherCloudy from '@/assets/images/weather_cloudy.png'
import weatherRain from '@/assets/images/weather_rain.png'
import weatherDrizzle from '@/assets/images/weather_drizzle.png'
import weatherSnow from '@/assets/images/weather_snow.png'
import weatherSunny from '@/assets/images/weather_sunny.png'
import { useFormHook } from '@/hook/use-form-hook'

const  { getPrimaryColorAlpha } = useThemeStore()
const carouselIndex = ref(0)

const bottomMenuActive = ref(false)

const { formList, formData } = useFormHook()


const noteValue = ref('')

const notePlaceholder = `你可以在这里记录任何事情
比如你的今日饮食、运动情况
或者记录你今天阅读的书籍`


const getShow = (value: string) => {
  return value.endsWith('# ');
}

const appendOptions = computed(() => {
  return formList.map((suffix) => {
    return {
      label: suffix.text,
      value: suffix.id,
    }
  })
})

interface SummarizeOption {
  value: string,
  label: string,
  img?: string,
}

interface SummarizeList {
  label: string
  value: string
  describe: string
  chooseLabel: string
  type: 'select' | 'describe' | 'input'
  options?: SummarizeOption[]
}

const summarizeList: SummarizeList[] = [
  {
    label: '天气',
    value: 'weather',
    chooseLabel: 'weatherLabel',
    describe: '不知道你那天气如何？',
    type: 'select',
    options: [
      {
        value: 'sunny',
        label: '晴天',
        img: weatherSunny,
      },
      {
        value: 'cloudy',
        label: '多云',
        img: weatherCloudy,
      },
      {
        value: 'drizzle',
        label: '下雨',
        img: weatherDrizzle,
      },
      {
        value: 'rain',
        label: '雷雨',
        img: weatherRain,
      },
      {
        value: 'snow',
        label: '下雪',
        img: weatherSnow,
      },
    ]
  },
  {
    label: '心情',
    value: 'mood',
    chooseLabel: 'moodLabel',
    describe: '这一天的心情怎样的呢？',
    type: 'describe',
    options: [
      {
        value: 'happy',
        label: '开心',
      },
      {
        value: 'full',
        label: '充实',
      },
      {
        value: 'calm',
        label: '平静',
      },
      {
        value: 'weary',
        label: '疲惫',
      },
      {
        value: 'bad',
        label: '难过',
      },
    ]
  },
  {
    label: '位置',
    chooseLabel: 'location',
    value: 'location',
    describe: '你此刻在何处？',
    type: 'input',
  },
]

const carouselRef = ref()

const chooseSummarize = (index: number) => {
  carouselIndex.value = index
  bottomMenuActive.value = true
  nextTick(() => {
    carouselRef.value?.to(carouselIndex.value)
  })
}

const onClickSummarizeResult = (data: SummarizeList, option: SummarizeOption) => {
  formData.value[data.value] = option.value
  formData.value[data.chooseLabel] = option.label
}
</script>

<style scoped lang="scss">
.note-title {
  font-size: 24px;
  font-weight: bold;
}

.note-summarize {
  display: flex;
  gap: 16px;
}

.menu-drawer-content {
  font-weight: bold;
  padding: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
}


.drawer-options {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  flex: 1;
  align-items: center;
  .drawer-option {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 0 2px rgb(211 207 213 / 20%);
    border-radius: 6px;
  }

  .drawer-option-choose {
    background: #000000;
    color: #ffffff;
  }
}

.note-item-padding {
  padding-top: 18px;
}

.custom-arrow {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  //color: #fff;
  background-color: var(--n-color-4);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0px);
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: var(--d-color-4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background-color: var(--d-color);
}

:deep(.n-base-close:not(.n-base-close--disabled):hover::before ) {
  background: transparent;
}

.n-input {
  background: transparent !important;
  :deep(.n-input-wrapper) {
    padding: 0;
  }
}
:deep(.n-input__border) {
  border: none !important;
}
:deep(.n-input__state-border) {
  border: none !important;
  box-shadow: none !important;
}
</style>

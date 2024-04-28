<template>
  <h1 class="note-title note-item-padding">
    2024-04-20
  </h1>
  <h1 class="note-item-padding note-summarize">
    <n-button
      strong
      secondary
      round
      type="primary"
      @click="onClickWeather"
    >
      天气
    </n-button>
    <n-button
      strong
      secondary
      round
      type="primary"
      @click="onClickWeather"
    >
      心情
    </n-button>
    <n-button
      strong
      secondary
      round
      type="primary"
      @click="onClickWeather"
    >
      位置
    </n-button>
  </h1>
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

  <n-drawer
    to="main"
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
        :default-index="carouselIndex"
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
              v-if="item.type === 'input'"
            />
            <template v-else>
              <div
                v-for="option in item.options"
                :key="option.value"
                class="drawer-option"
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
                v-show="currentIndex !== total"
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
import { ref } from 'vue'
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

interface SummarizeOption {
  value: string,
  label: string,
  img?: string,
}

interface SummarizeList {
  label: string
  value: string
  describe: string
  type: 'select' | 'describe' | 'input'
  options?: SummarizeOption[]
}

const summarizeList: SummarizeList[] = [
  {
    label: '天气',
    value: 'weather',
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
    value: 'location',
    describe: '你此刻在何处？',
    type: 'input',
  },
]

const onClickWeather = () => {
  bottomMenuActive.value = true
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
}


.drawer-options {
  padding: 20px 0 0 0;
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
</style>

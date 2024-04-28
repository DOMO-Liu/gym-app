import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('counter', () => {
  const primaryColor = ref('126, 21, 173')

  const getPrimaryColorAlpha = (alpha = 1) => {
    return `rgba(${primaryColor.value}, ${alpha})`
  }

  return { primaryColor, getPrimaryColorAlpha }
})

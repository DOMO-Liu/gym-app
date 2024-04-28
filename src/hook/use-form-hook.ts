import { reactive } from 'vue'
interface FormListItem {
  icon: string
  id: string
  text: string
  type: string
  placeholder: string
  options?: Recordable[]
}

const numOptions: SelectOption[] = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
]

export function useFormHook() {
  const formList: FormListItem[] = [
    {
      icon: '😴',
      id: 'sleep',
      text: '睡眠',
      type: 'input',
      placeholder: '请记录睡眠质量',
      options: numOptions,
    },
    {
      icon: '🍎',
      id: 'healthyEating',
      text: '饮食',
      type: 'input',
      placeholder: '请记录饮食得分',
      options: numOptions,
    },
    {
      icon: '😆',
      id: 'mood',
      text: '心情',
      type: 'input',
      placeholder: '请记录今日心情',
      options: numOptions,
    },
    {
      icon: '🏃',
      id: 'exercise',
      text: '运动',
      type: 'select',
      placeholder: '请记录运动时长',
      options: numOptions,
    },
    {
      icon: '🌟',
      id: 'bodyWeight',
      text: '体重',
      type: 'input',
      placeholder: '请记录今日体重',
      options: numOptions,
    },
    {
      icon: '📖',
      id: 'Reading',
      text: '阅读',
      type: 'input',
      placeholder: '请记录阅读时长',
      options: numOptions,
    },
    {
      icon: '🎵',
      id: 'music',
      text: '音乐',
      type: 'input',
      placeholder: '请记录音乐时长',
      options: numOptions,
    },
  ]

  const formData: Record<string, any> = reactive({})

  return {
    formList,
    formData,
  }
}

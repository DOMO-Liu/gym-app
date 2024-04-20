interface FormListItem {
  icon: string
  id: string
  text: string
  type: string
}

export function useFormHook() {
  const formList: FormListItem[] = [
    {
      icon: '😴',
      id: 'sleep',
      text: 'Sleep',
      type: 'input',
    },
    {
      icon: '🍎',
      id: 'healthyEating',
      text: 'Healthy Eating',
      type: 'input',
    },
    {
      icon: '😆',
      id: 'mood',
      text: 'Mood',
      type: 'input',
    },
    {
      icon: '🏃',
      id: 'exercise',
      text: 'Exercise',
      type: 'select',
    },
    {
      icon: '⏰',
      id: 'exerciseTime',
      text: 'Exercise Time',
      type: 'input',
    },
    {
      icon: '🌟',
      id: 'bodyWeight',
      text: 'Body Weight',
      type: 'input',
    },
    {
      icon: '📖',
      id: 'Reading',
      text: 'Reading',
      type: 'input',
    },
    {
      icon: '🎵',
      id: 'music',
      text: 'Music',
      type: 'input',
    },
  ]

  return {
    formList,
  }
}

export const routes = [
  {
    path: '/',
    name: 'main',
    component:() => import('@/views/MainView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home/HomeView.vue'),
        name: 'home',
        meta: {
          keepAlive: true,
        },
      },
      {
        path: 'calendar',
        component: () => import('@/views/Calendar/CalendarView.vue'),
        name: 'calendar',
        meta: {
          keepAlive: true,
        },
      },
      {
        path: 'statistics',
        component: () => import('@/views/Statistics/StatisticsView.vue'),
        name: 'statistics',
        meta: {
          keepAlive: true,
        },
      },
      {
        path: 'my',
        component: () => import('@/views/My/MyView.vue'),
        name: 'my',
        meta: {
          keepAlive: true,
        },
      }
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
]

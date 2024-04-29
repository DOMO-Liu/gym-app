export const routes = [
  {
    path: '/',
    name: 'home',
    component:() => import('@/views/MainView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home/HomeView.vue'),
        name: 'index',
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

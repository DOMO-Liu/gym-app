export const routes = [
  {
    path: '/',
    name: 'home',
    component:() => import('@/views/MainView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
]

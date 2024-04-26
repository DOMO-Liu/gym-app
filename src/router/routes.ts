export const routes = [
  {
    path: '/',
    name: 'home',
    component:() => import('@/views/HomeView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
]

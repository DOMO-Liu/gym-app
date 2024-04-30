import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  // console.log('router.beforeEach', to, from)
  next()
})

router.afterEach((to, from) => {
  // console.log('router.afterEach', to, from)
})

export default router

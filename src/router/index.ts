import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
const routes = [
  { path: '/', name: 'Home', component: Home },
  // outras rotas / fallback…
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})
export default router


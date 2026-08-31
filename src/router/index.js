import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SkillsView from '../views/SkillsView.vue'
import LinksView from '../views/LinksView.vue'
import MusicView from '../views/MusicView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/skills', name: 'Skills', component: SkillsView },
  { path: '/music', name: 'Music', component: MusicView },
  { path: '/links', name: 'Links', component: LinksView },
  
  // Catch-all route for unmatched paths (404)
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Send pageview analytics to Google Analytics on every route change
router.afterEach((to) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-R705MEEKH3', {
      page_path: to.fullPath,
    })
  }
})

export default router
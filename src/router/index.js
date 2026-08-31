import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SkillsView from '../views/SkillsView.vue'
import LinksView from '../views/LinksView.vue'
import MusicView from '../views/MusicView.vue'
import VRChatGalleryView from '../views/VRChatGalleryView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: { title: 'Lyra Foxwood - Main Website' }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: { title: 'About - Lyra Foxwood' }
  },
  { 
    path: '/skills', 
    name: 'Skills', 
    component: SkillsView,
    meta: { title: 'Skills & Certifications - Lyra Foxwood' }
  },
  { 
    path: '/music', 
    name: 'Music', 
    component: MusicView,
    meta: { title: 'Music Hub - Lyra Foxwood' }
  },
  { 
    path: '/links', 
    name: 'Links', 
    component: LinksView,
    meta: { title: 'Links & Socials - Lyra Foxwood' }
  },
  { 
    path: '/gallery', 
    name: 'Gallery', 
    component: VRChatGalleryView,
    meta: { title: 'VRC Gallery - Lyra Foxwood' }
  },

  // Catch-all route (MUST be last)
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFoundView,
    meta: { title: '404 Page Not Found - Lyra Foxwood' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Automatically update document title on route navigation
router.afterEach((to) => {
  document.title = to.meta.title || 'Lyra Foxwood'
})

export default router
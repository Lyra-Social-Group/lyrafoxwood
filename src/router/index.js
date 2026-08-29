import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SkillsView from '../views/SkillsView.vue'
import LinksView from '../views/LinksView.vue'
import MusicView from '../views/MusicView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/skills', name: 'Skills', component: SkillsView },
  { path: '/links', name: 'Links', component: LinksView },
  { path: '/music', name: 'Music', component: MusicView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
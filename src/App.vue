<template>
  <div class="min-h-screen bg-transparent text-emerald-950 dark:text-emerald-50 flex flex-col font-sans antialiased transition-colors duration-300">
    
    <!-- Top Navigation Header -->
    <header class="w-full bg-emerald-100/70 dark:bg-slate-950/80 backdrop-blur-md border-b border-emerald-200/60 dark:border-emerald-900/40 py-4 px-4 sm:px-12 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      
      <!-- Left Branding & Desktop Nav -->
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap">
          Lyra Foxwood
        </router-link>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex space-x-4 text-sm font-medium">
          <router-link 
            to="/" 
            class="text-emerald-900 dark:text-emerald-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            active-class="text-cyan-600 dark:text-cyan-400 font-bold"
          >
            Home
          </router-link>
          <router-link 
            to="/about" 
            class="text-emerald-900 dark:text-emerald-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            active-class="text-cyan-600 dark:text-cyan-400 font-bold"
          >
            About
          </router-link>
          <router-link 
            to="/skills" 
            class="text-emerald-900 dark:text-emerald-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            active-class="text-cyan-600 dark:text-cyan-400 font-bold"
          >
            Skills & Certifications
          </router-link>
          <router-link 
            to="/links" 
            class="text-emerald-900 dark:text-emerald-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            active-class="text-cyan-600 dark:text-cyan-400 font-bold"
          >
            Links
          </router-link>
        </nav>
      </div>
      
      <!-- Right Controls -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        
        <!-- Desktop Social Media Icon Row -->
        <div class="hidden lg:flex items-center space-x-3 text-emerald-900 dark:text-emerald-200 text-lg">
          <a href="https://instagram.com/LyraFoxwood" target="_blank" aria-label="Instagram" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://facebook.com/LyraFoxwood" target="_blank" aria-label="Facebook" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://x.com/LyraFoxwood" target="_blank" aria-label="X" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://tiktok.com/@LyraFoxwood" target="_blank" aria-label="TikTok" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-tiktok"></i></a>
          <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-twitch"></i></a>
          <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-patreon"></i></a>
          <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-500 transition-colors"><i class="fa-solid fa-cloud"></i></a>
          <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-telegram"></i></a>
          <a href="https://lyrafoxwood.social" target="_blank" aria-label="Social Profile" class="hover:text-cyan-500 transition-colors"><i class="fa-solid fa-link"></i></a>
        </div>

        <!-- Dark Mode Toggle Button -->
        <button 
          @click="toggleDarkMode" 
          aria-label="Toggle Dark Mode"
          class="p-2 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 rounded-full transition-colors focus:outline-none"
        >
          <i v-if="isDark" class="fa-solid fa-sun text-yellow-400 text-lg"></i>
          <i v-else class="fa-solid fa-moon text-emerald-800 text-lg"></i>
        </button>

        <!-- Contact Button -->
        <a 
          href="mailto:Contactme@lyrafoxwood.app" 
          class="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded-lg shadow-md transition-colors whitespace-nowrap"
        >
          Contact Me
        </a>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle Mobile Menu"
          class="md:hidden p-2 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 rounded focus:outline-none"
        >
          <i v-if="mobileMenuOpen" class="fa-solid fa-xmark text-xl"></i>
          <i v-else class="fa-solid fa-bars text-xl"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Dropdown Navigation Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden bg-emerald-100/95 dark:bg-slate-950/95 border-b border-emerald-200 dark:border-emerald-900/60 px-6 py-4 space-y-4 backdrop-blur-md transition-colors duration-300"
    >
      <nav class="flex flex-col space-y-3 font-medium text-base">
        <router-link 
          to="/" 
          @click="mobileMenuOpen = false"
          class="text-emerald-950 dark:text-emerald-200 hover:text-cyan-500 transition-colors py-1"
          active-class="text-cyan-600 dark:text-cyan-400 font-bold"
        >
          Home
        </router-link>
        <router-link 
          to="/about" 
          @click="mobileMenuOpen = false"
          class="text-emerald-950 dark:text-emerald-200 hover:text-cyan-500 transition-colors py-1"
          active-class="text-cyan-600 dark:text-cyan-400 font-bold"
        >
          About
        </router-link>
        <router-link 
          to="/skills" 
          @click="mobileMenuOpen = false"
          class="text-emerald-950 dark:text-emerald-200 hover:text-cyan-500 transition-colors py-1"
          active-class="text-cyan-600 dark:text-cyan-400 font-bold"
        >
          Skills & Certifications
        </router-link>
        <router-link 
          to="/links" 
          @click="mobileMenuOpen = false"
          class="text-emerald-950 dark:text-emerald-200 hover:text-cyan-500 transition-colors py-1"
          active-class="text-cyan-600 dark:text-cyan-400 font-bold"
        >
          Links
        </router-link>
      </nav>

      <!-- Mobile Social Icons Row -->
      <div class="pt-3 border-t border-emerald-200 dark:border-emerald-900/60 flex flex-wrap gap-4 text-emerald-900 dark:text-emerald-200 text-lg">
        <a href="https://instagram.com/LyraFoxwood" target="_blank" aria-label="Instagram" class="hover:text-cyan-500"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://facebook.com/LyraFoxwood" target="_blank" aria-label="Facebook" class="hover:text-cyan-500"><i class="fa-brands fa-facebook"></i></a>
        <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-500"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://x.com/LyraFoxwood" target="_blank" aria-label="X" class="hover:text-cyan-500"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="https://tiktok.com/@LyraFoxwood" target="_blank" aria-label="TikTok" class="hover:text-cyan-500"><i class="fa-brands fa-tiktok"></i></a>
        <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-500"><i class="fa-brands fa-twitch"></i></a>
        <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-500"><i class="fa-brands fa-patreon"></i></a>
        <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-500"><i class="fa-solid fa-cloud"></i></a>
        <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-500"><i class="fa-brands fa-telegram"></i></a>
        <a href="https://lyrafoxwood.social" target="_blank" aria-label="Social Profile" class="hover:text-cyan-500"><i class="fa-solid fa-link"></i></a>
      </div>
    </div>

    <!-- Dynamic Router View Container -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="w-full bg-emerald-100/50 dark:bg-slate-950/80 py-8 px-6 sm:px-12 border-t border-emerald-200/60 dark:border-emerald-900/40 transition-colors duration-300">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div class="text-sm text-emerald-900 dark:text-emerald-300 text-center md:text-left font-medium">© 2026 Lyra Foxwood</div>
        </div>

        <!-- Social Icons Footer -->
        <div class="flex flex-wrap justify-center items-center gap-4 text-emerald-900 dark:text-emerald-200 text-lg">
          <a href="https://instagram.com/LyraFoxwood" target="_blank" aria-label="Instagram" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://facebook.com/LyraFoxwood" target="_blank" aria-label="Facebook" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-facebook"></i></a>
          <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://x.com/LyraFoxwood" target="_blank" aria-label="X" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://tiktok.com/@LyraFoxwood" target="_blank" aria-label="TikTok" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-tiktok"></i></a>
          <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-twitch"></i></a>
          <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-patreon"></i></a>
          <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-500 transition-colors"><i class="fa-solid fa-cloud"></i></a>
          <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-500 transition-colors"><i class="fa-brands fa-telegram"></i></a>
          <a href="https://lyrafoxwood.social" target="_blank" aria-label="Social Profile" class="hover:text-cyan-500 transition-colors"><i class="fa-solid fa-link"></i></a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const mobileMenuOpen = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>
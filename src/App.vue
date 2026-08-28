<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
    
    <!-- Top Navigation Header -->
    <header class="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-50 transition-colors duration-200">
      <div class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Lyra Foxwood
      </div>
      
      <div class="flex items-center space-x-4 sm:space-x-6">
        <!-- Social Media Icon Row -->
        <div class="flex items-center space-x-3 text-slate-800 dark:text-slate-200 text-lg">
          <a href="https://instagram.com/LyraFoxwood" target="_blank" aria-label="Instagram" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com/LyraFoxwood" target="_blank" aria-label="Facebook" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-youtube"></i>
          </a>
          <a href="https://x.com/LyraFoxwood" target="_blank" aria-label="X" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://tiktok.com/@LyraFoxwood" target="_blank" aria-label="TikTok" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-twitch"></i>
          </a>
          <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-patreon"></i>
          </a>
          <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-cloud"></i>
          </a>
          <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-telegram"></i>
          </a>
          <a href="https://lyrafoxwood.social" target="_blank" aria-label="Social Profile" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-link"></i>
          </a>
        </div>

        <!-- Dark Mode Toggle Button -->
        <button 
          @click="toggleDarkMode" 
          aria-label="Toggle Dark Mode"
          class="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none"
        >
          <i v-if="isDark" class="fa-solid fa-sun text-yellow-400 text-lg"></i>
          <i v-else class="fa-solid fa-moon text-slate-600 text-lg"></i>
        </button>

        <!-- Contact Email Link Button -->
        <a 
          href="mailto:contactme@lyrafoxwood.app" 
          class="bg-[#0070a8] hover:bg-[#005c8a] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
        >
          Contact Me
        </a>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="flex justify-center md:justify-end">
        <div class="w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-200">
          <img 
            src="./assets/hero.png" 
            alt="Lyra Foxwood VRChat Avatar" 
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="text-left max-w-lg">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          hello im Lyra Foxwood
        </h1>
        <p class="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          I'm a trans-feminine fox navigating the internet through VR, music, and creative chaos. I'm a furry streamer, content creator, photographer, and musician who lives mostly in VRChat.
        </p>
      </div>
    </section>

    <!-- Dark Teal Contact Section -->
    <section id="contact" class="w-full bg-[#033649] text-white py-20 px-6">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Connect with Lyra Foxwood</h2>
        <a 
          href="mailto:contactme@lyrafoxwood.app" 
          class="text-[#4da8da] hover:underline font-semibold text-xl inline-block"
        >
          contactme@lyrafoxwood.app
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-white dark:bg-slate-900 py-12 px-6 sm:px-12 border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div class="text-sm text-slate-600 dark:text-slate-400">© 2026 Lyra Social Group</div>
        </div>

        <!-- Social Icons Footer -->
        <div class="flex items-center space-x-4 text-slate-800 dark:text-slate-200 text-lg">
          <a href="https://instagram.com/LyraFoxwood" target="_blank" aria-label="Instagram" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com/LyraFoxwood" target="_blank" aria-label="Facebook" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" target="_blank" aria-label="YouTube" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-youtube"></i>
          </a>
          <a href="https://x.com/LyraFoxwood" target="_blank" aria-label="X" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://tiktok.com/@LyraFoxwood" target="_blank" aria-label="TikTok" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://twitch.tv/LyraFoxwood" target="_blank" aria-label="Twitch" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-twitch"></i>
          </a>
          <a href="https://patreon.com/LyraTheFox" target="_blank" aria-label="Patreon" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-patreon"></i>
          </a>
          <a href="https://bsky.app/profile/lyrafoxwood.social" target="_blank" aria-label="Bluesky" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-cloud"></i>
          </a>
          <a href="https://t.me/Lyrafoxwood" target="_blank" aria-label="Telegram" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-brands fa-telegram"></i>
          </a>
          <a href="https://lyrafoxwood.social" target="_blank" aria-label="Social Profile" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-link"></i>
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

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
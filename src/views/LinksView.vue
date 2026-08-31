<template>
  <div class="max-w-xl mx-auto px-6 py-12 sm:py-20 space-y-8">
    <div class="text-center space-y-4">
      <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg">
        <img 
          src="../assets/hero.png" 
          alt="Lyra Foxwood Profile" 
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Lyra Foxwood
        </h1>
        <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Streamer, Content Creator, Musician & Tech Enthusiast
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <a 
        href="https://twitch.tv/LyraFoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-twitch text-2xl text-purple-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Twitch</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://youtube.com/channel/UCngrGmmna1EEp5Q940Fy95g" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-youtube text-2xl text-red-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">YouTube</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://bsky.app/profile/lyrafoxwood.social" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-solid fa-cloud text-2xl text-sky-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Bluesky</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://tiktok.com/@LyraFoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-tiktok text-2xl text-pink-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">TikTok</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://t.me/Lyrafoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-telegram text-2xl text-cyan-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Telegram</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://patreon.com/LyraTheFox" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-patreon text-2xl text-orange-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Patreon</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://x.com/LyraFoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-x-twitter text-2xl text-slate-700 dark:text-slate-300"></i>
          <span class="font-semibold text-slate-900 dark:text-white">X / Twitter</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://instagram.com/LyraFoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-instagram text-2xl text-fuchsia-500"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Instagram</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>

      <a 
        href="https://facebook.com/LyraFoxwood" 
        target="_blank" 
        class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl transition-all group"
      >
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-facebook text-2xl text-blue-600"></i>
          <span class="font-semibold text-slate-900 dark:text-white">Facebook</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
      </a>
    </div>
  </div>
</template>
<script setup>
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'Links & Socials - Lyra Foxwood',
  description: 'Connect with Lyra Foxwood on Twitch, YouTube, Bluesky, Telegram, Patreon, and social profiles.',
  ogTitle: 'Links & Socials - Lyra Foxwood',
  ogDescription: 'Connect with Lyra Foxwood on Twitch, YouTube, Bluesky, Telegram, Patreon, and social profiles.',
  ogImage: 'https://lyrafoxwood.app/hero.png',
  twitterCard: 'summary_large_image',
})
</script>
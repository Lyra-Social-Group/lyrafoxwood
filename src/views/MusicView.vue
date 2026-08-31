<template>
  <div class="max-w-5xl mx-auto px-6 py-12 sm:py-20 space-y-16">
    <section class="text-center space-y-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-emerald-950 dark:text-emerald-50 tracking-tight">
        Music Hub
      </h1>
      <p class="text-emerald-800 dark:text-emerald-200 text-lg max-w-2xl mx-auto leading-relaxed">
        Everything I'm blasting in the headset and studio—updated live from Spotify.
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      
      <div class="md:col-span-1 bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-2xl p-6 shadow-2xl border border-cyan-400/40 space-y-4">
        <div class="flex items-center justify-between text-xs font-semibold text-cyan-400">
          <span class="flex items-center space-x-2">
            <span v-if="isPlaying" class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span>{{ isPlaying ? 'NOW PLAYING' : 'OFFLINE / PAUSED' }}</span>
          </span>
          <i class="fa-brands fa-spotify text-lg text-emerald-400"></i>
        </div>

        <div v-if="currentTrack" class="space-y-3">
          <div class="w-full aspect-square rounded-xl overflow-hidden bg-slate-800 shadow-md border border-emerald-500/20">
            <img 
              :src="currentTrack.albumArt" 
              :alt="currentTrack.title" 
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 class="text-lg font-bold text-white line-clamp-1">
              <a :href="currentTrack.url" target="_blank" class="hover:underline hover:text-cyan-300 transition-colors">{{ currentTrack.title }}</a>
            </h3>
            <p class="text-sm text-cyan-300 font-medium">{{ currentTrack.artist }}</p>
            <p class="text-xs text-emerald-300/80">{{ currentTrack.album }}</p>
          </div>
        </div>

        <div v-else class="text-center py-8 text-emerald-300/60 text-sm">
          <i class="fa-solid fa-headphones text-3xl mb-2 text-emerald-500/40 block"></i>
          Not listening to anything right now.
        </div>
      </div>

      <div class="md:col-span-2 bg-emerald-100/60 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-6 space-y-4 backdrop-blur-sm shadow-md">
        <h2 class="text-xl font-bold text-emerald-950 dark:text-emerald-50 flex items-center space-x-2.5 border-b border-emerald-200 dark:border-emerald-800/40 pb-3">
          <i class="fa-solid fa-clock-rotate-left text-cyan-500"></i>
          <span>Recently Played Tracks</span>
        </h2>

        <div v-if="recentlyPlayed.length" class="space-y-3">
          <div 
            v-for="(track, index) in recentlyPlayed" 
            :key="index"
            class="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-slate-950/40 border border-emerald-200/50 dark:border-emerald-800/30 hover:border-cyan-400/60 transition-all"
          >
            <div class="flex items-center space-x-3">
              <img :src="track.albumArt" :alt="track.title" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-emerald-500/20" />
              <div>
                <h4 class="font-bold text-emerald-950 dark:text-emerald-100 text-sm line-clamp-1">
                  <a :href="track.url" target="_blank" class="hover:underline hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">{{ track.title }}</a>
                </h4>
                <p class="text-xs text-emerald-700 dark:text-emerald-300">{{ track.artist }}</p>
              </div>
            </div>
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap ml-2">{{ track.timeAgo }}</span>
          </div>
        </div>

        <div v-else class="text-sm text-emerald-700 dark:text-emerald-300 py-4 text-center">
          Loading recent tracks...
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-emerald-950 dark:text-emerald-50 border-b border-emerald-200 dark:border-emerald-900/60 pb-3 flex items-center space-x-3">
        <i class="fa-solid fa-compact-disc text-cyan-500"></i>
        <span>Featured Playlists</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-950 p-2 rounded-2xl border border-emerald-800/60 hover:border-cyan-400/80 shadow-lg transition-all">
          <iframe 
            data-testid="embed-iframe" 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/playlist/4Wlhb4urMML3bxs97gdezb?utm_source=generator&si=4e57a7cd14aa4f63" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div class="bg-slate-950 p-2 rounded-2xl border border-emerald-800/60 hover:border-cyan-400/80 shadow-lg transition-all">
          <iframe 
            data-testid="embed-iframe" 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/playlist/4uEBDIesbUIgrYVTVcures?utm_source=generator&theme=0&si=07432fd126654a02" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div class="bg-slate-950 p-2 rounded-2xl border border-emerald-800/60 hover:border-cyan-400/80 shadow-lg transition-all">
          <iframe 
            data-testid="embed-iframe" 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/playlist/554jOLHlWzH9W3JpYIGZHQ?utm_source=generator&si=8e127bd6ca304f5d" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div class="bg-slate-950 p-2 rounded-2xl border border-emerald-800/60 hover:border-cyan-400/80 shadow-lg transition-all">
          <iframe 
            data-testid="embed-iframe" 
            style="border-radius:12px" 
            src="https://open.spotify.com/playlist/4AloSizu5Cw4ZG5EFUpGYf?si=480892ffd0cf48df" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentlyPlaying, getRecentlyPlayed } from '../services/spotify'

const currentTrack = ref(null)
const isPlaying = ref(false)
const recentlyPlayed = ref([])
let timer = null

const fetchMusicData = async () => {
  const nowData = await getCurrentlyPlaying()
  if (nowData && nowData.item) {
    isPlaying.value = nowData.is_playing
    currentTrack.value = {
      title: nowData.item.name,
      artist: nowData.item.artists.map(a => a.name).join(', '),
      album: nowData.item.album.name,
      albumArt: nowData.item.album.images[0]?.url,
      url: nowData.item.external_urls.spotify,
    }
  } else {
    isPlaying.value = false
    currentTrack.value = null
  }

  const recentItems = await getRecentlyPlayed(5)
  recentlyPlayed.value = recentItems.map(item => ({
    title: item.track.name,
    artist: item.track.artists.map(a => a.name).join(', '),
    albumArt: item.track.album.images[0]?.url,
    url: item.track.external_urls.spotify,
    timeAgo: formatTimeAgo(new Date(item.played_at)),
  }))
}

const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

onMounted(() => {
  fetchMusicData()
  timer = setInterval(fetchMusicData, 15000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'Music Hub - Lyra Foxwood',
  description: 'Live Spotify listening stats, recent tracks, heavy rotation playlists, and multi-genre music creations.',
  ogTitle: 'Music Hub - Lyra Foxwood',
  ogDescription: 'Live Spotify listening stats, recent tracks, heavy rotation playlists, and multi-genre music creations.',
  ogImage: 'https://lyrafoxwood.app/hero.png',
  twitterCard: 'summary_large_image',
})

</script>
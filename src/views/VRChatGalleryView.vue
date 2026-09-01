<script setup>
import { ref, watch, onMounted } from 'vue'

const activeCategory = ref('Me (Lyra)')
const galleryPhotos = ref([])
const isLoading = ref(false)

const categories = [
  { id: 'me', label: '🐾 Me' },
  { id: 'me and confetti', label: '🎉 Me & Confetti' },
  { id: 'me and luna', label: '🌙 Me & Luna' },
  { id: 'me and milk', label: '🥛 Me & Milk' },
  { id: 'Me & Darienfox', label: '🦊 Me & Darienfox' },
  { id: 'Me & Fox', label: '🌲 Me & Fox' },
  { id: 'Me & Uni', label: '✨ Me & Uni' },
  { id: 'Me & Lyraboone', label: '🌌 Me & Lyraboone' },
  { id: 'Me & Quinnexe', label: '🌿 Me & Quinnexe' },
  { id: 'Syru & Kasuri', label: '🍂 Syru & Kasuri' },
  { id: 'Furality Ultra', label: '💫 Furality Ultra' },
]

// Dynamic fetcher that pulls photo items from backend API
const fetchAlbumPhotos = async (categoryName) => {
  isLoading.value = true
  galleryPhotos.value = []

  try {
    const res = await fetch(`/api/gallery?category=${encodeURIComponent(categoryName)}`)
    if (res.ok) {
      const data = await res.json()
      // Map API items: cleans up file extension and formats photo creation date
      galleryPhotos.value = (data.photos || []).map((photo, index) => ({
        id: photo.id || index,
        title: photo.filename ? photo.filename.replace(/\.[^/.]+$/, '') : `VRChat Shot #${index + 1}`,
        date: photo.creationTime ? new Date(photo.creationTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) : 'Unknown Date',
        src: photo.baseUrl || photo.src,
        style: index % 2 === 0 ? 'polaroid' : 'floating',
        rotate: index % 3 === 0 ? '-rotate-2' : index % 3 === 1 ? 'rotate-2' : 'rotate-1'
      }))
    }
  } catch (err) {
    console.error('Failed to load gallery photos:', err)
  } finally {
    isLoading.value = false
  }
}

// Fetch photos when category changes
watch(activeCategory, (newCat) => {
  fetchAlbumPhotos(newCat)
})

onMounted(() => {
  fetchAlbumPhotos(activeCategory.value)
})

// Lightbox modal handling
const activePhoto = ref(null)
const openLightbox = (photo) => { activePhoto.value = photo }
const closeLightbox = () => { activePhoto.value = null }
</script>

<template>
  <div class="relative min-h-screen py-12 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#02130c] via-[#042014] to-[#010b07] text-emerald-100 font-sans">
    
    <!-- Animated Fireflies -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="firefly firefly-4"></div>
      <div class="firefly firefly-5"></div>
      <div class="firefly firefly-6"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto space-y-12">
      
      <header class="text-center space-y-3">
        <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-widest uppercase shadow-lg shadow-emerald-950/50">
          <i class="fa-solid fa-tree text-emerald-400"></i>
          <span>VRChat Memories</span>
          <i class="fa-solid fa-tree text-emerald-400"></i>
        </div>
        <h1 class="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-300 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
          The Enchanted Photo Forest
        </h1>
        <p class="text-emerald-300/80 text-sm sm:text-base max-w-xl mx-auto">
          Select a wooden signpost below to explore all photos and dates from each category.
        </p>
      </header>

      <!-- Wooden Signposts -->
      <nav aria-label="Photo Category Signposts" class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform flex items-center space-x-2 border shadow-md',
            activeCategory === cat.id
              ? 'bg-gradient-to-r from-amber-800 to-amber-900 border-amber-500/80 text-amber-100 shadow-amber-900/50 scale-105 ring-2 ring-amber-400/50'
              : 'bg-emerald-950/60 hover:bg-amber-950/50 border-emerald-800/40 text-emerald-300 hover:text-amber-200 hover:border-amber-700/50 hover:-translate-y-0.5'
          ]"
        >
          <span>{{ cat.label }}</span>
        </button>
      </nav>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-20 text-center space-y-3">
        <i class="fa-solid fa-spinner animate-spin text-3xl text-cyan-400"></i>
        <p class="text-sm text-emerald-300/80 font-medium">Gathering forest snapshots...</p>
      </div>

      <!-- Photo Grid -->
      <main v-else-if="galleryPhotos.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
        
        <div 
          v-for="photo in galleryPhotos" 
          :key="photo.id"
          @click="openLightbox(photo)"
          :class="[
            'cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-20 group relative flex flex-col',
            photo.rotate
          ]"
        >
          <!-- Style A: Polaroid -->
          <div 
            v-if="photo.style === 'polaroid'" 
            class="bg-stone-900 p-4 pb-6 rounded-sm shadow-2xl border border-stone-800 relative flex-1 flex flex-col justify-between"
          >
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-500 text-lg drop-shadow z-10">
              <i class="fa-solid fa-thumbtack"></i>
            </div>

            <div class="aspect-[4/3] w-full overflow-hidden bg-stone-950 rounded-sm mb-3 relative">
              <img 
                :src="photo.src" 
                :alt="photo.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div class="text-center">
              <h3 class="font-bold text-stone-100 text-base line-clamp-1">{{ photo.title }}</h3>
              <p class="text-amber-400/90 text-xs mt-1 font-mono"><i class="fa-regular fa-calendar-alt mr-1"></i>{{ photo.date }}</p>
            </div>
          </div>

          <!-- Style B: Floating Frame -->
          <div 
            v-else 
            class="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-cyan-950/60 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] transition-all flex-1 flex flex-col justify-between"
          >
            <div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 relative">
              <img 
                :src="photo.src" 
                :alt="photo.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
              
              <div class="absolute bottom-3 left-3 right-3 text-left">
                <h3 class="font-bold text-white text-base drop-shadow-md">{{ photo.title }}</h3>
                <p class="text-cyan-300 text-xs drop-shadow font-mono"><i class="fa-regular fa-calendar-alt mr-1"></i>{{ photo.date }}</p>
              </div>
            </div>
          </div>

          <div class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-300 text-xs animate-pulse">
            <i class="fa-solid fa-sparkles"></i>
          </div>
        </div>

      </main>

      <div v-else class="col-span-full py-20 text-center text-emerald-300/60 space-y-3">
        <i class="fa-solid fa-tree text-4xl block opacity-40"></i>
        <p class="text-base font-medium">No snapshots found for {{ activeCategory }}.</p>
      </div>

      <!-- Lightbox Modal -->
      <Teleport to="body">
        <div 
          v-if="activePhoto" 
          @click="closeLightbox" 
          class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div class="max-w-4xl w-full bg-emerald-950/90 border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4" @click.stop>
            <div class="flex justify-between items-center px-2">
              <div>
                <h3 class="text-xl font-bold text-emerald-100">{{ activePhoto.title }}</h3>
                <p class="text-xs text-amber-400 font-mono">{{ activePhoto.date }}</p>
              </div>
              <button @click="closeLightbox" class="text-emerald-400 hover:text-white text-xl">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-900">
              <img :src="activePhoto.src" :alt="activePhoto.title" class="max-h-[75vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      </Teleport>

    </div>
  </div>
</template>

<style scoped>
.firefly {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #fef08a;
  border-radius: 50%;
  box-shadow: 0 0 12px #facc15, 0 0 20px #84cc16;
  opacity: 0.6;
  animation: floatFirefly 12s infinite ease-in-out;
}

.firefly-1 { top: 20%; left: 15%; animation-duration: 14s; animation-delay: 0s; }
.firefly-2 { top: 40%; left: 80%; animation-duration: 10s; animation-delay: 2s; }
.firefly-3 { top: 70%; left: 25%; animation-duration: 16s; animation-delay: 1s; }
.firefly-4 { top: 85%; left: 75%; animation-duration: 12s; animation-delay: 3s; }
.firefly-5 { top: 10%; left: 60%; animation-duration: 18s; animation-delay: 4s; }
.firefly-6 { top: 60%; left: 45%; animation-duration: 11s; animation-delay: 2.5s; }

@keyframes floatFirefly {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-40px) translateX(25px) scale(1.3);
    opacity: 0.9;
  }
}
</style>
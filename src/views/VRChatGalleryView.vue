<script setup>
import { ref, watch, onMounted } from 'vue'

const activeCategory = ref('me')
const galleryPhotos = ref([])
const isLoading = ref(false)
const galleryError = ref('')

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

const fetchAlbumPhotos = async (categoryName) => {
  isLoading.value = true
  galleryPhotos.value = []
  galleryError.value = ''

  try {
    const res = await fetch(
      `/api/gallery?category=${encodeURIComponent(categoryName)}`
    )

    const data = await res.json()

    if (!res.ok) {
      galleryError.value =
        data.error ||
        `Gallery request failed (${res.status})`

      return
    }

    if (data.error) {
      galleryError.value = data.error
    }

    galleryPhotos.value = (data.photos || []).map(
      (photo, index) => ({
        id: photo.id || index,

        title: photo.filename
          ? photo.filename.replace(
              /\.[^/.]+$/,
              ''
            )
          : `VRChat Shot #${index + 1}`,

        date: photo.creationTime
          ? new Date(
              photo.creationTime
            ).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )
          : 'Date unavailable',

        src:
          photo.baseUrl ||
          photo.src,

        fallbackSrc:
          photo.fallbackUrl || null,

        driveUrl:
          photo.driveUrl || null,

        style:
          index % 2 === 0
            ? 'polaroid'
            : 'floating',

        rotate:
          index % 3 === 0
            ? '-rotate-2'
            : index % 3 === 1
              ? 'rotate-2'
              : 'rotate-1',
      })
    )
  } catch (err) {
    console.error(
      'Failed to load gallery photos:',
      err
    )

    galleryError.value =
      err instanceof Error
        ? err.message
        : 'Failed to load gallery photos.'
  } finally {
    isLoading.value = false
  }
}

watch(
  activeCategory,
  (newCategory) => {
    fetchAlbumPhotos(newCategory)
  }
)

onMounted(() => {
  fetchAlbumPhotos(
    activeCategory.value
  )
})

const activePhoto = ref(null)

const openLightbox = (photo) => {
  activePhoto.value = photo
}

const closeLightbox = () => {
  activePhoto.value = null
}

const handleImageError = (event, photo) => {
  const img = event.target

  // First failure: retry once with the fallback host.
  if (photo.fallbackSrc && img.src !== photo.fallbackSrc) {
    console.warn(
      'Primary gallery image failed, retrying with fallback:',
      photo.src
    )
    img.src = photo.fallbackSrc
    return
  }

  // Fallback also failed (or none available): give up gracefully.
  console.error('Failed to load gallery image:', photo.src)
  img.style.display = 'none'
}
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-100"
  >

    <!-- Decorative background -->
    <div
      class="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div class="firefly firefly-1"></div>
      <div class="firefly firefly-2"></div>
      <div class="firefly firefly-3"></div>
      <div class="firefly firefly-4"></div>
      <div class="firefly firefly-5"></div>
      <div class="firefly firefly-6"></div>
    </div>

    <div
      class="relative z-10 max-w-7xl mx-auto px-4 py-8"
    >

      <!-- Header -->
      <header class="text-center mb-8">
        <h1
          class="text-4xl md:text-5xl font-black text-emerald-300"
        >
          VRChat Gallery
        </h1>

        <p
          class="mt-3 text-emerald-200/70 max-w-2xl mx-auto"
        >
          Select a wooden signpost below to explore
          all photos and dates from each category.
        </p>
      </header>

      <!-- Categories -->
      <div
        class="flex flex-wrap justify-center gap-2 mb-10"
      >
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-4 py-2 rounded-lg border transition-all',
            activeCategory === category.id
              ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
              : 'bg-emerald-950/50 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-500'
          ]"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Error -->
      <div
        v-if="galleryError"
        class="max-w-3xl mx-auto mb-8 p-4 rounded-xl border border-red-500/40 bg-red-950/40 text-red-200"
      >
        <div
          class="font-bold mb-1"
        >
          <i
            class="fa-solid fa-triangle-exclamation mr-2"
          ></i>
          Gallery Error
        </div>

        <p class="text-sm">
          {{ galleryError }}
        </p>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="py-20 text-center text-emerald-300"
      >
        <i
          class="fa-solid fa-spinner fa-spin text-4xl mb-4"
        ></i>

        <p>
          Loading VRChat snapshots...
        </p>
      </div>

      <!-- Photos -->
      <main
        v-else-if="galleryPhotos.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >

        <div
          v-for="photo in galleryPhotos"
          :key="photo.id"
          @click="openLightbox(photo)"
          :class="[
            'relative group cursor-pointer',
            photo.rotate
          ]"
        >

          <!-- Polaroid -->
          <div
            v-if="photo.style === 'polaroid'"
            class="p-3 bg-white rounded-lg shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >

            <div
              class="aspect-[4/3] w-full overflow-hidden bg-slate-900"
            >
<img 
  :src="photo.src"
  :alt="photo.title"
  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  loading="lazy"
  @error="(event) => handleImageError(event, photo)"
/>
            </div>

            <div
              class="px-2 pt-3 pb-1 text-slate-800"
            >
              <h3
                class="font-bold text-base"
              >
                {{ photo.title }}
              </h3>

              <p
                class="text-xs text-slate-500 mt-1"
              >
                <i
                  class="fa-regular fa-calendar-alt mr-1"
                ></i>

                {{ photo.date }}
              </p>
            </div>
          </div>

          <!-- Floating Frame -->
          <div
            v-else
            class="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-cyan-950/60 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] transition-all flex-1 flex flex-col justify-between"
          >

            <div
              class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 relative"
            >

<img 
  :src="photo.src"
  :alt="photo.title"
  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  loading="lazy"
  @error="(event) => handleImageError(event, photo)"
/>

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"
              ></div>

              <div
                class="absolute bottom-3 left-3 right-3 text-left"
              >
                <h3
                  class="font-bold text-white text-base drop-shadow-md"
                >
                  {{ photo.title }}
                </h3>

                <p
                  class="text-cyan-300 text-xs drop-shadow font-mono"
                >
                  <i
                    class="fa-regular fa-calendar-alt mr-1"
                  ></i>

                  {{ photo.date }}
                </p>
              </div>
            </div>
          </div>

          <!-- Hover sparkle -->
          <div
            class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-300 text-xs animate-pulse"
          >
            <i
              class="fa-solid fa-sparkles"
            ></i>
          </div>

        </div>
      </main>

      <!-- Empty -->
      <div
        v-else
        class="py-20 text-center text-emerald-300/60 space-y-3"
      >
        <i
          class="fa-solid fa-tree text-4xl block opacity-40"
        ></i>

        <p
          class="text-base font-medium"
        >
          No snapshots found for
          {{ activeCategory }}.
        </p>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">

        <div
          v-if="activePhoto"
          @click="closeLightbox"
          class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >

          <div
            class="max-w-4xl w-full bg-emerald-950/90 border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4"
            @click.stop
          >

            <div
              class="flex justify-between items-center px-2"
            >

              <div>
                <h3
                  class="text-xl font-bold text-emerald-100"
                >
                  {{ activePhoto.title }}
                </h3>

                <p
                  class="text-xs text-amber-400 font-mono"
                >
                  {{ activePhoto.date }}
                </p>
              </div>

              <button
                @click="closeLightbox"
                class="text-emerald-400 hover:text-white text-xl"
              >
                <i
                  class="fa-solid fa-xmark"
                ></i>
              </button>

            </div>

            <div
              class="max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-900"
            >

              <img
                :src="activePhoto.src"
                :alt="activePhoto.title"
                class="max-h-[75vh] w-auto object-contain"
                @error="(event) => handleImageError(event, activePhoto)"
              />

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
  box-shadow:
    0 0 12px #facc15,
    0 0 20px #84cc16;

  opacity: 0.6;

  animation:
    floatFirefly
    12s
    infinite
    ease-in-out;
}

.firefly-1 {
  top: 20%;
  left: 15%;
  animation-duration: 14s;
  animation-delay: 0s;
}

.firefly-2 {
  top: 40%;
  left: 80%;
  animation-duration: 10s;
  animation-delay: 2s;
}

.firefly-3 {
  top: 70%;
  left: 25%;
  animation-duration: 16s;
  animation-delay: 1s;
}

.firefly-4 {
  top: 85%;
  left: 75%;
  animation-duration: 12s;
  animation-delay: 3s;
}

.firefly-5 {
  top: 10%;
  left: 60%;
  animation-duration: 18s;
  animation-delay: 4s;
}

.firefly-6 {
  top: 60%;
  left: 45%;
  animation-duration: 11s;
  animation-delay: 2.5s;
}

@keyframes floatFirefly {
  0%,
  100% {
    transform:
      translateY(0)
      translateX(0)
      scale(0.8);

    opacity: 0.3;
  }

  50% {
    transform:
      translateY(-40px)
      translateX(25px)
      scale(1.3);

    opacity: 0.9;
  }
}
</style>
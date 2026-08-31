<template>
  <Transition name="fade">
    <div 
      v-if="!accepted" 
      class="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md bg-slate-950/95 border border-emerald-700/80 p-5 rounded-2xl shadow-2xl z-50 space-y-3 backdrop-blur-md"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
          <i class="fa-solid fa-cookie-bite"></i>
          <span>Cookie & Privacy Notice</span>
        </div>
      </div>

      <p class="text-xs text-emerald-200 leading-relaxed">
        We use cookies (yummy) and basic analytics to understand site traffic and optimize your experience. By continuing to use this site, you agree to our 
        <a 
          href="https://legal.lyrasocialgroup.tech/privacy/privacy-policy" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-cyan-400 underline hover:text-cyan-300 font-medium"
        >Privacy Policy</a>.
      </p>

      <div class="flex items-center justify-end space-x-2 pt-1">
        <button 
          @click="accept" 
          class="w-full sm:w-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const accepted = ref(true)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) {
    accepted.value = false
  }
})

const accept = () => {
  localStorage.setItem('cookie_consent', 'true')
  accepted.value = true
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>